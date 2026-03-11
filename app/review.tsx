import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  Image,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { Colors } from "@/constants/colors";
import { POSITIVE_MESSAGES, getCardsByIds, getWordType } from "@/data/vocabulary";
import { useLearning } from "@/context/learning";
import { useStudyTime } from "@/context/study-time";
import { getApiUrl } from "@/lib/query-client";
import {
  VocabCardView,
  ActionButton,
  SwipeAction,
} from "@/components/VocabCard";
import type { VocabCard } from "@/data/vocabulary";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface CardState {
  deck: VocabCard[];
  correct: VocabCard[];
  dontKnow: VocabCard[];
  currentIndex: number;
}

function ReviewComplete({
  correctCount,
  totalCount,
  mascotUrl,
  onDone,
}: {
  correctCount: number;
  totalCount: number;
  mascotUrl: string;
  onDone: () => void;
}) {
  const mascotScale = useSharedValue(0.8);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    mascotScale.value = withDelay(100, withSequence(
      withSpring(1.2, { damping: 5, stiffness: 250 }),
      withSpring(1, { damping: 8, stiffness: 200 })
    ));
    contentOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));

    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }
  }, []);

  const mascotStyle = useAnimatedStyle(() => ({ transform: [{ scale: mascotScale.value }] }));
  const contentStyle = useAnimatedStyle(() => ({ opacity: contentOpacity.value }));

  return (
    <View style={doneStyles.container}>
      <Reanimated.View style={mascotStyle}>
        <Image source={{ uri: mascotUrl }} style={doneStyles.mascot} resizeMode="contain" />
      </Reanimated.View>
      <Reanimated.View style={[doneStyles.textArea, contentStyle]}>
        <Text style={doneStyles.title}>Harika! 🎉</Text>
        <Text style={doneStyles.subtitle}>
          Tekrar tamamlandı. {correctCount}/{totalCount} kelime doğru.
        </Text>
        <Text style={doneStyles.german}>Gut gemacht!</Text>
      </Reanimated.View>
      <Reanimated.View style={[doneStyles.btnWrap, contentStyle]}>
        <Pressable
          style={({ pressed }) => [doneStyles.doneBtn, { opacity: pressed ? 0.88 : 1 }]}
          onPress={onDone}
        >
          <Text style={doneStyles.doneBtnText}>Ana sayfaya dön</Text>
        </Pressable>
      </Reanimated.View>
    </View>
  );
}

export default function ReviewScreen() {
  const { currentSetId, cardIds, title: titleParam } = useLocalSearchParams<{
    currentSetId?: string;
    cardIds?: string;
    title?: string;
  }>();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;
  const [cardAreaHeight, setCardAreaHeight] = useState(0);
  const cardHeight = cardAreaHeight > 0 ? cardAreaHeight - 12 : SCREEN_HEIGHT * 0.58;

  const { getDailyReviewCards, getWordMastery, getWordLastResult, updateWordSession } = useLearning();
  const { startSession, stopSession } = useStudyTime();

  useFocusEffect(
    useCallback(() => {
      startSession();
      return () => stopSession();
    }, [])
  );

  const reviewCards = useRef<VocabCard[]>((() => {
    if (cardIds) {
      const ids = cardIds.split(",").filter(Boolean);
      return getCardsByIds(ids);
    }
    return getDailyReviewCards(currentSetId, true);
  })()).current;

  const [cardState, setCardState] = useState<CardState>({
    deck: reviewCards,
    correct: [],
    dontKnow: [],
    currentIndex: 0,
  });
  const cardStateRef = useRef(cardState);
  const [cardKey, setCardKey] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; type: SwipeAction } | null>(null);
  const feedbackOpacity = useRef(new Animated.Value(0)).current;
  const [isDone, setIsDone] = useState(false);
  const [finalCorrect, setFinalCorrect] = useState(0);
  const sessionSavedRef = useRef(false);

  const mascotUrl = useMemo(() => new URL("/worti.png", getApiUrl()).toString(), []);

  cardStateRef.current = cardState;
  const currentCard = cardState.deck[cardState.currentIndex] ?? null;
  const progress = cardState.currentIndex;
  const total = reviewCards.length;

  function showFeedback(text: string, type: SwipeAction) {
    setFeedback({ text, type });
    feedbackOpacity.setValue(0);
    Animated.sequence([
      Animated.timing(feedbackOpacity, { toValue: 1, duration: 120, useNativeDriver: true }),
      Animated.timing(feedbackOpacity, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start(() => setFeedback(null));
  }

  function finishReview(correctCards: VocabCard[], dontKnowCards: VocabCard[]) {
    if (!sessionSavedRef.current) {
      sessionSavedRef.current = true;
      const cIds = correctCards.map((c) => c.id);
      const dIds = dontKnowCards.map((c) => c.id);
      updateWordSession(cIds, dIds);
    }
    setTimeout(() => {
      setFinalCorrect(correctCards.length);
      setIsDone(true);
    }, 400);
  }

  const handleAction = useCallback(
    (action: SwipeAction) => {
      if (!currentCard || !action) return;

      if (Platform.OS !== "web") {
        Haptics.impactAsync(
          action === "right" ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light
        ).catch(() => {});
      }

      setCardKey((k) => k + 1);

      const prev = cardStateRef.current;
      const nextIndex = prev.currentIndex + 1;
      const isLast = nextIndex >= prev.deck.length;

      if (action === "right") {
        showFeedback(POSITIVE_MESSAGES[Math.floor(Math.random() * POSITIVE_MESSAGES.length)], "right");
        const newCorrect = [...prev.correct, currentCard];
        setCardState({ ...prev, correct: newCorrect, currentIndex: nextIndex });
        if (isLast) finishReview(newCorrect, prev.dontKnow);
      } else if (action === "left") {
        showFeedback("Sonra tekrar bakacağız!", "left");
        const newDontKnow = [...prev.dontKnow, currentCard];
        setCardState({ ...prev, dontKnow: newDontKnow, currentIndex: nextIndex });
        if (isLast) finishReview(prev.correct, newDontKnow);
      }
    },
    [currentCard]
  );

  const getFeedbackColor = () => {
    if (!feedback || feedback.type === "right") return Colors.success;
    return Colors.danger;
  };

  if (reviewCards.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: topPad }]}>
        <View style={styles.emptyWrap}>
          <Ionicons name="checkmark-circle" size={64} color={Colors.success} />
          <Text style={styles.emptyTitle}>Tekrar edilecek kelime yok</Text>
          <Text style={styles.emptyDesc}>Önce bazı setleri tamamla.</Text>
          <Pressable onPress={() => router.replace("/")}>
            <Text style={styles.backLink}>Ana sayfaya dön</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const progressPct = total > 0 ? Math.min(progress / total, 1) : 0;
  const currentMastery = currentCard ? getWordMastery(currentCard.id) : 0;

  if (isDone) {
    return (
      <View style={[styles.container, { paddingTop: topPad, paddingBottom: bottomPad }]}>
        <ReviewComplete
          correctCount={finalCorrect}
          totalCount={total}
          mascotUrl={mascotUrl}
          onDone={() => router.replace("/")}
        />
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
          <View style={styles.headerBadge}>
            <Ionicons name={titleParam ? "layers-outline" : "calendar"} size={13} color={Colors.primary} />
            <Text style={styles.headerTitle}>{titleParam ?? "Günlük Tekrar"}</Text>
          </View>
        </View>
        <View style={styles.counterPill}>
          <Text style={styles.counterText}>{Math.min(progress + 1, total)}/{total}</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progressPct * 100}%` as any }]} />
      </View>

      {/* Card area */}
      <View style={styles.cardArea} onLayout={(e) => setCardAreaHeight(e.nativeEvent.layout.height)}>
        {currentCard ? (
          <VocabCardView
            key={`review-${currentCard.id}-${cardKey}`}
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
          icon="close-circle"
          label="Bilmiyorum"
          color={Colors.danger}
          bg="#FEE2E2"
          onPress={() => handleAction("left")}
        />
        <ActionButton
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
  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    color: Colors.primary,
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
    gap: 24,
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
    gap: 10,
    paddingTop: 4,
  },
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
    textAlign: "center",
  },
  emptyDesc: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    textAlign: "center",
  },
  backLink: {
    marginTop: 8,
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: Colors.primary,
  },
});

const doneStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    padding: 32,
  },
  mascot: {
    width: 100,
    height: 100,
  },
  textArea: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  german: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: Colors.gold,
    marginTop: 4,
  },
  btnWrap: {
    alignSelf: "stretch",
  },
  doneBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  doneBtnText: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
  },
});
