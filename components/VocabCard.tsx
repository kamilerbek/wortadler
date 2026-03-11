import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  Pressable,
  Image,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import ReAnimated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/colors";
import { getApiUrl } from "@/lib/query-client";
import type { VocabCard } from "@/data/vocabulary";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
export const SWIPE_THRESHOLD = 90;
export const SWIPE_UP_THRESHOLD = -90;
export const CARD_WIDTH = SCREEN_WIDTH - 32;

export type SwipeAction = "right" | "left" | null;

export function getImageUrl(imageKey: string): string {
  if (!imageKey) return "";
  try {
    return new URL(`card-images/${imageKey}.png`, getApiUrl()).toString();
  } catch {
    return "";
  }
}

export const SWIPE_CONFIGS = {
  right: {
    label: "Biliyorum",
    icon: "checkmark-circle" as const,
    color: "#10B981",
    bg: "rgba(16,185,129,0.15)",
    border: "#10B981",
  },
  left: {
    label: "Bilmiyorum",
    icon: "close-circle" as const,
    color: "#EF4444",
    bg: "rgba(239,68,68,0.15)",
    border: "#EF4444",
  },
};

export function VocabCardView({
  card,
  onAction,
  cardHeight,
  wordType,
  mastery = 0,
  lastResult,
}: {
  card: VocabCard;
  onAction: (action: SwipeAction) => void;
  cardHeight: number;
  wordType?: string;
  mastery?: number;
  lastResult?: "correct" | "dontKnow";
}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const cardTilt = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const flipAnim = useRef(new Animated.Value(0)).current;

  const isFlippedRef = useRef(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<SwipeAction>(null);
  const isActiveRef = useRef(true);

  const frontRotateY = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backRotateY = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  const tiltDeg = cardTilt.interpolate({
    inputRange: [-25, 25],
    outputRange: ["-25deg", "25deg"],
  });

  function speakGerman() {
    Speech.stop();
    Speech.speak(card.german, { language: "de-DE", rate: 0.85 });
  }

  const handleFlip = () => {
    if (!isActiveRef.current) return;
    const toValue = isFlippedRef.current ? 0 : 1;
    isFlippedRef.current = !isFlippedRef.current;
    setIsFlipped(isFlippedRef.current);
    Animated.spring(flipAnim, {
      toValue,
      useNativeDriver: true,
      friction: 7,
      tension: 40,
    }).start();
    if (Platform.OS !== "web") {
      Haptics.selectionAsync().catch(() => {});
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, g) =>
        isActiveRef.current && (Math.abs(g.dx) > 12 || Math.abs(g.dy) > 12),
      onPanResponderMove: (_, g) => {
        translateX.setValue(g.dx);
        translateY.setValue(g.dy * 0.4);
        cardTilt.setValue(g.dx / 18);

        if (Math.abs(g.dx) > Math.abs(g.dy) * 1.5) {
          if (g.dx > 40) {
            setActiveOverlay("right");
            overlayOpacity.setValue(Math.min(g.dx / SWIPE_THRESHOLD, 1));
          } else if (g.dx < -40) {
            setActiveOverlay("left");
            overlayOpacity.setValue(Math.min(Math.abs(g.dx) / SWIPE_THRESHOLD, 1));
          } else {
            setActiveOverlay(null);
            overlayOpacity.setValue(0);
          }
        } else {
          setActiveOverlay(null);
          overlayOpacity.setValue(0);
        }
      },
      onPanResponderRelease: (_, g) => {
        const right = g.dx > SWIPE_THRESHOLD;
        const left = g.dx < -SWIPE_THRESHOLD;

        if (right) {
          isActiveRef.current = false;
          Animated.parallel([
            Animated.timing(translateX, { toValue: SCREEN_WIDTH * 1.6, duration: 260, useNativeDriver: true }),
            Animated.timing(cardTilt, { toValue: 25, duration: 260, useNativeDriver: true }),
          ]).start();
          onAction("right");
        } else if (left) {
          isActiveRef.current = false;
          Animated.parallel([
            Animated.timing(translateX, { toValue: -SCREEN_WIDTH * 1.6, duration: 260, useNativeDriver: true }),
            Animated.timing(cardTilt, { toValue: -25, duration: 260, useNativeDriver: true }),
          ]).start();
          onAction("left");
        } else {
          Animated.parallel([
            Animated.spring(translateX, { toValue: 0, useNativeDriver: true, friction: 6, tension: 120 }),
            Animated.spring(translateY, { toValue: 0, useNativeDriver: true, friction: 6, tension: 120 }),
            Animated.spring(cardTilt, { toValue: 0, useNativeDriver: true, friction: 6, tension: 120 }),
            Animated.timing(overlayOpacity, { toValue: 0, duration: 180, useNativeDriver: true }),
          ]).start();
          setActiveOverlay(null);
        }
      },
    })
  ).current;

  const cfg = activeOverlay ? SWIPE_CONFIGS[activeOverlay] : null;
  const imageUrl = getImageUrl(card.imageKey);

  return (
    <Animated.View
      style={[
        cardStyles.cardContainer,
        {
          height: cardHeight,
          transform: [{ translateX }, { translateY }, { rotate: tiltDeg }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Pressable onPress={handleFlip} style={cardStyles.cardPressable}>
        {/* FRONT FACE */}
        <Animated.View
          style={[
            cardStyles.cardFace,
            cardStyles.cardFront,
            { transform: [{ perspective: 1200 }, { rotateY: frontRotateY }] },
          ]}
        >
          <View style={cardStyles.frontCenter}>
            <Text
              style={cardStyles.frontGermanWord}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.4}
            >
              {card.german}
            </Text>

            {wordType && (
              <Text style={cardStyles.wordTypeLabel}>{wordType}</Text>
            )}
            <View style={cardStyles.masteryRow}>
              <View style={cardStyles.masteryDots}>
                {[0, 1, 2].map((i) => {
                  let bg = "#E5E7EB";
                  if (i < mastery) {
                    bg = Colors.success;
                  } else if (i === mastery && lastResult === "dontKnow") {
                    bg = Colors.danger;
                  }
                  return <View key={i} style={[cardStyles.dot, { backgroundColor: bg }]} />;
                })}
              </View>
            </View>
          </View>

          <View style={cardStyles.frontBottom}>
            <View style={[cardStyles.cardColorDot, { backgroundColor: card.cardColor }]} />
          </View>
        </Animated.View>

        {/* BACK FACE */}
        <Animated.View
          style={[
            cardStyles.cardFace,
            cardStyles.cardBack,
            { transform: [{ perspective: 1200 }, { rotateY: backRotateY }] },
          ]}
        >
          {/* Upper half — image */}
          <View style={[cardStyles.backImageSection, { backgroundColor: card.cardColor }]}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={cardStyles.backImage} resizeMode="contain" />
            ) : (
              <Ionicons name="image-outline" size={64} color="#fff" style={{ opacity: 0.5 }} />
            )}
          </View>

          {/* Lower half — meaning + grammar */}
          <View style={cardStyles.backContentSection}>
            {card.sentences && card.sentences.length > 0 ? (
              /* Multi-sentence layout:
                 Word alone is child 1 (space-between → pinned top).
                 [Beispiele + sentences + grammar] is child 2 (pinned bottom).
                 The container's space-between creates the large natural gap. */
              <>
                <Text style={cardStyles.backTurkishWord}>{card.turkish}</Text>
                <View style={cardStyles.sentencesAndGrammar}>
                  <View style={cardStyles.sentencesList}>
                    <Text style={cardStyles.beispieleLabel}>Beispiele</Text>
                    {card.sentences.map((s, i) => (
                      <View key={i} style={cardStyles.sentenceItem}>
                        <Text style={cardStyles.sentenceGerman}>{s.german}</Text>
                        <Text style={cardStyles.sentenceTurkish}>{s.turkish}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={cardStyles.grammarBlock}>
                    {card.plural ? (
                      <View style={cardStyles.grammarChipRow}>
                        <Text style={cardStyles.grammarChipLabel}>Pl.:</Text>
                        <Text style={cardStyles.grammarChipValueWrap}>{card.plural}</Text>
                      </View>
                    ) : null}
                    {card.opposite ? (
                      <View style={cardStyles.grammarChipRow}>
                        <Text style={cardStyles.grammarChipLabel}>Geg.:</Text>
                        <Text style={cardStyles.grammarChipValueWrap}>{card.opposite}</Text>
                      </View>
                    ) : null}
                    {(card.komparativ || card.superlativ) ? (
                      <View style={cardStyles.grammarChipRowWrap}>
                        {card.komparativ ? (
                          <View style={cardStyles.grammarChip}>
                            <Text style={cardStyles.grammarChipLabel}>Komp.:</Text>
                            <Text style={cardStyles.grammarChipValue}>{card.komparativ}</Text>
                          </View>
                        ) : null}
                        {card.superlativ ? (
                          <View style={cardStyles.grammarChip}>
                            <Text style={cardStyles.grammarChipLabel}>Sup.:</Text>
                            <Text style={cardStyles.grammarChipValue}>{card.superlativ}</Text>
                          </View>
                        ) : null}
                      </View>
                    ) : null}
                    {(card.perfekt || card.praeteritum) ? (
                      <View style={cardStyles.grammarChipRowWrap}>
                        {card.perfekt ? (
                          <View style={cardStyles.grammarChip}>
                            <Text style={cardStyles.grammarChipLabel}>P:</Text>
                            <Text style={cardStyles.grammarChipValue}>{card.perfekt}</Text>
                          </View>
                        ) : null}
                        {card.praeteritum ? (
                          <View style={cardStyles.grammarChip}>
                            <Text style={cardStyles.grammarChipLabel}>Prät.:</Text>
                            <Text style={cardStyles.grammarChipValue}>{card.praeteritum}</Text>
                          </View>
                        ) : null}
                      </View>
                    ) : null}
                    {card.praeposition ? (
                      <View style={cardStyles.grammarChipRow}>
                        <Text style={cardStyles.grammarChipLabel}>Präp.:</Text>
                        <Text style={cardStyles.grammarChipValueWrap}>{card.praeposition}</Text>
                      </View>
                    ) : null}
                    {card.trennbar ? (
                      <View style={cardStyles.grammarChipRow}>
                        <Text style={cardStyles.grammarChipLabel}>Trennbare</Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </>
            ) : (
              /* Standard single-sentence layout */
              <>
                <View style={cardStyles.backMain}>
                  <Text style={cardStyles.backTurkishWord}>{card.turkish}</Text>
                  <Text style={cardStyles.backSentence}>{card.sentence}</Text>
                </View>
                <View style={cardStyles.grammarFooter}>
                  {card.opposite ? (
                    <View style={cardStyles.grammarChip}>
                      <Text style={cardStyles.grammarChipLabel}>↔ Gegenteil:</Text>
                      <Text style={cardStyles.grammarChipValue}>{card.opposite}</Text>
                    </View>
                  ) : null}
                  {card.komparativ ? (
                    <View style={cardStyles.grammarChip}>
                      <Text style={cardStyles.grammarChipLabel}>+ Komparativ:</Text>
                      <Text style={cardStyles.grammarChipValue}>{card.komparativ}</Text>
                    </View>
                  ) : null}
                  {card.superlativ ? (
                    <View style={cardStyles.grammarChip}>
                      <Text style={cardStyles.grammarChipLabel}>++ Superlativ:</Text>
                      <Text style={cardStyles.grammarChipValue}>{card.superlativ}</Text>
                    </View>
                  ) : null}
                  {card.perfekt ? (
                    <View style={cardStyles.grammarChip}>
                      <Text style={cardStyles.grammarChipLabel}>P</Text>
                      <Text style={cardStyles.grammarChipValue}>{card.perfekt}</Text>
                    </View>
                  ) : null}
                </View>
              </>
            )}
          </View>
        </Animated.View>
      </Pressable>

      {!isFlipped && (
        <Pressable
          onPress={speakGerman}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={({ pressed }) => [cardStyles.speakerBtnCorner, pressed && { opacity: 0.5 }]}
        >
          <Ionicons name="volume-medium-outline" size={16} color={Colors.textMuted} />
        </Pressable>
      )}

      {cfg && (
        <Animated.View
          style={[cardStyles.swipeOverlay, { backgroundColor: cfg.bg, opacity: overlayOpacity }]}
          pointerEvents="none"
        >
          <View style={[cardStyles.overlayBadge, { borderColor: cfg.border }]}>
            <Ionicons name={cfg.icon} size={40} color={cfg.color} />
            <Text style={[cardStyles.overlayLabel, { color: cfg.color }]}>{cfg.label}</Text>
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
}

export function ActionButton({
  icon,
  label,
  color,
  bg,
  onPress,
  testID,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  bg: string;
  onPress: () => void;
  testID?: string;
}) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      testID={testID}
      style={{ flex: 1 }}
      onPressIn={() => { scale.value = withSpring(0.93, { damping: 8, stiffness: 300 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 8, stiffness: 300 }); }}
      onPress={onPress}
    >
      <ReAnimated.View style={[cardStyles.actionBtn, { backgroundColor: bg }, animStyle]}>
        <Ionicons name={icon} size={28} color={color} />
        <Text style={[cardStyles.actionLabel, { color }]}>{label}</Text>
      </ReAnimated.View>
    </Pressable>
  );
}

export const cardStyles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 22,
    elevation: 12,
  },
  cardPressable: {
    flex: 1,
  },
  cardFace: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 24,
    overflow: "hidden",
    backfaceVisibility: "hidden",
  },
  cardFront: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
  },
  frontCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  frontGermanWord: {
    fontSize: 56,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
    letterSpacing: -1.5,
    textAlign: "center",
  },
  wordTypeLabel: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#9CA3AF",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  speakerBtnCorner: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(148, 163, 184, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  masteryRow: {
    alignItems: "center",
    gap: 6,
  },
  masteryDots: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  masteryText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    letterSpacing: 0.5,
  },
  frontBottom: {
    width: "100%",
    alignItems: "center",
  },
  cardColorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    opacity: 0.5,
  },
  cardBack: {
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  backImageSection: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  backImage: {
    width: "100%",
    height: "100%",
  },
  backContentSection: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 16,
    justifyContent: "space-between",
  },
  backMain: {
    gap: 8,
  },
  backTurkishWord: {
    fontSize: 38,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
    letterSpacing: -1,
  },
  backTurkishWordCompact: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  backSentence: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    lineHeight: 19,
    fontStyle: "italic",
  },
  sentencesAndGrammar: {
    gap: 8,
  },
  sentencesList: {
    gap: 9,
  },
  beispieleLabel: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  sentenceItem: {
    gap: 2,
  },
  sentenceGerman: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: Colors.text,
    lineHeight: 17,
  },
  sentenceTurkish: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    lineHeight: 15,
    fontStyle: "italic",
  },
  grammarFooter: {
    flexDirection: "column",
    gap: 5,
  },
  grammarFooterRow: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  grammarBlock: {
    gap: 4,
    marginTop: 16,
  },
  grammarChipRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  grammarChipRowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  grammarChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
  },
  grammarChipLabel: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    color: Colors.textMuted,
    minWidth: 22,
  },
  grammarChipValue: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  grammarChipValueWrap: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
    flexShrink: 1,
  },
  swipeOverlay: {
    position: "absolute",
    inset: 0,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayBadge: {
    alignItems: "center",
    gap: 6,
    borderWidth: 2.5,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  overlayLabel: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
  },
  actionBtn: {
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  actionLabel: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.3,
  },
});
