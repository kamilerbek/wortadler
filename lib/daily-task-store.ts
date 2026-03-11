import type { VocabCard } from "@/data/vocabulary";

let _cards: VocabCard[] = [];
let _correctIds: string[] = [];
let _dontKnowIds: string[] = [];

export const DailyTaskStore = {
  setCards(cards: VocabCard[]) {
    _cards = cards;
    _correctIds = [];
    _dontKnowIds = [];
  },
  getCards(): VocabCard[] {
    return _cards;
  },
  hasCards(): boolean {
    return _cards.length > 0;
  },
  setResults(correctIds: string[], dontKnowIds: string[]) {
    _correctIds = correctIds;
    _dontKnowIds = dontKnowIds;
  },
  getCorrectIds(): string[] {
    return _correctIds;
  },
  getDontKnowIds(): string[] {
    return _dontKnowIds;
  },
};
