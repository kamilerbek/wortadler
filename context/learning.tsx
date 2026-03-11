import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { TOPICS, VocabCard } from "@/data/vocabulary";

interface SetProgress {
  completed: boolean;
  correctCount: number;
  dontKnowCount: number;
  repeatCount: number;
}

interface LearningState {
  totalLearnedWords: number;
  dailyStreak: number;
  lastStudiedDate: string | null;
  completedSets: Record<string, SetProgress>;
  unlockedSets: string[];
  wordMastery: Record<string, number>;
  wordLastResult: Record<string, "correct" | "dontKnow">;
  wordNextReviewDate: Record<string, string>;
  wordLastStudiedDate: Record<string, string>;
  dailyTaskDate: string | null;
  dailyTaskDone: boolean;
}

interface LearningContextValue {
  state: LearningState;
  isSetUnlocked: (setId: string) => boolean;
  isSetCompleted: (setId: string) => boolean;
  completeSet: (setId: string, correct: number, dontKnow: number, repeat: number) => void;
  getSetProgress: (setId: string) => SetProgress | null;
  getTodayProgress: () => number;
  updateWordSession: (correctIds: string[], dontKnowIds: string[]) => void;
  getWordMastery: (cardId: string) => number;
  getWordLastResult: (cardId: string) => "correct" | "dontKnow" | undefined;
  isWordKnown: (cardId: string) => boolean;
  getDailyReviewCards: (currentSetId?: string, includeStudiedToday?: boolean) => VocabCard[];
  isDailyTaskDone: boolean;
  getDailyTaskCards: () => VocabCard[];
  completeDailyTask: (correctIds: string[], dontKnowIds: string[]) => void;
}

const DEFAULT_STATE: LearningState = {
  totalLearnedWords: 0,
  dailyStreak: 0,
  lastStudiedDate: null,
  completedSets: {},
  unlockedSets: ["a1-adj-set1","a1-adj-set2","a1-adj-set3","a1-adj-set4","a1-adj-set5","a1-adj-set6","a1-adj-set7","a1-adj-set8","a1-nomen-set1","a1-nomen-set2","a1-nomen-set3","a1-nomen-set4","a1-nomen-set5","a1-nomen-set6","a1-nomen-set7","a1-nomen-set8","a1-nomen-set9","a1-nomen-set10","a1-nomen-set11","a1-nomen-set12","a1-vv-set1","a1-vv-set2","a1-vv-set3","a1-vv-set4","a1-vv-set5","a1-vv-set6","a1-vv-set7","a1-vv-set8","a1-vv-set9","a1-vv-set10","a1-vv-set11","a1-vv-set12","b2-adj-set1","b2-nomen-set1","b2-verben-test","b2-pv-set1","b2-pv-set2","b2-pv-set3","b2-pv-set4","b2-tv-set1","b2-tv-set2","b2-tv-set3","b2-tv-set4"],
  wordMastery: {},
  wordLastResult: {},
  wordNextReviewDate: {},
  wordLastStudiedDate: {},
  dailyTaskDate: null,
  dailyTaskDone: false,
};

const STORAGE_KEY = "wortadler_learning_state";

const LearningContext = createContext<LearningContextValue | null>(null);

function addDays(from: Date, n: number): string {
  const d = new Date(from);
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

function reviewDateForMastery(level: number, from: Date): string {
  if (level === 1) return addDays(from, 1);
  if (level === 2) return addDays(from, 3);
  if (level >= 3) return addDays(from, 7);
  return addDays(from, 1);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function LearningProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LearningState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadState();
  }, []);

  const ALL_SETS = ["a1-adj-set1","a1-adj-set2","a1-adj-set3","a1-adj-set4","a1-adj-set5","a1-adj-set6","a1-adj-set7","a1-adj-set8","b2-adj-set1","b2-nomen-set1","b2-verben-test","b2-pv-set1","b2-pv-set2","b2-pv-set3","b2-pv-set4","b2-tv-set1","b2-tv-set2","b2-tv-set3","b2-tv-set4"];

  async function loadState() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as LearningState;
        const merged: LearningState = {
          ...DEFAULT_STATE,
          ...parsed,
          unlockedSets: Array.from(new Set([...ALL_SETS, ...(parsed.unlockedSets || [])])),
          wordMastery: parsed.wordMastery ?? {},
          wordLastResult: parsed.wordLastResult ?? {},
          wordNextReviewDate: parsed.wordNextReviewDate ?? {},
          wordLastStudiedDate: parsed.wordLastStudiedDate ?? {},
          dailyTaskDate: parsed.dailyTaskDate ?? null,
          dailyTaskDone: parsed.dailyTaskDone ?? false,
        };
        setState(merged);
      }
    } catch (e) {
      console.warn("Failed to load learning state", e);
    } finally {
      setLoaded(true);
    }
  }

  async function saveState(newState: LearningState) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.warn("Failed to save learning state", e);
    }
  }

  function isSetUnlocked(setId: string): boolean {
    return state.unlockedSets.includes(setId);
  }

  function isSetCompleted(setId: string): boolean {
    return !!state.completedSets[setId]?.completed;
  }

  function getSetProgress(setId: string): SetProgress | null {
    return state.completedSets[setId] ?? null;
  }

  function getTodayProgress(): number {
    const today = new Date().toISOString().split("T")[0];
    if (state.lastStudiedDate === today) {
      const todaySets = Object.entries(state.completedSets).filter(([, v]) => v.completed);
      const todayWords = todaySets.reduce((sum, [, v]) => sum + v.correctCount, 0);
      return Math.min(todayWords, 10);
    }
    return 0;
  }

  function updateWordSession(correctIds: string[], dontKnowIds: string[]) {
    setState((prev) => {
      const newMastery = { ...prev.wordMastery };
      const newLastResult = { ...prev.wordLastResult };
      const newNextReviewDate = { ...prev.wordNextReviewDate };
      const newLastStudiedDate = { ...prev.wordLastStudiedDate };
      const now = new Date();
      const today = now.toISOString().split("T")[0];

      for (const id of correctIds) {
        if (!id) continue;
        const current = newMastery[id] ?? 0;
        const newLevel = Math.min(current + 1, 3);
        newMastery[id] = newLevel;
        newLastResult[id] = "correct";
        newNextReviewDate[id] = reviewDateForMastery(newLevel, now);
        newLastStudiedDate[id] = today;
      }

      for (const id of dontKnowIds) {
        if (!id) continue;
        newMastery[id] = 0;
        newLastResult[id] = "dontKnow";
        newNextReviewDate[id] = addDays(now, 1);
        newLastStudiedDate[id] = today;
      }

      const newState: LearningState = {
        ...prev,
        wordMastery: newMastery,
        wordLastResult: newLastResult,
        wordNextReviewDate: newNextReviewDate,
        wordLastStudiedDate: newLastStudiedDate,
      };

      saveState(newState);
      return newState;
    });
  }

  function getWordMastery(cardId: string): number {
    return state.wordMastery[cardId] ?? 0;
  }

  function getWordLastResult(cardId: string): "correct" | "dontKnow" | undefined {
    return state.wordLastResult[cardId];
  }

  function isWordKnown(cardId: string): boolean {
    return (state.wordMastery[cardId] ?? 0) >= 3;
  }

  function getDailyReviewCards(currentSetId?: string, includeStudiedToday = false): VocabCard[] {
    const today = new Date().toISOString().split("T")[0];

    const allCards = TOPICS.flatMap((t) =>
      t.sets
        .filter((s) => s.id !== currentSetId)
        .flatMap((s) => s.cards)
    );

    if (includeStudiedToday) {
      const todayFailed: VocabCard[] = [];
      const olderDue: VocabCard[] = [];

      for (const card of allCards) {
        const studiedToday = state.wordLastStudiedDate[card.id] === today;
        const mastery = state.wordMastery[card.id] ?? 0;
        const lastResult = state.wordLastResult[card.id];
        const reviewDate = state.wordNextReviewDate[card.id];

        if (studiedToday && mastery === 0 && lastResult === "dontKnow") {
          todayFailed.push(card);
        } else if (!studiedToday && reviewDate != null && reviewDate <= today) {
          olderDue.push(card);
        }
      }

      return [...todayFailed, ...olderDue];
    }

    return allCards.filter((card) => {
      const reviewDate = state.wordNextReviewDate[card.id];
      const studiedToday = state.wordLastStudiedDate[card.id] === today;
      return reviewDate != null && reviewDate <= today && !studiedToday;
    });
  }

  function getDailyTaskCards(): VocabCard[] {
    const allCards = TOPICS.flatMap((t) => t.sets.flatMap((s) => s.cards));
    const today = new Date().toISOString().split("T")[0];

    const studiedIds = new Set(
      Object.keys(state.wordLastStudiedDate).filter(
        (id) => state.wordLastStudiedDate[id] != null
      )
    );

    const reviewCards = allCards.filter((card) => {
      const lastStudied = state.wordLastStudiedDate[card.id];
      const reviewDate = state.wordNextReviewDate[card.id];
      if (!lastStudied || !reviewDate) return false;
      return lastStudied !== today && reviewDate <= today;
    });

    const newCards = allCards.filter((card) => !studiedIds.has(card.id));

    const reviewSlice = shuffle(reviewCards).slice(0, 5);
    const newCount = Math.max(0, 10 - reviewSlice.length);
    const newSlice = shuffle(newCards).slice(0, newCount);

    return shuffle([...newSlice, ...reviewSlice]).slice(0, 10);
  }

  function completeDailyTask(correctIds: string[], dontKnowIds: string[]) {
    const today = new Date().toISOString().split("T")[0];

    setState((prev) => {
      const newMastery = { ...prev.wordMastery };
      const newLastResult = { ...prev.wordLastResult };
      const newNextReviewDate = { ...prev.wordNextReviewDate };
      const newLastStudiedDate = { ...prev.wordLastStudiedDate };
      const now = new Date();

      for (const id of correctIds) {
        if (!id) continue;
        const level = Math.min((newMastery[id] ?? 0) + 1, 3);
        newMastery[id] = level;
        newLastResult[id] = "correct";
        newNextReviewDate[id] = reviewDateForMastery(level, now);
        newLastStudiedDate[id] = today;
      }

      for (const id of dontKnowIds) {
        if (!id) continue;
        newMastery[id] = 0;
        newLastResult[id] = "dontKnow";
        newNextReviewDate[id] = addDays(now, 1);
        newLastStudiedDate[id] = today;
      }

      let newStreak = prev.dailyStreak;
      if (!prev.lastStudiedDate) {
        newStreak = 1;
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];
        if (prev.lastStudiedDate === yesterdayStr) {
          newStreak = prev.dailyStreak + 1;
        } else if (prev.lastStudiedDate !== today) {
          newStreak = 1;
        }
      }

      const newState: LearningState = {
        ...prev,
        wordMastery: newMastery,
        wordLastResult: newLastResult,
        wordNextReviewDate: newNextReviewDate,
        wordLastStudiedDate: newLastStudiedDate,
        totalLearnedWords: prev.totalLearnedWords + correctIds.length,
        dailyStreak: newStreak,
        lastStudiedDate: today,
        dailyTaskDate: today,
        dailyTaskDone: true,
      };

      saveState(newState);
      return newState;
    });
  }

  function completeSet(
    setId: string,
    correct: number,
    dontKnow: number,
    repeat: number
  ) {
    const today = new Date().toISOString().split("T")[0];

    setState((prev) => {
      const newCompletedSets = {
        ...prev.completedSets,
        [setId]: { completed: true, correctCount: correct, dontKnowCount: dontKnow, repeatCount: repeat },
      };

      let newStreak = prev.dailyStreak;
      if (prev.lastStudiedDate === null) {
        newStreak = 1;
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];
        if (prev.lastStudiedDate === yesterdayStr) {
          newStreak = prev.dailyStreak + 1;
        } else if (prev.lastStudiedDate !== today) {
          newStreak = 1;
        }
      }

      const newUnlocked = [...prev.unlockedSets];
      const allSets = TOPICS.flatMap((t) => t.sets);
      const currentSetIndex = allSets.findIndex((s) => s.id === setId);
      if (currentSetIndex >= 0 && currentSetIndex < allSets.length - 1) {
        const nextSetId = allSets[currentSetIndex + 1].id;
        if (!newUnlocked.includes(nextSetId)) {
          newUnlocked.push(nextSetId);
        }
      }

      const newState: LearningState = {
        ...prev,
        totalLearnedWords: prev.totalLearnedWords + correct,
        dailyStreak: newStreak,
        lastStudiedDate: today,
        completedSets: newCompletedSets,
        unlockedSets: newUnlocked,
      };

      saveState(newState);
      return newState;
    });
  }

  const isDailyTaskDone = (() => {
    const today = new Date().toISOString().split("T")[0];
    return state.dailyTaskDate === today && state.dailyTaskDone;
  })();

  const value = useMemo(
    () => ({
      state,
      isSetUnlocked,
      isSetCompleted,
      completeSet,
      getSetProgress,
      getTodayProgress,
      updateWordSession,
      getWordMastery,
      getWordLastResult,
      isWordKnown,
      getDailyReviewCards,
      isDailyTaskDone,
      getDailyTaskCards,
      completeDailyTask,
    }),
    [state]
  );

  if (!loaded) return null;

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const ctx = useContext(LearningContext);
  if (!ctx) throw new Error("useLearning must be used within LearningProvider");
  return ctx;
}
