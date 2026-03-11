import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { useLearning } from "@/context/learning";
import { TOPICS } from "@/data/vocabulary";
import type { VocabCard } from "@/data/vocabulary";

type WordType = "Tümü" | "Adjektiv" | "Verb" | "Nomen";
type Level = "Tümü" | "A1" | "A2" | "B1" | "B2";

function getWordType(card: VocabCard): string {
  if (card.plural) return "Nomen";
  if (card.perfekt || card.praeteritum || card.praeposition || card.trennbar) return "Verb";
  if (card.komparativ || card.superlativ || card.opposite) return "Adjektiv";
  return "Diğer";
}

function levelFromTopicId(topicId: string): string {
  if (topicId.startsWith("a1")) return "A1";
  if (topicId.startsWith("a2")) return "A2";
  if (topicId.startsWith("b1")) return "B1";
  if (topicId.startsWith("b2")) return "B2";
  return "Diğer";
}

function MasteryDots({ mastery }: { mastery: number }) {
  return (
    <View style={styles.dots}>
      {[0, 1, 2].map((i) => (
        <View key={i} style={[styles.dot, i < mastery ? styles.dotFilled : styles.dotEmpty]} />
      ))}
    </View>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

export default function LearnedWordsScreen() {
  const insets = useSafeAreaInsets();
  const { state } = useLearning();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<WordType>("Tümü");
  const [levelFilter, setLevelFilter] = useState<Level>("Tümü");

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const allStudiedCards = useMemo(() => {
    const result: Array<{ card: VocabCard; level: string; wordType: string }> = [];
    for (const topic of TOPICS) {
      const level = levelFromTopicId(topic.id);
      for (const set of topic.sets) {
        for (const card of set.cards) {
          const mastery = state.wordMastery[card.id] ?? 0;
          const studied = state.wordLastStudiedDate[card.id] != null;
          if (mastery > 0 || studied) {
            result.push({ card, level, wordType: getWordType(card) });
          }
        }
      }
    }
    return result;
  }, [state.wordMastery, state.wordLastStudiedDate]);

  const filtered = useMemo(() => {
    return allStudiedCards.filter(({ card, level, wordType }) => {
      if (typeFilter !== "Tümü" && wordType !== typeFilter) return false;
      if (levelFilter !== "Tümü" && level !== levelFilter) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (!card.german.toLowerCase().includes(q) && !card.turkish.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [allStudiedCards, typeFilter, levelFilter, search]);

  const typeFilters: WordType[] = ["Tümü", "Adjektiv", "Verb", "Nomen"];
  const levelFilters: Level[] = ["Tümü", "A1", "A2", "B1", "B2"];

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <Pressable
          style={styles.backBtn}
          onPress={() => router.back()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.primary} />
        </Pressable>
        <View style={styles.headerTextArea}>
          <Text style={styles.headerTitle}>Öğrenilen Kelimeler</Text>
          <Text style={styles.headerCount}>{allStudiedCards.length} kelime</Text>
        </View>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color={Colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Kelime ara..."
          placeholderTextColor={Colors.textMuted}
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
          </Pressable>
        )}
      </View>

      <View style={styles.filtersRow}>
        {levelFilters.map((f) => (
          <FilterChip
            key={f}
            label={f}
            active={levelFilter === f}
            onPress={() => setLevelFilter(f)}
          />
        ))}
        <View style={styles.filterDivider} />
        {typeFilters.map((f) => (
          <FilterChip
            key={f}
            label={f}
            active={typeFilter === f}
            onPress={() => setTypeFilter(f)}
          />
        ))}
      </View>

      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="book-outline" size={48} color={Colors.borderLight} />
          <Text style={styles.emptyTitle}>Kelime bulunamadı</Text>
          <Text style={styles.emptyText}>
            {allStudiedCards.length === 0
              ? "Henüz hiç kelime öğrenmedin. Hadi başla!"
              : "Arama veya filtre sonucu boş."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.card.id}
          contentContainerStyle={{ paddingBottom: bottomPad + 20, paddingHorizontal: 16 }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const mastery = state.wordMastery[item.card.id] ?? 0;
            const typeColor =
              item.wordType === "Adjektiv"
                ? Colors.primary
                : item.wordType === "Verb"
                ? Colors.gold
                : item.wordType === "Nomen"
                ? Colors.success
                : Colors.textMuted;
            return (
              <View style={styles.wordItem}>
                <View style={styles.wordMain}>
                  <Text style={styles.wordGerman}>{item.card.german}</Text>
                  <Text style={styles.wordTurkish}>{item.card.turkish}</Text>
                </View>
                <View style={styles.wordMeta}>
                  <MasteryDots mastery={mastery} />
                  <View style={[styles.typeBadge, { backgroundColor: typeColor + "18" }]}>
                    <Text style={[styles.typeBadgeText, { color: typeColor }]}>
                      {item.wordType}
                    </Text>
                  </View>
                  <View style={[styles.levelBadge]}>
                    <Text style={styles.levelBadgeText}>{item.level}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
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
    paddingVertical: 12,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTextArea: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
  },
  headerCount: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    marginTop: 1,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: Colors.text,
    padding: 0,
  },
  filtersRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 6,
    alignItems: "center",
  },
  filterDivider: {
    width: 1,
    height: 18,
    backgroundColor: Colors.border,
    marginHorizontal: 2,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.borderLight,
  },
  chipActive: {
    backgroundColor: Colors.primary,
  },
  chipText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: "#fff",
  },
  wordItem: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  wordMain: {
    flex: 1,
    gap: 2,
  },
  wordGerman: {
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  wordTurkish: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
  },
  wordMeta: {
    alignItems: "flex-end",
    gap: 6,
  },
  dots: {
    flexDirection: "row",
    gap: 4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  dotFilled: {
    backgroundColor: Colors.success,
  },
  dotEmpty: {
    backgroundColor: Colors.borderLight,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  typeBadgeText: {
    fontSize: 10,
    fontFamily: "Inter_600SemiBold",
  },
  levelBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: Colors.primaryMed,
  },
  levelBadgeText: {
    fontSize: 10,
    fontFamily: "Inter_700Bold",
    color: Colors.primary,
  },
  separator: {
    height: 6,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
