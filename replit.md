# WortAdler

A mobile-first German vocabulary learning app for Turkish speakers. Built with Expo React Native.

## Overview

WortAdler is a clean, friendly vocabulary learning app — a focused, elegant alternative to Duolingo for German A1 vocabulary. No grammar lessons, no listening, no writing — just vocabulary flashcards.

- **Mascot**: Worti, a cartoon eagle with glasses holding a book (served from `/worti.png`)
- **Target audience**: Turkish speakers learning German at A1–B2 level
- **Content**: A1 Adjektive (80 adjectives, 8 sets) + B2 Test Sets (30 words: Adjektive, Nomen, Verben) + B2 Verben Test (10 verbs with 3-sentence rich back)
- **Images**: All cards have sentence-matched images (A1: 91 images, B2: 30 AI-generated images)

## Stack

- **Frontend**: Expo Router (React Native), TypeScript
- **Backend**: Express.js (serves static files + serves as API base)
- **State**: React Context + AsyncStorage
- **Navigation**: File-based routing with Expo Router tabs
- **Animations**: react-native-reanimated + React Native Animated
- **Styling**: React Native StyleSheet

## Home Screen Structure

1. **Header** — WortAdler title, streak badge (flame + count), Worti mascot (tappable, bounces)
2. **Tekrar Et** — 3 tappable colored review category cards:
   - Bildiğim Kelimeler (green) — words with mastery ≥ 3
   - Emin Olmadıklarım (yellow) — studied but mastery < 3
   - Bilmediklerim (red) — lastResult = dontKnow
   - Tapping a card opens `/review` with that category's card IDs + title
   - Cards are disabled when count = 0
3. **Bugünkü İlerleme** — animated progress bar toward 10-word daily goal
4. **Konular** — collapsible topic sections (chevron toggles expand/collapse), each showing set rows
5. **Motivational footer** — Worti message based on total learned words

## Profile Screen Structure

1. Avatar + username + level pill
2. Stats mini row — 3 accent-bordered cards: kelime (blue), gün seri (gold), bugün (green)
3. Info card — detailed stats rows
4. Çalışma Süresi — today / this week / total study time
5. Rozetler — achievement badges grid
6. Worti message

## Daily Task System

Every day, users are greeted with a Daily Task screen instead of the home screen.

- **daily-task.tsx**: Landing screen — shows eagle mascot, "Bugünün görevi hazır", 10 kelime / ≈3 dakika info, "Başla" button
- **daily-learn.tsx**: 10-card learning session — same card UI as regular learn, no card re-queueing (wrong cards appear once and are NOT re-added to queue)
- **daily-complete.tsx**: Completion screen — "Görev tamamlandı!" + "X kelime öğrenildi" + "Y kelime yarın tekrar edilecek" + "Devam Et" button → home

**Card selection logic** (in `context/learning.tsx → getDailyTaskCards()`):
- First day (no prior study): 10 new words, shuffled
- After first day: up to 5 review cards (wordNextReviewDate ≤ today, not studied today) + fill rest with new cards (never studied), shuffled

**State tracking** (AsyncStorage):
- `dailyTaskDate`: ISO date string of last completed task
- `dailyTaskDone`: boolean — true if today's task is done

**Navigation gate**: `app/(tabs)/index.tsx` returns `<Redirect href="/daily-task">` if `isDailyTaskDone === false`. After all hooks, before JSX return.

**In-session card storage**: `lib/daily-task-store.ts` — module-level store holds current session cards and results (correctIds, dontKnowIds). Set when "Başla" is tapped, read by daily-learn, results stored before navigating to daily-complete.

## App Structure

```
app/
  _layout.tsx              # Root layout with providers + Stack screens
  (tabs)/
    _layout.tsx            # Tab bar
    index.tsx              # Home screen — redirects to /daily-task if task not done
  daily-task.tsx           # Daily task landing screen
  daily-learn.tsx          # 10-card daily learning session (no re-queueing)
  daily-complete.tsx       # Task completion screen with stats
  learn/[setId].tsx        # Card learning screen (set-based)
  set-complete.tsx         # Set completion screen
  topic-complete.tsx       # Topic celebration screen
  review.tsx               # Daily review session screen

lib/
  daily-task-store.ts      # In-memory store for current daily task cards/results

components/
  VocabCard.tsx            # Shared VocabCardView + ActionButton + styles
  ErrorBoundary.tsx        # Error boundary wrapper

context/
  learning.tsx             # LearningContext (state + AsyncStorage)
                           # Tracks: streak, sets, wordMastery, wordLastResult,
                           #         dailyTaskDate, dailyTaskDone

data/
  vocabulary.ts            # A1 Adjektive vocabulary (80 words, 8 sets)

server/
  index.ts                 # Express server
  public/
    worti.png              # Mascot image
    card-images/           # Card illustration images

constants/
  colors.ts                # WortAdler theme (soft blue + warm gold)
```

## Learning Flow

### Flashcard Mastery (3x rule)
- Each word tracks a mastery count (0–3) in AsyncStorage
- Swipe right (Biliyorum) = increment mastery
- Mastery indicator shown on card front as 3 dots + "X / 3" text
- At mastery = 3, dots turn green → word moves to "Known Words" pool

### Swipe Actions
- **Right**: Biliyorum (I know it) — increments mastery
- **Left**: Bilmiyorum (I don't know) — marks as difficult
- **Up**: Tekrar (show again) — appends card back to deck

### End of Set Flow
1. Set complete screen: "Set tamamlandı! 🎉" + Worti mascot + trophy animation
2. Shows "Super! X neue Wörter gelernt."
3. "Tekrar başlat" button — restarts with only the Bilmiyorum cards
4. Daily review suggestion appears if enough prior words exist

### Daily Review
- After completing a set, if other words have been studied previously, offers mixed review
- Mix: up to 5 difficult words + 3 unsure + 2 known
- Separate review screen (`/review`) with same card UI

### Access
- No login required — users start learning immediately
- All progress stored locally in AsyncStorage

## Content

- **Topic**: A1 Adjektive (all sets unlocked)
- **Sets 1–8**: 10 words each
  - Set 1: groß, klein, alt, jung, neu, gut, schlecht, schön, hässlich, lang
  - Sets 2–8: Additional adjectives (arm, reich, stark, schwach, etc.)

## Color Scheme

- Primary: `#3B82F6` (soft blue)
- Gold: `#F59E0B` (warm gold)
- Background: `#F8FBFF` (light pastel)
- Success: `#10B981`
- Danger: `#EF4444`

## App Icon

- Main icon: `assets/images/icon.png` — eagle holding flashcard, golden yellow background
- Android adaptive icon with foreground + background layers
- Worti mascot served from Express at `/worti.png`
