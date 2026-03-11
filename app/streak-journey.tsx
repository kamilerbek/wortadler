import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { useLearning } from "@/context/learning";

const TOTAL_DAYS = 30;
const COLS = 5;
const MILESTONES = [7, 14, 30];

function getNextMilestone(streak: number): number | null {
  for (const m of MILESTONES) {
    if (streak < m) return m;
  }
  return null;
}

function DayCircle({
  day,
  status,
  size,
}: {
  day: number;
  status: "past" | "current" | "future";
  size: number;
}) {
  const bgColor =
    status === "past" ? Colors.success : status === "current" ? Colors.primary : "#E5E7EB";
  const textColor = status === "future" ? "#9CA3AF" : "#FFFFFF";
  const isCurrentRing = status === "current";

  return (
    <View
      style={[
        styles.dayCircle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bgColor,
        },
        isCurrentRing && styles.dayCircleCurrent,
      ]}
    >
      <Text style={[styles.dayNumber, { color: textColor, fontSize: size * 0.33 }]}>
        {day}
      </Text>
    </View>
  );
}

function MilestonePill({
  days,
  emoji,
  reached,
}: {
  days: number;
  emoji: string;
  reached: boolean;
}) {
  return (
    <View style={[styles.milestonePill, reached && styles.milestonePillReached]}>
      <Text style={styles.milestoneEmoji}>{emoji}</Text>
      <Text style={[styles.milestoneText, reached && styles.milestoneTextReached]}>
        {days} gün
      </Text>
      {reached && (
        <Ionicons name="checkmark-circle" size={14} color={Colors.success} style={{ marginLeft: 2 }} />
      )}
    </View>
  );
}

export default function StreakJourneyScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { state } = useLearning();
  const streak = state.dailyStreak;

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const GRID_H_PAD = 24;
  const GAP = 8;
  const circleSize = Math.floor((width - GRID_H_PAD * 2 - GAP * (COLS - 1)) / COLS);

  const nextMilestone = getNextMilestone(streak);
  const remaining = nextMilestone !== null ? nextMilestone - streak : 0;

  const days = useMemo(
    () =>
      Array.from({ length: TOTAL_DAYS }, (_, i) => {
        const day = i + 1;
        const status: "past" | "current" | "future" =
          day < streak ? "past" : day === streak ? "current" : "future";
        return { day, status };
      }),
    [streak]
  );

  const rows = useMemo(() => {
    const result: (typeof days)[] = [];
    for (let i = 0; i < days.length; i += COLS) {
      result.push(days.slice(i, i + COLS));
    }
    return result;
  }, [days]);

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <Pressable
          style={styles.backBtn}
          onPress={() => router.back()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Seri Yolculuğu</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPad + 32 }}
      >
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>🔥</Text>
          <Text style={styles.heroStreak}>
            {streak} gün seri
          </Text>
          <Text style={styles.heroSubtitle}>30 günlük seri hedefi</Text>
        </View>

        <View style={[styles.gridContainer, { paddingHorizontal: GRID_H_PAD }]}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={[styles.gridRow, { gap: GAP }]}>
              {row.map(({ day, status }) => (
                <DayCircle key={day} day={day} status={status} size={circleSize} />
              ))}
            </View>
          ))}
        </View>

        {nextMilestone !== null && (
          <View style={styles.nextSection}>
            <View style={styles.nextCard}>
              <View style={styles.nextRow}>
                <Ionicons name="flag-outline" size={18} color={Colors.primary} />
                <Text style={styles.nextLabel}>Sonraki hedef:</Text>
                <Text style={styles.nextValue}>{nextMilestone} gün</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.nextRow}>
                <Ionicons name="time-outline" size={18} color={Colors.gold} />
                <Text style={styles.nextLabel}>Kalan:</Text>
                <Text style={[styles.nextValue, { color: Colors.gold }]}>{remaining} gün</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${Math.min(100, (streak / nextMilestone) * 100)}%`,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        )}

        <View style={styles.milestonesSection}>
          <Text style={styles.sectionTitle}>Hedefler</Text>
          <View style={styles.milestonesRow}>
            <MilestonePill days={7} emoji="🎁" reached={streak >= 7} />
            <MilestonePill days={14} emoji="🎁" reached={streak >= 14} />
            <MilestonePill days={30} emoji="🏆" reached={streak >= 30} />
          </View>
        </View>

        {streak === 0 && (
          <View style={styles.motivationCard}>
            <Text style={styles.motivationText}>
              Her büyük seri tek bir günle başlar. Bugün ilk adımı at! 💪
            </Text>
          </View>
        )}
        {streak > 0 && streak < 7 && (
          <View style={styles.motivationCard}>
            <Text style={styles.motivationText}>
              Harika başlangıç! 7 gün serine {7 - streak} gün kaldı. Devam et! 🚀
            </Text>
          </View>
        )}
        {streak >= 7 && streak < 14 && (
          <View style={styles.motivationCard}>
            <Text style={styles.motivationText}>
              {streak} günlük seri! Muhteşem! 14 gün serine az kaldı! ⭐
            </Text>
          </View>
        )}
        {streak >= 14 && (
          <View style={styles.motivationCard}>
            <Text style={styles.motivationText}>
              {streak} günlük seri! Sen bir şampiyon! 🏆
            </Text>
          </View>
        )}
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
  },
  heroSection: {
    alignItems: "center",
    paddingVertical: 24,
    gap: 6,
  },
  heroEmoji: {
    fontSize: 48,
  },
  heroStreak: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
  },
  gridContainer: {
    gap: 8,
    marginBottom: 24,
  },
  gridRow: {
    flexDirection: "row",
  },
  dayCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
  dayCircleCurrent: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  dayNumber: {
    fontFamily: "Inter_700Bold",
  },
  nextSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  nextCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    gap: 12,
  },
  nextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  nextLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
  },
  nextValue: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: Colors.borderLight,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  milestonesSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  milestonesRow: {
    flexDirection: "row",
    gap: 10,
  },
  milestonePill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.borderLight,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 4,
  },
  milestonePillReached: {
    backgroundColor: "#DCFCE7",
  },
  milestoneEmoji: {
    fontSize: 16,
  },
  milestoneText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: Colors.textMuted,
  },
  milestoneTextReached: {
    color: "#166534",
  },
  motivationCard: {
    marginHorizontal: 24,
    backgroundColor: Colors.primaryLight,
    borderRadius: 16,
    padding: 16,
  },
  motivationText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.primary,
    textAlign: "center",
    lineHeight: 22,
  },
});
