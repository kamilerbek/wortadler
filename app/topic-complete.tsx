import React, { useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Share,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { getApiUrl } from "@/lib/query-client";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/colors";
import { useLearning } from "@/context/learning";

function FloatingParticle({ delay, x, color }: { delay: number; x: number; color: string }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withSequence(withTiming(1, { duration: 300 }), withTiming(0, { duration: 800 }))
    );
    translateY.value = withDelay(delay, withTiming(-120, { duration: 1200 }));
    scale.value = withDelay(delay, withSpring(1, { damping: 8, stiffness: 200 }));
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
    left: x,
    position: "absolute",
    bottom: 0,
  }));

  return (
    <Animated.View style={style}>
      <MaterialCommunityIcons name="star-four-points" size={16} color={color} />
    </Animated.View>
  );
}

export default function TopicCompleteScreen() {
  const insets = useSafeAreaInsets();
  const mascotUrl = useMemo(() => new URL("/worti.png", getApiUrl()).toString(), []);
  const { state } = useLearning();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const trophyScale = useSharedValue(0);
  const trophyPulse = useSharedValue(1);
  const titleOpacity = useSharedValue(0);
  const bodyOpacity = useSharedValue(0);
  const buttonsOpacity = useSharedValue(0);

  useEffect(() => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setTimeout(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }, 400);
    }

    trophyScale.value = withDelay(200, withSpring(1, { damping: 6, stiffness: 150 }));
    trophyPulse.value = withDelay(
      800,
      withRepeat(
        withSequence(withSpring(1.06, { damping: 6 }), withSpring(1, { damping: 6 })),
        -1,
        true
      )
    );
    titleOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
    bodyOpacity.value = withDelay(900, withTiming(1, { duration: 600 }));
    buttonsOpacity.value = withDelay(1200, withTiming(1, { duration: 500 }));
  }, []);

  const trophyStyle = useAnimatedStyle(() => ({
    transform: [{ scale: trophyScale.value * trophyPulse.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({ opacity: titleOpacity.value }));
  const bodyStyle = useAnimatedStyle(() => ({ opacity: bodyOpacity.value }));
  const buttonsStyle = useAnimatedStyle(() => ({ opacity: buttonsOpacity.value }));

  async function handleShare() {
    try {
      await Share.share({
        message: `WortAdler ile A1 Adjektive konusunu tamamladım! ${state.totalLearnedWords} kelime öğrendim. Sen de öğren! #WortAdler #AlmancaÖğren`,
        title: "WortAdler Başarım",
      });
    } catch (e) {
      // ignore
    }
  }

  const particleColors = [Colors.gold, Colors.primary, Colors.success, Colors.gold, Colors.primary];
  const particlePositions = [30, 80, 140, 200, 260];

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      {/* Particles */}
      <View style={styles.particlesArea} pointerEvents="none">
        {particlePositions.map((x, i) => (
          <FloatingParticle key={i} delay={i * 150} x={x} color={particleColors[i]} />
        ))}
      </View>

      <View style={styles.content}>
        {/* Trophy */}
        <Animated.View style={[styles.trophyRing, trophyStyle]}>
          <View style={styles.trophyInner}>
            <Ionicons name="trophy" size={80} color={Colors.gold} />
          </View>
        </Animated.View>

        {/* Stars */}
        <Animated.View style={[styles.starsRow, titleStyle]}>
          {[0, 1, 2].map((i) => (
            <Ionicons key={i} name="star" size={28} color={Colors.gold} />
          ))}
        </Animated.View>

        {/* Title */}
        <Animated.View style={[styles.titleArea, titleStyle]}>
          <Text style={styles.bigTitle}>Tebrikler!</Text>
          <Text style={styles.subtitle}>A1 Adjektive tamamlandı</Text>
        </Animated.View>

        {/* Body */}
        <Animated.View style={[styles.body, bodyStyle]}>
          <View style={styles.achievementCard}>
            <View style={styles.achievementRow}>
              <View style={styles.achievementIcon}>
                <Image source={{ uri: mascotUrl }} style={styles.achievementMascot} resizeMode="contain" />
              </View>
              <View style={styles.achievementText}>
                <Text style={styles.achievementTitle}>Worti çok mutlu!</Text>
                <Text style={styles.achievementDesc}>
                  Tüm A1 Adjektive'i öğrendin. Gerçek bir başarı!
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{state.totalLearnedWords}</Text>
              <Text style={styles.statText}>kelime öğrenildi</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{state.dailyStreak}</Text>
              <Text style={styles.statText}>günlük seri</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>A1</Text>
              <Text style={styles.statText}>seviye</Text>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Buttons */}
      <Animated.View style={[styles.buttons, { paddingBottom: bottomPad + 20 }, buttonsStyle]}>
        <Pressable
          style={({ pressed }) => [styles.shareBtn, { opacity: pressed ? 0.8 : 1 }]}
          onPress={handleShare}
        >
          <Ionicons name="share-social-outline" size={20} color={Colors.primary} />
          <Text style={styles.shareBtnText}>Başarını Paylaş</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.homeBtn, { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }]}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.homeBtnText}>Ana Sayfa</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  particlesArea: {
    position: "absolute",
    bottom: "40%",
    left: 0,
    right: 0,
    height: 150,
    overflow: "visible",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 20,
  },
  trophyRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.goldLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: Colors.gold,
  },
  trophyInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  starsRow: {
    flexDirection: "row",
    gap: 8,
  },
  titleArea: {
    alignItems: "center",
    gap: 4,
  },
  bigTitle: {
    fontSize: 44,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
    letterSpacing: -1.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
  },
  body: {
    width: "100%",
    gap: 12,
  },
  achievementCard: {
    backgroundColor: Colors.goldLight,
    borderRadius: 16,
    padding: 16,
  },
  achievementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  achievementIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  achievementMascot: {
    width: 40,
    height: 40,
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: "#92400E",
  },
  achievementDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#92400E",
    marginTop: 2,
    lineHeight: 18,
  },
  statsCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  statNumber: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
  },
  statText: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: Colors.borderLight,
  },
  buttons: {
    paddingHorizontal: 24,
    gap: 10,
  },
  shareBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  shareBtnText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: Colors.primary,
  },
  homeBtn: {
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
  homeBtnText: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
  },
});
