import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getApiUrl } from "@/lib/query-client";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "@/constants/colors";
import { useLearning } from "@/context/learning";
import { TOPICS, LEVELS, getAllSetsInLevelOrder, getLevelSets } from "@/data/vocabulary";
import type { VocabCard, VocabLevel, VocabCategory, VocabSubcategory, VocabSet } from "@/data/vocabulary";

const DAILY_GOAL = 10;

function WortiMascot({ size = 56 }: { size?: number }) {
  const bounce = useSharedValue(1);
  const mascotUrl = useMemo(() => new URL("/worti.png", getApiUrl()).toString(), []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bounce.value }],
  }));

  function handlePress() {
    bounce.value = withSequence(
      withSpring(1.25, { damping: 4, stiffness: 300 }),
      withSpring(1, { damping: 6, stiffness: 200 })
    );
  }

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={animStyle}>
        <Image
          source={{ uri: mascotUrl }}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      </Animated.View>
    </Pressable>
  );
}

function StreakBadge({ count }: { count: number; todayProgress: number; dailyGoal: number }) {
  return (
    <View style={styles.streakBadge}>
      <Ionicons name="flame" size={18} color={count > 0 ? Colors.gold : Colors.textMuted} />
      <Text style={[styles.streakText, count === 0 && styles.streakTextZero]}>
        {count} Tage Serie
      </Text>
    </View>
  );
}

function DailyProgressBar({ progress, total }: { progress: number; total: number }) {
  const pct = Math.min(progress / total, 1);
  const width = useSharedValue(0);

  React.useEffect(() => {
    width.value = withTiming(pct, { duration: 800 });
  }, [pct]);

  const barStyle = useAnimatedStyle(() => ({
    width: `${width.value * 100}%` as any,
  }));

  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarTrack}>
        <Animated.View style={[styles.progressBarFill, barStyle]} />
      </View>
      <Text style={styles.progressBarLabel}>
        {progress}/{total} kelime
      </Text>
    </View>
  );
}

interface ReviewCategoryCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  count: number;
  color: string;
  bgColor: string;
  onPress: () => void;
}

function ReviewCategoryCard({ icon, label, count, color, bgColor, onPress }: ReviewCategoryCardProps) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const disabled = count === 0;

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => { if (!disabled) scale.value = withSpring(0.95); }}
      onPressOut={() => { scale.value = withSpring(1); }}
    >
      <Animated.View style={[styles.reviewCard, { backgroundColor: bgColor, borderColor: color + "30" }, animStyle]}>
        <View style={[styles.reviewCardIcon, { backgroundColor: color + "20" }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={[styles.reviewCardCount, { color }]}>{count}</Text>
        <Text style={[styles.reviewCardLabel, disabled && styles.reviewCardLabelDisabled]}>
          {label}
        </Text>
        {!disabled && (
          <Ionicons name="chevron-forward" size={12} color={color} style={styles.reviewCardChevron} />
        )}
      </Animated.View>
    </Pressable>
  );
}

interface SetItemProps {
  setId: string;
  name: string;
  index: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  onPress: () => void;
}

function SetItem({ setId, name, index, isUnlocked, isCompleted, onPress }: SetItemProps) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <Pressable
        style={[
          styles.setItem,
          isCompleted && styles.setItemCompleted,
          !isUnlocked && styles.setItemLocked,
        ]}
        onPress={onPress}
        onPressIn={() => { if (isUnlocked) scale.value = withSpring(0.97); }}
        onPressOut={() => { scale.value = withSpring(1); }}
        disabled={!isUnlocked}
      >
        <View style={[styles.setIcon, isCompleted && styles.setIconCompleted, !isUnlocked && styles.setIconLocked]}>
          {isCompleted ? (
            <Ionicons name="checkmark" size={20} color="#fff" />
          ) : isUnlocked ? (
            <Text style={styles.setNumber}>{index + 1}</Text>
          ) : (
            <Ionicons name="lock-closed" size={16} color={Colors.textMuted} />
          )}
        </View>
        <View style={styles.setInfo}>
          <Text style={[styles.setName, !isUnlocked && styles.setNameLocked]}>{name}</Text>
          <Text style={[styles.setSubtitle, !isUnlocked && styles.setNameLocked]}>
            {isCompleted ? "Tamamlandı" : isUnlocked ? "10 kelime" : "Kilitli"}
          </Text>
        </View>
        {isUnlocked && !isCompleted && (
          <View style={styles.setAction}>
            <Ionicons name="chevron-forward" size={18} color={Colors.primary} />
          </View>
        )}
        {isCompleted && (
          <View style={styles.setAction}>
            <Ionicons name="refresh" size={16} color={Colors.success} />
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

function LevelSetItem({
  set,
  index,
  isUnlocked,
  isCompleted,
}: {
  set: VocabSet;
  index: number;
  isUnlocked: boolean;
  isCompleted: boolean;
}) {
  return (
    <SetItem
      setId={set.id}
      name={set.name}
      index={index}
      isUnlocked={isUnlocked && set.cards.length > 0}
      isCompleted={isCompleted}
      onPress={() => {
        if (set.cards.length > 0) {
          router.push({ pathname: "/learn/[setId]", params: { setId: set.id } });
        }
      }}
    />
  );
}

function SubcategorySection({
  sub,
  isSetUnlocked,
  isSetCompleted,
}: {
  sub: VocabSubcategory;
  isSetUnlocked: (id: string) => boolean;
  isSetCompleted: (id: string) => boolean;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasSets = sub.sets.length > 0;
  return (
    <View style={styles.subcategoryBlock}>
      <Pressable style={styles.subcategoryHeader} onPress={() => setExpanded((v) => !v)}>
        <View style={styles.subcategoryDot} />
        <Text style={styles.subcategoryName}>{sub.name}</Text>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={12} color={Colors.textMuted} />
      </Pressable>
      {expanded && (
        <View style={styles.subSetsList}>
          {hasSets
            ? sub.sets.map((set, idx) => (
                <LevelSetItem
                  key={set.id}
                  set={set}
                  index={idx}
                  isUnlocked={isSetUnlocked(set.id)}
                  isCompleted={isSetCompleted(set.id)}
                />
              ))
            : <View style={styles.emptyRow}><Text style={styles.emptyRowText}>Yakında eklenecek</Text></View>}
        </View>
      )}
    </View>
  );
}

function CategorySection({
  cat,
  isSetUnlocked,
  isSetCompleted,
}: {
  cat: VocabCategory;
  isSetUnlocked: (id: string) => boolean;
  isSetCompleted: (id: string) => boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const allSets = cat.sets ?? cat.subcategories?.flatMap((s) => s.sets) ?? [];
  const hasSets = allSets.length > 0;
  const completedCount = allSets.filter((s) => isSetCompleted(s.id)).length;

  return (
    <View style={styles.categoryBlock}>
      <Pressable style={styles.categoryHeader} onPress={() => setExpanded((v) => !v)}>
        <Text style={styles.categoryName}>{cat.name}</Text>
        {hasSets ? (
          <Text style={styles.categoryMeta}>{completedCount}/{allSets.length}</Text>
        ) : (
          <View style={styles.comingSoonBadge}><Text style={styles.comingSoonText}>Yakında</Text></View>
        )}
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={14} color={Colors.textMuted} />
      </Pressable>
      {expanded && (
        <View>
          {cat.sets !== undefined
            ? cat.sets.length > 0
              ? cat.sets.map((set, idx) => (
                  <LevelSetItem
                    key={set.id}
                    set={set}
                    index={idx}
                    isUnlocked={isSetUnlocked(set.id)}
                    isCompleted={isSetCompleted(set.id)}
                  />
                ))
              : <View style={styles.emptyRow}><Text style={styles.emptyRowText}>Yakında eklenecek</Text></View>
            : cat.subcategories?.map((sub) => (
                <SubcategorySection
                  key={sub.id}
                  sub={sub}
                  isSetUnlocked={isSetUnlocked}
                  isSetCompleted={isSetCompleted}
                />
              ))}
        </View>
      )}
    </View>
  );
}

function LevelSection({
  level,
  isSetUnlocked,
  isSetCompleted,
}: {
  level: VocabLevel;
  isSetUnlocked: (id: string) => boolean;
  isSetCompleted: (id: string) => boolean;
}) {
  const hasContent = getLevelSets(level).some((s) => s.cards.length > 0);
  const [expanded, setExpanded] = useState(false);
  const allSets = getLevelSets(level).filter((s) => s.cards.length > 0);
  const completedCount = allSets.filter((s) => isSetCompleted(s.id)).length;

  return (
    <View style={styles.topicCard}>
      <Pressable style={styles.topicHeader} onPress={() => setExpanded((v) => !v)}>
        <View style={styles.topicBadge}>
          <Text style={styles.topicBadgeText}>{level.name}</Text>
        </View>
        <View style={styles.topicTitleRow}>
          <View style={styles.topicTitleGroup}>
            <Text style={styles.topicName}>Seviye {level.name}</Text>
            {level.subtitle ? (
              <Text style={styles.topicSubtitle}>{level.subtitle}</Text>
            ) : null}
          </View>
          {hasContent ? (
            <Text style={styles.topicMeta}>{completedCount}/{allSets.length} set</Text>
          ) : (
            <View style={styles.comingSoonBadge}><Text style={styles.comingSoonText}>Yakında</Text></View>
          )}
        </View>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={18} color={Colors.textMuted} />
      </Pressable>
      {expanded && (
        <View style={styles.categoriesList}>
          {level.categories.map((cat) => (
            <CategorySection
              key={cat.id}
              cat={cat}
              isSetUnlocked={isSetUnlocked}
              isSetCompleted={isSetCompleted}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const mascotUrl = useMemo(() => new URL("/worti.png", getApiUrl()).toString(), []);
  const { state, isSetUnlocked, isSetCompleted, getTodayProgress, isDailyTaskDone } = useLearning();
  const todayProgress = getTodayProgress();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : 0;

  const nextUncompletedSet = useMemo(() => {
    for (const set of getAllSetsInLevelOrder()) {
      if (set.cards.length > 0 && isSetUnlocked(set.id) && !isSetCompleted(set.id)) {
        for (const level of LEVELS) {
          for (const cat of level.categories) {
            const directSets = cat.sets ?? [];
            const subSets = cat.subcategories?.flatMap((s) => s.sets) ?? [];
            if ([...directSets, ...subSets].some((s) => s.id === set.id)) {
              return { set, levelName: level.name, categoryName: cat.name };
            }
          }
        }
        return { set, levelName: "", categoryName: "" };
      }
    }
    return null;
  }, [state.completedSets, state.unlockedSets]);

  const today = new Date().toISOString().split("T")[0];
  const todayGoalDone = state.lastStudiedDate === today;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  const displayStreak =
    state.lastStudiedDate === today || state.lastStudiedDate === yesterdayStr
      ? state.dailyStreak
      : 0;

  const { known, unsure, difficult } = useMemo(() => {
    const allCards = TOPICS.flatMap((t) => t.sets.flatMap((s) => s.cards));
    const knownCards: VocabCard[] = [];
    const unsureCards: VocabCard[] = [];
    const difficultCards: VocabCard[] = [];

    for (const card of allCards) {
      const mastery = state.wordMastery[card.id] ?? 0;
      const lastResult = state.wordLastResult[card.id];
      if (!lastResult) continue;

      if (mastery >= 3) {
        knownCards.push(card);
      } else if (mastery >= 1) {
        unsureCards.push(card);
      } else if (lastResult === "dontKnow") {
        difficultCards.push(card);
      }
    }

    return { known: knownCards, unsure: unsureCards, difficult: difficultCards };
  }, [state.wordMastery, state.wordLastResult]);

  if (!isDailyTaskDone) {
    return <Redirect href="/daily-task" />;
  }

  function launchCategoryReview(cards: VocabCard[], title: string) {
    if (cards.length === 0) return;
    router.push({
      pathname: "/review",
      params: {
        cardIds: cards.map((c) => c.id).join(","),
        title,
      },
    });
  }

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: bottomPad + 100 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appName}>WortAdler</Text>
            <Text style={styles.slogan}>Jeden Tag 10 neue Wörter</Text>
          </View>
          <View style={styles.headerRight}>
            <StreakBadge count={displayStreak} todayProgress={todayProgress} dailyGoal={DAILY_GOAL} />
            <WortiMascot size={68} />
          </View>
        </View>

        {/* Daily Task CTA */}
        {nextUncompletedSet && !todayGoalDone && (
          <View style={styles.section}>
            <Pressable
              style={({ pressed }) => [styles.dailyTaskCard, { opacity: pressed ? 0.92 : 1 }]}
              onPress={() =>
                router.push({
                  pathname: "/learn/[setId]",
                  params: { setId: nextUncompletedSet.set.id },
                })
              }
            >
              <View style={styles.dailyTaskLeft}>
                <View style={styles.dailyTaskBadge}>
                  <Ionicons name="calendar-outline" size={12} color={Colors.primary} />
                  <Text style={styles.dailyTaskBadgeText}>Bugünkü Görev</Text>
                </View>
                <Text style={styles.dailyTaskTitle}>
                  Bugünkü 10 kelimelik görevin hazır.
                </Text>
                <Text style={styles.dailyTaskMeta}>
                  {nextUncompletedSet.levelName} {nextUncompletedSet.categoryName} · {nextUncompletedSet.set.name}
                </Text>
              </View>
              <Ionicons name="play-circle" size={44} color={Colors.primary} />
            </Pressable>
          </View>
        )}

        {todayGoalDone && (
          <View style={styles.section}>
            <View style={styles.dailyDoneCard}>
              <Ionicons name="checkmark-circle" size={22} color={Colors.success} />
              <Text style={styles.dailyDoneText}>Bugünkü 10 kelimeni tamamladın!</Text>
            </View>
          </View>
        )}

        {/* Review Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tekrar Et</Text>
          <View style={styles.reviewRow}>
            <ReviewCategoryCard
              icon="close-circle"
              label="Bilmiyorum"
              count={difficult.length}
              color="#EF4444"
              bgColor="#FFF5F5"
              onPress={() => launchCategoryReview(difficult, "Bilmiyorum")}
            />
            <ReviewCategoryCard
              icon="refresh-circle"
              label="Tekrar"
              count={unsure.length}
              color="#F59E0B"
              bgColor="#FFFBEB"
              onPress={() => launchCategoryReview(unsure, "Tekrar")}
            />
            <ReviewCategoryCard
              icon="checkmark-circle"
              label="Biliyorum"
              count={known.length}
              color="#10B981"
              bgColor="#F0FDF4"
              onPress={() => launchCategoryReview(known, "Biliyorum")}
            />
          </View>
        </View>

        {/* Daily Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bugünkü İlerleme</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Günlük Hedef</Text>
              <Text style={styles.progressPct}>
                {Math.round((todayProgress / DAILY_GOAL) * 100)}%
              </Text>
            </View>
            <DailyProgressBar progress={todayProgress} total={DAILY_GOAL} />
            {todayProgress >= DAILY_GOAL && (
              <View style={styles.goalBadge}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                <Text style={styles.goalBadgeText}>Hedefine ulaştın!</Text>
              </View>
            )}
          </View>
        </View>

        {/* Levels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seviyeler</Text>
          <View style={styles.topicsList}>
            {LEVELS.map((level) => (
              <LevelSection
                key={level.id}
                level={level}
                isSetUnlocked={isSetUnlocked}
                isSetCompleted={isSetCompleted}
              />
            ))}
          </View>
        </View>

        {/* Motivational footer */}
        <View style={styles.motivationCard}>
          <Image source={{ uri: mascotUrl }} style={styles.motivMascot} resizeMode="contain" />
          <Text style={styles.motivationText}>
            {state.totalLearnedWords === 0
              ? "Öğrenmeye bugün başla!"
              : state.totalLearnedWords < 10
              ? "İyi gidiyorsun, devam et!"
              : state.totalLearnedWords < 50
              ? "Harika ilerliyorsun!"
              : "Gerçek bir dil öğrenicisisin!"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  appName: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
    letterSpacing: -0.5,
  },
  slogan: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.goldLight,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 5,
  },
  streakText: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    color: Colors.gold,
  },
  streakTextZero: {
    color: Colors.textMuted,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
    marginBottom: 12,
  },
  reviewRow: {
    flexDirection: "row",
    gap: 8,
  },
  reviewCard: {
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    position: "relative",
  },
  reviewCardIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewCardCount: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    lineHeight: 26,
  },
  reviewCardLabel: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    color: Colors.textSecondary,
    textAlign: "center",
  },
  reviewCardLabelDisabled: {
    color: Colors.textMuted,
  },
  reviewCardChevron: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  progressCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: Colors.textSecondary,
  },
  progressPct: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    color: Colors.primary,
  },
  progressBarContainer: {
    gap: 6,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: Colors.primaryLight,
    borderRadius: 99,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 99,
  },
  progressBarLabel: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
  },
  goalBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 10,
  },
  goalBadgeText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    color: Colors.success,
  },
  topicsList: {
    gap: 10,
  },
  topicCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  topicHeader: {
    backgroundColor: Colors.primaryLight,
    padding: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  topicBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  topicBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontFamily: "Inter_700Bold",
  },
  topicTitleRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  topicTitleGroup: {
    flex: 1,
    gap: 1,
  },
  topicName: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  topicSubtitle: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    color: Colors.textMuted,
  },
  topicMeta: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
  },
  setsList: {
    padding: 8,
    gap: 2,
  },
  categoriesList: {
    paddingBottom: 6,
  },
  categoryBlock: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  categoryName: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  categoryMeta: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
  },
  subcategoryBlock: {
    marginLeft: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  subcategoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  subcategoryDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    opacity: 0.5,
  },
  subcategoryName: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: Colors.textSecondary,
  },
  subSetsList: {
    paddingLeft: 4,
    gap: 2,
  },
  comingSoonBadge: {
    backgroundColor: Colors.border,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  comingSoonText: {
    fontSize: 10,
    fontFamily: "Inter_500Medium",
    color: Colors.textMuted,
  },
  emptyRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  emptyRowText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textMuted,
    fontStyle: "italic",
  },
  setItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    gap: 12,
    marginVertical: 2,
  },
  setItemCompleted: {
    backgroundColor: Colors.successLight,
  },
  setItemLocked: {
    opacity: 0.5,
  },
  setIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryMed,
    alignItems: "center",
    justifyContent: "center",
  },
  setIconCompleted: {
    backgroundColor: Colors.success,
  },
  setIconLocked: {
    backgroundColor: Colors.borderLight,
  },
  setNumber: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    color: Colors.primary,
  },
  setInfo: {
    flex: 1,
  },
  setName: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  setNameLocked: {
    color: Colors.textMuted,
  },
  setSubtitle: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    marginTop: 1,
  },
  setAction: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  dailyTaskCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1.5,
    borderColor: Colors.primary + "30",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  dailyTaskLeft: {
    flex: 1,
    gap: 4,
  },
  dailyTaskBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 2,
  },
  dailyTaskBadgeText: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    color: Colors.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  dailyTaskTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
    lineHeight: 21,
  },
  dailyTaskMeta: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    marginTop: 2,
  },
  dailyDoneCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.successLight,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.success + "30",
  },
  dailyDoneText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: Colors.success,
    flex: 1,
  },
  motivationCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: Colors.goldLight,
    borderRadius: 14,
    padding: 14,
  },
  motivMascot: {
    width: 36,
    height: 36,
  },
  motivationText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: "#92400E",
  },
});
