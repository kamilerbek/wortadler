import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { useLearning } from "@/context/learning";
import { DailyTaskStore } from "@/lib/daily-task-store";

export default function DailyCompleteScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;
  const { completeDailyTask, state } = useLearning();
  const completedRef = useRef(false);

  const correctIds = DailyTaskStore.getCorrectIds();
  const dontKnowIds = DailyTaskStore.getDontKnowIds();
  const learnedCount = correctIds.length;
  const reviewCount = dontKnowIds.length;

  useEffect(() => {
    if (!completedRef.current) {
      completedRef.current = true;
      completeDailyTask(correctIds, dontKnowIds);
    }
  }, []);

  function handleContinue() {
    router.replace("/(tabs)");
  }

  return (
    <View style={[styles.container, { paddingTop: topPad, paddingBottom: bottomPad }]}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="checkmark-circle" size={72} color={Colors.success} />
        </View>

        <Text style={styles.title}>Tagesaufgabe erledigt!</Text>

        {/* Streak banner */}
        <View style={styles.streakBanner}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakLabel}>
            Deine Serie:{" "}
            <Text style={styles.streakValue}>
              {state.dailyStreak} {state.dailyStreak === 1 ? "Tag" : "Tage"}
            </Text>
          </Text>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <View style={[styles.statDot, { backgroundColor: Colors.success }]} />
            <Text style={styles.statText}>
              <Text style={styles.statNumber}>{learnedCount}</Text>
              {" Wörter gelernt"}
            </Text>
          </View>

          {reviewCount > 0 && (
            <View style={styles.statRow}>
              <View style={[styles.statDot, { backgroundColor: Colors.warning }]} />
              <Text style={styles.statText}>
                <Text style={styles.statNumber}>{reviewCount}</Text>
                {" Wörter morgen wiederholen"}
              </Text>
            </View>
          )}

          {reviewCount === 0 && (
            <View style={styles.statRow}>
              <View style={[styles.statDot, { backgroundColor: Colors.primary }]} />
              <Text style={styles.statText}>Alle Wörter perfekt gemeistert!</Text>
            </View>
          )}
        </View>

        <Pressable
          style={({ pressed }) => [styles.continueBtn, pressed && styles.continueBtnPressed]}
          onPress={handleContinue}
          testID="btn-devam-et"
        >
          <Text style={styles.continueBtnText}>Devam Et</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 32,
    gap: 0,
  },
  iconWrap: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
    marginBottom: 16,
    textAlign: "center",
  },
  streakBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.goldLight,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 24,
  },
  streakEmoji: {
    fontSize: 22,
  },
  streakLabel: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: Colors.text,
  },
  streakValue: {
    fontFamily: "Inter_700Bold",
    color: Colors.gold,
  },
  statsCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 28,
    gap: 16,
    width: "100%",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statText: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: Colors.text,
  },
  statNumber: {
    fontFamily: "Inter_700Bold",
    color: Colors.text,
  },
  continueBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 64,
    alignItems: "center",
  },
  continueBtnPressed: {
    opacity: 0.85,
  },
  continueBtnText: {
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
  },
});
