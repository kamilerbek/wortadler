import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import { Colors } from "@/constants/colors";
import { useLearning } from "@/context/learning";
import { DailyTaskStore } from "@/lib/daily-task-store";

export default function DailyTaskScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;
  const { getDailyTaskCards } = useLearning();

  useFocusEffect(
    useCallback(() => {
      const cards = getDailyTaskCards();
      DailyTaskStore.setCards(cards);
    }, [])
  );

  function handleStart() {
    router.replace("/daily-learn");
  }

  return (
    <View style={[styles.container, { paddingTop: topPad, paddingBottom: bottomPad }]}>
      <View style={styles.content}>
        <Image
          source={require("@/assets/images/worti.png")}
          style={styles.mascot}
          resizeMode="contain"
        />

        <Text style={styles.title}>WortAdler</Text>
        <Text style={styles.subtitle}>Bugünün görevi hazır</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>10</Text>
            <Text style={styles.infoLabel}>kelime</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>≈ 3</Text>
            <Text style={styles.infoLabel}>dakika</Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [styles.startBtn, pressed && styles.startBtnPressed]}
          onPress={handleStart}
          testID="btn-start-daily"
        >
          <Text style={styles.startBtnText}>Başla</Text>
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
  mascot: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: Colors.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 17,
    fontFamily: "Inter_500Medium",
    color: Colors.textSecondary,
    marginBottom: 32,
    textAlign: "center",
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 40,
    gap: 32,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  infoItem: {
    alignItems: "center",
    gap: 4,
  },
  infoNumber: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
  },
  infoLabel: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
  },
  infoDivider: {
    width: 1,
    backgroundColor: Colors.border,
    alignSelf: "stretch",
  },
  startBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 64,
    alignItems: "center",
  },
  startBtnPressed: {
    opacity: 0.85,
  },
  startBtnText: {
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
  },
});
