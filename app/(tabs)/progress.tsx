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
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getApiUrl } from "@/lib/query-client";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "@/constants/colors";
import { useLearning } from "@/context/learning";

const MILESTONES = [
  { count: 10, label: "İlk adım!", icon: "star-outline" as const },
  { count: 50, label: "Kelime toplayıcı", icon: "trophy-outline" as const },
  { count: 100, label: "Yüzler kulübü", icon: "ribbon-outline" as const },
  { count: 250, label: "Dil ustası", icon: "flame-outline" as const },
];

function MilestoneItem({ milestone, earned, current }: { milestone: typeof MILESTONES[0]; earned: boolean; current: number }) {
  const progress = Math.min(current / milestone.count, 1);
  const width = useSharedValue(0);

  React.useEffect(() => {
    width.value = withTiming(progress, { duration: 900 });
  }, [progress]);

  const barStyle = useAnimatedStyle(() => ({
    width: `${width.value * 100}%` as any,
  }));

  return (
    <View style={[styles.milestoneItem, earned && styles.milestoneEarned]}>
      <View style={[styles.milestoneIcon, earned && styles.milestoneIconEarned]}>
        <Ionicons
          name={milestone.icon}
          size={22}
          color={earned ? "#fff" : Colors.textMuted}
        />
      </View>
      <View style={styles.milestoneInfo}>
        <View style={styles.milestoneRow}>
          <Text style={[styles.milestoneLabel, earned && styles.milestoneLabelEarned]}>
            {milestone.label}
          </Text>
          <Text style={styles.milestoneCount}>
            {Math.min(current, milestone.count)}/{milestone.count}
          </Text>
        </View>
        <View style={styles.milestoneTrack}>
          <Animated.View
            style={[
              styles.milestoneFill,
              earned && styles.milestoneFillEarned,
              barStyle,
            ]}
          />
        </View>
      </View>
    </View>
  );
}

function StatsGrid({ total, streak, setsCompleted }: { total: number; streak: number; setsCompleted: number }) {
  const items = [
    { icon: "book" as const, value: total, label: "Öğrenilen kelime", color: Colors.primary, onPress: () => router.push("/learned-words") },
    { icon: "flame" as const, value: streak, label: "Günlük seri", color: Colors.gold, onPress: () => router.push("/streak-journey") },
    { icon: "checkbox" as const, value: setsCompleted, label: "Tamamlanan set", color: Colors.success, onPress: () => router.push("/completed-sets") },
    { icon: "time" as const, value: `${Math.round(total * 0.3)} dk`, label: "Tahmini süre", color: Colors.textSecondary, onPress: undefined },
  ];

  return (
    <View style={styles.statsGrid}>
      {items.map((item) => {
        const content = (
          <View style={styles.statsGridItem}>
            <View style={[styles.statsGridIcon, { backgroundColor: item.color + "20" }]}>
              <Ionicons name={item.icon} size={20} color={item.color} />
            </View>
            <Text style={[styles.statsGridValue, { color: item.color }]}>{item.value}</Text>
            <Text style={styles.statsGridLabel}>{item.label}</Text>
            {item.onPress && (
              <Ionicons name="chevron-forward" size={12} color={item.color} style={{ opacity: 0.5, position: "absolute", top: 10, right: 10 }} />
            )}
          </View>
        );
        if (item.onPress) {
          return (
            <Pressable key={item.label} style={{ width: "47.5%" }} onPress={item.onPress}>
              {content}
            </Pressable>
          );
        }
        return <View key={item.label} style={{ width: "47.5%" }}>{content}</View>;
      })}
    </View>
  );
}

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const mascotUrl = useMemo(() => new URL("/worti.png", getApiUrl()).toString(), []);
  const { state } = useLearning();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : 0;

  const setsCompleted = Object.values(state.completedSets).filter((s) => s.completed).length;

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: bottomPad + 100 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>İlerleme</Text>
          <Text style={styles.subtitle}>Öğrenme yolculuğun</Text>
        </View>

        {/* Level card */}
        <View style={styles.levelCard}>
          <View style={styles.levelLeft}>
            <Image source={{ uri: mascotUrl }} style={styles.mascotSmall} resizeMode="contain" />
            <View>
              <Text style={styles.levelName}>Başlangıç</Text>
              <Text style={styles.levelSub}>A1 seviyesi</Text>
            </View>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>A1</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genel İstatistikler</Text>
          <StatsGrid
            total={state.totalLearnedWords}
            streak={state.dailyStreak}
            setsCompleted={setsCompleted}
          />
        </View>

        {/* Milestones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hedefler</Text>
          <View style={styles.milestonesList}>
            {MILESTONES.map((m) => (
              <MilestoneItem
                key={m.count}
                milestone={m}
                earned={state.totalLearnedWords >= m.count}
                current={state.totalLearnedWords}
              />
            ))}
          </View>
        </View>

        {/* Encouragement */}
        {state.totalLearnedWords === 0 && (
          <View style={styles.emptyState}>
            <Image source={{ uri: mascotUrl }} style={styles.mascotMedium} resizeMode="contain" />
            <Text style={styles.emptyTitle}>Öğrenmeye başla!</Text>
            <Text style={styles.emptyText}>
              İlk setini tamamladığında ilerleme burada görünecek.
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
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    marginTop: 2,
  },
  levelCard: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: Colors.primaryLight,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  levelLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  mascotSmall: {
    width: 44,
    height: 44,
  },
  mascotMedium: {
    width: 64,
    height: 64,
  },
  levelName: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  levelSub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    marginTop: 1,
  },
  levelBadge: {
    backgroundColor: Colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  levelBadgeText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Inter_700Bold",
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
    marginBottom: 14,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statsGridItem: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  statsGridIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  statsGridValue: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  statsGridLabel: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
  },
  milestonesList: {
    gap: 10,
  },
  milestoneItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  milestoneEarned: {
    backgroundColor: Colors.goldLight,
  },
  milestoneIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.borderLight,
    alignItems: "center",
    justifyContent: "center",
  },
  milestoneIconEarned: {
    backgroundColor: Colors.gold,
  },
  milestoneInfo: {
    flex: 1,
    gap: 6,
  },
  milestoneRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  milestoneLabel: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: Colors.textSecondary,
  },
  milestoneLabelEarned: {
    color: "#92400E",
    fontFamily: "Inter_600SemiBold",
  },
  milestoneCount: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textMuted,
  },
  milestoneTrack: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 99,
    overflow: "hidden",
  },
  milestoneFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 99,
  },
  milestoneFillEarned: {
    backgroundColor: Colors.gold,
  },
  emptyState: {
    alignItems: "center",
    padding: 40,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
