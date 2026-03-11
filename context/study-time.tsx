import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { AppState, AppStateStatus } from "react-native";

interface StudyTimeState {
  dailySeconds: Record<string, number>;
}

interface StudyTimeContextValue {
  startSession: () => void;
  stopSession: () => void;
  getTodaySeconds: () => number;
  getWeekSeconds: () => number;
  getTotalSeconds: () => number;
  getDaySeconds: (daysAgo: number) => number;
}

const STORAGE_KEY = "wortadler_study_time";
const DEFAULT_STATE: StudyTimeState = { dailySeconds: {} };

const StudyTimeContext = createContext<StudyTimeContextValue | null>(null);

function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

function dateKey(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

export function StudyTimeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StudyTimeState>(DEFAULT_STATE);
  const sessionStartRef = useRef<number | null>(null);
  const wasInSessionRef = useRef(false);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    loadState();
    const sub = AppState.addEventListener("change", handleAppStateChange);
    return () => sub.remove();
  }, []);

  async function loadState() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StudyTimeState;
        setState({ dailySeconds: parsed.dailySeconds ?? {} });
      }
    } catch (e) {
      console.warn("Failed to load study time", e);
    }
  }

  async function persistState(newState: StudyTimeState) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.warn("Failed to save study time", e);
    }
  }

  function addElapsed(elapsed: number) {
    if (elapsed <= 0) return;
    const key = todayKey();
    setState((prev) => {
      const newDailySeconds = { ...prev.dailySeconds };
      newDailySeconds[key] = (newDailySeconds[key] ?? 0) + elapsed;
      const newState = { dailySeconds: newDailySeconds };
      persistState(newState);
      return newState;
    });
  }

  function handleAppStateChange(nextState: AppStateStatus) {
    if (appStateRef.current === "active" && nextState !== "active") {
      if (sessionStartRef.current !== null) {
        const elapsed = Math.floor((Date.now() - sessionStartRef.current) / 1000);
        addElapsed(elapsed);
        sessionStartRef.current = null;
        wasInSessionRef.current = true;
      }
    } else if (appStateRef.current !== "active" && nextState === "active") {
      if (wasInSessionRef.current) {
        sessionStartRef.current = Date.now();
        wasInSessionRef.current = false;
      }
    }
    appStateRef.current = nextState;
  }

  function startSession() {
    sessionStartRef.current = Date.now();
    wasInSessionRef.current = false;
  }

  function stopSession() {
    if (sessionStartRef.current !== null) {
      const elapsed = Math.floor((Date.now() - sessionStartRef.current) / 1000);
      addElapsed(elapsed);
      sessionStartRef.current = null;
    }
    wasInSessionRef.current = false;
  }

  function getTodaySeconds(): number {
    return state.dailySeconds[todayKey()] ?? 0;
  }

  function getDaySeconds(daysAgo: number): number {
    return state.dailySeconds[dateKey(daysAgo)] ?? 0;
  }

  function getWeekSeconds(): number {
    let total = 0;
    for (let i = 0; i < 7; i++) {
      total += state.dailySeconds[dateKey(i)] ?? 0;
    }
    return total;
  }

  function getTotalSeconds(): number {
    return Object.values(state.dailySeconds).reduce((sum, s) => sum + s, 0);
  }

  const value: StudyTimeContextValue = {
    startSession,
    stopSession,
    getTodaySeconds,
    getWeekSeconds,
    getTotalSeconds,
    getDaySeconds,
  };

  return (
    <StudyTimeContext.Provider value={value}>
      {children}
    </StudyTimeContext.Provider>
  );
}

export function useStudyTime() {
  const ctx = useContext(StudyTimeContext);
  if (!ctx) throw new Error("useStudyTime must be used within StudyTimeProvider");
  return ctx;
}

export function formatStudyTime(seconds: number): string {
  if (seconds === 0) return "—";
  if (seconds < 60) return "< 1 dk";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins} dk`;
  const hrs = Math.floor(mins / 60);
  const remMins = mins % 60;
  return remMins > 0 ? `${hrs} sa ${remMins} dk` : `${hrs} sa`;
}
