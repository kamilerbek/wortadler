import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/colors";
import { useLearning } from "@/context/learning";

export default function SetCompleteScreen() {
  const params = useLocalSearchParams<{
    setId: string;
    correct: string;
    dontKnow: string;
    correctIds: string;
    dontKnowIds: string;
    isReview: string;
  }>();

  const { setId, correct, dontKnow, correctIds, dontKnowIds, isReview } = params;

  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const { completeSet, isSetCompleted, updateWordSession } = useLearning();
  const sessionUpdatedRef = useRef(false);

  const correctNum = parseInt(correct ?? "0", 10);
  const dontKnowNum = parseInt(dontKnow ?? "0", 10);
  const totalNum = correctNum + dontKnowNum;
  const isReviewMode = isReview === "1";

  const dontKnowCardIds = (dontKnowIds ?? "").split(",").filter(Boolean);
  const correctCardIds = (correctIds ?? "").split(",").filter(Boolean);
  const hasDifficult = dontKnowCardIds.length > 0;

  // Animated values
  const iconScale   = useSharedValue(0.4);
  const iconOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleY       = useSharedValue(12);
  const bodyOpacity  = useSharedValue(0);
  const bodyY        = useSharedValue(8);
  const statsOpacity = useSharedValue(0);
  const statsY       = useSharedValue(8);
  const btnsOpacity  = useSharedValue(0);
  const btnsY        = useSharedValue(10);

  useEffect(() => {
    if (!sessionUpdatedRef.current) {
      sessionUpdatedRef.current = true;
      updateWordSession(correctCardIds, dontKnowCardIds);
    }
    if (!isSetCompleted(setId ?? "") && !isReviewMode) {
      completeSet(setId ?? "", correctNum, dontKnowNum, 0);
    }
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }

    iconScale.value   = withDelay(60,  withSpring(1,   { damping: 10, stiffness: 180 }));
    iconOpacity.value = withDelay(60,  withTiming(1,   { duration: 300 }));
    titleOpacity.value = withDelay(220, withTiming(1,  { duration: 350 }));
    titleY.value       = withDelay(220, withSpring(0,  { damping: 14, stiffness: 200 }));
    bodyOpacity.value  = withDelay(380, withTiming(1,  { duration: 350 }));
    bodyY.value        = withDelay(380, withSpring(0,  { damping: 14, stiffness: 200 }));
    statsOpacity.value = withDelay(500, withTiming(1,  { duration: 350 }));
    statsY.value       = withDelay(500, withSpring(0,  { damping: 14, stiffness: 200 }));
    btnsOpacity.value  = withDelay(640, withTiming(1,  { duration: 350 }));
    btnsY.value        = withDelay(640, withSpring(0,  { damping: 14, stiffness: 200 }));
  }, []);

  const iconStyle   = useAnimatedStyle(() => ({ opacity: iconOpacity.value, transform: [{ scale: iconScale.value }] }));
  const titleStyle  = useAnimatedStyle(() => ({ opacity: titleOpacity.value, transform: [{ translateY: titleY.value }] }));
  const bodyStyle   = useAnimatedStyle(() => ({ opacity: bodyOpacity.value,  transform: [{ translateY: bodyY.value }] }));
  const statsStyle  = useAnimatedStyle(() => ({ opacity: statsOpacity.value, transform: [{ translateY: statsY.value }] }));
  const btnsStyle   = useAnimatedStyle(() => ({ opacity: btnsOpacity.value,  transform: [{ translateY: btnsY.value }] }));

  function handleReviewDifficult() {
    if (dontKnowCardIds.length === 0) return;
    router.replace({
      pathname: "/review",
      params: {
        cardIds: dontKnowCardIds.join(","),
        title: "Schwierige Wörter",
        currentSetId: setId ?? "",
      },
    });
  }

  function handleHome() {
    router.replace("/");
  }

  return (
    <View style={[styles.container, { paddingTop: topPad, paddingBottom: bottomPad + 16 }]}>

      {/* Eagle icon */}
      <Animated.View style={[styles.iconWrap, iconStyle]}>
        <Text style={styles.eagleEmoji}>🦅</Text>
      </Animated.View>

      {/* Title */}
      <Animated.View style={[styles.titleWrap, titleStyle]}>
        <Text style={styles.title}>
          {isReviewMode ? "Tekrar tamamlandı!" : "Set abgeschlossen!"}
        </Text>
      </Animated.View>

      {/* Body text */}
      <Animated.View style={[styles.bodyWrap, bodyStyle]}>
        <Text style={styles.bodyLine}>
          Du hast{" "}
          <Text style={styles.bodyBold}>{totalNum} {totalNum === 1 ? "Wort" : "Wörter"}</Text>
          {" "}gelernt.
        </Text>
        {hasDifficult && (
          <Text style={styles.bodyLine}>
            <Text style={styles.bodyBoldRed}>{dontKnowNum} {dontKnowNum === 1 ? "Wort braucht" : "Wörter brauchen"}</Text>
            {" "}noch Wiederholung.
          </Text>
        )}
        {!hasDifficult && (
          <Text style={styles.bodyLine}>Alle Wörter perfekt gemeistert!</Text>
        )}
      </Animated.View>

      {/* Stat pills */}
      <Animated.View style={[styles.statsRow, statsStyle]}>
        <View style={[styles.statPill, { borderTopColor: Colors.success }]}>
          <Ionicons name="checkmark-circle" size={22} color={Colors.success} />
          <Text style={[styles.statValue, { color: Colors.success }]}>{correctNum}</Text>
          <Text style={styles.statLabel}>Biliyorum</Text>
        </View>
        <View style={[styles.statPill, { borderTopColor: Colors.danger }]}>
          <Ionicons name="close-circle" size={22} color={Colors.danger} />
          <Text style={[styles.statValue, { color: Colors.danger }]}>{dontKnowNum}</Text>
          <Text style={styles.statLabel}>Bilmiyorum</Text>
        </View>
      </Animated.View>

      {/* Spacer */}
      <View style={{ flex: 1 }} />

      {/* Buttons */}
      <Animated.View style={[styles.btnCol, btnsStyle]}>
        {hasDifficult && !isReviewMode && (
          <Pressable
            testID="btn-review-difficult"
            style={({ pressed }) => [styles.primaryBtn, { opacity: pressed ? 0.88 : 1 }]}
            onPress={handleReviewDifficult}
          >
            <Ionicons name="refresh-circle" size={20} color="#fff" />
            <Text style={styles.primaryBtnText}>Schwierige Wörter wiederholen</Text>
          </Pressable>
        )}

        <Pressable
          testID="btn-zur-startseite"
          style={({ pressed }) => [styles.secondaryBtn, { opacity: pressed ? 0.88 : 1 }]}
          onPress={handleHome}
        >
          <Ionicons name="home-outline" size={18} color={Colors.primary} />
          <Text style={styles.secondaryBtnText}>Zur Startseite</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  iconWrap: {
    marginTop: 48,
    marginBottom: 20,
  },
  eagleEmoji: {
    fontSize: 72,
    textAlign: "center",
  },
  titleWrap: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  bodyWrap: {
    alignItems: "center",
    gap: 6,
    marginBottom: 32,
  },
  bodyLine: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
  bodyBold: {
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  bodyBoldRed: {
    fontFamily: "Inter_600SemiBold",
    color: Colors.danger,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    alignSelf: "stretch",
  },
  statPill: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    gap: 4,
    borderTopWidth: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: Colors.textSecondary,
  },
  btnCol: {
    alignSelf: "stretch",
    gap: 10,
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 17,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryBtnText: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  secondaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.primaryLight,
    borderRadius: 14,
    paddingVertical: 17,
    borderWidth: 1.5,
    borderColor: Colors.primary + "30",
  },
  secondaryBtnText: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: Colors.primary,
  },
});
