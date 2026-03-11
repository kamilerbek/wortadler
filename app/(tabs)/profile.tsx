import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { getApiUrl } from "@/lib/query-client";
import { Colors } from "@/constants/colors";
import { useLearning } from "@/context/learning";
import { useStudyTime, formatStudyTime } from "@/context/study-time";
import { TOPICS } from "@/data/vocabulary";

const DAILY_GOAL = 10;

function StatMini({
  icon,
  value,
  label,
  color,
  onPress,
}: {
  icon: string;
  value: string;
  label: string;
  color: string;
  onPress?: () => void;
}) {
  const inner = (
    <View style={[styles.statMini, { borderTopColor: color }]}>
      <Ionicons name={icon as any} size={18} color={color} />
      <Text style={[styles.statMiniValue, { color }]}>{value}</Text>
      <Text style={styles.statMiniLabel}>{label}</Text>
      {onPress && (
        <Ionicons name="chevron-forward" size={10} color={color} style={{ opacity: 0.5 }} />
      )}
    </View>
  );
  if (onPress) {
    return (
      <Pressable
        style={{ flex: 1 }}
        onPress={onPress}
        android_ripple={{ color: color + "20" }}
      >
        {inner}
      </Pressable>
    );
  }
  return <View style={{ flex: 1 }}>{inner}</View>;
}

function AchievementBadge({
  icon,
  label,
  earned,
}: {
  icon: string;
  label: string;
  earned: boolean;
}) {
  return (
    <View style={[styles.achievementBadge, !earned && styles.achievementBadgeLocked]}>
      <View style={[styles.achievementIcon, earned && styles.achievementIconEarned]}>
        <Ionicons
          name={icon as any}
          size={26}
          color={earned ? Colors.gold : Colors.textMuted}
        />
      </View>
      <Text style={[styles.achievementLabel, !earned && styles.achievementLabelLocked]}>
        {label}
      </Text>
      {!earned && (
        <Ionicons name="lock-closed" size={10} color={Colors.textMuted} style={styles.lockIcon} />
      )}
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
  onPress,
}: {
  icon: string;
  label: string;
  value: string;
  onPress?: () => void;
}) {
  const inner = (
    <View style={styles.infoRow}>
      <View style={styles.infoRowIcon}>
        <Ionicons name={icon as any} size={18} color={Colors.primary} />
      </View>
      <Text style={styles.infoRowLabel}>{label}</Text>
      <Text style={styles.infoRowValue}>{value}</Text>
      {onPress && (
        <Ionicons name="chevron-forward" size={15} color={Colors.textMuted} style={{ marginLeft: 2 }} />
      )}
    </View>
  );
  if (onPress) {
    return (
      <Pressable onPress={onPress} android_ripple={{ color: Colors.primaryLight }}>
        {inner}
      </Pressable>
    );
  }
  return inner;
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const mascotUrl = useMemo(() => new URL("/worti.png", getApiUrl()).toString(), []);
  const { state, getTodayProgress } = useLearning();
  const { getTodaySeconds, getWeekSeconds, getTotalSeconds } = useStudyTime();
  const todayProgress = getTodayProgress();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : 0;

  const setsCompleted = Object.values(state.completedSets).filter((s) => s.completed).length;
  const totalSets = TOPICS.flatMap((t) => t.sets).filter((s) => s.cards.length > 0).length;
  const topicsCompleted = setsCompleted >= totalSets ? 1 : 0;

  const achievements = [
    { icon: "star-outline", label: "İlk kelime", earned: state.totalLearnedWords >= 1 },
    { icon: "flame-outline", label: "3 gün seri", earned: state.dailyStreak >= 3 },
    { icon: "trophy-outline", label: "50 kelime", earned: state.totalLearnedWords >= 50 },
    { icon: "ribbon-outline", label: "100 kelime", earned: state.totalLearnedWords >= 100 },
    { icon: "school-outline", label: "Set ustası", earned: setsCompleted >= 1 },
    { icon: "medal-outline", label: "A1 tamamlandı", earned: topicsCompleted >= 1 },
  ];

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: bottomPad + 100 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Profil</Text>
        </View>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Image source={{ uri: mascotUrl }} style={styles.avatarMascot} resizeMode="contain" />
          </View>
          <Text style={styles.username}>Öğrenci</Text>
          <View style={styles.levelPill}>
            <Text style={styles.levelPillText}>A1 Seviyesi</Text>
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <StatMini
            icon="book-outline"
            value={`${state.totalLearnedWords}`}
            label="kelime"
            color={Colors.primary}
            onPress={() => router.push("/learned-words")}
          />
          <StatMini
            icon="flame-outline"
            value={`${state.dailyStreak}`}
            label="gün seri"
            color={Colors.gold}
            onPress={() => router.push("/streak-journey")}
          />
          <StatMini
            icon="today-outline"
            value={`${todayProgress}/${DAILY_GOAL}`}
            label="bugün"
            color={Colors.success}
          />
        </View>

        {/* Info */}
        <View style={styles.section}>
          <View style={styles.card}>
            <InfoRow
              icon="book-outline"
              label="Öğrenilen kelime"
              value={`${state.totalLearnedWords}`}
              onPress={() => router.push("/learned-words")}
            />
            <View style={styles.divider} />
            <InfoRow
              icon="flame-outline"
              label="Günlük seri"
              value={`${state.dailyStreak} gün`}
              onPress={() => router.push("/streak-journey")}
            />
            <View style={styles.divider} />
            <InfoRow
              icon="checkbox-outline"
              label="Tamamlanan set"
              value={`${setsCompleted}/${totalSets}`}
            />
            <View style={styles.divider} />
            <InfoRow
              icon="calendar-outline"
              label="Son çalışma"
              value={state.lastStudiedDate ?? "Henüz yok"}
            />
          </View>
        </View>

        {/* Study Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Çalışma Süresi</Text>
          <View style={styles.card}>
            <InfoRow
              icon="time-outline"
              label="Bugün"
              value={formatStudyTime(getTodaySeconds())}
              onPress={() => router.push("/study-stats")}
            />
            <View style={styles.divider} />
            <InfoRow
              icon="calendar-outline"
              label="Bu hafta"
              value={formatStudyTime(getWeekSeconds())}
              onPress={() => router.push("/study-stats")}
            />
            <View style={styles.divider} />
            <InfoRow
              icon="stats-chart-outline"
              label="Toplam"
              value={formatStudyTime(getTotalSeconds())}
              onPress={() => router.push("/study-stats")}
            />
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rozetler</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((a) => (
              <AchievementBadge
                key={a.label}
                icon={a.icon}
                label={a.label}
                earned={a.earned}
              />
            ))}
          </View>
        </View>

        {/* Worti message */}
        <View style={styles.wortiCard}>
          <Image source={{ uri: mascotUrl }} style={styles.wortiMascot} resizeMode="contain" />
          <View style={styles.wortiTextArea}>
            <Text style={styles.wortiTitle}>Worti diyor ki:</Text>
            <Text style={styles.wortiMessage}>
              {state.totalLearnedWords === 0
                ? "Merhaba! Hadi ilk kelimeleri öğrenelim."
                : state.dailyStreak >= 3
                ? `${state.dailyStreak} günlük seri! Harika gidiyorsun!`
                : "Her gün biraz çalış, büyük fark yaratır!"}
            </Text>
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
    letterSpacing: -0.5,
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 24,
    gap: 8,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: Colors.primaryMed,
    overflow: "hidden",
  },
  avatarMascot: {
    width: 80,
    height: 80,
  },
  username: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
  },
  levelPill: {
    backgroundColor: Colors.primaryMed,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },
  levelPillText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    color: Colors.primary,
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginTop: 4,
    marginBottom: 4,
  },
  statMini: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    gap: 4,
    borderTopWidth: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  statMiniValue: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  statMiniLabel: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
    marginBottom: 12,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  infoRowIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  infoRowLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
  },
  infoRowValue: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  achievementBadge: {
    width: "30%",
    flexGrow: 1,
    backgroundColor: Colors.goldLight,
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    gap: 6,
    position: "relative",
  },
  achievementBadgeLocked: {
    backgroundColor: Colors.borderLight,
    opacity: 0.7,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  achievementIconEarned: {
    backgroundColor: Colors.goldLight,
  },
  achievementLabel: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    color: "#92400E",
    textAlign: "center",
  },
  achievementLabelLocked: {
    color: Colors.textMuted,
  },
  lockIcon: {
    position: "absolute",
    top: 6,
    right: 8,
  },
  wortiCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: Colors.primaryLight,
    borderRadius: 16,
    padding: 16,
  },
  wortiMascot: {
    width: 40,
    height: 40,
  },
  wortiTextArea: {
    flex: 1,
    gap: 3,
  },
  wortiTitle: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    color: Colors.primary,
  },
  wortiMessage: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.text,
    lineHeight: 20,
  },
});
