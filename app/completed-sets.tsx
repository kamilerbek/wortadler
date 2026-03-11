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
import { useLearning } from "@/context/learning";
import { TOPICS } from "@/data/vocabulary";

export default function CompletedSetsScreen() {
  const insets = useSafeAreaInsets();
  const { state } = useLearning();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const completedSets = useMemo(() => {
    const result: Array<{
      setId: string;
      setName: string;
      topicName: string;
      topicLevel: string;
      cardCount: number;
      correctCount: number;
      dontKnowCount: number;
    }> = [];

    for (const topic of TOPICS) {
      const level = topic.id.startsWith("a1")
        ? "A1"
        : topic.id.startsWith("a2")
        ? "A2"
        : topic.id.startsWith("b1")
        ? "B1"
        : topic.id.startsWith("b2")
        ? "B2"
        : "";

      for (const set of topic.sets) {
        const progress = state.completedSets[set.id];
        if (progress?.completed) {
          result.push({
            setId: set.id,
            setName: set.name,
            topicName: topic.name,
            topicLevel: level,
            cardCount: set.cards.length,
            correctCount: progress.correctCount,
            dontKnowCount: progress.dontKnowCount,
          });
        }
      }
    }
    return result;
  }, [state.completedSets]);

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
        <View style={styles.headerTextArea}>
          <Text style={styles.headerTitle}>Tamamlanan Setler</Text>
          <Text style={styles.headerCount}>{completedSets.length} set tamamlandı</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: bottomPad + 24,
        }}
      >
        {completedSets.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="checkbox-outline" size={56} color={Colors.borderLight} />
            <Text style={styles.emptyTitle}>Henüz set tamamlanmadı</Text>
            <Text style={styles.emptyText}>
              Bir seti tamamladığında burada görünecek.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {completedSets.map((item) => {
              const pct =
                item.cardCount > 0
                  ? Math.round((item.correctCount / item.cardCount) * 100)
                  : 0;

              return (
                <View key={item.setId} style={styles.setCard}>
                  <View style={styles.setCardTop}>
                    <View style={styles.setInfo}>
                      <View style={styles.setNameRow}>
                        <View style={styles.levelPill}>
                          <Text style={styles.levelPillText}>{item.topicLevel}</Text>
                        </View>
                        <Text style={styles.setName}>{item.setName}</Text>
                      </View>
                      <Text style={styles.topicName}>{item.topicName}</Text>
                    </View>
                    <View style={styles.checkCircle}>
                      <Ionicons name="checkmark" size={20} color="#fff" />
                    </View>
                  </View>

                  <View style={styles.statsRow}>
                    <View style={styles.statChip}>
                      <Ionicons name="checkmark-circle-outline" size={14} color={Colors.success} />
                      <Text style={[styles.statChipText, { color: Colors.success }]}>
                        {item.correctCount} doğru
                      </Text>
                    </View>
                    {item.dontKnowCount > 0 && (
                      <View style={styles.statChip}>
                        <Ionicons name="close-circle-outline" size={14} color={Colors.danger} />
                        <Text style={[styles.statChipText, { color: Colors.danger }]}>
                          {item.dontKnowCount} yanlış
                        </Text>
                      </View>
                    )}
                    <View style={styles.statChip}>
                      <Ionicons name="layers-outline" size={14} color={Colors.textMuted} />
                      <Text style={[styles.statChipText, { color: Colors.textMuted }]}>
                        {item.cardCount} kart
                      </Text>
                    </View>
                  </View>

                  <View style={styles.progressSection}>
                    <View style={styles.progressTrack}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${pct}%` as any },
                          pct >= 80 && styles.progressFillGood,
                        ]}
                      />
                    </View>
                    <Text style={styles.progressPct}>%{pct}</Text>
                  </View>

                  <Pressable
                    style={({ pressed }) => [
                      styles.reviewBtn,
                      pressed && { opacity: 0.75 },
                    ]}
                    onPress={() => router.push(`/learn/${item.setId}`)}
                  >
                    <Ionicons name="refresh-outline" size={16} color={Colors.primary} />
                    <Text style={styles.reviewBtnText}>Tekrar et</Text>
                  </Pressable>
                </View>
              );
            })}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTextArea: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
  },
  headerCount: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    marginTop: 1,
  },
  list: {
    gap: 12,
    paddingTop: 4,
  },
  setCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  setCardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  setInfo: {
    flex: 1,
    gap: 3,
  },
  setNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  levelPill: {
    backgroundColor: Colors.primaryMed,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  levelPillText: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    color: Colors.primary,
  },
  setName: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
    flexShrink: 1,
  },
  topicName: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
  },
  checkCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.success,
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.borderLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statChipText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  progressSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.borderLight,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  progressFillGood: {
    backgroundColor: Colors.success,
  },
  progressPct: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    color: Colors.textSecondary,
    minWidth: 32,
    textAlign: "right",
  },
  reviewBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
  },
  reviewBtnText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: Colors.primary,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
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
