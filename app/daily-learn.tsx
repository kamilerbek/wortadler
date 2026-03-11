import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/colors";
import { POSITIVE_MESSAGES, getWordType } from "@/data/vocabulary";
import { useLearning } from "@/context/learning";
import { useStudyTime } from "@/context/study-time";
import {
  VocabCardView,
  ActionButton,
  SwipeAction,
} from "@/components/VocabCard";
import { DailyTaskStore } from "@/lib/daily-task-store";
import type { VocabCard } from "@/data/vocabulary";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DailyLearnScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;
  const [cardAreaHeight, setCardAreaHeight] = useState(0);
  const cardHeight = cardAreaHeight > 0 ? cardAreaHeight - 12 : SCREEN_HEIGHT * 0.58;

  const { getWordMastery, getWordLastResult } = useLearning();
  const { startSession, stopSession } = useStudyTime();

  useFocusEffect(
    useCallback(() => {
      startSession();
      return () => stopSession();
    }, [])
  );

  const deck: VocabCard[] = DailyTaskStore.getCards();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardKey, setCardKey] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; type: SwipeAction } | null>(null);
  const feedbackOpacity = useRef(new Animated.Value(0)).current;
  const finalResultsRef = useRef<Record<string, "correct" | "dontKnow">>({});
  const navigatedRef = useRef(false);

  const currentCard = deck[currentIndex] ?? null;
  const total = deck.length;
  const progressPct = total > 0 ? currentIndex / total : 0;
  const currentMastery = currentCard ? getWordMastery(currentCard.id) : 0;

  function showFeedback(text: string, type: SwipeAction) {
    setFeedback({ text, type });
    feedbackOpacity.setValue(0);
    Animated.sequence([
      Animated.timing(feedbackOpacity, { toValue: 1, duration: 120, useNativeDriver: true }),
      Animated.timing(feedbackOpacity, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start(() => setFeedback(null));
  }

  function navigateToComplete() {
    if (navigatedRef.current) return;
    navigatedRef.current = true;

    const correctCards = deck.filter((c) => finalResultsRef.current[c.id] === "correct");
    const dontKnowCards = deck.filter((c) => finalResultsRef.current[c.id] === "dontKnow");

    DailyTaskStore.setResults(
      correctCards.map((c) => c.id),
      dontKnowCards.map((c) => c.id)
    );

    setTimeout(() => {
      router.replace("/daily-complete");
    }, 400);
  }

  const handleAction = useCallback(
    (action: SwipeAction) => {
      if (!currentCard || !action) return;

      if (Platform.OS !== "web") {
        Haptics.impactAsync(
          action === "right"
            ? Haptics.ImpactFeedbackStyle.Medium
            : Haptics.ImpactFeedbackStyle.Light
        ).catch(() => {});
      }

      setCardKey((k) => k + 1);

      finalResultsRef.current[currentCard.id] =
        action === "right" ? "correct" : "dontKnow";

      if (action === "right") {
        showFeedback(
          POSITIVE_MESSAGES[Math.floor(Math.random() * POSITIVE_MESSAGES.length)],
          "right"
        );
      } else {
        showFeedback("Sonra tekrar bakacağız!", "left");
      }

      const nextIndex = currentIndex + 1;
      if (nextIndex >= deck.length) {
        navigateToComplete();
      }
      setCurrentIndex(nextIndex);
    },
    [currentCard, currentIndex]
  );

  const getFeedbackColor = () => {
    if (!feedback || feedback.type === "right") return Colors.success;
    return Colors.danger;
  };

  if (deck.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: topPad }]}>
        <Text style={{ color: Colors.danger, textAlign: "center", margin: 20 }}>
          Görev kartları yüklenemedi.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <View style={styles.headerMid}>
          <Text style={styles.headerTitle}>Günlük Görev</Text>
        </View>
        <View style={styles.counterPill}>
          <Text style={styles.counterText}>
            {Math.min(currentIndex + 1, total)}/{total}
          </Text>
        </View>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progressPct * 100}%` as any }]} />
      </View>

      <View
        style={styles.cardArea}
        onLayout={(e) => setCardAreaHeight(e.nativeEvent.layout.height)}
      >
        {currentCard ? (
          <VocabCardView
            key={`card-${currentCard.id}-${cardKey}`}
            card={currentCard}
            onAction={handleAction}
            cardHeight={cardHeight}
            wordType={getWordType(currentCard)}
            mastery={currentMastery}
            lastResult={getWordLastResult(currentCard.id)}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="checkmark-circle" size={64} color={Colors.success} />
            <Text style={styles.emptyText}>Tamamlandı!</Text>
          </View>
        )}

        {feedback && (
          <Animated.View
            style={[
              styles.feedbackToast,
              { backgroundColor: getFeedbackColor(), opacity: feedbackOpacity },
            ]}
            pointerEvents="none"
          >
            <Text style={styles.feedbackText}>{feedback.text}</Text>
          </Animated.View>
        )}
      </View>

      <View style={styles.swipeHints}>
        <View style={styles.swipeHint}>
          <Ionicons name="arrow-back" size={13} color={Colors.danger} />
          <Text style={[styles.swipeHintText, { color: Colors.danger }]}>Bilmiyorum</Text>
        </View>
        <View style={styles.swipeHint}>
          <Ionicons name="arrow-forward" size={13} color={Colors.success} />
          <Text style={[styles.swipeHintText, { color: Colors.success }]}>Biliyorum</Text>
        </View>
      </View>

      <View style={[styles.actionRow, { paddingBottom: bottomPad + 16 }]}>
        <ActionButton
          testID="btn-bilmiyorum"
          icon="close-circle"
          label="Bilmiyorum"
          color={Colors.danger}
          bg="#FEE2E2"
          onPress={() => handleAction("left")}
        />
        <ActionButton
          testID="btn-biliyorum"
          icon="checkmark-circle"
          label="Biliyorum"
          color={Colors.success}
          bg="#D1FAE5"
          onPress={() => handleAction("right")}
        />
      </View>
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
    paddingVertical: 8,
    gap: 10,
  },
  headerLeft: {
    width: 38,
  },
  headerMid: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
    letterSpacing: 0.2,
  },
  counterPill: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 52,
    alignItems: "center",
  },
  counterText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    color: Colors.primary,
  },
  progressBar: {
    height: 3,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 16,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  cardArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    gap: 12,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  feedbackToast: {
    position: "absolute",
    top: 16,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    zIndex: 99,
  },
  feedbackText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
  },
  swipeHints: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    paddingBottom: 6,
  },
  swipeHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  swipeHintText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 4,
  },
});
