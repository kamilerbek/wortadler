import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { useStudyTime, formatStudyTime } from "@/context/study-time";

const DAY_LABELS_TR = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

function StatCard({
  icon,
  label,
  value,
  color,
  subtitle,
}: {
  icon: string;
  label: string;
  value: string;
  color: string;
  subtitle?: string;
}) {
  return (
    <View style={[styles.statCard, { borderTopColor: color }]}>
      <View style={[styles.statIcon, { backgroundColor: color + "18" }]}>
        <Ionicons name={icon as any} size={20} color={color} />
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      {subtitle ? <Text style={styles.statSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function BarChart({
  data,
}: {
  data: Array<{ label: string; seconds: number; isToday: boolean }>;
}) {
  const max = Math.max(...data.map((d) => d.seconds), 60);

  return (
    <View style={styles.chart}>
      {data.map((d, i) => {
        const pct = d.seconds / max;
        const hasData = d.seconds > 0;
        return (
          <View key={i} style={styles.barCol}>
            {hasData && (
              <Text style={styles.barTimeLabel}>
                {formatStudyTime(d.seconds)}
              </Text>
            )}
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  { height: `${Math.max(pct * 100, hasData ? 6 : 3)}%` as any },
                  d.isToday && styles.barFillToday,
                  !hasData && styles.barFillEmpty,
                ]}
              />
            </View>
            <Text style={[styles.barDayLabel, d.isToday && styles.barDayLabelToday]}>
              {d.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default function StudyStatsScreen() {
  const insets = useSafeAreaInsets();
  const { getTodaySeconds, getWeekSeconds, getTotalSeconds, getDaySeconds } =
    useStudyTime();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const todaySec = getTodaySeconds();
  const weekSec = getWeekSeconds();
  const totalSec = getTotalSeconds();

  const weekData = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const daysAgo = 6 - i;
      const d = new Date();
      d.setDate(d.getDate() - daysAgo);
      return {
        label: DAY_LABELS_TR[d.getDay()],
        seconds: getDaySeconds(daysAgo),
        isToday: daysAgo === 0,
      };
    });
  }, [getDaySeconds]);

  const avgDailySec = weekSec > 0 ? Math.round(weekSec / 7) : 0;
  const studiedDaysCount = weekData.filter((d) => d.seconds > 0).length;

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
        <Text style={styles.headerTitle}>Çalışma İstatistikleri</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPad + 32 }}
      >
        <View style={styles.statsRow}>
          <StatCard
            icon="today-outline"
            label="Bugün"
            value={formatStudyTime(todaySec)}
            color={Colors.primary}
          />
          <StatCard
            icon="calendar-outline"
            label="Bu Hafta"
            value={formatStudyTime(weekSec)}
            color={Colors.gold}
          />
          <StatCard
            icon="stats-chart-outline"
            label="Toplam"
            value={formatStudyTime(totalSec)}
            color={Colors.success}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Haftalık Grafik</Text>
          <View style={styles.chartCard}>
            <BarChart data={weekData} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bu Hafta</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="time-outline" size={18} color={Colors.primary} />
              </View>
              <Text style={styles.infoLabel}>Günlük ortalama</Text>
              <Text style={styles.infoValue}>{formatStudyTime(avgDailySec)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="checkmark-circle-outline" size={18} color={Colors.success} />
              </View>
              <Text style={styles.infoLabel}>Çalışılan gün</Text>
              <Text style={styles.infoValue}>{studiedDaysCount} / 7</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="trending-up-outline" size={18} color={Colors.gold} />
              </View>
              <Text style={styles.infoLabel}>Toplam süre</Text>
              <Text style={styles.infoValue}>{formatStudyTime(totalSec)}</Text>
            </View>
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
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    gap: 6,
    borderTopWidth: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
  statLabel: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    textAlign: "center",
  },
  statSubtitle: {
    fontSize: 10,
    fontFamily: "Inter_400Regular",
    color: Colors.textMuted,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  chartCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 140,
    gap: 6,
  },
  barCol: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
    gap: 4,
  },
  barTimeLabel: {
    fontSize: 8,
    fontFamily: "Inter_500Medium",
    color: Colors.textMuted,
    textAlign: "center",
  },
  barTrack: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  barFill: {
    width: "100%",
    borderRadius: 4,
    backgroundColor: Colors.primaryMed,
    minHeight: 4,
  },
  barFillToday: {
    backgroundColor: Colors.primary,
  },
  barFillEmpty: {
    backgroundColor: Colors.borderLight,
    height: 4,
    minHeight: 4,
  },
  barDayLabel: {
    fontSize: 10,
    fontFamily: "Inter_400Regular",
    color: Colors.textMuted,
    textAlign: "center",
  },
  barDayLabelToday: {
    color: Colors.primary,
    fontFamily: "Inter_600SemiBold",
  },
  infoCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  infoLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 16,
  },
});
