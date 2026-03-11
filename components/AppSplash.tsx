import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const PATTERN: Array<{
  name: keyof typeof Ionicons.glyphMap;
  lx: number;
  ty: number;
  rotate: string;
  size: number;
}> = [
  { name: "book-outline",    lx: 0.06, ty: 0.04, rotate: "-12deg", size: 15 },
  { name: "pencil-outline",  lx: 0.78, ty: 0.07, rotate: "18deg",  size: 12 },
  { name: "star-outline",    lx: 0.14, ty: 0.15, rotate: "5deg",   size: 10 },
  { name: "book-outline",    lx: 0.72, ty: 0.20, rotate: "-8deg",  size: 14 },
  { name: "create-outline",  lx: 0.03, ty: 0.32, rotate: "15deg",  size: 11 },
  { name: "library-outline", lx: 0.83, ty: 0.40, rotate: "-20deg", size: 14 },
  { name: "star-outline",    lx: 0.18, ty: 0.48, rotate: "0deg",   size: 9  },
  { name: "book-outline",    lx: 0.70, ty: 0.56, rotate: "10deg",  size: 12 },
  { name: "pencil-outline",  lx: 0.07, ty: 0.64, rotate: "-15deg", size: 13 },
  { name: "school-outline",  lx: 0.76, ty: 0.72, rotate: "8deg",   size: 15 },
  { name: "star-outline",    lx: 0.42, ty: 0.80, rotate: "-5deg",  size: 10 },
  { name: "book-outline",    lx: 0.10, ty: 0.87, rotate: "20deg",  size: 11 },
  { name: "create-outline",  lx: 0.82, ty: 0.88, rotate: "-10deg", size: 12 },
  { name: "library-outline", lx: 0.34, ty: 0.12, rotate: "6deg",   size: 11 },
];

const EASE_OUT = Easing.out(Easing.cubic);

export function AppSplash({ onFinish }: { onFinish: () => void }) {
  const { width, height } = useWindowDimensions();

  const blueLayerOpacity  = useRef(new Animated.Value(0)).current;
  const iconsOpacity      = useRef(new Animated.Value(0)).current;
  const iconsTranslateY   = useRef(new Animated.Value(10)).current;
  const logoOpacity       = useRef(new Animated.Value(0)).current;
  const contentOpacity    = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(7)).current;

  useEffect(() => {
    Animated.sequence([
      // Phase 1 — appearance (~900 ms)
      Animated.parallel([
        Animated.timing(blueLayerOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(iconsOpacity, {
          toValue: 1,
          duration: 700,
          easing: EASE_OUT,
          useNativeDriver: true,
        }),
        Animated.timing(iconsTranslateY, {
          toValue: 0,
          duration: 900,
          easing: EASE_OUT,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(80),
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 500,
            easing: EASE_OUT,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.delay(200),
          Animated.parallel([
            Animated.timing(contentOpacity, {
              toValue: 1,
              duration: 550,
              easing: EASE_OUT,
              useNativeDriver: true,
            }),
            Animated.timing(contentTranslateY, {
              toValue: 0,
              duration: 620,
              easing: EASE_OUT,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]),

      // Phase 2 — hold
      Animated.delay(650),

      // Phase 3 — exit: blue layer fades out, revealing the app-background
      // layer beneath. When onFinish fires, the component unmounts and the
      // Daily Task screen (same colour) is already there — zero visible jump.
      Animated.timing(blueLayerOpacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => onFinish());
  }, []);

  return (
    // Outer shell: never animated — stays fully opaque so nothing beneath
    // ever bleeds through, no matter what happens.
    <View style={[styles.outerShell, { width, height }]}>

      {/* App background layer — identical colour to the Daily Task screen.
          Visible only as the blue layer above fades out, making the
          unmount invisible. */}
      <View style={[StyleSheet.absoluteFill, styles.appBg]} />

      {/* Blue gradient layer with all animated splash content */}
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: blueLayerOpacity }]}
      >
        <LinearGradient
          colors={["#1E40AF", "#2563EB", "#3B82F6"]}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              opacity: iconsOpacity,
              transform: [{ translateY: iconsTranslateY }],
            },
          ]}
          pointerEvents="none"
        >
          {PATTERN.map((p, i) => (
            <View
              key={i}
              style={[
                styles.patternIcon,
                {
                  left: p.lx * width,
                  top: p.ty * height,
                  transform: [{ rotate: p.rotate }],
                },
              ]}
            >
              <Ionicons
                name={p.name}
                size={p.size}
                color="rgba(255,255,255,0.09)"
              />
            </View>
          ))}
        </Animated.View>

        <View style={styles.content}>
          <Animated.View style={{ opacity: logoOpacity }}>
            <Image
              source={require("@/assets/images/worti.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View
            style={{
              opacity: contentOpacity,
              transform: [{ translateY: contentTranslateY }],
              alignItems: "center",
            }}
          >
            <Text style={styles.appName}>WortAdler</Text>
            <Text style={styles.tagline}>Jeden Tag 10 neue Wörter</Text>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerShell: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 9999,
    overflow: "hidden",
  },
  appBg: {
    backgroundColor: "#F8FBFF",
  },
  patternIcon: {
    position: "absolute",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  logo: {
    width: 130,
    height: 130,
  },
  appName: {
    fontSize: 34,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    letterSpacing: 1,
    marginBottom: 6,
  },
  tagline: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.75)",
    letterSpacing: 0.3,
  },
});
