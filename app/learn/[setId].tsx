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
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/colors";
import { TOPICS, POSITIVE_MESSAGES, getWordType } from "@/data/vocabulary";
import { useLearning } from "@/context/learning";
import { useStudyTime } from "@/context/study-time";
import {
  VocabCardView,
  ActionButton,
  SwipeAction,
} from "@/components/VocabCard";
import type { VocabCard } from "@/data/vocabulary";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function LearnScreen() {
  const { setId, reviewIds } = useLocalSearchParams<{ setId: string; reviewIds?: string }>();
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

  const topic = TOPICS.find((t) => t.sets.some((s) => s.id === setId)) ?? TOPICS[0];
  const set = topic.sets.find((s) => s.id === setId);
  const isReviewMode = !!reviewIds;

  const initialDeck: VocabCard[] = (() => {
    if (!set) return [];
    if (reviewIds) {
      const ids = reviewIds.split(",").filter(Boolean);
      return ids.map((id) => set.cards.find((c) => c.id === id)).filter(Boolean) as VocabCard[];
    }
    return set.cards;
  })();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardKey, setCardKey] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; type: SwipeAction } | null>(null);
  const feedbackOpacity = useRef(new Animated.Value(0)).current;
  const finalResultsRef = useRef<Record<string, "correct" | "dontKnow">>({});

  const currentCard = initialDeck[currentIndex] ?? null;
  const total = initialDeck.length;
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
    const correctCards = initialDeck.filter(
      (c) => finalResultsRef.current[c.id] === "correct"
    );
    const dontKnowCards = initialDeck.filter(
      (c) => finalResultsRef.current[c.id] === "dontKnow"
    );

    setTimeout(() => {
      router.replace({
        pathname: "/set-complete",
        params: {
          setId: setId ?? "",
          correct: String(correctCards.length),
          dontKnow: String(dontKnowCards.length),
          correctIds: correctCards.map((c) => c.id).join(","),
          dontKnowIds: dontKnowCards.map((c) => c.id).join(","),
          isReview: isReviewMode ? "1" : "0",
        },
      });
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
      if (nextIndex >= initialDeck.length) {
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

  if (!set) {
    return (
      <View style={[styles.container, { paddingTop: topPad }]}>
        <Text style={{ color: Colors.danger, textAlign: "center", margin: 20 }}>
          Set bulunamadı.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.closeBtn}>
          <Ionicons name="close" size={22} color={Colors.text} />
        </Pressable>
        <View style={styles.headerMid}>
          <Text style={styles.headerTitle}>
            {isReviewMode ? "Tekrar" : `${topic.name} · ${set.name}`}
          </Text>
        </View>
        <View style={styles.counterPill}>
          <Text style={styles.counterText}>
            {Math.min(currentIndex + 1, total > 0 ? total : 1)}/{total > 0 ? total : 1}
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progressPct * 100}%` as any }]} />
      </View>

      {/* Card area */}
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

      {/* Swipe hints */}
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

      {/* Action buttons */}
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
  closeBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.borderLight,
    alignItems: "center",
    justifyContent: "center",
  },
  headerMid: { flex: 1, alignItems: "center" },
  headerTitle: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    color: Colors.textSecondary,
  },
  counterPill: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  counterText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: Colors.primary,
  },
  progressBar: {
    height: 5,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 16,
    borderRadius: 99,
    overflow: "hidden",
    marginBottom: 4,
  },
  progressFill: {
    height: "100%" as any,
    backgroundColor: Colors.primary,
    borderRadius: 99,
  },
  cardArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    gap: 12,
  },
  emptyText: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  feedbackToast: {
    position: "absolute",
    top: 16,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  feedbackText: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    color: "#fff",
    letterSpacing: 0.3,
  },
  swipeHints: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 32,
    paddingVertical: 8,
  },
  swipeHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  swipeHintText: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
  },
  actionRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    paddingTop: 4,
  },
});
