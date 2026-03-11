import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { queryClient } from "@/lib/query-client";
import { LearningProvider } from "@/context/learning";
import { StudyTimeProvider } from "@/context/study-time";
import { AppSplash } from "@/components/AppSplash";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="daily-task" options={{ headerShown: false, animation: "fade" }} />
      <Stack.Screen name="daily-learn" options={{ headerShown: false, animation: "slide_from_bottom", presentation: "fullScreenModal" }} />
      <Stack.Screen name="daily-complete" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="learn/[setId]" options={{ headerShown: false, animation: "slide_from_bottom", presentation: "fullScreenModal" }} />
      <Stack.Screen name="set-complete" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="topic-complete" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="review" options={{ headerShown: false, animation: "slide_from_bottom", presentation: "fullScreenModal" }} />
      <Stack.Screen name="streak-journey" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="learned-words" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="completed-sets" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="study-stats" options={{ headerShown: false, animation: "slide_from_right" }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <LearningProvider>
          <StudyTimeProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <KeyboardProvider>
                <RootLayoutNav />
              </KeyboardProvider>
              {!splashDone && (
                <AppSplash
                  onFinish={() => {
                    setSplashDone(true);
                    if (Platform.OS === "web") {
                      const el = document.getElementById("wortadler-preloader");
                      if (el) el.remove();
                    }
                  }}
                />
              )}
            </GestureHandlerRootView>
          </StudyTimeProvider>
        </LearningProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
