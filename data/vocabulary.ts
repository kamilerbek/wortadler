export function getCardsByIds(ids: string[]): VocabCard[] {
  const allCards = TOPICS.flatMap((t) => t.sets.flatMap((s) => s.cards));
  const cardMap = new Map(allCards.map((c) => [c.id, c]));
  return ids.map((id) => cardMap.get(id)).filter(Boolean) as VocabCard[];
}

export interface VocabSentence {
  german: string;
  turkish: string;
}

export interface VocabCard {
  id: string;
  german: string;
  turkish: string;
  sentence: string;
  opposite: string;
  imageKey: string;
  cardColor: string;
  komparativ?: string;
  superlativ?: string;
  perfekt?: string;
  praeteritum?: string;
  praeposition?: string;
  trennbar?: boolean;
  plural?: string;
  sentences?: VocabSentence[];
}

export interface VocabSet {
  id: string;
  name: string;
  cards: VocabCard[];
}

export interface VocabTopic {
  id: string;
  name: string;
  level: string;
  sets: VocabSet[];
}

export const TOPICS: VocabTopic[] = [
  {
    id: "a1-adjektive",
    name: "A1 Adjektive",
    level: "A1",
    sets: [
      {
        id: "a1-adj-set1",
        name: "Set 1",
        cards: [
          { id: "gross",    german: "groß",     turkish: "büyük",   sentence: "Der Elefant ist groß.",      opposite: "klein",    imageKey: "gross",    cardColor: "#E0F2FE", komparativ: "größer",     superlativ: "am größten" },
          { id: "klein",    german: "klein",    turkish: "küçük",   sentence: "Die Ameise ist klein.",      opposite: "groß",     imageKey: "klein",    cardColor: "#DCFCE7", komparativ: "kleiner",    superlativ: "am kleinsten" },
          { id: "alt",      german: "alt",      turkish: "yaşlı",   sentence: "Der Mann ist alt.",          opposite: "jung",     imageKey: "alt",      cardColor: "#FEF9C3", komparativ: "älter",      superlativ: "am ältesten" },
          { id: "jung",     german: "jung",     turkish: "genç",    sentence: "Das Mädchen ist jung.",      opposite: "alt",      imageKey: "jung",     cardColor: "#FEE2E2", komparativ: "jünger",     superlativ: "am jüngsten" },
          { id: "neu",      german: "neu",      turkish: "yeni",    sentence: "Das Handy ist neu.",         opposite: "alt",      imageKey: "neu",      cardColor: "#E0F2FE", komparativ: "neuer",      superlativ: "am neuesten" },
          { id: "gut",      german: "gut",      turkish: "iyi",     sentence: "Der Film ist gut.",          opposite: "schlecht", imageKey: "gut",      cardColor: "#FCE7F3", komparativ: "besser",     superlativ: "am besten" },
          { id: "schlecht", german: "schlecht", turkish: "kötü",    sentence: "Das Wetter ist schlecht.",   opposite: "gut",      imageKey: "schlecht", cardColor: "#E0E7FF", komparativ: "schlechter", superlativ: "am schlechtesten" },
          { id: "schon",    german: "schön",    turkish: "güzel",   sentence: "Die Blume ist schön.",       opposite: "hässlich", imageKey: "schon",    cardColor: "#F3E8FF", komparativ: "schöner",    superlativ: "am schönsten" },
          { id: "hasslich", german: "hässlich", turkish: "çirkin",  sentence: "Das Monster ist hässlich.",  opposite: "schön",    imageKey: "hasslich", cardColor: "#E2E8F0", komparativ: "hässlicher", superlativ: "am hässlichsten" },
          { id: "lang",     german: "lang",     turkish: "uzun",    sentence: "Der Fluss ist lang.",        opposite: "kurz",     imageKey: "lang",     cardColor: "#DBEAFE", komparativ: "länger",     superlativ: "am längsten" },
        ],
      },
      {
        id: "a1-adj-set2",
        name: "Set 2",
        cards: [
          { id: "kurz",    german: "kurz",    turkish: "kısa",    sentence: "Der Rock ist kurz.",          opposite: "lang",    imageKey: "kurz",    cardColor: "#FCE7F3", komparativ: "kürzer",    superlativ: "am kürzesten" },
          { id: "dick",    german: "dick",    turkish: "kalın",   sentence: "Der Baum ist dick.",          opposite: "dünn",    imageKey: "dick",    cardColor: "#FEF9C3", komparativ: "dicker",    superlativ: "am dicksten" },
          { id: "duenn",   german: "dünn",    turkish: "ince",    sentence: "Das Buch ist dünn.",          opposite: "dick",    imageKey: "duenn",   cardColor: "#DBEAFE", komparativ: "dünner",    superlativ: "am dünnsten" },
          { id: "stark",   german: "stark",   turkish: "güçlü",  sentence: "Der Mann ist stark.",         opposite: "schwach", imageKey: "stark",   cardColor: "#FFEDD5", komparativ: "stärker",   superlativ: "am stärksten" },
          { id: "schwach", german: "schwach", turkish: "zayıf",  sentence: "Der Akku ist schwach.",       opposite: "stark",   imageKey: "schwach", cardColor: "#FEE2E2", komparativ: "schwächer", superlativ: "am schwächsten" },
          { id: "hoch",    german: "hoch",    turkish: "yüksek", sentence: "Der Berg ist hoch.",          opposite: "niedrig", imageKey: "hoch",    cardColor: "#E0E7FF", komparativ: "höher",     superlativ: "am höchsten" },
          { id: "niedrig", german: "niedrig", turkish: "alçak",  sentence: "Der Tisch ist niedrig.",      opposite: "hoch",    imageKey: "niedrig", cardColor: "#F3E8FF", komparativ: "niedriger", superlativ: "am niedrigsten" },
          { id: "breit",   german: "breit",   turkish: "geniş",  sentence: "Die Straße ist breit.",       opposite: "eng",     imageKey: "breit",   cardColor: "#DCFCE7", komparativ: "breiter",   superlativ: "am breitesten" },
          { id: "eng",     german: "eng",     turkish: "dar",    sentence: "Der Weg ist eng.",            opposite: "breit",   imageKey: "eng",     cardColor: "#FCE7F3", komparativ: "enger",     superlativ: "am engsten" },
          { id: "weit",    german: "weit",    turkish: "uzak",   sentence: "Das Meer ist weit.",          opposite: "nah",     imageKey: "weit",    cardColor: "#E0F2FE", komparativ: "weiter",    superlativ: "am weitesten" },
        ],
      },
      {
        id: "a1-adj-set3",
        name: "Set 3",
        cards: [
          { id: "schnell",    german: "schnell",    turkish: "hızlı",    sentence: "Der Zug ist schnell.",          opposite: "langsam",    imageKey: "schnell",    cardColor: "#E0F2FE", komparativ: "schneller",    superlativ: "am schnellsten" },
          { id: "langsam",    german: "langsam",    turkish: "yavaş",    sentence: "Die Schildkröte ist langsam.", opposite: "schnell",    imageKey: "langsam",    cardColor: "#DCFCE7", komparativ: "langsamer",    superlativ: "am langsamsten" },
          { id: "frueh",      german: "früh",       turkish: "erken",    sentence: "Der Zug kommt früh.",          opposite: "spät",       imageKey: "frueh",      cardColor: "#FEF9C3", komparativ: "früher",       superlativ: "am frühesten" },
          { id: "spaet",      german: "spät",       turkish: "geç",      sentence: "Er kommt spät nach Hause.",    opposite: "früh",       imageKey: "spaet",      cardColor: "#FFEDD5", komparativ: "später",       superlativ: "am spätesten" },
          { id: "puenktlich", german: "pünktlich",  turkish: "dakik",    sentence: "Der Arzt ist pünktlich.",      opposite: "unpünktlich",imageKey: "puenktlich", cardColor: "#D1FAE5", komparativ: "pünktlicher",  superlativ: "am pünktlichsten" },
          { id: "muede",      german: "müde",       turkish: "yorgun",   sentence: "Ich bin sehr müde.",           opposite: "wach",       imageKey: "muede",      cardColor: "#E0E7FF", komparativ: "müder",        superlativ: "am müdesten" },
          { id: "wach",       german: "wach",       turkish: "uyanık",   sentence: "Der Student ist wach.",        opposite: "müde",       imageKey: "wach",       cardColor: "#FEF9C3", komparativ: "wacher",       superlativ: "am wachsten" },
          { id: "ruhig",      german: "ruhig",      turkish: "sakin",    sentence: "Das Baby ist ruhig.",          opposite: "laut",       imageKey: "ruhig",      cardColor: "#D1FAE5", komparativ: "ruhiger",      superlativ: "am ruhigsten" },
          { id: "laut",       german: "laut",       turkish: "gürültülü",sentence: "Die Musik ist laut.",          opposite: "leise",      imageKey: "laut",       cardColor: "#FEF3C7", komparativ: "lauter",       superlativ: "am lautesten" },
          { id: "leise",      german: "leise",      turkish: "sessiz",   sentence: "Das Kind spricht leise.",      opposite: "laut",       imageKey: "leise",      cardColor: "#F3E8FF", komparativ: "leiser",       superlativ: "am leisesten" },
        ],
      },
      {
        id: "a1-adj-set4",
        name: "Set 4",
        cards: [
          { id: "gluecklich",   german: "glücklich",    turkish: "mutlu",     sentence: "Sie ist sehr glücklich.",       opposite: "traurig",     imageKey: "gluecklich",   cardColor: "#FCE7F3", komparativ: "glücklicher",    superlativ: "am glücklichsten" },
          { id: "traurig",      german: "traurig",      turkish: "üzgün",     sentence: "Das Kind ist traurig.",         opposite: "glücklich",   imageKey: "traurig",      cardColor: "#DBEAFE", komparativ: "trauriger",      superlativ: "am traurigsten" },
          { id: "freundlich",   german: "freundlich",   turkish: "nazik",     sentence: "Der Mann ist sehr freundlich.", opposite: "unfreundlich",imageKey: "freundlich",   cardColor: "#DCFCE7", komparativ: "freundlicher",   superlativ: "am freundlichsten" },
          { id: "unfreundlich", german: "unfreundlich", turkish: "kaba",      sentence: "Der Verkäufer ist unfreundlich.",opposite: "freundlich", imageKey: "unfreundlich", cardColor: "#FEE2E2", komparativ: "unfreundlicher", superlativ: "am unfreundlichsten" },
          { id: "nett",         german: "nett",         turkish: "hoş",       sentence: "Sie ist sehr nett.",            opposite: "böse",        imageKey: "nett",         cardColor: "#D1FAE5", komparativ: "netter",         superlativ: "am nettesten" },
          { id: "boese",        german: "böse",         turkish: "sinirli",   sentence: "Das Kind ist böse.",            opposite: "nett",        imageKey: "boese",        cardColor: "#FEE2E2", komparativ: "böser",          superlativ: "am bösesten" },
          { id: "zufrieden",    german: "zufrieden",    turkish: "memnun",    sentence: "Ich bin zufrieden.",            opposite: "unzufrieden", imageKey: "zufrieden",    cardColor: "#FEF9C3", komparativ: "zufriedener",    superlativ: "am zufriedensten" },
          { id: "wuetend",      german: "wütend",       turkish: "öfkeli",    sentence: "Er ist sehr wütend.",           opposite: "ruhig",       imageKey: "wuetend",      cardColor: "#FEE2E2", komparativ: "wütender",       superlativ: "am wütendsten" },
          { id: "nervoes",      german: "nervös",       turkish: "gergin",    sentence: "Sie ist nervös.",               opposite: "ruhig",       imageKey: "nervoes",      cardColor: "#FFEDD5", komparativ: "nervöser",       superlativ: "am nervösesten" },
          { id: "krank",        german: "krank",        turkish: "hasta",     sentence: "Ich bin krank.",                opposite: "gesund",      imageKey: "krank",        cardColor: "#FEE2E2", komparativ: "kränker",        superlativ: "am kränksten" },
        ],
      },
      {
        id: "a1-adj-set5",
        name: "Set 5",
        cards: [
          { id: "voll",        german: "voll",        turkish: "dolu",    sentence: "Das Glas ist voll.",               opposite: "leer",       imageKey: "voll",        cardColor: "#FEF3C7", komparativ: "voller",       superlativ: "am vollsten" },
          { id: "leer",        german: "leer",        turkish: "boş",     sentence: "Die Flasche ist leer.",            opposite: "voll",       imageKey: "leer",        cardColor: "#DBEAFE", komparativ: "leerer",       superlativ: "am leersten" },
          { id: "offen",       german: "offen",       turkish: "açık",    sentence: "Die Tür ist offen.",               opposite: "geschlossen",imageKey: "offen",       cardColor: "#FEF9C3", komparativ: "offener",      superlativ: "am offensten" },
          { id: "geschlossen", german: "geschlossen", turkish: "kapalı",  sentence: "Das Geschäft ist geschlossen.",    opposite: "offen",      imageKey: "geschlossen", cardColor: "#FEE2E2", komparativ: "geschlossener",superlativ: "am geschlossensten" },
          { id: "fertig",      german: "fertig",      turkish: "hazır",   sentence: "Das Essen ist fertig.",            opposite: "unfertig",   imageKey: "fertig",      cardColor: "#D1FAE5", komparativ: "fertiger",     superlativ: "am fertigsten" },
          { id: "kaputt",      german: "kaputt",      turkish: "bozuk",   sentence: "Das Auto ist kaputt.",             opposite: "ganz",       imageKey: "kaputt",      cardColor: "#FEE2E2", komparativ: "kaputter",     superlativ: "am kaputtesten" },
          { id: "sauber",      german: "sauber",      turkish: "temiz",   sentence: "Das Zimmer ist sauber.",           opposite: "schmutzig",  imageKey: "sauber",      cardColor: "#D1FAE5", komparativ: "sauberer",     superlativ: "am saubersten" },
          { id: "schmutzig",   german: "schmutzig",   turkish: "kirli",   sentence: "Die Schuhe sind schmutzig.",       opposite: "sauber",     imageKey: "schmutzig",   cardColor: "#F3E8FF", komparativ: "schmutziger",  superlativ: "am schmutzigsten" },
          { id: "warm",        german: "warm",        turkish: "ılık",    sentence: "Das Wetter ist warm.",             opposite: "kalt",       imageKey: "warm",        cardColor: "#FEF9C3", komparativ: "wärmer",       superlativ: "am wärmsten" },
          { id: "kalt",        german: "kalt",        turkish: "soğuk",   sentence: "Das Wasser ist kalt.",             opposite: "warm",       imageKey: "kalt",        cardColor: "#DBEAFE", komparativ: "kälter",       superlativ: "am kältesten" },
        ],
      },
      {
        id: "a1-adj-set6",
        name: "Set 6",
        cards: [
          { id: "teuer",       german: "teuer",       turkish: "pahalı",   sentence: "Das Auto ist teuer.",           opposite: "billig",      imageKey: "teuer",       cardColor: "#FEF3C7", komparativ: "teurer",       superlativ: "am teuersten" },
          { id: "billig",      german: "billig",      turkish: "ucuz",     sentence: "Das T-Shirt ist billig.",       opposite: "teuer",       imageKey: "billig",      cardColor: "#FFEDD5", komparativ: "billiger",     superlativ: "am billigsten" },
          { id: "wichtig",     german: "wichtig",     turkish: "önemli",   sentence: "Die Prüfung ist wichtig.",      opposite: "unwichtig",   imageKey: "wichtig",     cardColor: "#E0E7FF", komparativ: "wichtiger",    superlativ: "am wichtigsten" },
          { id: "richtig",     german: "richtig",     turkish: "doğru",    sentence: "Die Antwort ist richtig.",      opposite: "falsch",      imageKey: "richtig",     cardColor: "#D1FAE5", komparativ: "richtiger",    superlativ: "am richtigsten" },
          { id: "falsch",      german: "falsch",      turkish: "yanlış",   sentence: "Die Adresse ist falsch.",       opposite: "richtig",     imageKey: "falsch",      cardColor: "#FCE7F3", komparativ: "falscher",     superlativ: "am falschsten" },
          { id: "interessant", german: "interessant", turkish: "ilginç",   sentence: "Das Buch ist interessant.",     opposite: "langweilig",  imageKey: "interessant", cardColor: "#E0F2FE", komparativ: "interessanter",superlativ: "am interessantesten" },
          { id: "langweilig",  german: "langweilig",  turkish: "sıkıcı",   sentence: "Der Film ist langweilig.",      opposite: "interessant", imageKey: "langweilig",  cardColor: "#E2E8F0", komparativ: "langweiliger", superlativ: "am langweiligsten" },
          { id: "einfach",     german: "einfach",     turkish: "kolay",    sentence: "Die Aufgabe ist einfach.",      opposite: "schwierig",   imageKey: "einfach",     cardColor: "#DCFCE7", komparativ: "einfacher",    superlativ: "am einfachsten" },
          { id: "schwierig",   german: "schwierig",   turkish: "zor",      sentence: "Der Test ist schwierig.",       opposite: "einfach",     imageKey: "schwierig",   cardColor: "#FFEDD5", komparativ: "schwieriger",  superlativ: "am schwierigsten" },
          { id: "besonders",   german: "besonders",   turkish: "özel",     sentence: "Das Essen ist besonders gut.", opposite: "gewöhnlich",  imageKey: "besonders",   cardColor: "#FEF3C7", komparativ: "besonderer",   superlativ: "am besondersten" },
        ],
      },
      {
        id: "a1-adj-set7",
        name: "Set 7",
        cards: [
          { id: "hell",      german: "hell",      turkish: "aydınlık",  sentence: "Das Zimmer ist hell.",         opposite: "dunkel",    imageKey: "hell",      cardColor: "#FEF9C3", komparativ: "heller",      superlativ: "am hellsten" },
          { id: "dunkel",    german: "dunkel",    turkish: "karanlık",  sentence: "Der Raum ist dunkel.",         opposite: "hell",      imageKey: "dunkel",    cardColor: "#E0E7FF", komparativ: "dunkler",     superlativ: "am dunkelsten" },
          { id: "bunt",      german: "bunt",      turkish: "renkli",    sentence: "Das Kleid ist bunt.",          opposite: "einfarbig", imageKey: "bunt",      cardColor: "#FCE7F3", komparativ: "bunter",      superlativ: "am buntesten" },
          { id: "klar",      german: "klar",      turkish: "berrak",    sentence: "Das Wasser ist klar.",         opposite: "unklar",    imageKey: "klar",      cardColor: "#DBEAFE", komparativ: "klarer",      superlativ: "am klarsten" },
          { id: "modern",    german: "modern",    turkish: "modern",    sentence: "Das Haus ist modern.",         opposite: "altmodisch",imageKey: "modern",    cardColor: "#E0F2FE", komparativ: "moderner",    superlativ: "am modernsten" },
          { id: "klassisch", german: "klassisch", turkish: "klasik",    sentence: "Die Musik ist klassisch.",     opposite: "modern",    imageKey: "klassisch", cardColor: "#F3E8FF", komparativ: "klassischer", superlativ: "am klassischsten" },
          { id: "altmodisch",german: "altmodisch",turkish: "eski moda", sentence: "Die Kleidung ist altmodisch.",opposite: "modern",    imageKey: "altmodisch",cardColor: "#FEF3C7", komparativ: "altmodischer",superlativ: "am altmodischsten" },
          { id: "bekannt",   german: "bekannt",   turkish: "tanınmış",  sentence: "Der Sänger ist bekannt.",      opposite: "unbekannt", imageKey: "bekannt",   cardColor: "#FFEDD5", komparativ: "bekannter",   superlativ: "am bekanntesten" },
          { id: "gesund",    german: "gesund",    turkish: "sağlıklı",  sentence: "Sie ist gesund.",              opposite: "krank",     imageKey: "gesund",    cardColor: "#DCFCE7", komparativ: "gesünder",    superlativ: "am gesündesten" },
          { id: "heiss",     german: "heiß",      turkish: "sıcak",     sentence: "Der Kaffee ist heiß.",         opposite: "kalt",      imageKey: "heiss",     cardColor: "#FEE2E2", komparativ: "heißer",      superlativ: "am heißesten" },
        ],
      },
      {
        id: "a1-adj-set8",
        name: "Set 8",
        cards: [
          { id: "verheiratet", german: "verheiratet", turkish: "evli",             sentence: "Sie ist verheiratet.",         opposite: "ledig",     imageKey: "verheiratet", cardColor: "#FCE7F3" },
          { id: "ledig",       german: "ledig",       turkish: "bekar",            sentence: "Er ist noch ledig.",           opposite: "verheiratet",imageKey: "ledig",      cardColor: "#E0F2FE" },
          { id: "allein",      german: "allein",      turkish: "yalnız",           sentence: "Das Kind ist allein.",         opposite: "gemeinsam", imageKey: "allein",      cardColor: "#DBEAFE", komparativ: "allein",       superlativ: "am alleinsten" },
          { id: "gemeinsam",   german: "gemeinsam",   turkish: "birlikte",         sentence: "Wir machen es gemeinsam.",     opposite: "allein",    imageKey: "gemeinsam",   cardColor: "#D1FAE5", komparativ: "gemeinsamer",  superlativ: "am gemeinsams­ten" },
          { id: "bereit",      german: "bereit",      turkish: "hazır",            sentence: "Ich bin bereit.",              opposite: "unbereit",  imageKey: "bereit",      cardColor: "#FEF9C3", komparativ: "bereiter",     superlativ: "am bereitesten" },
          { id: "moeglich",    german: "möglich",     turkish: "mümkün",           sentence: "Das ist möglich.",             opposite: "unmöglich", imageKey: "moeglich",    cardColor: "#DCFCE7", komparativ: "möglicher",    superlativ: "am möglichsten" },
          { id: "unmoeglich",  german: "unmöglich",   turkish: "imkânsız",         sentence: "Das ist unmöglich.",           opposite: "möglich",   imageKey: "unmoeglich",  cardColor: "#FEE2E2" },
          { id: "sicher",      german: "sicher",      turkish: "güvenli",          sentence: "Der Weg ist sicher.",          opposite: "unsicher",  imageKey: "sicher",      cardColor: "#E0E7FF", komparativ: "sicherer",     superlativ: "am sichersten" },
          { id: "unsicher",    german: "unsicher",    turkish: "güvensiz",         sentence: "Er ist unsicher.",             opposite: "sicher",    imageKey: "unsicher",    cardColor: "#FFEDD5", komparativ: "unsicherer",   superlativ: "am unsichersten" },
          { id: "frei",        german: "frei",        turkish: "serbest",          sentence: "Der Platz ist frei.",          opposite: "besetzt",   imageKey: "frei",        cardColor: "#D1FAE5", komparativ: "freier",       superlativ: "am freiesten" },
        ],
      },
    ],
  },
  {
    id: "a1-nomen",
    name: "A1 Nomen",
    level: "A1",
    sets: [
      {
        id: "a1-nomen-set1", name: "Set 1 – Familie",
        cards: [
          { id: "a1-n-mann",        german: "der Mann",       turkish: "adam",          sentence: "Der Mann arbeitet.",           opposite: "", imageKey: "a1-n-mann",        cardColor: "#E0F2FE", plural: "die Männer" },
          { id: "a1-n-frau",        german: "die Frau",       turkish: "kadın",         sentence: "Die Frau liest.",              opposite: "", imageKey: "a1-n-frau",        cardColor: "#FCE7F3", plural: "die Frauen" },
          { id: "a1-n-kind",        german: "das Kind",       turkish: "çocuk",         sentence: "Das Kind spielt.",             opposite: "", imageKey: "a1-n-kind",        cardColor: "#FEF9C3", plural: "die Kinder" },
          { id: "a1-n-vater",       german: "der Vater",      turkish: "baba",          sentence: "Der Vater kocht.",             opposite: "", imageKey: "a1-n-vater",       cardColor: "#DBEAFE", plural: "die Väter" },
          { id: "a1-n-mutter",      german: "die Mutter",     turkish: "anne",          sentence: "Die Mutter lächelt.",          opposite: "", imageKey: "a1-n-mutter",      cardColor: "#DCFCE7", plural: "die Mütter" },
          { id: "a1-n-bruder",      german: "der Bruder",     turkish: "erkek kardeş",  sentence: "Der Bruder ist jung.",         opposite: "", imageKey: "a1-n-bruder",      cardColor: "#E0E7FF", plural: "die Brüder" },
          { id: "a1-n-schwester",   german: "die Schwester",  turkish: "kız kardeş",    sentence: "Die Schwester hilft.",         opposite: "", imageKey: "a1-n-schwester",   cardColor: "#FEE2E2", plural: "die Schwestern" },
          { id: "a1-n-grossvater",  german: "der Großvater",  turkish: "büyükbaba",     sentence: "Der Großvater ist alt.",       opposite: "", imageKey: "a1-n-grossvater",  cardColor: "#F3E8FF", plural: "die Großväter" },
          { id: "a1-n-grossmutter", german: "die Großmutter", turkish: "büyükanne",     sentence: "Die Großmutter kocht.",        opposite: "", imageKey: "a1-n-grossmutter", cardColor: "#FFEDD5", plural: "die Großmütter" },
          { id: "a1-n-familie",     german: "die Familie",    turkish: "aile",          sentence: "Die Familie ist groß.",        opposite: "", imageKey: "a1-n-familie",     cardColor: "#D1FAE5", plural: "die Familien" },
        ],
      },
      {
        id: "a1-nomen-set2", name: "Set 2 – Haus",
        cards: [
          { id: "a1-n-haus",    german: "das Haus",    turkish: "ev",       sentence: "Das Haus ist groß.",     opposite: "", imageKey: "a1-n-haus",    cardColor: "#E0F2FE", plural: "die Häuser" },
          { id: "a1-n-wohnung", german: "die Wohnung", turkish: "daire",    sentence: "Die Wohnung ist klein.", opposite: "", imageKey: "a1-n-wohnung", cardColor: "#FCE7F3", plural: "die Wohnungen" },
          { id: "a1-n-zimmer",  german: "das Zimmer",  turkish: "oda",      sentence: "Das Zimmer ist schön.",  opposite: "", imageKey: "a1-n-zimmer",  cardColor: "#FEF9C3", plural: "die Zimmer" },
          { id: "a1-n-kueche",  german: "die Küche",   turkish: "mutfak",   sentence: "Die Küche ist neu.",     opposite: "", imageKey: "a1-n-kueche",  cardColor: "#DBEAFE", plural: "die Küchen" },
          { id: "a1-n-bad",     german: "das Bad",     turkish: "banyo",    sentence: "Das Bad ist klein.",     opposite: "", imageKey: "a1-n-bad",     cardColor: "#DCFCE7", plural: "die Bäder" },
          { id: "a1-n-tuer",    german: "die Tür",     turkish: "kapı",     sentence: "Die Tür ist offen.",     opposite: "", imageKey: "a1-n-tuer",    cardColor: "#E0E7FF", plural: "die Türen" },
          { id: "a1-n-fenster", german: "das Fenster", turkish: "pencere",  sentence: "Das Fenster ist groß.",  opposite: "", imageKey: "a1-n-fenster", cardColor: "#FEE2E2", plural: "die Fenster" },
          { id: "a1-n-tisch",   german: "der Tisch",   turkish: "masa",     sentence: "Der Tisch ist alt.",     opposite: "", imageKey: "a1-n-tisch",   cardColor: "#F3E8FF", plural: "die Tische" },
          { id: "a1-n-stuhl",   german: "der Stuhl",   turkish: "sandalye", sentence: "Der Stuhl ist bequem.",  opposite: "", imageKey: "a1-n-stuhl",   cardColor: "#FFEDD5", plural: "die Stühle" },
          { id: "a1-n-bett",    german: "das Bett",    turkish: "yatak",    sentence: "Das Bett ist weich.",    opposite: "", imageKey: "a1-n-bett",    cardColor: "#D1FAE5", plural: "die Betten" },
        ],
      },
      {
        id: "a1-nomen-set3", name: "Set 3 – Schule",
        cards: [
          { id: "a1-n-schule",     german: "die Schule",     turkish: "okul",     sentence: "Die Schule ist groß.",      opposite: "", imageKey: "a1-n-schule",     cardColor: "#E0F2FE", plural: "die Schulen" },
          { id: "a1-n-lehrer",     german: "der Lehrer",     turkish: "öğretmen", sentence: "Der Lehrer ist nett.",      opposite: "", imageKey: "a1-n-lehrer",     cardColor: "#FCE7F3", plural: "die Lehrer" },
          { id: "a1-n-schueler",   german: "der Schüler",    turkish: "öğrenci",  sentence: "Der Schüler lernt viel.",   opposite: "", imageKey: "a1-n-schueler",   cardColor: "#FEF9C3", plural: "die Schüler" },
          { id: "a1-n-buch",       german: "das Buch",       turkish: "kitap",    sentence: "Das Buch ist interessant.", opposite: "", imageKey: "a1-n-buch",       cardColor: "#DBEAFE", plural: "die Bücher" },
          { id: "a1-n-stift",      german: "der Stift",      turkish: "kalem",    sentence: "Der Stift ist rot.",        opposite: "", imageKey: "a1-n-stift",      cardColor: "#DCFCE7", plural: "die Stifte" },
          { id: "a1-n-heft",       german: "das Heft",       turkish: "defter",   sentence: "Das Heft ist neu.",         opposite: "", imageKey: "a1-n-heft",       cardColor: "#E0E7FF", plural: "die Hefte" },
          { id: "a1-n-tasche",     german: "die Tasche",     turkish: "çanta",    sentence: "Die Tasche ist schwer.",    opposite: "", imageKey: "a1-n-tasche",     cardColor: "#FEE2E2", plural: "die Taschen" },
          { id: "a1-n-klasse",     german: "die Klasse",     turkish: "sınıf",    sentence: "Die Klasse ist groß.",      opposite: "", imageKey: "a1-n-klasse",     cardColor: "#F3E8FF", plural: "die Klassen" },
          { id: "a1-n-unterricht", german: "der Unterricht", turkish: "ders",     sentence: "Der Unterricht beginnt.",   opposite: "", imageKey: "a1-n-unterricht", cardColor: "#FFEDD5", plural: "die Unterrichte" },
          { id: "a1-n-tafel",      german: "die Tafel",      turkish: "tahta",    sentence: "Die Tafel ist schwarz.",    opposite: "", imageKey: "a1-n-tafel",      cardColor: "#D1FAE5", plural: "die Tafeln" },
        ],
      },
      {
        id: "a1-nomen-set4", name: "Set 4 – Essen",
        cards: [
          { id: "a1-n-brot",    german: "das Brot",    turkish: "ekmek",   sentence: "Das Brot ist frisch.",    opposite: "", imageKey: "a1-n-brot",    cardColor: "#FEF9C3", plural: "die Brote" },
          { id: "a1-n-wasser",  german: "das Wasser",  turkish: "su",      sentence: "Das Wasser ist kalt.",    opposite: "", imageKey: "a1-n-wasser",  cardColor: "#E0F2FE", plural: "die Wässer" },
          { id: "a1-n-milch",   german: "die Milch",   turkish: "süt",     sentence: "Die Milch ist frisch.",   opposite: "", imageKey: "a1-n-milch",   cardColor: "#DBEAFE", plural: "–" },
          { id: "a1-n-kaffee",  german: "der Kaffee",  turkish: "kahve",   sentence: "Der Kaffee ist heiß.",    opposite: "", imageKey: "a1-n-kaffee",  cardColor: "#FFEDD5", plural: "die Kaffees" },
          { id: "a1-n-ei",      german: "das Ei",      turkish: "yumurta", sentence: "Das Ei ist frisch.",      opposite: "", imageKey: "a1-n-ei",      cardColor: "#FEF9C3", plural: "die Eier" },
          { id: "a1-n-apfel",   german: "der Apfel",   turkish: "elma",    sentence: "Der Apfel ist rot.",      opposite: "", imageKey: "a1-n-apfel",   cardColor: "#D1FAE5", plural: "die Äpfel" },
          { id: "a1-n-fleisch", german: "das Fleisch", turkish: "et",      sentence: "Das Fleisch ist frisch.", opposite: "", imageKey: "a1-n-fleisch", cardColor: "#FEE2E2", plural: "–" },
          { id: "a1-n-suppe",   german: "die Suppe",   turkish: "çorba",   sentence: "Die Suppe ist heiß.",     opposite: "", imageKey: "a1-n-suppe",   cardColor: "#FCE7F3", plural: "die Suppen" },
          { id: "a1-n-kuchen",  german: "der Kuchen",  turkish: "kek",     sentence: "Der Kuchen ist süß.",     opposite: "", imageKey: "a1-n-kuchen",  cardColor: "#F3E8FF", plural: "die Kuchen" },
          { id: "a1-n-obst",    german: "das Obst",    turkish: "meyve",   sentence: "Das Obst ist frisch.",    opposite: "", imageKey: "a1-n-obst",    cardColor: "#DCFCE7", plural: "–" },
        ],
      },
      {
        id: "a1-nomen-set5", name: "Set 5 – Transport",
        cards: [
          { id: "a1-n-auto",     german: "das Auto",     turkish: "araba",    sentence: "Das Auto ist schnell.",   opposite: "", imageKey: "a1-n-auto",     cardColor: "#E0F2FE", plural: "die Autos" },
          { id: "a1-n-bus",      german: "der Bus",      turkish: "otobüs",   sentence: "Der Bus kommt.",          opposite: "", imageKey: "a1-n-bus",      cardColor: "#DCFCE7", plural: "die Busse" },
          { id: "a1-n-zug",      german: "der Zug",      turkish: "tren",     sentence: "Der Zug ist schnell.",    opposite: "", imageKey: "a1-n-zug",      cardColor: "#FEF9C3", plural: "die Züge" },
          { id: "a1-n-fahrrad",  german: "das Fahrrad",  turkish: "bisiklet", sentence: "Das Fahrrad ist neu.",    opposite: "", imageKey: "a1-n-fahrrad",  cardColor: "#FCE7F3", plural: "die Fahrräder" },
          { id: "a1-n-flugzeug", german: "das Flugzeug", turkish: "uçak",     sentence: "Das Flugzeug ist groß.", opposite: "", imageKey: "a1-n-flugzeug", cardColor: "#DBEAFE", plural: "die Flugzeuge" },
          { id: "a1-n-schiff",   german: "das Schiff",   turkish: "gemi",     sentence: "Das Schiff ist groß.",   opposite: "", imageKey: "a1-n-schiff",   cardColor: "#E0E7FF", plural: "die Schiffe" },
          { id: "a1-n-bahnhof",  german: "der Bahnhof",  turkish: "istasyon", sentence: "Der Bahnhof ist alt.",   opposite: "", imageKey: "a1-n-bahnhof",  cardColor: "#FEE2E2", plural: "die Bahnhöfe" },
          { id: "a1-n-strasse",  german: "die Straße",   turkish: "sokak",    sentence: "Die Straße ist lang.",   opposite: "", imageKey: "a1-n-strasse",  cardColor: "#F3E8FF", plural: "die Straßen" },
          { id: "a1-n-taxi",     german: "das Taxi",     turkish: "taksi",    sentence: "Das Taxi kommt.",         opposite: "", imageKey: "a1-n-taxi",     cardColor: "#FFEDD5", plural: "die Taxis" },
          { id: "a1-n-ubahn",    german: "die U-Bahn",   turkish: "metro",    sentence: "Die U-Bahn ist schnell.", opposite: "", imageKey: "a1-n-ubahn",    cardColor: "#D1FAE5", plural: "die U-Bahnen" },
        ],
      },
      {
        id: "a1-nomen-set6", name: "Set 6 – Stadt",
        cards: [
          { id: "a1-n-stadt",       german: "die Stadt",       turkish: "şehir",       sentence: "Die Stadt ist groß.",       opposite: "", imageKey: "a1-n-stadt",       cardColor: "#E0F2FE", plural: "die Städte" },
          { id: "a1-n-restaurant",  german: "das Restaurant",  turkish: "restoran",    sentence: "Das Restaurant ist gut.",   opposite: "", imageKey: "a1-n-restaurant",  cardColor: "#DCFCE7", plural: "die Restaurants" },
          { id: "a1-n-hotel",       german: "das Hotel",       turkish: "otel",        sentence: "Das Hotel ist schön.",      opposite: "", imageKey: "a1-n-hotel",       cardColor: "#FEF9C3", plural: "die Hotels" },
          { id: "a1-n-markt",       german: "der Markt",       turkish: "pazar",       sentence: "Der Markt ist groß.",       opposite: "", imageKey: "a1-n-markt",       cardColor: "#FCE7F3", plural: "die Märkte" },
          { id: "a1-n-bank",        german: "die Bank",        turkish: "banka",       sentence: "Die Bank ist offen.",       opposite: "", imageKey: "a1-n-bank",        cardColor: "#DBEAFE", plural: "die Banken" },
          { id: "a1-n-krankenhaus", german: "das Krankenhaus", turkish: "hastane",     sentence: "Das Krankenhaus ist groß.", opposite: "", imageKey: "a1-n-krankenhaus", cardColor: "#FEE2E2", plural: "die Krankenhäuser" },
          { id: "a1-n-park",        german: "der Park",        turkish: "park",        sentence: "Der Park ist schön.",       opposite: "", imageKey: "a1-n-park",        cardColor: "#E0E7FF", plural: "die Parks" },
          { id: "a1-n-supermarkt",  german: "der Supermarkt",  turkish: "süpermarket", sentence: "Der Supermarkt ist groß.", opposite: "", imageKey: "a1-n-supermarkt",  cardColor: "#F3E8FF", plural: "die Supermärkte" },
          { id: "a1-n-apotheke",    german: "die Apotheke",    turkish: "eczane",      sentence: "Die Apotheke ist klein.",   opposite: "", imageKey: "a1-n-apotheke",    cardColor: "#FFEDD5", plural: "die Apotheken" },
          { id: "a1-n-kirche",      german: "die Kirche",      turkish: "kilise",      sentence: "Die Kirche ist alt.",       opposite: "", imageKey: "a1-n-kirche",      cardColor: "#D1FAE5", plural: "die Kirchen" },
        ],
      },
      {
        id: "a1-nomen-set7", name: "Set 7 – Zeit",
        cards: [
          { id: "a1-n-zeit",   german: "die Zeit",   turkish: "zaman",  sentence: "Die Zeit ist kurz.",              opposite: "", imageKey: "a1-n-zeit",   cardColor: "#E0F2FE", plural: "die Zeiten" },
          { id: "a1-n-tag",    german: "der Tag",    turkish: "gün",    sentence: "Der Tag ist lang.",               opposite: "", imageKey: "a1-n-tag",    cardColor: "#FEF9C3", plural: "die Tage" },
          { id: "a1-n-nacht",  german: "die Nacht",  turkish: "gece",   sentence: "Die Nacht ist kalt.",             opposite: "", imageKey: "a1-n-nacht",  cardColor: "#E0E7FF", plural: "die Nächte" },
          { id: "a1-n-woche",  german: "die Woche",  turkish: "hafta",  sentence: "Die Woche hat sieben Tage.",      opposite: "", imageKey: "a1-n-woche",  cardColor: "#DCFCE7", plural: "die Wochen" },
          { id: "a1-n-monat",  german: "der Monat",  turkish: "ay",     sentence: "Der Monat hat dreißig Tage.",     opposite: "", imageKey: "a1-n-monat",  cardColor: "#FCE7F3", plural: "die Monate" },
          { id: "a1-n-jahr",   german: "das Jahr",   turkish: "yıl",    sentence: "Das Jahr ist lang.",              opposite: "", imageKey: "a1-n-jahr",   cardColor: "#DBEAFE", plural: "die Jahre" },
          { id: "a1-n-stunde", german: "die Stunde", turkish: "saat",   sentence: "Die Stunde hat sechzig Minuten.", opposite: "", imageKey: "a1-n-stunde", cardColor: "#FEE2E2", plural: "die Stunden" },
          { id: "a1-n-minute", german: "die Minute", turkish: "dakika", sentence: "Eine Minute ist kurz.",           opposite: "", imageKey: "a1-n-minute", cardColor: "#F3E8FF", plural: "die Minuten" },
          { id: "a1-n-morgen", german: "der Morgen", turkish: "sabah",  sentence: "Der Morgen ist früh.",            opposite: "", imageKey: "a1-n-morgen", cardColor: "#FEF9C3", plural: "die Morgen" },
          { id: "a1-n-abend",  german: "der Abend",  turkish: "akşam",  sentence: "Der Abend ist ruhig.",            opposite: "", imageKey: "a1-n-abend",  cardColor: "#FFEDD5", plural: "die Abende" },
        ],
      },
      {
        id: "a1-nomen-set8", name: "Set 8 – Einkaufen",
        cards: [
          { id: "a1-n-geld",      german: "das Geld",     turkish: "para",      sentence: "Das Geld ist wichtig.",   opposite: "", imageKey: "a1-n-geld",      cardColor: "#FEF9C3", plural: "–" },
          { id: "a1-n-preis",     german: "der Preis",    turkish: "fiyat",     sentence: "Der Preis ist hoch.",     opposite: "", imageKey: "a1-n-preis",     cardColor: "#E0F2FE", plural: "die Preise" },
          { id: "a1-n-geschaeft", german: "das Geschäft", turkish: "dükkan",    sentence: "Das Geschäft ist offen.", opposite: "", imageKey: "a1-n-geschaeft", cardColor: "#DCFCE7", plural: "die Geschäfte" },
          { id: "a1-n-hose",      german: "die Hose",     turkish: "pantolon",  sentence: "Die Hose ist neu.",       opposite: "", imageKey: "a1-n-hose",      cardColor: "#FCE7F3", plural: "die Hosen" },
          { id: "a1-n-hemd",      german: "das Hemd",     turkish: "gömlek",    sentence: "Das Hemd ist weiß.",      opposite: "", imageKey: "a1-n-hemd",      cardColor: "#DBEAFE", plural: "die Hemden" },
          { id: "a1-n-schuh",     german: "der Schuh",    turkish: "ayakkabı",  sentence: "Der Schuh ist neu.",      opposite: "", imageKey: "a1-n-schuh",     cardColor: "#FEE2E2", plural: "die Schuhe" },
          { id: "a1-n-jacke",     german: "die Jacke",    turkish: "ceket",     sentence: "Die Jacke ist warm.",     opposite: "", imageKey: "a1-n-jacke",     cardColor: "#E0E7FF", plural: "die Jacken" },
          { id: "a1-n-kleid",     german: "das Kleid",    turkish: "elbise",    sentence: "Das Kleid ist schön.",    opposite: "", imageKey: "a1-n-kleid",     cardColor: "#F3E8FF", plural: "die Kleider" },
          { id: "a1-n-rechnung",  german: "die Rechnung", turkish: "fatura",    sentence: "Die Rechnung ist hoch.",  opposite: "", imageKey: "a1-n-rechnung",  cardColor: "#FFEDD5", plural: "die Rechnungen" },
          { id: "a1-n-einkauf",   german: "der Einkauf",  turkish: "alışveriş", sentence: "Der Einkauf ist fertig.", opposite: "", imageKey: "a1-n-einkauf",   cardColor: "#D1FAE5", plural: "die Einkäufe" },
        ],
      },
      {
        id: "a1-nomen-set9", name: "Set 9 – Gesundheit",
        cards: [
          { id: "a1-n-arzt",       german: "der Arzt",       turkish: "doktor", sentence: "Der Arzt ist gut.",       opposite: "", imageKey: "a1-n-arzt",       cardColor: "#E0F2FE", plural: "die Ärzte" },
          { id: "a1-n-medikament", german: "das Medikament", turkish: "ilaç",   sentence: "Das Medikament hilft.",   opposite: "", imageKey: "a1-n-medikament", cardColor: "#DCFCE7", plural: "die Medikamente" },
          { id: "a1-n-tablette",   german: "die Tablette",   turkish: "hap",    sentence: "Die Tablette ist klein.", opposite: "", imageKey: "a1-n-tablette",   cardColor: "#FEF9C3", plural: "die Tabletten" },
          { id: "a1-n-kopf",       german: "der Kopf",       turkish: "baş",    sentence: "Der Kopf tut weh.",       opposite: "", imageKey: "a1-n-kopf",       cardColor: "#FCE7F3", plural: "die Köpfe" },
          { id: "a1-n-hand",       german: "die Hand",       turkish: "el",     sentence: "Die Hand ist groß.",      opposite: "", imageKey: "a1-n-hand",       cardColor: "#DBEAFE", plural: "die Hände" },
          { id: "a1-n-bein",       german: "das Bein",       turkish: "bacak",  sentence: "Das Bein ist lang.",      opposite: "", imageKey: "a1-n-bein",       cardColor: "#FEE2E2", plural: "die Beine" },
          { id: "a1-n-arm",        german: "der Arm",        turkish: "kol",    sentence: "Der Arm ist stark.",      opposite: "", imageKey: "a1-n-arm",        cardColor: "#E0E7FF", plural: "die Arme" },
          { id: "a1-n-zahn",       german: "der Zahn",       turkish: "diş",    sentence: "Der Zahn ist weiß.",      opposite: "", imageKey: "a1-n-zahn",       cardColor: "#F3E8FF", plural: "die Zähne" },
          { id: "a1-n-auge",       german: "das Auge",       turkish: "göz",    sentence: "Das Auge ist blau.",      opposite: "", imageKey: "a1-n-auge",       cardColor: "#FFEDD5", plural: "die Augen" },
          { id: "a1-n-nase",       german: "die Nase",       turkish: "burun",  sentence: "Die Nase ist groß.",      opposite: "", imageKey: "a1-n-nase",       cardColor: "#D1FAE5", plural: "die Nasen" },
        ],
      },
      {
        id: "a1-nomen-set10", name: "Set 10 – Technologie",
        cards: [
          { id: "a1-n-handy",      german: "das Handy",      turkish: "cep telefonu", sentence: "Das Handy ist neu.",        opposite: "", imageKey: "a1-n-handy",      cardColor: "#E0F2FE", plural: "die Handys" },
          { id: "a1-n-computer",   german: "der Computer",   turkish: "bilgisayar",   sentence: "Der Computer ist schnell.", opposite: "", imageKey: "a1-n-computer",   cardColor: "#DCFCE7", plural: "die Computer" },
          { id: "a1-n-internet",   german: "das Internet",   turkish: "internet",     sentence: "Das Internet ist schnell.", opposite: "", imageKey: "a1-n-internet",   cardColor: "#FEF9C3", plural: "–" },
          { id: "a1-n-app",        german: "die App",        turkish: "uygulama",     sentence: "Die App ist gut.",          opposite: "", imageKey: "a1-n-app",        cardColor: "#FCE7F3", plural: "die Apps" },
          { id: "a1-n-foto",       german: "das Foto",       turkish: "fotoğraf",     sentence: "Das Foto ist schön.",       opposite: "", imageKey: "a1-n-foto",       cardColor: "#DBEAFE", plural: "die Fotos" },
          { id: "a1-n-fernseher",  german: "der Fernseher",  turkish: "televizyon",   sentence: "Der Fernseher ist groß.",   opposite: "", imageKey: "a1-n-fernseher",  cardColor: "#FEE2E2", plural: "die Fernseher" },
          { id: "a1-n-radio",      german: "das Radio",      turkish: "radyo",        sentence: "Das Radio ist alt.",        opposite: "", imageKey: "a1-n-radio",      cardColor: "#E0E7FF", plural: "die Radios" },
          { id: "a1-n-kamera",     german: "die Kamera",     turkish: "kamera",       sentence: "Die Kamera ist gut.",       opposite: "", imageKey: "a1-n-kamera",     cardColor: "#F3E8FF", plural: "die Kameras" },
          { id: "a1-n-tastatur",   german: "die Tastatur",   turkish: "klavye",       sentence: "Die Tastatur ist neu.",     opposite: "", imageKey: "a1-n-tastatur",   cardColor: "#FFEDD5", plural: "die Tastaturen" },
          { id: "a1-n-bildschirm", german: "der Bildschirm", turkish: "ekran",        sentence: "Der Bildschirm ist groß.", opposite: "", imageKey: "a1-n-bildschirm", cardColor: "#D1FAE5", plural: "die Bildschirme" },
        ],
      },
      {
        id: "a1-nomen-set11", name: "Set 11 – Alltag",
        cards: [
          { id: "a1-n-name",    german: "der Name",    turkish: "isim",      sentence: "Der Name ist schön.",      opposite: "", imageKey: "a1-n-name",    cardColor: "#E0F2FE", plural: "die Namen" },
          { id: "a1-n-frage",   german: "die Frage",   turkish: "soru",      sentence: "Die Frage ist schwer.",    opposite: "", imageKey: "a1-n-frage",   cardColor: "#FCE7F3", plural: "die Fragen" },
          { id: "a1-n-antwort", german: "die Antwort", turkish: "cevap",     sentence: "Die Antwort ist richtig.", opposite: "", imageKey: "a1-n-antwort", cardColor: "#FEF9C3", plural: "die Antworten" },
          { id: "a1-n-arbeit",  german: "die Arbeit",  turkish: "iş",        sentence: "Die Arbeit ist fertig.",   opposite: "", imageKey: "a1-n-arbeit",  cardColor: "#DBEAFE", plural: "die Arbeiten" },
          { id: "a1-n-pause",   german: "die Pause",   turkish: "mola",      sentence: "Die Pause ist kurz.",      opposite: "", imageKey: "a1-n-pause",   cardColor: "#DCFCE7", plural: "die Pausen" },
          { id: "a1-n-spiel",   german: "das Spiel",   turkish: "oyun",      sentence: "Das Spiel ist schön.",     opposite: "", imageKey: "a1-n-spiel",   cardColor: "#E0E7FF", plural: "die Spiele" },
          { id: "a1-n-anfang",  german: "der Anfang",  turkish: "başlangıç", sentence: "Der Anfang ist leicht.",   opposite: "", imageKey: "a1-n-anfang",  cardColor: "#FEE2E2", plural: "die Anfänge" },
          { id: "a1-n-ende",    german: "das Ende",    turkish: "son",       sentence: "Das Ende ist nah.",        opposite: "", imageKey: "a1-n-ende",    cardColor: "#F3E8FF", plural: "die Enden" },
          { id: "a1-n-platz",   german: "der Platz",   turkish: "yer",       sentence: "Der Platz ist frei.",      opposite: "", imageKey: "a1-n-platz",   cardColor: "#FFEDD5", plural: "die Plätze" },
          { id: "a1-n-gruppe",  german: "die Gruppe",  turkish: "grup",      sentence: "Die Gruppe ist groß.",     opposite: "", imageKey: "a1-n-gruppe",  cardColor: "#D1FAE5", plural: "die Gruppen" },
        ],
      },
      {
        id: "a1-nomen-set12", name: "Set 12 – Sprache",
        cards: [
          { id: "a1-n-sprache",  german: "die Sprache",  turkish: "dil",       sentence: "Die Sprache ist schön.",    opposite: "", imageKey: "a1-n-sprache",  cardColor: "#E0F2FE", plural: "die Sprachen" },
          { id: "a1-n-wort",     german: "das Wort",     turkish: "kelime",    sentence: "Das Wort ist neu.",         opposite: "", imageKey: "a1-n-wort",     cardColor: "#DCFCE7", plural: "die Wörter" },
          { id: "a1-n-satz",     german: "der Satz",     turkish: "cümle",     sentence: "Der Satz ist lang.",        opposite: "", imageKey: "a1-n-satz",     cardColor: "#FEF9C3", plural: "die Sätze" },
          { id: "a1-n-text",     german: "der Text",     turkish: "metin",     sentence: "Der Text ist kurz.",        opposite: "", imageKey: "a1-n-text",     cardColor: "#FCE7F3", plural: "die Texte" },
          { id: "a1-n-uebung",   german: "die Übung",    turkish: "alıştırma", sentence: "Die Übung ist gut.",        opposite: "", imageKey: "a1-n-uebung",   cardColor: "#DBEAFE", plural: "die Übungen" },
          { id: "a1-n-beispiel", german: "das Beispiel", turkish: "örnek",     sentence: "Das Beispiel ist einfach.", opposite: "", imageKey: "a1-n-beispiel", cardColor: "#FEE2E2", plural: "die Beispiele" },
          { id: "a1-n-fehler",   german: "der Fehler",   turkish: "hata",      sentence: "Der Fehler ist klein.",     opposite: "", imageKey: "a1-n-fehler",   cardColor: "#E0E7FF", plural: "die Fehler" },
          { id: "a1-n-loesung",  german: "die Lösung",   turkish: "çözüm",     sentence: "Die Lösung ist einfach.",   opposite: "", imageKey: "a1-n-loesung",  cardColor: "#F3E8FF", plural: "die Lösungen" },
          { id: "a1-n-nummer",   german: "die Nummer",   turkish: "numara",    sentence: "Die Nummer ist falsch.",    opposite: "", imageKey: "a1-n-nummer",   cardColor: "#FFEDD5", plural: "die Nummern" },
          { id: "a1-n-liste",    german: "die Liste",    turkish: "liste",     sentence: "Die Liste ist lang.",       opposite: "", imageKey: "a1-n-liste",    cardColor: "#D1FAE5", plural: "die Listen" },
        ],
      },
    ],
  },
  {
    id: "a1-verben",
    name: "A1 Verben",
    level: "A1",
    sets: [
      {
        id: "a1-vv-set1", name: "Set 1",
        cards: [
          { id: "a1-v-s1-sein",     german: "sein",     turkish: "olmak",        sentence: "Das ist gut.",            opposite: "", imageKey: "a1-v-sein",     cardColor: "#DBEAFE", perfekt: "ist gewesen",   praeteritum: "war" },
          { id: "a1-v-s1-haben",    german: "haben",    turkish: "sahip olmak",  sentence: "Ich habe eine Katze.",    opposite: "", imageKey: "a1-v-haben",    cardColor: "#DCFCE7", perfekt: "hat gehabt",    praeteritum: "hatte" },
          { id: "a1-v-s1-gehen",    german: "gehen",    turkish: "gitmek",       sentence: "Ich gehe zur Schule.",    opposite: "", imageKey: "a1-v-gehen",    cardColor: "#FEF9C3", perfekt: "ist gegangen",  praeteritum: "ging" },
          { id: "a1-v-s1-kommen",   german: "kommen",   turkish: "gelmek",       sentence: "Er kommt heute.",         opposite: "", imageKey: "a1-v-kommen",   cardColor: "#FCE7F3", perfekt: "ist gekommen",  praeteritum: "kam" },
          { id: "a1-v-s1-machen",   german: "machen",   turkish: "yapmak",       sentence: "Sie macht Hausaufgaben.", opposite: "", imageKey: "a1-v-machen",   cardColor: "#E0F2FE", perfekt: "hat gemacht",   praeteritum: "machte" },
          { id: "a1-v-s1-sehen",    german: "sehen",    turkish: "görmek",       sentence: "Ich sehe den Film.",      opposite: "", imageKey: "a1-v-sehen",    cardColor: "#FEE2E2", perfekt: "hat gesehen",   praeteritum: "sah" },
          { id: "a1-v-s1-sagen",    german: "sagen",    turkish: "söylemek",     sentence: "Er sagt Hallo.",          opposite: "", imageKey: "a1-v-sagen",    cardColor: "#E0E7FF", perfekt: "hat gesagt",    praeteritum: "sagte" },
          { id: "a1-v-s1-fragen",   german: "fragen",   turkish: "sormak",       sentence: "Das Kind fragt viel.",    opposite: "", imageKey: "a1-v-fragen",   cardColor: "#F3E8FF", perfekt: "hat gefragt",   praeteritum: "fragte" },
          { id: "a1-v-s1-lernen",   german: "lernen",   turkish: "öğrenmek",     sentence: "Wir lernen Deutsch.",     opposite: "", imageKey: "a1-v-lernen",   cardColor: "#FFEDD5", perfekt: "hat gelernt",   praeteritum: "lernte" },
          { id: "a1-v-s1-arbeiten", german: "arbeiten", turkish: "çalışmak",     sentence: "Er arbeitet viel.",       opposite: "", imageKey: "a1-v-arbeiten", cardColor: "#D1FAE5", perfekt: "hat gearbeitet",praeteritum: "arbeitete" },
        ],
      },
      {
        id: "a1-vv-set2", name: "Set 2",
        cards: [
          { id: "a1-v-s2-wohnen",    german: "wohnen",    turkish: "ikamet etmek", sentence: "Ich wohne in Berlin.",      opposite: "", imageKey: "a1-v-wohnen",    cardColor: "#DBEAFE", perfekt: "hat gewohnt",     praeteritum: "wohnte" },
          { id: "a1-v-s2-leben",     german: "leben",     turkish: "yaşamak",      sentence: "Sie leben in der Stadt.",   opposite: "", imageKey: "a1-v-leben",     cardColor: "#DCFCE7", perfekt: "hat gelebt",      praeteritum: "lebte" },
          { id: "a1-v-s2-lieben",    german: "lieben",    turkish: "sevmek",       sentence: "Er liebt seine Familie.",   opposite: "", imageKey: "a1-v-lieben",    cardColor: "#FEF9C3", perfekt: "hat geliebt",     praeteritum: "liebte" },
          { id: "a1-v-s2-moegen",    german: "mögen",     turkish: "hoşlanmak",    sentence: "Ich mag Äpfel.",            opposite: "", imageKey: "a1-v-moegen",    cardColor: "#FCE7F3", perfekt: "hat gemocht",     praeteritum: "mochte" },
          { id: "a1-v-s2-spielen",   german: "spielen",   turkish: "oynamak",      sentence: "Das Kind spielt.",          opposite: "", imageKey: "a1-v-spielen",   cardColor: "#E0F2FE", perfekt: "hat gespielt",    praeteritum: "spielte" },
          { id: "a1-v-s2-lesen",     german: "lesen",     turkish: "okumak",       sentence: "Sie liest ein Buch.",       opposite: "", imageKey: "a1-v-lesen",     cardColor: "#FEE2E2", perfekt: "hat gelesen",     praeteritum: "las" },
          { id: "a1-v-s2-schreiben", german: "schreiben", turkish: "yazmak",       sentence: "Ich schreibe einen Brief.", opposite: "", imageKey: "a1-v-schreiben", cardColor: "#E0E7FF", perfekt: "hat geschrieben", praeteritum: "schrieb" },
          { id: "a1-v-s2-sprechen",  german: "sprechen",  turkish: "konuşmak",     sentence: "Er spricht Deutsch.",       opposite: "", imageKey: "a1-v-sprechen",  cardColor: "#F3E8FF", perfekt: "hat gesprochen",  praeteritum: "sprach" },
          { id: "a1-v-s2-hoeren",    german: "hören",     turkish: "duymak",       sentence: "Sie hört Musik.",           opposite: "", imageKey: "a1-v-hoeren",    cardColor: "#FFEDD5", perfekt: "hat gehört",      praeteritum: "hörte" },
          { id: "a1-v-s2-essen",     german: "essen",     turkish: "yemek yemek",  sentence: "Wir essen Pizza.",          opposite: "", imageKey: "a1-v-essen",     cardColor: "#D1FAE5", perfekt: "hat gegessen",    praeteritum: "aß" },
        ],
      },
      {
        id: "a1-vv-set3", name: "Set 3",
        cards: [
          { id: "a1-v-s3-trinken",   german: "trinken",   turkish: "içmek",           sentence: "Ich trinke Wasser.",        opposite: "", imageKey: "a1-v-trinken",   cardColor: "#DBEAFE", perfekt: "hat getrunken",  praeteritum: "trank" },
          { id: "a1-v-s3-kochen",    german: "kochen",    turkish: "pişirmek",        sentence: "Die Mutter kocht.",         opposite: "", imageKey: "a1-v-kochen",    cardColor: "#DCFCE7", perfekt: "hat gekocht",    praeteritum: "kochte" },
          { id: "a1-v-s3-kaufen",    german: "kaufen",    turkish: "satın almak",     sentence: "Er kauft Brot.",            opposite: "", imageKey: "a1-v-kaufen",    cardColor: "#FEF9C3", perfekt: "hat gekauft",    praeteritum: "kaufte" },
          { id: "a1-v-s3-bezahlen",  german: "bezahlen",  turkish: "ödemek",          sentence: "Ich bezahle die Rechnung.", opposite: "", imageKey: "a1-v-bezahlen",  cardColor: "#FCE7F3", perfekt: "hat bezahlt",    praeteritum: "bezahlte" },
          { id: "a1-v-s3-nehmen",    german: "nehmen",    turkish: "almak",           sentence: "Sie nimmt die Tasche.",     opposite: "", imageKey: "a1-v-nehmen",    cardColor: "#E0F2FE", perfekt: "hat genommen",   praeteritum: "nahm" },
          { id: "a1-v-s3-geben",     german: "geben",     turkish: "vermek",          sentence: "Er gibt mir das Buch.",     opposite: "", imageKey: "a1-v-geben",     cardColor: "#FEE2E2", perfekt: "hat gegeben",    praeteritum: "gab" },
          { id: "a1-v-s3-bringen",   german: "bringen",   turkish: "getirmek",        sentence: "Ich bringe den Kaffee.",    opposite: "", imageKey: "a1-v-bringen",   cardColor: "#E0E7FF", perfekt: "hat gebracht",   praeteritum: "brachte" },
          { id: "a1-v-s3-holen",     german: "holen",     turkish: "almak / getirmek",sentence: "Er holt das Wasser.",       opposite: "", imageKey: "a1-v-holen",     cardColor: "#F3E8FF", perfekt: "hat geholt",     praeteritum: "holte" },
          { id: "a1-v-s3-finden",    german: "finden",    turkish: "bulmak",          sentence: "Ich finde den Schlüssel.",  opposite: "", imageKey: "a1-v-finden",    cardColor: "#FFEDD5", perfekt: "hat gefunden",   praeteritum: "fand" },
          { id: "a1-v-s3-suchen",    german: "suchen",    turkish: "aramak",          sentence: "Sie sucht ihr Handy.",      opposite: "", imageKey: "a1-v-suchen",    cardColor: "#D1FAE5", perfekt: "hat gesucht",    praeteritum: "suchte" },
        ],
      },
      {
        id: "a1-vv-set4", name: "Set 4",
        cards: [
          { id: "a1-v-s4-fahren",     german: "fahren",     turkish: "araçla gitmek",  sentence: "Er fährt Auto.",               opposite: "", imageKey: "a1-v-fahren",     cardColor: "#DBEAFE", perfekt: "ist gefahren",    praeteritum: "fuhr" },
          { id: "a1-v-s4-laufen",     german: "laufen",     turkish: "koşmak",         sentence: "Das Kind läuft schnell.",      opposite: "", imageKey: "a1-v-laufen",     cardColor: "#DCFCE7", perfekt: "ist gelaufen",    praeteritum: "lief" },
          { id: "a1-v-s4-reisen",     german: "reisen",     turkish: "seyahat etmek",  sentence: "Wir reisen nach Berlin.",      opposite: "", imageKey: "a1-v-reisen",     cardColor: "#FEF9C3", perfekt: "ist gereist",     praeteritum: "reiste" },
          { id: "a1-v-s4-ankommen",   german: "ankommen",   turkish: "varmak",         sentence: "Der Zug kommt an.",            opposite: "", imageKey: "a1-v-ankommen",   cardColor: "#FCE7F3", perfekt: "ist angekommen",  praeteritum: "kam an",    trennbar: true },
          { id: "a1-v-s4-abfahren",   german: "abfahren",   turkish: "ayrılmak",       sentence: "Der Bus fährt ab.",            opposite: "", imageKey: "a1-v-abfahren",   cardColor: "#E0F2FE", perfekt: "ist abgefahren",  praeteritum: "fuhr ab",   trennbar: true },
          { id: "a1-v-s4-einsteigen", german: "einsteigen", turkish: "binmek",         sentence: "Wir steigen in den Bus ein.",  opposite: "", imageKey: "a1-v-einsteigen", cardColor: "#FEE2E2", perfekt: "ist eingestiegen",praeteritum: "stieg ein", trennbar: true },
          { id: "a1-v-s4-aussteigen", german: "aussteigen", turkish: "inmek",          sentence: "Er steigt aus dem Zug aus.",   opposite: "", imageKey: "a1-v-aussteigen", cardColor: "#E0E7FF", perfekt: "ist ausgestiegen",praeteritum: "stieg aus", trennbar: true },
          { id: "a1-v-s4-mitkommen",  german: "mitkommen",  turkish: "birlikte gelmek",sentence: "Kommst du mit?",              opposite: "", imageKey: "a1-v-mitkommen",  cardColor: "#F3E8FF", perfekt: "ist mitgekommen", praeteritum: "kam mit",   trennbar: true },
          { id: "a1-v-s4-bleiben",    german: "bleiben",    turkish: "kalmak",         sentence: "Ich bleibe zu Hause.",         opposite: "", imageKey: "a1-v-bleiben",    cardColor: "#FFEDD5", perfekt: "ist geblieben",   praeteritum: "blieb" },
          { id: "a1-v-s4-besuchen",   german: "besuchen",   turkish: "ziyaret etmek",  sentence: "Wir besuchen die Familie.",    opposite: "", imageKey: "a1-v-besuchen",   cardColor: "#D1FAE5", perfekt: "hat besucht",     praeteritum: "besuchte" },
        ],
      },
      {
        id: "a1-vv-set5", name: "Set 5",
        cards: [
          { id: "a1-v-s5-beginnen",   german: "beginnen",   turkish: "başlamak",     sentence: "Der Unterricht beginnt.",   opposite: "", imageKey: "a1-v-beginnen",   cardColor: "#DBEAFE", perfekt: "hat begonnen",    praeteritum: "begann" },
          { id: "a1-v-s5-enden",      german: "enden",      turkish: "bitmek",       sentence: "Das Spiel endet.",          opposite: "", imageKey: "a1-v-enden",      cardColor: "#DCFCE7", perfekt: "hat geendet",     praeteritum: "endete" },
          { id: "a1-v-s5-oeffnen",    german: "öffnen",     turkish: "açmak",        sentence: "Er öffnet die Tür.",        opposite: "", imageKey: "a1-v-oeffnen",    cardColor: "#FEF9C3", perfekt: "hat geöffnet",    praeteritum: "öffnete" },
          { id: "a1-v-s5-schliessen", german: "schließen",  turkish: "kapatmak",     sentence: "Sie schließt das Fenster.", opposite: "", imageKey: "a1-v-schliessen", cardColor: "#FCE7F3", perfekt: "hat geschlossen", praeteritum: "schloss" },
          { id: "a1-v-s5-treffen",    german: "treffen",    turkish: "buluşmak",     sentence: "Ich treffe meine Freunde.", opposite: "", imageKey: "a1-v-treffen",    cardColor: "#E0F2FE", perfekt: "hat getroffen",   praeteritum: "traf" },
          { id: "a1-v-s5-helfen",     german: "helfen",     turkish: "yardım etmek", sentence: "Er hilft mir.",             opposite: "", imageKey: "a1-v-helfen",     cardColor: "#FEE2E2", perfekt: "hat geholfen",    praeteritum: "half" },
          { id: "a1-v-s5-zeigen",     german: "zeigen",     turkish: "göstermek",    sentence: "Sie zeigt den Weg.",        opposite: "", imageKey: "a1-v-zeigen",     cardColor: "#E0E7FF", perfekt: "hat gezeigt",     praeteritum: "zeigte" },
          { id: "a1-v-s5-erklaeren",  german: "erklären",   turkish: "açıklamak",    sentence: "Der Lehrer erklärt das.",   opposite: "", imageKey: "a1-v-erklaeren",  cardColor: "#F3E8FF", perfekt: "hat erklärt",     praeteritum: "erklärte" },
          { id: "a1-v-s5-versuchen",  german: "versuchen",  turkish: "denemek",      sentence: "Ich versuche es.",          opposite: "", imageKey: "a1-v-versuchen",  cardColor: "#FFEDD5", perfekt: "hat versucht",    praeteritum: "versuchte" },
          { id: "a1-v-s5-planen",     german: "planen",     turkish: "planlamak",    sentence: "Wir planen eine Reise.",    opposite: "", imageKey: "a1-v-planen",     cardColor: "#D1FAE5", perfekt: "hat geplant",     praeteritum: "plante" },
        ],
      },
      {
        id: "a1-vv-set6", name: "Set 6",
        cards: [
          { id: "a1-v-s6-denken",    german: "denken",    turkish: "düşünmek",     sentence: "Ich denke viel.",          opposite: "", imageKey: "a1-v-denken",    cardColor: "#DBEAFE", perfekt: "hat gedacht",     praeteritum: "dachte" },
          { id: "a1-v-s6-glauben",   german: "glauben",   turkish: "inanmak",      sentence: "Er glaubt das nicht.",     opposite: "", imageKey: "a1-v-glauben",   cardColor: "#DCFCE7", perfekt: "hat geglaubt",    praeteritum: "glaubte" },
          { id: "a1-v-s6-wissen",    german: "wissen",    turkish: "bilmek",       sentence: "Ich weiß die Antwort.",    opposite: "", imageKey: "a1-v-wissen",    cardColor: "#FEF9C3", perfekt: "hat gewusst",     praeteritum: "wusste" },
          { id: "a1-v-s6-verstehen", german: "verstehen", turkish: "anlamak",      sentence: "Sie versteht die Frage.",  opposite: "", imageKey: "a1-v-verstehen", cardColor: "#FCE7F3", perfekt: "hat verstanden",  praeteritum: "verstand" },
          { id: "a1-v-s6-merken",    german: "merken",    turkish: "fark etmek",   sentence: "Er merkt den Fehler.",     opposite: "", imageKey: "a1-v-merken",    cardColor: "#E0F2FE", perfekt: "hat gemerkt",     praeteritum: "merkte" },
          { id: "a1-v-s6-vergessen", german: "vergessen", turkish: "unutmak",      sentence: "Ich vergesse das nie.",    opposite: "", imageKey: "a1-v-vergessen", cardColor: "#FEE2E2", perfekt: "hat vergessen",   praeteritum: "vergaß" },
          { id: "a1-v-s6-erinnern",  german: "erinnern",  turkish: "hatırlamak",   sentence: "Sie erinnert sich.",       opposite: "", imageKey: "a1-v-erinnern",  cardColor: "#E0E7FF", perfekt: "hat erinnert",    praeteritum: "erinnerte" },
          { id: "a1-v-s6-fragen",    german: "fragen",    turkish: "sormak",       sentence: "Das Kind fragt.",          opposite: "", imageKey: "a1-v-fragen",    cardColor: "#F3E8FF", perfekt: "hat gefragt",     praeteritum: "fragte" },
          { id: "a1-v-s6-antworten", german: "antworten", turkish: "cevap vermek", sentence: "Der Schüler antwortet.",   opposite: "", imageKey: "a1-v-antworten", cardColor: "#FFEDD5", perfekt: "hat geantwortet", praeteritum: "antwortete" },
          { id: "a1-v-s6-lernen",    german: "lernen",    turkish: "öğrenmek",     sentence: "Er lernt jeden Tag.",      opposite: "", imageKey: "a1-v-lernen",    cardColor: "#D1FAE5", perfekt: "hat gelernt",     praeteritum: "lernte" },
        ],
      },
      {
        id: "a1-vv-set7", name: "Set 7",
        cards: [
          { id: "a1-v-s7-ueben",         german: "üben",          turkish: "alıştırma yapmak", sentence: "Wir üben jeden Tag.",          opposite: "", imageKey: "a1-v-ueben",         cardColor: "#DBEAFE", perfekt: "hat geübt",        praeteritum: "übte" },
          { id: "a1-v-s7-wiederholen",   german: "wiederholen",   turkish: "tekrar etmek",     sentence: "Ich wiederhole das Wort.",      opposite: "", imageKey: "a1-v-wiederholen",   cardColor: "#DCFCE7", perfekt: "hat wiederholt",   praeteritum: "wiederholte" },
          { id: "a1-v-s7-bestehen",      german: "bestehen",      turkish: "geçmek",           sentence: "Er besteht die Prüfung.",       opposite: "", imageKey: "a1-v-bestehen",      cardColor: "#FEF9C3", perfekt: "hat bestanden",    praeteritum: "bestand" },
          { id: "a1-v-s7-organisieren",  german: "organisieren",  turkish: "organize etmek",   sentence: "Sie organisiert das Fest.",     opposite: "", imageKey: "a1-v-organisieren",  cardColor: "#FCE7F3", perfekt: "hat organisiert",  praeteritum: "organisierte" },
          { id: "a1-v-s7-probieren",     german: "probieren",     turkish: "denemek",          sentence: "Ich probiere das Essen.",       opposite: "", imageKey: "a1-v-probieren",     cardColor: "#E0F2FE", perfekt: "hat probiert",     praeteritum: "probierte" },
          { id: "a1-v-s7-kontrollieren", german: "kontrollieren", turkish: "kontrol etmek",    sentence: "Er kontrolliert die Arbeit.",   opposite: "", imageKey: "a1-v-kontrollieren", cardColor: "#FEE2E2", perfekt: "hat kontrolliert", praeteritum: "kontrollierte" },
          { id: "a1-v-s7-verbessern",    german: "verbessern",    turkish: "geliştirmek",      sentence: "Ich verbessere mein Deutsch.",  opposite: "", imageKey: "a1-v-verbessern",    cardColor: "#E0E7FF", perfekt: "hat verbessert",   praeteritum: "verbesserte" },
          { id: "a1-v-s7-erklaeren",     german: "erklären",      turkish: "açıklamak",        sentence: "Sie erklärt die Aufgabe.",      opposite: "", imageKey: "a1-v-erklaeren",     cardColor: "#F3E8FF", perfekt: "hat erklärt",      praeteritum: "erklärte" },
          { id: "a1-v-s7-planen",        german: "planen",        turkish: "planlamak",        sentence: "Er plant den Urlaub.",          opposite: "", imageKey: "a1-v-planen",        cardColor: "#FFEDD5", perfekt: "hat geplant",      praeteritum: "plante" },
          { id: "a1-v-s7-arbeiten",      german: "arbeiten",      turkish: "çalışmak",         sentence: "Die Studenten arbeiten.",       opposite: "", imageKey: "a1-v-arbeiten",      cardColor: "#D1FAE5", perfekt: "hat gearbeitet",   praeteritum: "arbeitete" },
        ],
      },
      {
        id: "a1-vv-set8", name: "Set 8",
        cards: [
          { id: "a1-v-s8-umziehen",  german: "umziehen",  turkish: "taşınmak",     sentence: "Sie zieht um.",             opposite: "", imageKey: "a1-v-umziehen",  cardColor: "#DBEAFE", perfekt: "ist umgezogen",  praeteritum: "zog um",   trennbar: true },
          { id: "a1-v-s8-mieten",    german: "mieten",    turkish: "kiralamak",    sentence: "Wir mieten eine Wohnung.",  opposite: "", imageKey: "a1-v-mieten",    cardColor: "#DCFCE7", perfekt: "hat gemietet",   praeteritum: "mietete" },
          { id: "a1-v-s8-bauen",     german: "bauen",     turkish: "inşa etmek",   sentence: "Er baut ein Haus.",         opposite: "", imageKey: "a1-v-bauen",     cardColor: "#FEF9C3", perfekt: "hat gebaut",     praeteritum: "baute" },
          { id: "a1-v-s8-reparieren",german: "reparieren",turkish: "tamir etmek",  sentence: "Er repariert das Auto.",    opposite: "", imageKey: "a1-v-reparieren",cardColor: "#FCE7F3", perfekt: "hat repariert",  praeteritum: "reparierte" },
          { id: "a1-v-s8-arbeiten",  german: "arbeiten",  turkish: "çalışmak",     sentence: "Er arbeitet zu Hause.",    opposite: "", imageKey: "a1-v-arbeiten",  cardColor: "#E0F2FE", perfekt: "hat gearbeitet", praeteritum: "arbeitete" },
          { id: "a1-v-s8-leben",     german: "leben",     turkish: "yaşamak",      sentence: "Wir leben hier.",          opposite: "", imageKey: "a1-v-leben",     cardColor: "#FEE2E2", perfekt: "hat gelebt",     praeteritum: "lebte" },
          { id: "a1-v-s8-wohnen",    german: "wohnen",    turkish: "ikamet etmek", sentence: "Sie wohnt allein.",        opposite: "", imageKey: "a1-v-wohnen",    cardColor: "#E0E7FF", perfekt: "hat gewohnt",    praeteritum: "wohnte" },
          { id: "a1-v-s8-bleiben",   german: "bleiben",   turkish: "kalmak",       sentence: "Wir bleiben hier.",        opposite: "", imageKey: "a1-v-bleiben",   cardColor: "#F3E8FF", perfekt: "ist geblieben",  praeteritum: "blieb" },
          { id: "a1-v-s8-finden",    german: "finden",    turkish: "bulmak",       sentence: "Er findet die Antwort.",   opposite: "", imageKey: "a1-v-finden",    cardColor: "#FFEDD5", perfekt: "hat gefunden",   praeteritum: "fand" },
          { id: "a1-v-s8-suchen",    german: "suchen",    turkish: "aramak",       sentence: "Sie sucht eine Wohnung.",  opposite: "", imageKey: "a1-v-suchen",    cardColor: "#D1FAE5", perfekt: "hat gesucht",    praeteritum: "suchte" },
        ],
      },
      {
        id: "a1-vv-set9", name: "Set 9",
        cards: [
          { id: "a1-v-s9-fuehlen",   german: "fühlen",   turkish: "hissetmek",    sentence: "Ich fühle mich gut.",          opposite: "", imageKey: "a1-v-fuehlen",   cardColor: "#DBEAFE", perfekt: "hat gefühlt",   praeteritum: "fühlte" },
          { id: "a1-v-s9-lieben",    german: "lieben",   turkish: "sevmek",       sentence: "Er liebt Musik.",              opposite: "", imageKey: "a1-v-lieben",    cardColor: "#DCFCE7", perfekt: "hat geliebt",   praeteritum: "liebte" },
          { id: "a1-v-s9-hassen",    german: "hassen",   turkish: "nefret etmek", sentence: "Er hasst Lärm.",               opposite: "", imageKey: "a1-v-hassen",    cardColor: "#FEF9C3", perfekt: "hat gehasst",   praeteritum: "hasste" },
          { id: "a1-v-s9-moegen",    german: "mögen",    turkish: "hoşlanmak",    sentence: "Sie mag Schokolade.",          opposite: "", imageKey: "a1-v-moegen",    cardColor: "#FCE7F3", perfekt: "hat gemocht",   praeteritum: "mochte" },
          { id: "a1-v-s9-lachen",    german: "lachen",   turkish: "gülmek",       sentence: "Das Kind lacht.",              opposite: "", imageKey: "a1-v-lachen",    cardColor: "#E0F2FE", perfekt: "hat gelacht",   praeteritum: "lachte" },
          { id: "a1-v-s9-weinen",    german: "weinen",   turkish: "ağlamak",      sentence: "Sie weint.",                   opposite: "", imageKey: "a1-v-weinen",    cardColor: "#FEE2E2", perfekt: "hat geweint",   praeteritum: "weinte" },
          { id: "a1-v-s9-hoffen",    german: "hoffen",   turkish: "ummak",        sentence: "Ich hoffe es.",                opposite: "", imageKey: "a1-v-hoffen",    cardColor: "#E0E7FF", perfekt: "hat gehofft",   praeteritum: "hoffte" },
          { id: "a1-v-s9-wuenschen", german: "wünschen", turkish: "dilemek",      sentence: "Ich wünsche dir alles Gute.", opposite: "", imageKey: "a1-v-wuenschen", cardColor: "#F3E8FF", perfekt: "hat gewünscht", praeteritum: "wünschte" },
          { id: "a1-v-s9-traeumen",  german: "träumen",  turkish: "rüya görmek",  sentence: "Er träumt von der Reise.",     opposite: "", imageKey: "a1-v-traeumen",  cardColor: "#FFEDD5", perfekt: "hat geträumt",  praeteritum: "träumte" },
          { id: "a1-v-s9-denken",    german: "denken",   turkish: "düşünmek",     sentence: "Sie denkt nach.",              opposite: "", imageKey: "a1-v-denken",    cardColor: "#D1FAE5", perfekt: "hat gedacht",   praeteritum: "dachte" },
        ],
      },
      {
        id: "a1-vv-set10", name: "Set 10",
        cards: [
          { id: "a1-v-s10-regnen",        german: "regnen",        turkish: "yağmur yağmak", sentence: "Es regnet heute.",          opposite: "", imageKey: "a1-v-regnen",        cardColor: "#DBEAFE", perfekt: "hat geregnet",     praeteritum: "regnete" },
          { id: "a1-v-s10-schneien",      german: "schneien",      turkish: "kar yağmak",    sentence: "Es schneit draußen.",       opposite: "", imageKey: "a1-v-schneien",      cardColor: "#DCFCE7", perfekt: "hat geschneit",    praeteritum: "schneite" },
          { id: "a1-v-s10-scheinen",      german: "scheinen",      turkish: "parlamak",      sentence: "Die Sonne scheint.",        opposite: "", imageKey: "a1-v-scheinen",      cardColor: "#FEF9C3", perfekt: "hat geschienen",   praeteritum: "schien" },
          { id: "a1-v-s10-werden",        german: "werden",        turkish: "olmak",         sentence: "Er wird Arzt.",             opposite: "", imageKey: "a1-v-werden",        cardColor: "#FCE7F3", perfekt: "ist geworden",     praeteritum: "wurde" },
          { id: "a1-v-s10-bleiben",       german: "bleiben",       turkish: "kalmak",        sentence: "Es bleibt kalt.",           opposite: "", imageKey: "a1-v-bleiben",       cardColor: "#E0F2FE", perfekt: "ist geblieben",    praeteritum: "blieb" },
          { id: "a1-v-s10-passieren",     german: "passieren",     turkish: "olmak",         sentence: "Was passiert hier?",        opposite: "", imageKey: "a1-v-passieren",     cardColor: "#FEE2E2", perfekt: "ist passiert",     praeteritum: "passierte" },
          { id: "a1-v-s10-funktionieren", german: "funktionieren", turkish: "çalışmak",      sentence: "Das Handy funktioniert.",   opposite: "", imageKey: "a1-v-funktionieren", cardColor: "#E0E7FF", perfekt: "hat funktioniert", praeteritum: "funktionierte" },
          { id: "a1-v-s10-beginnen",      german: "beginnen",      turkish: "başlamak",      sentence: "Der Film beginnt.",         opposite: "", imageKey: "a1-v-beginnen",      cardColor: "#F3E8FF", perfekt: "hat begonnen",     praeteritum: "begann" },
          { id: "a1-v-s10-enden",         german: "enden",         turkish: "bitmek",        sentence: "Der Unterricht endet.",     opposite: "", imageKey: "a1-v-enden",         cardColor: "#FFEDD5", perfekt: "hat geendet",      praeteritum: "endete" },
          { id: "a1-v-s10-aendern",       german: "ändern",        turkish: "değiştirmek",   sentence: "Das ändert alles.",         opposite: "", imageKey: "a1-v-aendern",       cardColor: "#D1FAE5", perfekt: "hat geändert",     praeteritum: "änderte" },
        ],
      },
      {
        id: "a1-vv-set11", name: "Set 11",
        cards: [
          { id: "a1-v-s11-lernen",       german: "lernen",       turkish: "öğrenmek",            sentence: "Wir lernen zusammen.",         opposite: "", imageKey: "a1-v-lernen",       cardColor: "#DBEAFE", perfekt: "hat gelernt",       praeteritum: "lernte" },
          { id: "a1-v-s11-studieren",    german: "studieren",    turkish: "üniversitede okumak", sentence: "Er studiert Medizin.",          opposite: "", imageKey: "a1-v-studieren",    cardColor: "#DCFCE7", perfekt: "hat studiert",      praeteritum: "studierte" },
          { id: "a1-v-s11-fragen",       german: "fragen",       turkish: "sormak",              sentence: "Ich frage den Lehrer.",         opposite: "", imageKey: "a1-v-fragen",       cardColor: "#FEF9C3", perfekt: "hat gefragt",       praeteritum: "fragte" },
          { id: "a1-v-s11-antworten",    german: "antworten",    turkish: "cevap vermek",        sentence: "Sie antwortet richtig.",        opposite: "", imageKey: "a1-v-antworten",    cardColor: "#FCE7F3", perfekt: "hat geantwortet",   praeteritum: "antwortete" },
          { id: "a1-v-s11-erzaehlen",    german: "erzählen",     turkish: "anlatmak",            sentence: "Er erzählt eine Geschichte.",   opposite: "", imageKey: "a1-v-erzaehlen",    cardColor: "#E0F2FE", perfekt: "hat erzählt",       praeteritum: "erzählte" },
          { id: "a1-v-s11-erklaeren",    german: "erklären",     turkish: "açıklamak",           sentence: "Sie erklärt es noch einmal.",   opposite: "", imageKey: "a1-v-erklaeren",    cardColor: "#FEE2E2", perfekt: "hat erklärt",       praeteritum: "erklärte" },
          { id: "a1-v-s11-verstehen",    german: "verstehen",    turkish: "anlamak",             sentence: "Ich verstehe das nicht.",       opposite: "", imageKey: "a1-v-verstehen",    cardColor: "#E0E7FF", perfekt: "hat verstanden",    praeteritum: "verstand" },
          { id: "a1-v-s11-kennen",       german: "kennen",       turkish: "tanımak",             sentence: "Ich kenne ihn gut.",            opposite: "", imageKey: "a1-v-kennen",       cardColor: "#F3E8FF", perfekt: "hat gekannt",       praeteritum: "kannte" },
          { id: "a1-v-s11-kennenlernen", german: "kennenlernen", turkish: "tanışmak",            sentence: "Wir lernen uns kennen.",        opposite: "", imageKey: "a1-v-kennenlernen", cardColor: "#FFEDD5", perfekt: "hat kennengelernt", praeteritum: "lernte kennen", trennbar: true },
          { id: "a1-v-s11-meinen",       german: "meinen",       turkish: "kastetmek",           sentence: "Was meinst du?",                opposite: "", imageKey: "a1-v-meinen",       cardColor: "#D1FAE5", perfekt: "hat gemeint",       praeteritum: "meinte" },
        ],
      },
      {
        id: "a1-vv-set12", name: "Set 12",
        cards: [
          { id: "a1-v-s12-brauchen",  german: "brauchen",  turkish: "ihtiyaç duymak",  sentence: "Ich brauche Hilfe.",           opposite: "", imageKey: "a1-v-brauchen",  cardColor: "#DBEAFE", perfekt: "hat gebraucht",  praeteritum: "brauchte" },
          { id: "a1-v-s12-wollen",    german: "wollen",    turkish: "istemek",          sentence: "Er will schlafen.",            opposite: "", imageKey: "a1-v-wollen",    cardColor: "#DCFCE7", perfekt: "hat gewollt",    praeteritum: "wollte" },
          { id: "a1-v-s12-muessen",   german: "müssen",    turkish: "zorunda olmak",    sentence: "Ich muss gehen.",              opposite: "", imageKey: "a1-v-muessen",   cardColor: "#FEF9C3", perfekt: "hat gemusst",    praeteritum: "musste" },
          { id: "a1-v-s12-duerfen",   german: "dürfen",    turkish: "izni olmak",       sentence: "Du darfst das.",               opposite: "", imageKey: "a1-v-duerfen",   cardColor: "#FCE7F3", perfekt: "hat gedurft",    praeteritum: "durfte" },
          { id: "a1-v-s12-sollen",    german: "sollen",    turkish: "yapması gerekmek", sentence: "Du sollst lernen.",            opposite: "", imageKey: "a1-v-sollen",    cardColor: "#E0F2FE", perfekt: "hat gesollt",    praeteritum: "sollte" },
          { id: "a1-v-s12-moechten",  german: "möchten",   turkish: "istemek",          sentence: "Ich möchte Tee.",              opposite: "", imageKey: "a1-v-moechten",  cardColor: "#FEE2E2", perfekt: "hat gemocht",    praeteritum: "wollte" },
          { id: "a1-v-s12-versuchen", german: "versuchen", turkish: "denemek",          sentence: "Sie versucht es noch einmal.", opposite: "", imageKey: "a1-v-versuchen", cardColor: "#E0E7FF", perfekt: "hat versucht",   praeteritum: "versuchte" },
          { id: "a1-v-s12-schaffen",  german: "schaffen",  turkish: "başarmak",         sentence: "Er schafft das.",              opposite: "", imageKey: "a1-v-schaffen",  cardColor: "#F3E8FF", perfekt: "hat geschafft",  praeteritum: "schaffte" },
          { id: "a1-v-s12-bekommen",  german: "bekommen",  turkish: "almak",            sentence: "Sie bekommt ein Geschenk.",    opposite: "", imageKey: "a1-v-bekommen",  cardColor: "#FFEDD5", perfekt: "hat bekommen",   praeteritum: "bekam" },
          { id: "a1-v-s12-verkaufen", german: "verkaufen", turkish: "satmak",           sentence: "Er verkauft das Auto.",        opposite: "", imageKey: "a1-v-verkaufen", cardColor: "#D1FAE5", perfekt: "hat verkauft",   praeteritum: "verkaufte" },
        ],
      },
    ],
  },
  {
    id: "b2-test-sets",
    name: "B2 Test Sets",
    level: "B2",
    sets: [
      {
        id: "b2-adj-set1",
        name: "B2 Adjektive",
        cards: [
          {
            id: "b2-entscheidend", german: "entscheidend", turkish: "belirleyici",
            sentence: "Das war ein entscheidender Moment.",
            sentences: [
              { german: "Das war ein entscheidender Moment in seiner Karriere.", turkish: "(Kariyerinde belirleyici bir andı.)" },
              { german: "Diese Entscheidung ist für unseren Erfolg entscheidend.", turkish: "(Bu karar başarımız için belirleyicidir.)" },
              { german: "Der letzte Spielzug war entscheidend für den Sieg.", turkish: "(Son hamle zafer için belirleyiciydi.)" },
            ],
            opposite: "unentscheidend", imageKey: "b2-entscheidend", cardColor: "#DBEAFE",
            komparativ: "entscheidender", superlativ: "am entscheidendsten",
          },
          {
            id: "b2-wesentlich", german: "wesentlich", turkish: "esaslı",
            sentence: "Das ist ein wesentlicher Punkt.",
            sentences: [
              { german: "Es gibt wesentliche Unterschiede zwischen den Angeboten.", turkish: "(Teklifler arasında esaslı farklar var.)" },
              { german: "Der Preis ist ein wesentlicher Faktor bei der Entscheidung.", turkish: "(Fiyat kararda esaslı bir faktördür.)" },
              { german: "Das ist ein wesentlicher Punkt, den wir beachten müssen.", turkish: "(Bu dikkat etmemiz gereken esaslı bir noktadır.)" },
            ],
            opposite: "unwesentlich", imageKey: "b2-wesentlich", cardColor: "#DCFCE7",
            komparativ: "wesentlicher", superlativ: "am wesentlichsten",
          },
          {
            id: "b2-erheblich", german: "erheblich", turkish: "kayda değer",
            sentence: "Der Unterschied ist erheblich.",
            sentences: [
              { german: "Der Unterschied ist erheblich größer als erwartet.", turkish: "(Fark beklenenden kayda değer biçimde büyük.)" },
              { german: "Die Kosten sind erheblich gestiegen.", turkish: "(Maliyetler önemli ölçüde arttı.)" },
              { german: "Das hat erheblichen Einfluss auf die Wirtschaft.", turkish: "(Bunun ekonomi üzerinde önemli bir etkisi var.)" },
            ],
            opposite: "unerheblich", imageKey: "b2-erheblich", cardColor: "#FEF9C3",
            komparativ: "erheblicher", superlativ: "am erheblichsten",
          },
          {
            id: "b2-umfangreich", german: "umfangreich", turkish: "kapsamlı",
            sentence: "Das ist ein umfangreiches Projekt.",
            sentences: [
              { german: "Sie hat umfangreiche Erfahrung in diesem Bereich.", turkish: "(Bu alanda kapsamlı deneyimi var.)" },
              { german: "Das Projekt erfordert umfangreiche Vorbereitungen.", turkish: "(Proje kapsamlı hazırlıklar gerektiriyor.)" },
              { german: "Wir haben ein umfangreiches Programm vorbereitet.", turkish: "(Kapsamlı bir program hazırladık.)" },
            ],
            opposite: "begrenzt", imageKey: "b2-umfangreich", cardColor: "#FFEDD5",
            komparativ: "umfangreicher", superlativ: "am umfangreichsten",
          },
          {
            id: "b2-verfuegbar", german: "verfügbar", turkish: "mevcut",
            sentence: "Das Produkt ist sofort verfügbar.",
            sentences: [
              { german: "Das Produkt ist sofort verfügbar.", turkish: "(Ürün hemen mevcuttur.)" },
              { german: "Sind Sie morgen verfügbar?", turkish: "(Yarın müsait misiniz?)" },
              { german: "Die Daten sind online frei verfügbar.", turkish: "(Veriler çevrimiçi olarak serbestçe erişilebilir.)" },
            ],
            opposite: "nicht verfügbar", imageKey: "b2-verfuegbar", cardColor: "#E0F2FE",
            komparativ: "verfügbarer", superlativ: "am verfügbarsten",
          },
          {
            id: "b2-notwendig", german: "notwendig", turkish: "gerekli",
            sentence: "Eine Lösung ist notwendig.",
            sentences: [
              { german: "Eine gute Vorbereitung ist notwendig.", turkish: "(İyi bir hazırlık gereklidir.)" },
              { german: "Es ist notwendig, schnell zu handeln.", turkish: "(Hızlı hareket etmek gereklidir.)" },
              { german: "Welche Dokumente sind notwendig?", turkish: "(Hangi belgeler gereklidir?)" },
            ],
            opposite: "unnötig", imageKey: "b2-notwendig", cardColor: "#FCE7F3",
            komparativ: "notwendiger", superlativ: "am notwendigsten",
          },
          {
            id: "b2-verantwortlich", german: "verantwortlich", turkish: "sorumlu",
            sentence: "Wer ist dafür verantwortlich?",
            sentences: [
              { german: "Wer ist für diesen Fehler verantwortlich?", turkish: "(Bu hatadan kim sorumlu?)" },
              { german: "Sie ist verantwortlich für das gesamte Team.", turkish: "(Tüm ekipten o sorumlu.)" },
              { german: "Jeder ist für sein eigenes Handeln verantwortlich.", turkish: "(Herkes kendi eylemlerinden sorumludur.)" },
            ],
            opposite: "unverantwortlich", imageKey: "b2-verantwortlich", cardColor: "#E0E7FF",
            komparativ: "verantwortlicher", superlativ: "am verantwortlichsten",
          },
          {
            id: "b2-deutlich", german: "deutlich", turkish: "belirgin",
            sentence: "Der Unterschied ist deutlich sichtbar.",
            sentences: [
              { german: "Der Unterschied ist deutlich zu sehen.", turkish: "(Fark açıkça görülüyor.)" },
              { german: "Sie sprach sehr deutlich und klar.", turkish: "(Çok belirgin ve açık bir şekilde konuştu.)" },
              { german: "Es hat sich deutlich verbessert.", turkish: "(Belirgin biçimde iyileşti.)" },
            ],
            opposite: "undeutlich", imageKey: "b2-deutlich", cardColor: "#F3E8FF",
            komparativ: "deutlicher", superlativ: "am deutlichsten",
          },
          {
            id: "b2-zahlreich", german: "zahlreich", turkish: "çok sayıda",
            sentence: "Zahlreiche Menschen nahmen teil.",
            sentences: [
              { german: "Zahlreiche Menschen kamen zur Veranstaltung.", turkish: "(Çok sayıda insan etkinliğe geldi.)" },
              { german: "Es gibt zahlreiche Möglichkeiten, Deutsch zu lernen.", turkish: "(Almanca öğrenmek için çok sayıda yol var.)" },
              { german: "Er hat zahlreiche Auszeichnungen gewonnen.", turkish: "(Çok sayıda ödül kazandı.)" },
            ],
            opposite: "wenige", imageKey: "b2-zahlreich", cardColor: "#FEE2E2",
            komparativ: "zahlreicher", superlativ: "am zahlreichsten",
          },
          {
            id: "b2-geeignet", german: "geeignet", turkish: "uygun",
            sentence: "Sie ist sehr geeignet für diese Stelle.",
            sentences: [
              { german: "Sie ist sehr geeignet für diese Stelle.", turkish: "(Bu pozisyon için çok uygun.)" },
              { german: "Dieses Hotel ist ideal für Familien geeignet.", turkish: "(Bu otel aileler için idealdir.)" },
              { german: "Das Klima ist nicht geeignet für Weizenbau.", turkish: "(İklim buğday tarımı için uygun değil.)" },
            ],
            opposite: "ungeeignet", imageKey: "b2-geeignet", cardColor: "#D1FAE5",
            komparativ: "geeigneter", superlativ: "am geeignetsten",
          },
        ],
      },
      {
        id: "b2-nomen-set1",
        name: "B2 Nomen",
        cards: [
          {
            id: "b2-voraussetzung", german: "die Voraussetzung", turkish: "ön koşul",
            sentence: "Die Voraussetzung für den Job ist ein Studium.",
            sentences: [
              { german: "Ein Studium ist die Voraussetzung für diesen Job.", turkish: "(Bu iş için üniversite eğitimi ön koşuldur.)" },
              { german: "Die grundlegende Voraussetzung ist Erfahrung.", turkish: "(Temel ön koşul deneyimdir.)" },
              { german: "Welche Voraussetzungen müssen erfüllt sein?", turkish: "(Hangi ön koşullar karşılanmalıdır?)" },
            ],
            opposite: "", imageKey: "b2-voraussetzung", cardColor: "#DBEAFE", plural: "die Voraussetzungen",
          },
          {
            id: "b2-zusammenhang", german: "der Zusammenhang", turkish: "bağlam / bağlantı",
            sentence: "Es gibt einen klaren Zusammenhang.",
            sentences: [
              { german: "Es gibt einen klaren Zusammenhang zwischen Stress und Gesundheit.", turkish: "(Stres ile sağlık arasında açık bir bağlantı var.)" },
              { german: "Sie erklärt den Zusammenhang sehr gut.", turkish: "(Bağlamı çok iyi açıklıyor.)" },
              { german: "Im Zusammenhang mit diesem Thema ist Vorsicht geboten.", turkish: "(Bu konuyla bağlantılı olarak dikkatli olmak gerekir.)" },
            ],
            opposite: "", imageKey: "b2-zusammenhang", cardColor: "#DCFCE7", plural: "die Zusammenhänge",
          },
          {
            id: "b2-entwicklung", german: "die Entwicklung", turkish: "gelişim",
            sentence: "Die Entwicklung geht schnell voran.",
            sentences: [
              { german: "Die technologische Entwicklung schreitet schnell voran.", turkish: "(Teknolojik gelişim hızla ilerliyor.)" },
              { german: "Die Entwicklung des Kindes verläuft normal.", turkish: "(Çocuğun gelişimi normal seyrediyor.)" },
              { german: "Diese Entwicklung war nicht vorhersehbar.", turkish: "(Bu gelişim öngörülebilir değildi.)" },
            ],
            opposite: "", imageKey: "b2-entwicklung", cardColor: "#FEF9C3", plural: "die Entwicklungen",
          },
          {
            id: "b2-herausforderung", german: "die Herausforderung", turkish: "zorluk / meydan okuma",
            sentence: "Das ist eine große Herausforderung.",
            sentences: [
              { german: "Das war eine große Herausforderung für das Team.", turkish: "(Bu ekip için büyük bir zorluktı.)" },
              { german: "Jede Herausforderung ist eine Chance zum Wachstum.", turkish: "(Her zorluk büyüme için bir fırsattır.)" },
              { german: "Die Digitalisierung ist die größte Herausforderung unserer Zeit.", turkish: "(Dijitalleşme çağımızın en büyük zorluğudur.)" },
            ],
            opposite: "", imageKey: "b2-herausforderung", cardColor: "#FFEDD5", plural: "die Herausforderungen",
          },
          {
            id: "b2-moeglichkeit", german: "die Möglichkeit", turkish: "imkân / olasılık",
            sentence: "Es gibt viele Möglichkeiten.",
            sentences: [
              { german: "Es gibt viele Möglichkeiten, Deutsch zu lernen.", turkish: "(Almanca öğrenmek için birçok imkân var.)" },
              { german: "Diese Möglichkeit solltest du nicht verpassen.", turkish: "(Bu fırsatı kaçırmamalısın.)" },
              { german: "Gibt es eine Möglichkeit, früher zu kommen?", turkish: "(Daha erken gelme imkânı var mı?)" },
            ],
            opposite: "", imageKey: "b2-moeglichkeit", cardColor: "#E0F2FE", plural: "die Möglichkeiten",
          },
          {
            id: "b2-fortschritt", german: "der Fortschritt", turkish: "ilerleme",
            sentence: "Der Fortschritt ist beeindruckend.",
            sentences: [
              { german: "Der wissenschaftliche Fortschritt ist beeindruckend.", turkish: "(Bilimsel ilerleme etkileyici.)" },
              { german: "Wir machen gute Fortschritte bei diesem Projekt.", turkish: "(Bu projede iyi ilerleme kaydediyoruz.)" },
              { german: "Der Fortschritt in der Medizin rettet Leben.", turkish: "(Tıptaki ilerleme hayat kurtarıyor.)" },
            ],
            opposite: "", imageKey: "b2-fortschritt", cardColor: "#FCE7F3", plural: "die Fortschritte",
          },
          {
            id: "b2-erfahrung", german: "die Erfahrung", turkish: "deneyim",
            sentence: "Er hat viel Erfahrung in diesem Bereich.",
            sentences: [
              { german: "Er hat langjährige Erfahrung in diesem Bereich.", turkish: "(Bu alanda uzun yıllara dayanan deneyimi var.)" },
              { german: "Diese Erfahrung hat mich viel gelehrt.", turkish: "(Bu deneyim bana çok şey öğretti.)" },
              { german: "Praktische Erfahrung ist sehr wertvoll.", turkish: "(Pratik deneyim çok değerlidir.)" },
            ],
            opposite: "", imageKey: "b2-erfahrung", cardColor: "#E0E7FF", plural: "die Erfahrungen",
          },
          {
            id: "b2-massnahme", german: "die Maßnahme", turkish: "önlem",
            sentence: "Wir müssen geeignete Maßnahmen ergreifen.",
            sentences: [
              { german: "Die Regierung ergreift neue Maßnahmen.", turkish: "(Hükümet yeni önlemler alıyor.)" },
              { german: "Diese Maßnahme ist dringend notwendig.", turkish: "(Bu önlem son derece gereklidir.)" },
              { german: "Welche Maßnahmen sind geplant?", turkish: "(Hangi önlemler planlanıyor?)" },
            ],
            opposite: "", imageKey: "b2-massnahme", cardColor: "#F3E8FF", plural: "die Maßnahmen",
          },
          {
            id: "b2-faehigkeit", german: "die Fähigkeit", turkish: "yetenek",
            sentence: "Sie hat besondere Fähigkeiten.",
            sentences: [
              { german: "Sie hat eine besondere Fähigkeit für Sprachen.", turkish: "(Diller için özel bir yeteneği var.)" },
              { german: "Die Fähigkeit zur Teamarbeit ist wichtig.", turkish: "(Takım çalışması yeteneği önemlidir.)" },
              { german: "Er entwickelt seine Fähigkeiten ständig weiter.", turkish: "(Yeteneklerini sürekli geliştiriyor.)" },
            ],
            opposite: "", imageKey: "b2-faehigkeit", cardColor: "#FEE2E2", plural: "die Fähigkeiten",
          },
          {
            id: "b2-einfluss", german: "der Einfluss", turkish: "etki",
            sentence: "Der Einfluss der Medien ist sehr groß.",
            sentences: [
              { german: "Der Einfluss der Medien auf die Gesellschaft ist groß.", turkish: "(Medyanın toplum üzerindeki etkisi büyük.)" },
              { german: "Sie hat einen positiven Einfluss auf ihr Team.", turkish: "(Ekibi üzerinde olumlu bir etkisi var.)" },
              { german: "Der Einfluss des Klimas auf die Gesundheit wird unterschätzt.", turkish: "(İklimin sağlık üzerindeki etkisi hafife alınıyor.)" },
            ],
            opposite: "", imageKey: "b2-einfluss", cardColor: "#D1FAE5", plural: "die Einflüsse",
          },
        ],
      },
      {
        id: "b2-verben-test",
        name: "B2 Verben",
        cards: [
          {
            id: "b2vt-beeinflussen", german: "beeinflussen", turkish: "etkilemek",
            sentence: "Soziale Medien beeinflussen unser Verhalten.",
            sentences: [
              { german: "Soziale Medien beeinflussen unser Verhalten.", turkish: "(Sosyal medya davranışımızı etkiler.)" },
              { german: "Die Entscheidung beeinflusst das Ergebnis stark.", turkish: "(Karar sonucu güçlü şekilde etkiler.)" },
              { german: "Die Nachricht hat viele Menschen beeinflusst.", turkish: "(Haber birçok insanı etkiledi.)" },
            ],
            opposite: "", imageKey: "b2-beeinflussen", cardColor: "#DBEAFE", perfekt: "hat beeinflusst", praeteritum: "beeinflusste",
          },
          {
            id: "b2vt-vermeiden", german: "vermeiden", turkish: "kaçınmak",
            sentence: "Wir sollten Fehler vermeiden.",
            sentences: [
              { german: "Wir sollten Fehler vermeiden.", turkish: "(Hatalardan kaçınmalıyız.)" },
              { german: "Er vermeidet es, über Politik zu sprechen.", turkish: "(Politika hakkında konuşmaktan kaçınıyor.)" },
              { german: "Sie hat unnötige Kosten vermieden.", turkish: "(Gereksiz masraflardan kaçındı.)" },
            ],
            opposite: "", imageKey: "b2-vermeiden", cardColor: "#DCFCE7", perfekt: "hat vermieden", praeteritum: "vermied",
          },
          {
            id: "b2vt-durchfuehren", german: "durchführen", turkish: "gerçekleştirmek",
            sentence: "Die Firma führt ein neues Projekt durch.",
            sentences: [
              { german: "Die Firma führt ein neues Projekt durch.", turkish: "(Şirket yeni bir proje yürütüyor.)" },
              { german: "Die Studie wurde erfolgreich durchgeführt.", turkish: "(Çalışma başarıyla gerçekleştirildi.)" },
              { german: "Die Experten haben eine Analyse durchgeführt.", turkish: "(Uzmanlar bir analiz gerçekleştirdi.)" },
            ],
            opposite: "", imageKey: "b2-durchfuehren", cardColor: "#FEF9C3", perfekt: "hat durchgeführt", praeteritum: "führte durch",
          },
          {
            id: "b2vt-feststellen", german: "feststellen", turkish: "tespit etmek",
            sentence: "Der Arzt stellt eine Krankheit fest.",
            sentences: [
              { german: "Der Arzt stellt eine Krankheit fest.", turkish: "(Doktor bir hastalığı tespit eder.)" },
              { german: "Die Polizei stellte einen Fehler fest.", turkish: "(Polis bir hata tespit etti.)" },
              { german: "Wir haben festgestellt, dass das Problem größer ist.", turkish: "(Sorunun daha büyük olduğunu tespit ettik.)" },
            ],
            opposite: "", imageKey: "b2-feststellen", cardColor: "#FFEDD5", perfekt: "hat festgestellt", praeteritum: "stellte fest",
          },
          {
            id: "b2vt-ermoeglichen", german: "ermöglichen", turkish: "mümkün kılmak",
            sentence: "Neue Technologien ermöglichen viele Innovationen.",
            sentences: [
              { german: "Neue Technologien ermöglichen viele Innovationen.", turkish: "(Yeni teknolojiler birçok yeniliği mümkün kılar.)" },
              { german: "Das Internet ermöglicht schnellen Zugang zu Informationen.", turkish: "(İnternet bilgiye hızlı erişim sağlar.)" },
              { german: "Diese Entscheidung hat neue Chancen ermöglicht.", turkish: "(Bu karar yeni fırsatları mümkün kıldı.)" },
            ],
            opposite: "", imageKey: "b2-ermoeglichen", cardColor: "#E0F2FE", perfekt: "hat ermöglicht", praeteritum: "ermöglichte",
          },
          {
            id: "b2vt-erreichen", german: "erreichen", turkish: "ulaşmak",
            sentence: "Er hat sein Ziel erreicht.",
            sentences: [
              { german: "Er hat sein Ziel erreicht.", turkish: "(Hedefine ulaştı.)" },
              { german: "Wir möchten mehr Menschen erreichen.", turkish: "(Daha fazla insana ulaşmak istiyoruz.)" },
              { german: "Das Unternehmen hat große Erfolge erreicht.", turkish: "(Şirket büyük başarılar elde etti.)" },
            ],
            opposite: "", imageKey: "b2-erreichen", cardColor: "#FCE7F3", perfekt: "hat erreicht", praeteritum: "erreichte",
          },
          {
            id: "b2vt-verhindern", german: "verhindern", turkish: "engellemek",
            sentence: "Die Polizei verhindert einen Unfall.",
            sentences: [
              { german: "Die Polizei verhindert einen Unfall.", turkish: "(Polis bir kazayı engeller.)" },
              { german: "Maßnahmen verhindern größere Probleme.", turkish: "(Önlemler daha büyük sorunları engeller.)" },
              { german: "Die Feuerwehr hat eine Katastrophe verhindert.", turkish: "(İtfaiye bir felaketi engelledi.)" },
            ],
            opposite: "", imageKey: "b2-verhindern", cardColor: "#E0E7FF", perfekt: "hat verhindert", praeteritum: "verhinderte",
          },
          {
            id: "b2vt-verbessern", german: "verbessern", turkish: "geliştirmek / iyileştirmek",
            sentence: "Wir müssen unsere Leistung verbessern.",
            sentences: [
              { german: "Wir müssen unsere Leistung verbessern.", turkish: "(Performansımızı geliştirmeliyiz.)" },
              { german: "Neue Methoden verbessern die Qualität.", turkish: "(Yeni yöntemler kaliteyi artırır.)" },
              { german: "Das Training hat seine Fähigkeiten verbessert.", turkish: "(Antrenman onun becerilerini geliştirdi.)" },
            ],
            opposite: "", imageKey: "b2-verbessern", cardColor: "#F3E8FF", perfekt: "hat verbessert", praeteritum: "verbesserte",
          },
          {
            id: "b2vt-vergleichen", german: "vergleichen", turkish: "karşılaştırmak",
            sentence: "Man sollte verschiedene Angebote vergleichen.",
            sentences: [
              { german: "Man sollte verschiedene Angebote vergleichen.", turkish: "(Farklı teklifleri karşılaştırmak gerekir.)" },
              { german: "Der Bericht vergleicht mehrere Studien.", turkish: "(Rapor birkaç çalışmayı karşılaştırıyor.)" },
              { german: "Wir haben die Ergebnisse miteinander verglichen.", turkish: "(Sonuçları birbiriyle karşılaştırdık.)" },
            ],
            opposite: "", imageKey: "b2-vergleichen", cardColor: "#FEE2E2", perfekt: "hat verglichen", praeteritum: "verglich",
          },
          {
            id: "b2vt-unterstuetzen", german: "unterstützen", turkish: "desteklemek",
            sentence: "Die Familie unterstützt ihn.",
            sentences: [
              { german: "Die Familie unterstützt ihn.", turkish: "(Ailesi onu destekliyor.)" },
              { german: "Viele Menschen unterstützen das Projekt.", turkish: "(Birçok insan projeyi destekliyor.)" },
              { german: "Seine Freunde haben ihn immer unterstützt.", turkish: "(Arkadaşları onu her zaman destekledi.)" },
            ],
            opposite: "", imageKey: "b2-unterstuetzen", cardColor: "#D1FAE5", perfekt: "hat unterstützt", praeteritum: "unterstützte",
          },
        ],
      },
    ],
  },
  {
    id: "b2-praep-verben",
    name: "B2 Präposition Verben",
    level: "B2",
    sets: [
      {
        id: "b2-pv-set1",
        name: "B2 Präposition Verben 1",
        cards: [
          {
            id: "b2-pv1-abhaengen", german: "abhängen von", turkish: "bağlı olmak",
            sentence: "Das Ergebnis hängt von deiner Arbeit ab.",
            sentences: [
              { german: "Das Ergebnis hängt von deiner Arbeit ab.", turkish: "(Sonuç çalışmana bağlı.)" },
              { german: "Es hängt vom Wetter ab, ob wir ausgehen.", turkish: "(Çıkıp çıkmayacağımız havaya bağlı.)" },
              { german: "Der Erfolg hat von vielen Faktoren abgehangen.", turkish: "(Başarı birçok faktöre bağlıydı.)" },
            ],
            opposite: "", imageKey: "b2-pv-abhaengen", cardColor: "#DBEAFE",
            perfekt: "hat abgehangen", praeteritum: "hing ab", praeposition: "von + Dativ",
          },
          {
            id: "b2-pv1-achten", german: "achten auf", turkish: "dikkat etmek",
            sentence: "Du solltest auf deine Gesundheit achten.",
            sentences: [
              { german: "Du solltest auf deine Gesundheit achten.", turkish: "(Sağlığına dikkat etmelisin.)" },
              { german: "Sie achtet sehr auf ihre Ernährung.", turkish: "(Beslenmesine çok dikkat ediyor.)" },
              { german: "Er hat nicht auf die Warnung geachtet.", turkish: "(Uyarıya dikkat etmedi.)" },
            ],
            opposite: "", imageKey: "b2-pv-achten", cardColor: "#DCFCE7",
            perfekt: "hat geachtet", praeteritum: "achtete auf", praeposition: "auf + Akkusativ",
          },
          {
            id: "b2-pv1-anfangen", german: "anfangen mit", turkish: "başlamak",
            sentence: "Wann fängst du mit dem Lernen an?",
            sentences: [
              { german: "Wann fängst du mit dem Lernen an?", turkish: "(Öğrenmeye ne zaman başlayacaksın?)" },
              { german: "Sie fängt morgen mit dem neuen Job an.", turkish: "(Yarın yeni işe başlıyor.)" },
              { german: "Er hat schon mit dem Projekt angefangen.", turkish: "(Projeye çoktan başladı.)" },
            ],
            opposite: "", imageKey: "b2-pv-anfangen", cardColor: "#FEF9C3",
            perfekt: "hat angefangen", praeteritum: "fing an", praeposition: "mit + Dativ",
          },
          {
            id: "b2-pv1-ankommen", german: "ankommen auf", turkish: "önemli olmak / bağlı olmak",
            sentence: "Es kommt auf deine Einstellung an.",
            sentences: [
              { german: "Es kommt auf deine Einstellung an.", turkish: "(Tutumuna bağlı.)" },
              { german: "Beim Sport kommt es auf die Technik an.", turkish: "(Sporda teknik önemlidir.)" },
              { german: "Es ist darauf angekommen, schnell zu reagieren.", turkish: "(Hızlı tepki vermek önemliydi.)" },
            ],
            opposite: "", imageKey: "b2-pv-ankommen", cardColor: "#FFEDD5",
            perfekt: "ist angekommen", praeteritum: "kam an", praeposition: "auf + Akkusativ",
          },
          {
            id: "b2-pv1-arbeiten", german: "arbeiten an", turkish: "üzerinde çalışmak",
            sentence: "Wir arbeiten an einem neuen Projekt.",
            sentences: [
              { german: "Wir arbeiten an einem neuen Projekt.", turkish: "(Yeni bir proje üzerinde çalışıyoruz.)" },
              { german: "Sie arbeitet intensiv an ihrer Dissertation.", turkish: "(Tezi üzerinde yoğun çalışıyor.)" },
              { german: "Er hat jahrelang an dieser Erfindung gearbeitet.", turkish: "(Yıllarca bu icat üzerinde çalıştı.)" },
            ],
            opposite: "", imageKey: "b2-pv-arbeiten", cardColor: "#E0F2FE",
            perfekt: "hat gearbeitet", praeteritum: "arbeitete an", praeposition: "an + Dativ",
          },
          {
            id: "b2-pv1-denken", german: "denken an", turkish: "düşünmek",
            sentence: "Ich denke oft an meine Familie.",
            sentences: [
              { german: "Ich denke oft an meine Familie.", turkish: "(Ailem hakkında sıkça düşünüyorum.)" },
              { german: "Vergiss nicht, an den Termin zu denken.", turkish: "(Randevuyu unutma.)" },
              { german: "Sie hat den ganzen Tag an ihn gedacht.", turkish: "(Bütün gün onu düşündü.)" },
            ],
            opposite: "", imageKey: "b2-pv-denken", cardColor: "#FCE7F3",
            perfekt: "hat gedacht", praeteritum: "dachte an", praeposition: "an + Akkusativ",
          },
          {
            id: "b2-pv1-glauben", german: "glauben an", turkish: "inanmak",
            sentence: "Ich glaube an deine Fähigkeiten.",
            sentences: [
              { german: "Ich glaube an deine Fähigkeiten.", turkish: "(Yeteneklerine inanıyorum.)" },
              { german: "Er glaubt fest an den Erfolg.", turkish: "(Başarıya kesinlikle inanıyor.)" },
              { german: "Sie hat immer an sich selbst geglaubt.", turkish: "(Her zaman kendine inandı.)" },
            ],
            opposite: "", imageKey: "b2-pv-glauben", cardColor: "#E0E7FF",
            perfekt: "hat geglaubt", praeteritum: "glaubte an", praeposition: "an + Akkusativ",
          },
          {
            id: "b2-pv1-teilnehmen", german: "teilnehmen an", turkish: "katılmak",
            sentence: "Ich nehme an der Konferenz teil.",
            sentences: [
              { german: "Ich nehme an der Konferenz teil.", turkish: "(Konferansa katılıyorum.)" },
              { german: "Viele Studenten nehmen an dem Kurs teil.", turkish: "(Birçok öğrenci kursa katılıyor.)" },
              { german: "Er hat gestern an der Sitzung teilgenommen.", turkish: "(Dün toplantıya katıldı.)" },
            ],
            opposite: "", imageKey: "b2-pv-teilnehmen", cardColor: "#F3E8FF",
            perfekt: "hat teilgenommen", praeteritum: "nahm teil", praeposition: "an + Dativ",
          },
          {
            id: "b2-pv1-interessieren", german: "sich interessieren für", turkish: "ilgilenmek",
            sentence: "Ich interessiere mich sehr für Musik.",
            sentences: [
              { german: "Ich interessiere mich sehr für Musik.", turkish: "(Müzikle çok ilgileniyorum.)" },
              { german: "Sie interessiert sich für Geschichte.", turkish: "(Tarihle ilgileniyor.)" },
              { german: "Er hat sich immer für Sport interessiert.", turkish: "(Her zaman sporla ilgilenmiş.)" },
            ],
            opposite: "", imageKey: "b2-pv-interessieren", cardColor: "#FEE2E2",
            perfekt: "hat sich interessiert", praeteritum: "interessierte sich", praeposition: "für + Akkusativ",
          },
          {
            id: "b2-pv1-freuen-auf", german: "sich freuen auf", turkish: "dört gözle beklemek",
            sentence: "Ich freue mich auf den Urlaub.",
            sentences: [
              { german: "Ich freue mich auf den Urlaub.", turkish: "(Tatili dört gözle bekliyorum.)" },
              { german: "Sie freut sich sehr auf das Konzert.", turkish: "(Konseri çok heyecanla bekliyor.)" },
              { german: "Er hat sich auf das Wochenende gefreut.", turkish: "(Hafta sonunu dört gözle bekledi.)" },
            ],
            opposite: "", imageKey: "b2-pv-freuen-auf", cardColor: "#D1FAE5",
            perfekt: "hat sich gefreut", praeteritum: "freute sich auf", praeposition: "auf + Akkusativ",
          },
        ],
      },
      {
        id: "b2-pv-set2",
        name: "B2 Präposition Verben 2",
        cards: [
          {
            id: "b2-pv2-beschaeftigen", german: "sich beschäftigen mit", turkish: "meşgul olmak / ilgilenmek",
            sentence: "Er beschäftigt sich mit der Forschung.",
            sentences: [
              { german: "Er beschäftigt sich mit der Forschung.", turkish: "(Araştırmayla meşgul oluyor.)" },
              { german: "Ich beschäftige mich gern mit Musik.", turkish: "(Müzikle ilgilenmekten hoşlanıyorum.)" },
              { german: "Sie hat sich lange mit diesem Thema beschäftigt.", turkish: "(Bu konuyla uzun süre ilgilendi.)" },
            ],
            opposite: "", imageKey: "b2-pv-beschaeftigen", cardColor: "#DBEAFE",
            perfekt: "hat sich beschäftigt", praeteritum: "beschäftigte sich", praeposition: "mit + Dativ",
          },
          {
            id: "b2-pv2-konzentrieren", german: "sich konzentrieren auf", turkish: "odaklanmak",
            sentence: "Du musst dich auf die Prüfung konzentrieren.",
            sentences: [
              { german: "Du musst dich auf die Prüfung konzentrieren.", turkish: "(Sınava odaklanmalısın.)" },
              { german: "Sie konzentriert sich auf ihre Arbeit.", turkish: "(İşine odaklanıyor.)" },
              { german: "Er hat sich auf das Wesentliche konzentriert.", turkish: "(Esasa odaklandı.)" },
            ],
            opposite: "", imageKey: "b2-pv-konzentrieren", cardColor: "#DCFCE7",
            perfekt: "hat sich konzentriert", praeteritum: "konzentrierte sich", praeposition: "auf + Akkusativ",
          },
          {
            id: "b2-pv2-kuemmern", german: "sich kümmern um", turkish: "ilgilenmek",
            sentence: "Sie kümmert sich um ihren alten Vater.",
            sentences: [
              { german: "Sie kümmert sich um ihren alten Vater.", turkish: "(Yaşlı babasıyla ilgileniyor.)" },
              { german: "Wer kümmert sich um das Kind?", turkish: "(Çocukla kim ilgileniyor?)" },
              { german: "Er hat sich um alle Details gekümmert.", turkish: "(Tüm ayrıntılarla ilgilendi.)" },
            ],
            opposite: "", imageKey: "b2-pv-kuemmern", cardColor: "#FEF9C3",
            perfekt: "hat sich gekümmert", praeteritum: "kümmerte sich", praeposition: "um + Akkusativ",
          },
          {
            id: "b2-pv2-sprechen", german: "sprechen über", turkish: "hakkında konuşmak",
            sentence: "Wir sprechen über das neue Projekt.",
            sentences: [
              { german: "Wir sprechen über das neue Projekt.", turkish: "(Yeni proje hakkında konuşuyoruz.)" },
              { german: "Sie spricht offen über ihre Gefühle.", turkish: "(Duygularını açıkça konuşuyor.)" },
              { german: "Er hat ausführlich über das Problem gesprochen.", turkish: "(Sorun hakkında ayrıntılı konuştu.)" },
            ],
            opposite: "", imageKey: "b2-pv-sprechen", cardColor: "#FFEDD5",
            perfekt: "hat gesprochen", praeteritum: "sprach über", praeposition: "über + Akkusativ",
          },
          {
            id: "b2-pv2-diskutieren", german: "diskutieren über", turkish: "tartışmak",
            sentence: "Wir diskutieren über aktuelle Themen.",
            sentences: [
              { german: "Wir diskutieren über aktuelle Themen.", turkish: "(Güncel konuları tartışıyoruz.)" },
              { german: "Die Studenten diskutieren über den Text.", turkish: "(Öğrenciler metin hakkında tartışıyor.)" },
              { german: "Sie haben stundenlang über das Problem diskutiert.", turkish: "(Saatlerce sorun hakkında tartıştılar.)" },
            ],
            opposite: "", imageKey: "b2-pv-diskutieren", cardColor: "#E0F2FE",
            perfekt: "hat diskutiert", praeteritum: "diskutierte über", praeposition: "über + Akkusativ",
          },
          {
            id: "b2-pv2-entscheiden", german: "sich entscheiden für", turkish: "karar vermek",
            sentence: "Ich habe mich für den roten Mantel entschieden.",
            sentences: [
              { german: "Ich habe mich für den roten Mantel entschieden.", turkish: "(Kırmızı paltoyu seçtim.)" },
              { german: "Sie entscheidet sich für den günstigeren Preis.", turkish: "(Daha uygun fiyatı seçiyor.)" },
              { german: "Er hat sich für die zweite Option entschieden.", turkish: "(İkinci seçeneğe karar verdi.)" },
            ],
            opposite: "", imageKey: "b2-pv-entscheiden", cardColor: "#FCE7F3",
            perfekt: "hat sich entschieden", praeteritum: "entschied sich", praeposition: "für + Akkusativ",
          },
          {
            id: "b2-pv2-erinnern", german: "sich erinnern an", turkish: "hatırlamak",
            sentence: "Ich erinnere mich gut an meine Schulzeit.",
            sentences: [
              { german: "Ich erinnere mich gut an meine Schulzeit.", turkish: "(Okul zamanımı iyi hatırlıyorum.)" },
              { german: "Sie erinnert sich an jeden Detail.", turkish: "(Her ayrıntıyı hatırlıyor.)" },
              { german: "Er hat sich kaum an den Unfall erinnert.", turkish: "(Kazayı neredeyse hiç hatırlamadı.)" },
            ],
            opposite: "", imageKey: "b2-pv-erinnern", cardColor: "#E0E7FF",
            perfekt: "hat sich erinnert", praeteritum: "erinnerte sich", praeposition: "an + Akkusativ",
          },
          {
            id: "b2-pv2-vorbereiten", german: "sich vorbereiten auf", turkish: "hazırlanmak",
            sentence: "Ich bereite mich auf die Prüfung vor.",
            sentences: [
              { german: "Ich bereite mich auf die Prüfung vor.", turkish: "(Sınava hazırlanıyorum.)" },
              { german: "Sie bereitet sich gut auf das Interview vor.", turkish: "(Mülakata iyi hazırlanıyor.)" },
              { german: "Er hat sich intensiv auf den Wettkampf vorbereitet.", turkish: "(Yarışmaya yoğun hazırlandı.)" },
            ],
            opposite: "", imageKey: "b2-pv-vorbereiten", cardColor: "#F3E8FF",
            perfekt: "hat sich vorbereitet", praeteritum: "bereitete sich vor", praeposition: "auf + Akkusativ",
          },
          {
            id: "b2-pv2-beschweren", german: "sich beschweren über", turkish: "şikayet etmek",
            sentence: "Er beschwert sich über den Lärm.",
            sentences: [
              { german: "Er beschwert sich über den Lärm.", turkish: "(Gürültüden şikayet ediyor.)" },
              { german: "Sie beschwert sich über die schlechte Qualität.", turkish: "(Kötü kaliteden şikayet ediyor.)" },
              { german: "Viele Kunden haben sich über den Service beschwert.", turkish: "(Birçok müşteri hizmetten şikayet etti.)" },
            ],
            opposite: "", imageKey: "b2-pv-beschweren", cardColor: "#FEE2E2",
            perfekt: "hat sich beschwert", praeteritum: "beschwerte sich", praeposition: "über + Akkusativ",
          },
          {
            id: "b2-pv2-wundern", german: "sich wundern über", turkish: "şaşırmak / hayret etmek",
            sentence: "Ich wundere mich über seine Reaktion.",
            sentences: [
              { german: "Ich wundere mich über seine Reaktion.", turkish: "(Tepkisine şaşırıyorum.)" },
              { german: "Sie wundert sich über den hohen Preis.", turkish: "(Yüksek fiyata hayret ediyor.)" },
              { german: "Er hat sich über das Ergebnis gewundert.", turkish: "(Sonuçtan şaşırdı.)" },
            ],
            opposite: "", imageKey: "b2-pv-wundern", cardColor: "#D1FAE5",
            perfekt: "hat sich gewundert", praeteritum: "wunderte sich", praeposition: "über + Akkusativ",
          },
        ],
      },
      {
        id: "b2-pv-set3",
        name: "B2 Präposition Verben 3",
        cards: [
          {
            id: "b2-pv3-fuehren", german: "führen zu", turkish: "yol açmak",
            sentence: "Stress kann zu Krankheiten führen.",
            sentences: [
              { german: "Stress kann zu Krankheiten führen.", turkish: "(Stres hastalıklara yol açabilir.)" },
              { german: "Die Entscheidung führte zu einem Konflikt.", turkish: "(Karar bir çatışmaya yol açtı.)" },
              { german: "Falsche Informationen haben zu Missverständnissen geführt.", turkish: "(Yanlış bilgiler yanlış anlaşılmalara yol açtı.)" },
            ],
            opposite: "", imageKey: "b2-pv-fuehren", cardColor: "#DBEAFE",
            perfekt: "hat geführt", praeteritum: "führte zu", praeposition: "zu + Dativ",
          },
          {
            id: "b2-pv3-gehoeren", german: "gehören zu", turkish: "ait olmak / parçası olmak",
            sentence: "Sport gehört zu meinem Alltag.",
            sentences: [
              { german: "Sport gehört zu meinem Alltag.", turkish: "(Spor günlük hayatımın parçası.)" },
              { german: "Das Buch gehört zur Bibliothek.", turkish: "(Kitap kütüphaneye ait.)" },
              { german: "Diese Arbeit hat zu den schwierigsten gehört.", turkish: "(Bu çalışma en zorlar arasındaydı.)" },
            ],
            opposite: "", imageKey: "b2-pv-gehoeren", cardColor: "#DCFCE7",
            perfekt: "hat gehört", praeteritum: "gehörte zu", praeposition: "zu + Dativ",
          },
          {
            id: "b2-pv3-reagieren", german: "reagieren auf", turkish: "tepki vermek",
            sentence: "Er reagiert sehr sensibel auf Kritik.",
            sentences: [
              { german: "Er reagiert sehr sensibel auf Kritik.", turkish: "(Eleştiriye çok hassas tepki veriyor.)" },
              { german: "Wie reagierst du auf Stress?", turkish: "(Strese nasıl tepki verirsin?)" },
              { german: "Sie hat schnell auf die Nachricht reagiert.", turkish: "(Habere hızlıca yanıt verdi.)" },
            ],
            opposite: "", imageKey: "b2-pv-reagieren", cardColor: "#FEF9C3",
            perfekt: "hat reagiert", praeteritum: "reagierte auf", praeposition: "auf + Akkusativ",
          },
          {
            id: "b2-pv3-leiden", german: "leiden unter", turkish: "muzdarip olmak / acı çekmek",
            sentence: "Er leidet unter starken Kopfschmerzen.",
            sentences: [
              { german: "Er leidet unter starken Kopfschmerzen.", turkish: "(Şiddetli baş ağrısından muzdarip.)" },
              { german: "Viele Menschen leiden unter Einsamkeit.", turkish: "(Birçok insan yalnızlıktan muzdarip.)" },
              { german: "Sie hat lange unter dem Stress gelitten.", turkish: "(Uzun süre stres altında acı çekti.)" },
            ],
            opposite: "", imageKey: "b2-pv-leiden", cardColor: "#FFEDD5",
            perfekt: "hat gelitten", praeteritum: "litt unter", praeposition: "unter + Dativ",
          },
          {
            id: "b2-pv3-profitieren", german: "profitieren von", turkish: "yararlanmak",
            sentence: "Wir profitieren von guter Zusammenarbeit.",
            sentences: [
              { german: "Wir profitieren von guter Zusammenarbeit.", turkish: "(İyi iş birliğinden yararlanıyoruz.)" },
              { german: "Er profitiert von seiner Erfahrung.", turkish: "(Deneyiminden yararlanıyor.)" },
              { german: "Viele haben von der neuen Regelung profitiert.", turkish: "(Birçoğu yeni yönetmelikten yararlandı.)" },
            ],
            opposite: "", imageKey: "b2-pv-profitieren", cardColor: "#E0F2FE",
            perfekt: "hat profitiert", praeteritum: "profitierte von", praeposition: "von + Dativ",
          },
          {
            id: "b2-pv3-traeumen", german: "träumen von", turkish: "hayal etmek",
            sentence: "Ich träume von einer langen Reise.",
            sentences: [
              { german: "Ich träume von einer langen Reise.", turkish: "(Uzun bir seyahat hayal ediyorum.)" },
              { german: "Sie träumt von einem eigenen Haus.", turkish: "(Kendi evini hayal ediyor.)" },
              { german: "Als Kind hat er von einer Karriere als Arzt geträumt.", turkish: "(Çocukken doktor olmayı hayal etti.)" },
            ],
            opposite: "", imageKey: "b2-pv-traeumen", cardColor: "#FCE7F3",
            perfekt: "hat geträumt", praeteritum: "träumte von", praeposition: "von + Dativ",
          },
          {
            id: "b2-pv3-warnen", german: "warnen vor", turkish: "uyarmak",
            sentence: "Der Arzt warnt vor den Risiken.",
            sentences: [
              { german: "Der Arzt warnt vor den Risiken.", turkish: "(Doktor risklere karşı uyarıyor.)" },
              { german: "Sie warnte ihre Freunde vor dem Betrüger.", turkish: "(Arkadaşlarını dolandırıcıya karşı uyardı.)" },
              { german: "Die Polizei hat vor dem Sturm gewarnt.", turkish: "(Polis fırtınaya karşı uyardı.)" },
            ],
            opposite: "", imageKey: "b2-pv-warnen", cardColor: "#E0E7FF",
            perfekt: "hat gewarnt", praeteritum: "warnte vor", praeposition: "vor + Dativ",
          },
          {
            id: "b2-pv3-zweifeln", german: "zweifeln an", turkish: "şüphe etmek",
            sentence: "Er zweifelt an seiner Entscheidung.",
            sentences: [
              { german: "Er zweifelt an seiner Entscheidung.", turkish: "(Kararından şüphe ediyor.)" },
              { german: "Sie zweifelt an der Richtigkeit der Information.", turkish: "(Bilginin doğruluğundan şüphe ediyor.)" },
              { german: "Niemand hat an seinem Erfolg gezweifelt.", turkish: "(Kimse başarısından şüphe etmedi.)" },
            ],
            opposite: "", imageKey: "b2-pv-zweifeln", cardColor: "#F3E8FF",
            perfekt: "hat gezweifelt", praeteritum: "zweifelte an", praeposition: "an + Dativ",
          },
          {
            id: "b2-pv3-vergleichen", german: "vergleichen mit", turkish: "karşılaştırmak",
            sentence: "Man kann diese Angebote nicht miteinander vergleichen.",
            sentences: [
              { german: "Man kann diese Angebote nicht miteinander vergleichen.", turkish: "(Bu teklifleri birbiriyle karşılaştıramazsın.)" },
              { german: "Er vergleicht seine Noten mit denen seiner Mitschüler.", turkish: "(Notlarını sınıf arkadaşlarıyla karşılaştırıyor.)" },
              { german: "Die Studie hat die Ergebnisse mit früheren Daten verglichen.", turkish: "(Çalışma sonuçları önceki verilerle karşılaştırdı.)" },
            ],
            opposite: "", imageKey: "b2-pv-vergleichen", cardColor: "#FEE2E2",
            perfekt: "hat verglichen", praeteritum: "verglich mit", praeposition: "mit + Dativ",
          },
          {
            id: "b2-pv3-abhaengen", german: "abhängen von", turkish: "bağlı olmak",
            sentence: "Vieles hängt von der eigenen Einstellung ab.",
            sentences: [
              { german: "Vieles hängt von der eigenen Einstellung ab.", turkish: "(Pek çok şey kişinin tutumuna bağlı.)" },
              { german: "Die Qualität hängt vom Material ab.", turkish: "(Kalite malzemeye bağlı.)" },
              { german: "Der Preis hat von der Nachfrage abgehangen.", turkish: "(Fiyat talebe bağlıydı.)" },
            ],
            opposite: "", imageKey: "b2-pv-abhaengen", cardColor: "#D1FAE5",
            perfekt: "hat abgehangen", praeteritum: "hing ab", praeposition: "von + Dativ",
          },
        ],
      },
      {
        id: "b2-pv-set4",
        name: "B2 Präposition Verben 4",
        cards: [
          {
            id: "b2-pv4-bitten", german: "bitten um", turkish: "rica etmek / istemek",
            sentence: "Er bittet um Hilfe.",
            sentences: [
              { german: "Er bittet um Hilfe.", turkish: "(Yardım istiyor.)" },
              { german: "Sie bat ihren Chef um einen freien Tag.", turkish: "(Patronundan bir gün izin istedi.)" },
              { german: "Wir haben die Behörde um eine Verlängerung gebeten.", turkish: "(Kurumdan süre uzatımı istedik.)" },
            ],
            opposite: "", imageKey: "b2-pv-bitten", cardColor: "#DBEAFE",
            perfekt: "hat gebeten", praeteritum: "bat um", praeposition: "um + Akkusativ",
          },
          {
            id: "b2-pv4-sorgen", german: "sorgen für", turkish: "sağlamak / ilgilenmek",
            sentence: "Die Eltern sorgen für ihre Kinder.",
            sentences: [
              { german: "Die Eltern sorgen für ihre Kinder.", turkish: "(Ebeveynler çocuklarına bakıyor.)" },
              { german: "Er sorgt für gute Stimmung in der Gruppe.", turkish: "(Grupta iyi bir hava sağlıyor.)" },
              { german: "Die Stadt hat für genug Plätze gesorgt.", turkish: "(Şehir yeterli yer sağladı.)" },
            ],
            opposite: "", imageKey: "b2-pv-sorgen", cardColor: "#DCFCE7",
            perfekt: "hat gesorgt", praeteritum: "sorgte für", praeposition: "für + Akkusativ",
          },
          {
            id: "b2-pv4-kaempfen", german: "kämpfen für", turkish: "mücadele etmek",
            sentence: "Sie kämpft für ihre Rechte.",
            sentences: [
              { german: "Sie kämpft für ihre Rechte.", turkish: "(Hakları için mücadele ediyor.)" },
              { german: "Er kämpft für eine bessere Zukunft.", turkish: "(Daha iyi bir gelecek için mücadele ediyor.)" },
              { german: "Viele Menschen haben für die Freiheit gekämpft.", turkish: "(Birçok insan özgürlük için savaştı.)" },
            ],
            opposite: "", imageKey: "b2-pv-kaempfen", cardColor: "#FEF9C3",
            perfekt: "hat gekämpft", praeteritum: "kämpfte für", praeposition: "für + Akkusativ",
          },
          {
            id: "b2-pv4-halten", german: "halten von", turkish: "hakkında düşünmek",
            sentence: "Was hältst du von dieser Idee?",
            sentences: [
              { german: "Was hältst du von dieser Idee?", turkish: "(Bu fikir hakkında ne düşünüyorsun?)" },
              { german: "Ich halte nichts von dieser Methode.", turkish: "(Bu yöntemi doğru bulmuyorum.)" },
              { german: "Er hat nicht viel von der Entscheidung gehalten.", turkish: "(Kararı pek beğenmemişti.)" },
            ],
            opposite: "", imageKey: "b2-pv-halten", cardColor: "#FFEDD5",
            perfekt: "hat gehalten", praeteritum: "hielt von", praeposition: "von + Dativ",
          },
          {
            id: "b2-pv4-bestehen", german: "bestehen aus", turkish: "oluşmak",
            sentence: "Das Team besteht aus zehn Personen.",
            sentences: [
              { german: "Das Team besteht aus zehn Personen.", turkish: "(Ekip on kişiden oluşuyor.)" },
              { german: "Die Prüfung besteht aus drei Teilen.", turkish: "(Sınav üç bölümden oluşuyor.)" },
              { german: "Das Gebäude hat aus drei Stockwerken bestanden.", turkish: "(Bina üç kattan oluşuyordu.)" },
            ],
            opposite: "", imageKey: "b2-pv-bestehen", cardColor: "#E0F2FE",
            perfekt: "hat bestanden", praeteritum: "bestand aus", praeposition: "aus + Dativ",
          },
          {
            id: "b2-pv4-teilhaben", german: "teilhaben an", turkish: "pay sahibi olmak / ortak olmak",
            sentence: "Alle sollen am Gewinn teilhaben.",
            sentences: [
              { german: "Alle sollen am Gewinn teilhaben.", turkish: "(Herkes kâra ortak olmalı.)" },
              { german: "Er möchte an dieser Entwicklung teilhaben.", turkish: "(Bu gelişmeden pay almak istiyor.)" },
              { german: "Sie hat am Erfolg des Projekts teilgehabt.", turkish: "(Projenin başarısında payı vardı.)" },
            ],
            opposite: "", imageKey: "b2-pv-teilhaben", cardColor: "#FCE7F3",
            perfekt: "hat teilgehabt", praeteritum: "hatte teil", praeposition: "an + Dativ",
          },
          {
            id: "b2-pv4-fordern", german: "fordern von", turkish: "talep etmek",
            sentence: "Er fordert von seinem Team mehr Einsatz.",
            sentences: [
              { german: "Er fordert von seinem Team mehr Einsatz.", turkish: "(Ekibinden daha fazla çaba talep ediyor.)" },
              { german: "Die Gewerkschaft fordert mehr Lohn von den Arbeitgebern.", turkish: "(Sendika işverenlerden daha yüksek ücret talep ediyor.)" },
              { german: "Sie hat Transparenz von der Regierung gefordert.", turkish: "(Hükümetten şeffaflık talep etti.)" },
            ],
            opposite: "", imageKey: "b2-pv-fordern", cardColor: "#E0E7FF",
            perfekt: "hat gefordert", praeteritum: "forderte von", praeposition: "von + Dativ",
          },
          {
            id: "b2-pv4-bewerben", german: "sich bewerben um", turkish: "başvurmak",
            sentence: "Er bewirbt sich um die Stelle.",
            sentences: [
              { german: "Er bewirbt sich um die Stelle.", turkish: "(Pozisyona başvuruyor.)" },
              { german: "Sie hat sich um ein Stipendium beworben.", turkish: "(Bursa başvurdu.)" },
              { german: "Hunderte haben sich um den Job beworben.", turkish: "(Yüzlerce kişi işe başvurdu.)" },
            ],
            opposite: "", imageKey: "b2-pv-bewerben", cardColor: "#F3E8FF",
            perfekt: "hat sich beworben", praeteritum: "bewarb sich", praeposition: "um + Akkusativ",
          },
          {
            id: "b2-pv4-eignen", german: "sich eignen für", turkish: "uygun olmak",
            sentence: "Dieses Buch eignet sich gut für Anfänger.",
            sentences: [
              { german: "Dieses Buch eignet sich gut für Anfänger.", turkish: "(Bu kitap yeni başlayanlar için çok uygun.)" },
              { german: "Sie eignet sich sehr gut für diese Aufgabe.", turkish: "(Bu görev için çok uygun.)" },
              { german: "Der Raum hat sich nicht für die Veranstaltung geeignet.", turkish: "(Mekan etkinlik için uygun değildi.)" },
            ],
            opposite: "", imageKey: "b2-pv-eignen", cardColor: "#FEE2E2",
            perfekt: "hat sich geeignet", praeteritum: "eignete sich", praeposition: "für + Akkusativ",
          },
          {
            id: "b2-pv4-freuen-ueber", german: "sich freuen über", turkish: "sevinmek",
            sentence: "Ich freue mich über das Geschenk.",
            sentences: [
              { german: "Ich freue mich über das Geschenk.", turkish: "(Hediyeye sevindim.)" },
              { german: "Sie freut sich über die gute Note.", turkish: "(İyi nota seviniyor.)" },
              { german: "Er hat sich sehr über den Besuch gefreut.", turkish: "(Ziyaretten çok sevindi.)" },
            ],
            opposite: "", imageKey: "b2-pv-freuen-ueber", cardColor: "#D1FAE5",
            perfekt: "hat sich gefreut", praeteritum: "freute sich über", praeposition: "über + Akkusativ",
          },
        ],
      },
    ],
  },
  {
    id: "b2-trennbare-verben",
    name: "B2 Trennbare Verben",
    level: "B2",
    sets: [
      {
        id: "b2-tv-set1",
        name: "B2 Trennbare Verben 1",
        cards: [
          {
            id: "b2-tv1-abnehmen", german: "abnehmen", turkish: "azalmak / kilo vermek",
            sentence: "Die Zahl der Unfälle hat abgenommen.",
            sentences: [
              { german: "Die Zahl der Unfälle hat abgenommen.", turkish: "(Kaza sayısı azaldı.)" },
              { german: "Er hat in den letzten Monaten zehn Kilo abgenommen.", turkish: "(Son aylarda on kilo verdi.)" },
              { german: "Die Nachfrage nimmt langsam ab.", turkish: "(Talep yavaş yavaş azalıyor.)" },
            ],
            opposite: "", imageKey: "b2-tv-abnehmen", cardColor: "#DBEAFE",
            perfekt: "hat abgenommen", praeteritum: "nahm ab", trennbar: true,
          },
          {
            id: "b2-tv1-annehmen", german: "annehmen", turkish: "kabul etmek / varsaymak",
            sentence: "Sie nimmt das Angebot an.",
            sentences: [
              { german: "Sie nimmt das Angebot an.", turkish: "(Teklifi kabul ediyor.)" },
              { german: "Ich nehme an, dass er Recht hat.", turkish: "(Haklı olduğunu varsayıyorum.)" },
              { german: "Er hat die neue Stelle angenommen.", turkish: "(Yeni pozisyonu kabul etti.)" },
            ],
            opposite: "", imageKey: "b2-tv-annehmen", cardColor: "#DCFCE7",
            perfekt: "hat angenommen", praeteritum: "nahm an", trennbar: true,
          },
          {
            id: "b2-tv1-aufbauen", german: "aufbauen", turkish: "kurmak / inşa etmek",
            sentence: "Wir bauen eine neue Abteilung auf.",
            sentences: [
              { german: "Wir bauen eine neue Abteilung auf.", turkish: "(Yeni bir departman kuruyoruz.)" },
              { german: "Sie hat eine erfolgreiche Karriere aufgebaut.", turkish: "(Başarılı bir kariyer kurdu.)" },
              { german: "Er baut das Unternehmen Schritt für Schritt auf.", turkish: "(Şirketi adım adım inşa ediyor.)" },
            ],
            opposite: "", imageKey: "b2-tv-aufbauen", cardColor: "#FEF9C3",
            perfekt: "hat aufgebaut", praeteritum: "baute auf", trennbar: true,
          },
          {
            id: "b2-tv1-aufgeben", german: "aufgeben", turkish: "vazgeçmek / bırakmak",
            sentence: "Gib nicht so schnell auf!",
            sentences: [
              { german: "Gib nicht so schnell auf!", turkish: "(Bu kadar çabuk vazgeçme!)" },
              { german: "Sie hat ihren Traum aufgegeben.", turkish: "(Hayalinden vazgeçti.)" },
              { german: "Er gibt das Rauchen auf.", turkish: "(Sigarayı bırakıyor.)" },
            ],
            opposite: "", imageKey: "b2-tv-aufgeben", cardColor: "#FFEDD5",
            perfekt: "hat aufgegeben", praeteritum: "gab auf", trennbar: true,
          },
          {
            id: "b2-tv1-aufzeigen", german: "aufzeigen", turkish: "ortaya koymak / göstermek",
            sentence: "Die Studie zeigt deutliche Probleme auf.",
            sentences: [
              { german: "Die Studie zeigt deutliche Probleme auf.", turkish: "(Çalışma belirgin sorunları ortaya koyuyor.)" },
              { german: "Er hat die Lösung klar aufgezeigt.", turkish: "(Çözümü açıkça gösterdi.)" },
              { german: "Der Bericht zeigt neue Möglichkeiten auf.", turkish: "(Rapor yeni olanakları ortaya koyuyor.)" },
            ],
            opposite: "", imageKey: "b2-tv-aufzeigen", cardColor: "#E0F2FE",
            perfekt: "hat aufgezeigt", praeteritum: "zeigte auf", trennbar: true,
          },
          {
            id: "b2-tv1-ausgeben", german: "ausgeben", turkish: "harcamak",
            sentence: "Er gibt zu viel Geld aus.",
            sentences: [
              { german: "Er gibt zu viel Geld aus.", turkish: "(Çok fazla para harcıyor.)" },
              { german: "Sie hat ihr ganzes Gehalt ausgegeben.", turkish: "(Tüm maaşını harcadı.)" },
              { german: "Wie viel gibst du im Monat aus?", turkish: "(Ayda ne kadar harcıyorsun?)" },
            ],
            opposite: "", imageKey: "b2-tv-ausgeben", cardColor: "#FCE7F3",
            perfekt: "hat ausgegeben", praeteritum: "gab aus", trennbar: true,
          },
          {
            id: "b2-tv1-ausloesen", german: "auslösen", turkish: "tetiklemek / neden olmak",
            sentence: "Die Nachricht hat Panik ausgelöst.",
            sentences: [
              { german: "Die Nachricht hat Panik ausgelöst.", turkish: "(Haber panik yarattı.)" },
              { german: "Ein kleiner Fehler kann große Probleme auslösen.", turkish: "(Küçük bir hata büyük sorunlara yol açabilir.)" },
              { german: "Der Film hat viele Emotionen ausgelöst.", turkish: "(Film çok sayıda duygu uyandırdı.)" },
            ],
            opposite: "", imageKey: "b2-tv-ausloesen", cardColor: "#E0E7FF",
            perfekt: "hat ausgelöst", praeteritum: "löste aus", trennbar: true,
          },
          {
            id: "b2-tv1-beitragen", german: "beitragen", turkish: "katkıda bulunmak",
            sentence: "Jeder kann zum Erfolg beitragen.",
            sentences: [
              { german: "Jeder kann zum Erfolg beitragen.", turkish: "(Herkes başarıya katkıda bulunabilir.)" },
              { german: "Sie trägt viel zum Team bei.", turkish: "(Ekibe çok katkıda bulunuyor.)" },
              { german: "Er hat wesentlich zu diesem Projekt beigetragen.", turkish: "(Bu projeye önemli katkıda bulundu.)" },
            ],
            opposite: "", imageKey: "b2-tv-beitragen", cardColor: "#F3E8FF",
            perfekt: "hat beigetragen", praeteritum: "trug bei", trennbar: true,
          },
          {
            id: "b2-tv1-darstellen", german: "darstellen", turkish: "temsil etmek / göstermek",
            sentence: "Das stellt ein großes Problem dar.",
            sentences: [
              { german: "Das stellt ein großes Problem dar.", turkish: "(Bu büyük bir sorunu temsil ediyor.)" },
              { german: "Sie stellt die Ergebnisse in einer Grafik dar.", turkish: "(Sonuçları bir grafikle gösteriyor.)" },
              { german: "Der Künstler hat die Natur realistisch dargestellt.", turkish: "(Sanatçı doğayı gerçekçi biçimde tasvir etti.)" },
            ],
            opposite: "", imageKey: "b2-tv-darstellen", cardColor: "#FEE2E2",
            perfekt: "hat dargestellt", praeteritum: "stellte dar", trennbar: true,
          },
          {
            id: "b2-tv1-durchfuehren", german: "durchführen", turkish: "gerçekleştirmek / yürütmek",
            sentence: "Die Firma führt regelmäßige Tests durch.",
            sentences: [
              { german: "Die Firma führt regelmäßige Tests durch.", turkish: "(Şirket düzenli testler yürütüyor.)" },
              { german: "Die Studie wurde erfolgreich durchgeführt.", turkish: "(Çalışma başarıyla gerçekleştirildi.)" },
              { german: "Das Experiment wird nächste Woche durchgeführt.", turkish: "(Deney gelecek hafta yapılacak.)" },
            ],
            opposite: "", imageKey: "b2-tv-durchfuehren", cardColor: "#D1FAE5",
            perfekt: "hat durchgeführt", praeteritum: "führte durch", trennbar: true,
          },
        ],
      },
      {
        id: "b2-tv-set2",
        name: "B2 Trennbare Verben 2",
        cards: [
          {
            id: "b2-tv2-einfuehren", german: "einführen", turkish: "tanıtmak / uygulamaya koymak",
            sentence: "Die Regierung führt ein neues Gesetz ein.",
            sentences: [
              { german: "Die Regierung führt ein neues Gesetz ein.", turkish: "(Hükümet yeni bir yasa uygulamaya koyuyor.)" },
              { german: "Das Unternehmen hat ein neues System eingeführt.", turkish: "(Şirket yeni bir sistem tanıttı.)" },
              { german: "Wann wird die neue Regel eingeführt?", turkish: "(Yeni kural ne zaman uygulamaya konacak?)" },
            ],
            opposite: "", imageKey: "b2-tv-einfuehren", cardColor: "#DBEAFE",
            perfekt: "hat eingeführt", praeteritum: "führte ein", trennbar: true,
          },
          {
            id: "b2-tv2-eingreifen", german: "eingreifen", turkish: "müdahale etmek",
            sentence: "Die Polizei muss eingreifen.",
            sentences: [
              { german: "Die Polizei muss eingreifen.", turkish: "(Polis müdahale etmeli.)" },
              { german: "Er greift ein, wenn es nötig ist.", turkish: "(Gerektiğinde müdahale ediyor.)" },
              { german: "Die Behörde hat rechtzeitig eingegriffen.", turkish: "(Kurum zamanında müdahale etti.)" },
            ],
            opposite: "", imageKey: "b2-tv-eingreifen", cardColor: "#DCFCE7",
            perfekt: "hat eingegriffen", praeteritum: "griff ein", trennbar: true,
          },
          {
            id: "b2-tv2-einhalten", german: "einhalten", turkish: "uymak / yerine getirmek",
            sentence: "Wir müssen die Regeln einhalten.",
            sentences: [
              { german: "Wir müssen die Regeln einhalten.", turkish: "(Kurallara uymamız gerekiyor.)" },
              { german: "Sie hält ihre Versprechen immer ein.", turkish: "(Vaatlerini her zaman yerine getirir.)" },
              { german: "Der Termin wurde nicht eingehalten.", turkish: "(Son tarihe uyulmadı.)" },
            ],
            opposite: "", imageKey: "b2-tv-einhalten", cardColor: "#FEF9C3",
            perfekt: "hat eingehalten", praeteritum: "hielt ein", trennbar: true,
          },
          {
            id: "b2-tv2-einsetzen", german: "einsetzen", turkish: "kullanmak / uygulamak",
            sentence: "Wir setzen moderne Technologie ein.",
            sentences: [
              { german: "Wir setzen moderne Technologie ein.", turkish: "(Modern teknolojiyi kullanıyoruz.)" },
              { german: "Er setzt sich für die Umwelt ein.", turkish: "(Çevre için çaba harcıyor.)" },
              { german: "Die Methode wurde erfolgreich eingesetzt.", turkish: "(Yöntem başarıyla uygulandı.)" },
            ],
            opposite: "", imageKey: "b2-tv-einsetzen", cardColor: "#FFEDD5",
            perfekt: "hat eingesetzt", praeteritum: "setzte ein", trennbar: true,
          },
          {
            id: "b2-tv2-entstehen", german: "entstehen", turkish: "ortaya çıkmak / oluşmak",
            sentence: "Neue Ideen entstehen durch Zusammenarbeit.",
            sentences: [
              { german: "Neue Ideen entstehen durch Zusammenarbeit.", turkish: "(Yeni fikirler iş birliğiyle ortaya çıkar.)" },
              { german: "Ein Fehler ist bei der Übertragung entstanden.", turkish: "(Aktarım sırasında bir hata oluştu.)" },
              { german: "So ist die Idee für das Projekt entstanden.", turkish: "(Proje fikri böyle doğdu.)" },
            ],
            opposite: "", imageKey: "b2-tv-entstehen", cardColor: "#E0F2FE",
            perfekt: "ist entstanden", praeteritum: "entstand", trennbar: true,
          },
          {
            id: "b2-tv2-feststellen", german: "feststellen", turkish: "tespit etmek / saptamak",
            sentence: "Der Arzt stellt eine Erkrankung fest.",
            sentences: [
              { german: "Der Arzt stellt eine Erkrankung fest.", turkish: "(Doktor bir hastalık tespit eder.)" },
              { german: "Wir haben festgestellt, dass die Daten falsch sind.", turkish: "(Verilerin yanlış olduğunu saptadık.)" },
              { german: "Er stellt einen Fehler im System fest.", turkish: "(Sistemde bir hata saptıyor.)" },
            ],
            opposite: "", imageKey: "b2-tv-feststellen", cardColor: "#FCE7F3",
            perfekt: "hat festgestellt", praeteritum: "stellte fest", trennbar: true,
          },
          {
            id: "b2-tv2-fortsetzen", german: "fortsetzen", turkish: "sürdürmek / devam ettirmek",
            sentence: "Wir setzen die Arbeit morgen fort.",
            sentences: [
              { german: "Wir setzen die Arbeit morgen fort.", turkish: "(Çalışmayı yarın sürdüreceğiz.)" },
              { german: "Die Verhandlungen werden fortgesetzt.", turkish: "(Görüşmeler devam ettirilecek.)" },
              { german: "Er hat seine Forschung trotz aller Hindernisse fortgesetzt.", turkish: "(Tüm engellere rağmen araştırmasını sürdürdü.)" },
            ],
            opposite: "", imageKey: "b2-tv-fortsetzen", cardColor: "#E0E7FF",
            perfekt: "hat fortgesetzt", praeteritum: "setzte fort", trennbar: true,
          },
          {
            id: "b2-tv2-herausfinden", german: "herausfinden", turkish: "bulmak / keşfetmek",
            sentence: "Wir müssen herausfinden, was passiert ist.",
            sentences: [
              { german: "Wir müssen herausfinden, was passiert ist.", turkish: "(Ne olduğunu bulmamız gerekiyor.)" },
              { german: "Sie hat herausgefunden, wie das System funktioniert.", turkish: "(Sistemin nasıl çalıştığını keşfetti.)" },
              { german: "Wie hast du das herausgefunden?", turkish: "(Bunu nasıl buldun?)" },
            ],
            opposite: "", imageKey: "b2-tv-herausfinden", cardColor: "#F3E8FF",
            perfekt: "hat herausgefunden", praeteritum: "fand heraus", trennbar: true,
          },
          {
            id: "b2-tv2-herstellen", german: "herstellen", turkish: "üretmek / kurmak",
            sentence: "Das Unternehmen stellt Autos her.",
            sentences: [
              { german: "Das Unternehmen stellt Autos her.", turkish: "(Şirket araba üretiyor.)" },
              { german: "Das Produkt wird in Deutschland hergestellt.", turkish: "(Ürün Almanya'da üretiliyor.)" },
              { german: "Wir müssen einen Kontakt herstellen.", turkish: "(Bir bağlantı kurmamız gerekiyor.)" },
            ],
            opposite: "", imageKey: "b2-tv-herstellen", cardColor: "#FEE2E2",
            perfekt: "hat hergestellt", praeteritum: "stellte her", trennbar: true,
          },
          {
            id: "b2-tv2-teilnehmen", german: "teilnehmen", turkish: "katılmak",
            sentence: "Sie nimmt an dem Kurs teil.",
            sentences: [
              { german: "Sie nimmt an dem Kurs teil.", turkish: "(Kursa katılıyor.)" },
              { german: "Viele Länder haben an der Konferenz teilgenommen.", turkish: "(Birçok ülke konferansa katıldı.)" },
              { german: "Er nimmt regelmäßig an Weiterbildungen teil.", turkish: "(Düzenli olarak eğitimlere katılıyor.)" },
            ],
            opposite: "", imageKey: "b2-tv-teilnehmen", cardColor: "#D1FAE5",
            perfekt: "hat teilgenommen", praeteritum: "nahm teil", trennbar: true,
          },
        ],
      },
      {
        id: "b2-tv-set3",
        name: "B2 Trennbare Verben 3",
        cards: [
          {
            id: "b2-tv3-umsetzen", german: "umsetzen", turkish: "uygulamak / hayata geçirmek",
            sentence: "Wir setzen den Plan sofort um.",
            sentences: [
              { german: "Wir setzen den Plan sofort um.", turkish: "(Planı hemen uygulamaya koyuyoruz.)" },
              { german: "Die Idee wurde erfolgreich umgesetzt.", turkish: "(Fikir başarıyla hayata geçirildi.)" },
              { german: "Es ist wichtig, Entscheidungen schnell umzusetzen.", turkish: "(Kararları hızlıca uygulamak önemlidir.)" },
            ],
            opposite: "", imageKey: "b2-tv-umsetzen", cardColor: "#DBEAFE",
            perfekt: "hat umgesetzt", praeteritum: "setzte um", trennbar: true,
          },
          {
            id: "b2-tv3-vorgehen", german: "vorgehen", turkish: "ilerlemek / harekete geçmek",
            sentence: "Wie sollen wir vorgehen?",
            sentences: [
              { german: "Wie sollen wir vorgehen?", turkish: "(Nasıl hareket etmeliyiz?)" },
              { german: "Er geht systematisch vor.", turkish: "(Sistematik biçimde ilerliyor.)" },
              { german: "Die Polizei ist streng gegen Verstöße vorgegangen.", turkish: "(Polis ihlallere karşı sert önlem aldı.)" },
            ],
            opposite: "", imageKey: "b2-tv-vorgehen", cardColor: "#DCFCE7",
            perfekt: "ist vorgegangen", praeteritum: "ging vor", trennbar: true,
          },
          {
            id: "b2-tv3-vorbereiten", german: "vorbereiten", turkish: "hazırlamak / hazırlanmak",
            sentence: "Wir bereiten das Meeting vor.",
            sentences: [
              { german: "Wir bereiten das Meeting vor.", turkish: "(Toplantıyı hazırlıyoruz.)" },
              { german: "Ich bereite mich auf die Prüfung vor.", turkish: "(Sınava hazırlanıyorum.)" },
              { german: "Sie hat die Präsentation sorgfältig vorbereitet.", turkish: "(Sunumu özenle hazırladı.)" },
            ],
            opposite: "", imageKey: "b2-tv-vorbereiten", cardColor: "#FEF9C3",
            perfekt: "hat vorbereitet", praeteritum: "bereitete vor", trennbar: true,
          },
          {
            id: "b2-tv3-vorstellen", german: "vorstellen", turkish: "tanıtmak / hayal etmek",
            sentence: "Er stellt sich dem Team vor.",
            sentences: [
              { german: "Er stellt sich dem Team vor.", turkish: "(Kendini ekibe tanıtıyor.)" },
              { german: "Können Sie sich vorstellen, wie das aussieht?", turkish: "(Bunun nasıl göründüğünü hayal edebilir misiniz?)" },
              { german: "Sie hat ihre Idee dem Chef vorgestellt.", turkish: "(Fikrini patronuna tanıttı.)" },
            ],
            opposite: "", imageKey: "b2-tv-vorstellen", cardColor: "#FFEDD5",
            perfekt: "hat vorgestellt", praeteritum: "stellte vor", trennbar: true,
          },
          {
            id: "b2-tv3-wegfallen", german: "wegfallen", turkish: "kaldırılmak / ortadan kalkmak",
            sentence: "Diese Kosten fallen weg.",
            sentences: [
              { german: "Diese Kosten fallen weg.", turkish: "(Bu maliyetler düşüyor.)" },
              { german: "Der Posten ist leider weggefallen.", turkish: "(Pozisyon maalesef kaldırıldı.)" },
              { german: "Die Regelung fällt ab nächstem Jahr weg.", turkish: "(Düzenleme gelecek yıldan itibaren kalkıyor.)" },
            ],
            opposite: "", imageKey: "b2-tv-wegfallen", cardColor: "#E0F2FE",
            perfekt: "ist weggefallen", praeteritum: "fiel weg", trennbar: true,
          },
          {
            id: "b2-tv3-weiterentwickeln", german: "weiterentwickeln", turkish: "geliştirmek",
            sentence: "Wir entwickeln das Produkt ständig weiter.",
            sentences: [
              { german: "Wir entwickeln das Produkt ständig weiter.", turkish: "(Ürünü sürekli geliştiriyoruz.)" },
              { german: "Die Technologie wurde weiterentwickelt.", turkish: "(Teknoloji daha da geliştirildi.)" },
              { german: "Er entwickelt seine Fähigkeiten kontinuierlich weiter.", turkish: "(Becerilerini sürekli olarak geliştiriyor.)" },
            ],
            opposite: "", imageKey: "b2-tv-weiterentwickeln", cardColor: "#FCE7F3",
            perfekt: "hat weiterentwickelt", praeteritum: "entwickelte weiter", trennbar: true,
          },
          {
            id: "b2-tv3-weitergeben", german: "weitergeben", turkish: "aktarmak / iletmek",
            sentence: "Bitte gib diese Information weiter.",
            sentences: [
              { german: "Bitte gib diese Information weiter.", turkish: "(Lütfen bu bilgiyi ilet.)" },
              { german: "Sie hat ihr Wissen an die nächste Generation weitergegeben.", turkish: "(Bilgisini bir sonraki nesle aktardı.)" },
              { german: "Die Nachricht wurde sofort weitergegeben.", turkish: "(Haber hemen iletildi.)" },
            ],
            opposite: "", imageKey: "b2-tv-weitergeben", cardColor: "#E0E7FF",
            perfekt: "hat weitergegeben", praeteritum: "gab weiter", trennbar: true,
          },
          {
            id: "b2-tv3-zusammenarbeiten", german: "zusammenarbeiten", turkish: "birlikte çalışmak",
            sentence: "Wir arbeiten gut zusammen.",
            sentences: [
              { german: "Wir arbeiten gut zusammen.", turkish: "(İyi birlikte çalışıyoruz.)" },
              { german: "Die Teams haben erfolgreich zusammengearbeitet.", turkish: "(Ekipler başarıyla birlikte çalıştı.)" },
              { german: "Es ist wichtig, offen zusammenzuarbeiten.", turkish: "(Açık bir şekilde birlikte çalışmak önemlidir.)" },
            ],
            opposite: "", imageKey: "b2-tv-zusammenarbeiten", cardColor: "#F3E8FF",
            perfekt: "hat zusammengearbeitet", praeteritum: "arbeitete zusammen", trennbar: true,
          },
          {
            id: "b2-tv3-zusammenfassen", german: "zusammenfassen", turkish: "özetlemek",
            sentence: "Können Sie das kurz zusammenfassen?",
            sentences: [
              { german: "Können Sie das kurz zusammenfassen?", turkish: "(Bunu kısaca özetleyebilir misiniz?)" },
              { german: "Er fasst die wichtigsten Punkte zusammen.", turkish: "(En önemli noktaları özetliyor.)" },
              { german: "Die Ergebnisse wurden in einem Bericht zusammengefasst.", turkish: "(Sonuçlar bir raporda özetlendi.)" },
            ],
            opposite: "", imageKey: "b2-tv-zusammenfassen", cardColor: "#FEE2E2",
            perfekt: "hat zusammengefasst", praeteritum: "fasste zusammen", trennbar: true,
          },
          {
            id: "b2-tv3-zurueckgehen", german: "zurückgehen", turkish: "azalmak / geri gitmek",
            sentence: "Die Temperaturen gehen zurück.",
            sentences: [
              { german: "Die Temperaturen gehen zurück.", turkish: "(Sıcaklıklar düşüyor.)" },
              { german: "Die Zahl der Beschäftigten ist zurückgegangen.", turkish: "(Çalışan sayısı azaldı.)" },
              { german: "Er geht gedanklich in die Vergangenheit zurück.", turkish: "(Zihinsel olarak geçmişe geri dönüyor.)" },
            ],
            opposite: "", imageKey: "b2-tv-zurueckgehen", cardColor: "#D1FAE5",
            perfekt: "ist zurückgegangen", praeteritum: "ging zurück", trennbar: true,
          },
        ],
      },
      {
        id: "b2-tv-set4",
        name: "B2 Trennbare Verben 4",
        cards: [
          {
            id: "b2-tv4-zurueckfuehren", german: "zurückführen", turkish: "bağlamak / atfetmek",
            sentence: "Der Erfolg ist auf harte Arbeit zurückzuführen.",
            sentences: [
              { german: "Der Erfolg ist auf harte Arbeit zurückzuführen.", turkish: "(Başarı sıkı çalışmaya bağlanabilir.)" },
              { german: "Die Ursache lässt sich auf einen Fehler zurückführen.", turkish: "(Neden bir hataya bağlanabilir.)" },
              { german: "Er führt seine Karriere auf Glück zurück.", turkish: "(Kariyerini şansa bağlıyor.)" },
            ],
            opposite: "", imageKey: "b2-tv-zurueckfuehren", cardColor: "#DBEAFE",
            perfekt: "hat zurückgeführt", praeteritum: "führte zurück", trennbar: true,
          },
          {
            id: "b2-tv4-zurueckgreifen", german: "zurückgreifen", turkish: "başvurmak / yararlanmak",
            sentence: "Wir greifen auf frühere Erfahrungen zurück.",
            sentences: [
              { german: "Wir greifen auf frühere Erfahrungen zurück.", turkish: "(Önceki deneyimlerden yararlanıyoruz.)" },
              { german: "Er greift in schwierigen Situationen auf sein Netzwerk zurück.", turkish: "(Zor durumlarda ağına başvuruyor.)" },
              { german: "Die Forscher haben auf alte Daten zurückgegriffen.", turkish: "(Araştırmacılar eski verilere başvurdu.)" },
            ],
            opposite: "", imageKey: "b2-tv-zurueckgreifen", cardColor: "#DCFCE7",
            perfekt: "hat zurückgegriffen", praeteritum: "griff zurück", trennbar: true,
          },
          {
            id: "b2-tv4-zustimmen", german: "zustimmen", turkish: "onaylamak / katılmak",
            sentence: "Ich stimme deiner Meinung zu.",
            sentences: [
              { german: "Ich stimme deiner Meinung zu.", turkish: "(Görüşüne katılıyorum.)" },
              { german: "Der Vorschlag wurde einstimmig zugestimmt.", turkish: "(Öneri oybirliğiyle onaylandı.)" },
              { german: "Sie stimmt nicht immer zu.", turkish: "(Her zaman onaylamıyor.)" },
            ],
            opposite: "", imageKey: "b2-tv-zustimmen", cardColor: "#FEF9C3",
            perfekt: "hat zugestimmt", praeteritum: "stimmte zu", trennbar: true,
          },
          {
            id: "b2-tv4-zunehmen", german: "zunehmen", turkish: "artmak / kilo almak",
            sentence: "Die Zahl der Nutzer nimmt zu.",
            sentences: [
              { german: "Die Zahl der Nutzer nimmt zu.", turkish: "(Kullanıcı sayısı artıyor.)" },
              { german: "Er hat in den letzten Monaten zugenommen.", turkish: "(Son aylarda kilo aldı.)" },
              { german: "Der Verkehr nimmt ständig zu.", turkish: "(Trafik sürekli artıyor.)" },
            ],
            opposite: "", imageKey: "b2-tv-zunehmen", cardColor: "#FFEDD5",
            perfekt: "hat zugenommen", praeteritum: "nahm zu", trennbar: true,
          },
          {
            id: "b2-tv4-auftreten", german: "auftreten", turkish: "ortaya çıkmak / sahneye çıkmak",
            sentence: "Das Problem tritt immer wieder auf.",
            sentences: [
              { german: "Das Problem tritt immer wieder auf.", turkish: "(Sorun tekrar tekrar ortaya çıkıyor.)" },
              { german: "Die Band tritt morgen auf.", turkish: "(Grup yarın sahne alıyor.)" },
              { german: "Fehler sind während des Prozesses aufgetreten.", turkish: "(Süreç sırasında hatalar ortaya çıktı.)" },
            ],
            opposite: "", imageKey: "b2-tv-auftreten", cardColor: "#E0F2FE",
            perfekt: "ist aufgetreten", praeteritum: "trat auf", trennbar: true,
          },
          {
            id: "b2-tv4-ansteigen", german: "ansteigen", turkish: "artmak / yükselmek",
            sentence: "Die Preise sind stark angestiegen.",
            sentences: [
              { german: "Die Preise sind stark angestiegen.", turkish: "(Fiyatlar keskin biçimde yükseldi.)" },
              { german: "Die Temperaturen steigen weiter an.", turkish: "(Sıcaklıklar yükselmeye devam ediyor.)" },
              { german: "Die Nachfrage steigt jedes Jahr an.", turkish: "(Talep her yıl artıyor.)" },
            ],
            opposite: "", imageKey: "b2-tv-ansteigen", cardColor: "#FCE7F3",
            perfekt: "ist angestiegen", praeteritum: "stieg an", trennbar: true,
          },
          {
            id: "b2-tv4-absagen", german: "absagen", turkish: "iptal etmek / reddetmek",
            sentence: "Er hat das Meeting abgesagt.",
            sentences: [
              { german: "Er hat das Meeting abgesagt.", turkish: "(Toplantıyı iptal etti.)" },
              { german: "Sie sagt die Einladung leider ab.", turkish: "(Daveti maalesef reddediyor.)" },
              { german: "Das Konzert wurde wegen schlechten Wetters abgesagt.", turkish: "(Konser kötü hava nedeniyle iptal edildi.)" },
            ],
            opposite: "", imageKey: "b2-tv-absagen", cardColor: "#E0E7FF",
            perfekt: "hat abgesagt", praeteritum: "sagte ab", trennbar: true,
          },
          {
            id: "b2-tv4-nachdenken", german: "nachdenken", turkish: "düşünmek / kafa yormak",
            sentence: "Ich muss darüber nachdenken.",
            sentences: [
              { german: "Ich muss darüber nachdenken.", turkish: "(Bunu düşünmem gerekiyor.)" },
              { german: "Sie denkt lange über die Entscheidung nach.", turkish: "(Karar üzerinde uzun süre düşünüyor.)" },
              { german: "Er hat gründlich nachgedacht, bevor er antwortete.", turkish: "(Cevaplamadan önce iyice düşündü.)" },
            ],
            opposite: "", imageKey: "b2-tv-nachdenken", cardColor: "#F3E8FF",
            perfekt: "hat nachgedacht", praeteritum: "dachte nach", trennbar: true,
          },
          {
            id: "b2-tv4-mitbringen", german: "mitbringen", turkish: "getirmek / birlikte getirmek",
            sentence: "Bitte bring etwas zum Essen mit.",
            sentences: [
              { german: "Bitte bring etwas zum Essen mit.", turkish: "(Lütfen bir şeyler getir.)" },
              { german: "Sie bringt immer Geschenke mit.", turkish: "(Her zaman hediyeler getiriyor.)" },
              { german: "Er hat wertvolle Ideen zur Sitzung mitgebracht.", turkish: "(Toplantıya değerli fikirler getirdi.)" },
            ],
            opposite: "", imageKey: "b2-tv-mitbringen", cardColor: "#FEE2E2",
            perfekt: "hat mitgebracht", praeteritum: "brachte mit", trennbar: true,
          },
          {
            id: "b2-tv4-vorliegen", german: "vorliegen", turkish: "mevcut olmak / var olmak",
            sentence: "Die Ergebnisse liegen vor.",
            sentences: [
              { german: "Die Ergebnisse liegen vor.", turkish: "(Sonuçlar mevcut.)" },
              { german: "Ein schwerwiegender Fehler liegt vor.", turkish: "(Ciddi bir hata mevcut.)" },
              { german: "Die Unterlagen haben zu diesem Zeitpunkt noch nicht vorgelegen.", turkish: "(Belgeler o an henüz mevcut değildi.)" },
            ],
            opposite: "", imageKey: "b2-tv-vorliegen", cardColor: "#D1FAE5",
            perfekt: "hat vorgelegen", praeteritum: "lag vor", trennbar: true,
          },
        ],
      },
    ],
  },
];

// ─── Leveled navigation hierarchy ───────────────────────────────────────────

export interface VocabSubcategory {
  id: string;
  name: string;
  sets: VocabSet[];
}

export interface VocabCategory {
  id: string;
  name: string;
  sets?: VocabSet[];
  subcategories?: VocabSubcategory[];
}

export interface VocabLevel {
  id: string;
  name: string;
  subtitle?: string;
  categories: VocabCategory[];
}

function findSet(setId: string): VocabSet {
  for (const topic of TOPICS) {
    const s = topic.sets.find((s) => s.id === setId);
    if (s) return s;
  }
  throw new Error(`Set not found: ${setId}`);
}

export const LEVELS: VocabLevel[] = [
  {
    id: "a1", name: "A1",
    categories: [
      {
        id: "a1-adjektive", name: "Adjektive",
        sets: ["a1-adj-set1","a1-adj-set2","a1-adj-set3","a1-adj-set4","a1-adj-set5","a1-adj-set6","a1-adj-set7","a1-adj-set8"].map(findSet),
      },
      { id: "a1-nomen", name: "Nomen", sets: ["a1-nomen-set1","a1-nomen-set2","a1-nomen-set3","a1-nomen-set4","a1-nomen-set5","a1-nomen-set6","a1-nomen-set7","a1-nomen-set8","a1-nomen-set9","a1-nomen-set10","a1-nomen-set11","a1-nomen-set12"].map(findSet) },
      {
        id: "a1-verben", name: "Verben",
        subcategories: [
          { id: "a1-vv", name: "Verben", sets: ["a1-vv-set1","a1-vv-set2","a1-vv-set3","a1-vv-set4","a1-vv-set5","a1-vv-set6","a1-vv-set7","a1-vv-set8","a1-vv-set9","a1-vv-set10","a1-vv-set11","a1-vv-set12"].map(findSet) },
          { id: "a1-pv", name: "Präposition Verben", sets: [] },
          { id: "a1-tv", name: "Trennbare Verben", sets: [] },
        ],
      },
    ],
  },
  {
    id: "a2", name: "A2",
    categories: [
      { id: "a2-adjektive", name: "Adjektive", sets: [] },
      { id: "a2-nomen", name: "Nomen", sets: [] },
      {
        id: "a2-verben", name: "Verben",
        subcategories: [
          { id: "a2-vv", name: "Verben", sets: [] },
          { id: "a2-pv", name: "Präposition Verben", sets: [] },
          { id: "a2-tv", name: "Trennbare Verben", sets: [] },
        ],
      },
    ],
  },
  {
    id: "b1", name: "B1",
    categories: [
      { id: "b1-adjektive", name: "Adjektive", sets: [] },
      { id: "b1-nomen", name: "Nomen", sets: [] },
      {
        id: "b1-verben", name: "Verben",
        subcategories: [
          { id: "b1-vv", name: "Verben", sets: [] },
          { id: "b1-pv", name: "Präposition Verben", sets: [] },
          { id: "b1-tv", name: "Trennbare Verben", sets: [] },
        ],
      },
    ],
  },
  {
    id: "b2", name: "B2",
    categories: [
      {
        id: "b2-adjektive", name: "Adjektive",
        sets: [findSet("b2-adj-set1")],
      },
      {
        id: "b2-nomen", name: "Nomen",
        sets: [findSet("b2-nomen-set1")],
      },
      {
        id: "b2-verben", name: "Verben",
        subcategories: [
          { id: "b2-vv", name: "Verben", sets: [findSet("b2-verben-test")] },
          { id: "b2-pv", name: "Präposition Verben", sets: ["b2-pv-set1","b2-pv-set2","b2-pv-set3","b2-pv-set4"].map(findSet) },
          { id: "b2-tv", name: "Trennbare Verben", sets: ["b2-tv-set1","b2-tv-set2","b2-tv-set3","b2-tv-set4"].map(findSet) },
        ],
      },
    ],
  },
  {
    id: "c1", name: "C1", subtitle: "Fortgeschritten",
    categories: [
      { id: "c1-adjektive", name: "Adjektive", sets: [] },
      { id: "c1-nomen", name: "Nomen", sets: [] },
      {
        id: "c1-verben", name: "Verben",
        subcategories: [
          { id: "c1-vv", name: "Verben", sets: [] },
          { id: "c1-pv", name: "Präposition Verben", sets: [] },
          { id: "c1-tv", name: "Trennbare Verben", sets: [] },
        ],
      },
    ],
  },
  {
    id: "c2", name: "C2", subtitle: "Meister",
    categories: [
      { id: "c2-adjektive", name: "Adjektive", sets: [] },
      { id: "c2-nomen", name: "Nomen", sets: [] },
      {
        id: "c2-verben", name: "Verben",
        subcategories: [
          { id: "c2-vv", name: "Verben", sets: [] },
          { id: "c2-pv", name: "Präposition Verben", sets: [] },
          { id: "c2-tv", name: "Trennbare Verben", sets: [] },
        ],
      },
    ],
  },
];

export function getLevelSets(level: VocabLevel): VocabSet[] {
  const result: VocabSet[] = [];
  for (const cat of level.categories) {
    if (cat.sets) result.push(...cat.sets);
    if (cat.subcategories) {
      for (const sub of cat.subcategories) result.push(...sub.sets);
    }
  }
  return result;
}

export function getAllSetsInLevelOrder(): VocabSet[] {
  return LEVELS.flatMap(getLevelSets);
}

// ─────────────────────────────────────────────────────────────────────────────

export function getWordType(card: VocabCard): string {
  if (card.perfekt != null || card.praeteritum != null || card.praeposition != null || card.trennbar) {
    return "Verb";
  }
  if (card.plural != null) {
    return "Nomen";
  }
  return "Adjektiv";
}

export const POSITIVE_MESSAGES = [
  "Doğru!",
  "Harika!",
  "Süper!",
  "Mükemmel!",
  "Bravo!",
];
