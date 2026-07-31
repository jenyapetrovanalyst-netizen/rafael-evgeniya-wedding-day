const STORAGE_KEY = "wedding-standard-invitation-v11";
const TEXT_CONTENT_VERSION = 2;
/** Версия эталона «письмо на лесу» — при обновлении подставляется LETTER_REFERENCE_PRESET */
const LETTER_RESTORE_VERSION = 5;
/** Лужайка: вертикальный кадр 800×1200, без бумаги */
const MEADOW_RESTORE_VERSION = 1;
const EDITORIAL_RESTORE_VERSION = 2;
const FOLK_RESTORE_VERSION = 1;
const ARCH_RESTORE_VERSION = 1;
const TATAR_RESTORE_VERSION = 3;
const BLUSH_RESTORE_VERSION = 1;
const FRIENDS_RESTORE_VERSION = 1;
const TULIP_RESTORE_VERSION = 3;
const MEADOW_SNAPSHOT_KEY = "wedding-standard-invitation-meadow-snapshot";
const EDITORIAL_SNAPSHOT_KEY = "wedding-standard-invitation-editorial-snapshot";
const FRIENDS_SNAPSHOT_KEY = "wedding-standard-invitation-friends-snapshot";
const CARD_PORTRAIT_WIDTH = 800;
const CARD_PORTRAIT_HEIGHT = 1200;
const TATAR_BG_WIDTH = 724;
const TATAR_BG_HEIGHT = 1024;
const RINGS_SIZE_DEFAULT = 1;
const INFO_WIDTH_DEFAULT = 0;
const TATAR_INFO_WIDTH_DEFAULT = 19;
const RINGS_THEME_BASE = {
  editorial: { pct: 28, maxRem: 5.1 },
  folk: { pct: 24, maxRem: 4.35 },
  tatar: { pct: 26, maxRem: 4.75 },
  tulip: { pct: 28, maxRem: 3.6 },
  friends: { pct: 34, maxRem: 5.5 },
};

const ROSE_ACCENT = "#964751";

const THEME_LABELS = {
  friends: "For friends",
  blush: "Пин — минимализм (rose)",
  tatar: "Татарская открытка",
  editorial: "Кремовая (кольца + пара)",
  tulip: "Ботаника — тюльпаны",
  arch: "Арка",
  folk: "Национальная роспись",
  meadow: "Лужайка",
  letter: "Письмо на лесу",
  forest: "Лес",
  watercolor: "Акварель",
  road: "Дорога",
  hills: "Холмы",
};

/** Палитра под зелёный размытый фон (лес / лужайка) */
const FOREST_BG_PALETTE = {
  colorGreeting: "#c8d6b8",
  colorNews: "#fffef9",
  colorDateDay: "#ffffff",
  colorDateMonth: "#e4edd6",
  colorDateYear: "#a8b89a",
  colorInfo: "#d8e2cc",
  colorSignature: "#fffef9",
  colorFarewell: "#b8c6aa",
};

/** Палитра под акварельный фон (кремовая бумага сверху, тёмный текст) */
const WATERCOLOR_BG_PALETTE = {
  colorGreeting: "#4a5342",
  colorNews: "#1e2419",
  colorDateDay: "#1a2018",
  colorDateMonth: "#3d4636",
  colorDateYear: "#5a6352",
  colorInfo: "#2e3529",
  colorSignature: "#1e2419",
  colorFarewell: "#5a6352",
};

/** Компоновка: текст сверху; подпись слегка на иллюстрации */
const WATERCOLOR_LAYOUT_PRESET = {
  textLayout: "top",
  textPadTop: 7,
  textPadBottom: 36,
  signatureOverlap: 9,
  sizeGreeting: 0.58,
  sizeNews: 0.92,
  sizeInvite: 0.82,
  sizeDate: 0.82,
  sizeInfo: 0.68,
  sizeSignature: 0.72,
  sizeFarewell: 0.65,
};

const WATERCOLOR_LAYOUT_VERSION = 3;

/** Палитра под фото «дорога / ретро-авто» (фото 1) */
const ROAD_BG_PALETTE = {
  colorGreeting: "#f0ebe2",
  colorNews: "#fffef9",
  colorDateDay: "#ffffff",
  colorDateMonth: "#e8e0d4",
  colorDateYear: "#c4baa8",
  colorInfo: "#ebe6dc",
  colorSignature: "#fffef9",
  colorFarewell: "#d8d0c4",
};

/** Компоновка под фото 1: текст сверху, машина снизу */
const ROAD_LAYOUT_PRESET = {
  textLayout: "top",
  textPadTop: 8,
  textPadBottom: 34,
  signatureOverlap: 8,
  sizeGreeting: 0.58,
  sizeNews: 0.92,
  sizeInvite: 0.82,
  sizeDate: 0.82,
  sizeInfo: 0.68,
  sizeSignature: 0.72,
  sizeFarewell: 0.65,
};

const CARD_BG_VERSION = 4;

/** Текст на бумажной подложке (тёмный, без теней) */
const PAPER_TEXT_PALETTE = {
  colorGreeting: "#3d3a34",
  colorNews: "#1a1816",
  colorDateDay: "#1a1816",
  colorDateMonth: "#4a4540",
  colorDateYear: "#6a655c",
  colorInfo: "#3d3a34",
  colorSignature: "#1a1816",
  colorFarewell: "#5a554c",
};

/** Палитра под оливковую текстуру (пин 2) — кремовый текст */
const OLIVE_BG_PALETTE = {
  colorGreeting: "#e8e2d6",
  colorNews: "#f5f0e8",
  colorDateDay: "#faf8f4",
  colorDateMonth: "#ebe4d8",
  colorDateYear: "#c4baa8",
  colorInfo: "#ebe6dc",
  colorSignature: "#f5f0e8",
  colorFarewell: "#b8b0a0",
};

const RU_MONTHS =
  "января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря";
const RU_DATE_RE = new RegExp(
  `(\\d{1,2})\\s+(${RU_MONTHS})\\s+(\\d{4})(?:\\s+года)?`,
  "i",
);

const DATE_SIZE_SCALE = { day: 4.6, month: 1.15, year: 0.85 };

/** Исходный текст приглашения (как на вашем макете) */
const ORIGINAL_TEXT = {
  greeting: "Дорогие родные и друзья!",
  body1: "Спешим поделиться радостной новостью — мы женимся!",
  body2: "Приглашаем вас разделить с нами этот особенный день 12 сентября 2026 года.",
  body3:
    "Совсем скоро мы направим вам ссылку на сайт с анкетой для подтверждения присутствия и всеми подробностями.",
  signatureNames: "Рафаэль и Евгения.",
  signatureFarewell: "До скорой встречи!",
};

const ROAD_PRESET = {
  ...ORIGINAL_TEXT,
  ...ROAD_BG_PALETTE,
  cardTheme: "road",
  fontGreeting: "montserrat-light",
  fontNews: "bodoni-moda",
  fontInvite: "bodoni-moda",
  fontDate: "bodoni-moda",
  fontInfo: "montserrat-light",
  fontSignature: "pinyon-script",
  fontFarewell: "montserrat-light",
  sizeGreeting: ROAD_LAYOUT_PRESET.sizeGreeting,
  sizeNews: ROAD_LAYOUT_PRESET.sizeNews,
  sizeInvite: ROAD_LAYOUT_PRESET.sizeInvite,
  sizeDate: ROAD_LAYOUT_PRESET.sizeDate,
  sizeInfo: ROAD_LAYOUT_PRESET.sizeInfo,
  sizeSignature: ROAD_LAYOUT_PRESET.sizeSignature,
  sizeFarewell: ROAD_LAYOUT_PRESET.sizeFarewell,
  offsetGreeting: 0,
  offsetNews: 0,
  offsetInvite: 0,
  offsetDate: 0,
  offsetInfo: 0,
  offsetSignature: 0,
  offsetFarewell: 0,
  boldGreeting: false,
  boldNews: false,
  boldInvite: false,
  boldDate: false,
  boldInfo: false,
  boldSignature: false,
  boldFarewell: false,
  blockShiftX: 0,
  blockShiftY: 0,
  textLayout: ROAD_LAYOUT_PRESET.textLayout,
  textPadTop: ROAD_LAYOUT_PRESET.textPadTop,
  textPadBottom: ROAD_LAYOUT_PRESET.textPadBottom,
  textPadX: 8,
  signatureOverlap: ROAD_LAYOUT_PRESET.signatureOverlap,
};

/** Палитра и раскладка под фото 2 — холмы и дорога */
const HILLS_BG_PALETTE = { ...ROAD_BG_PALETTE };

const HILLS_LAYOUT_PRESET = {
  ...ROAD_LAYOUT_PRESET,
  textPadBottom: 30,
};

const HILLS_PRESET = {
  ...ROAD_PRESET,
  cardTheme: "hills",
  textPadBottom: HILLS_LAYOUT_PRESET.textPadBottom,
  signatureOverlap: HILLS_LAYOUT_PRESET.signatureOverlap,
};

/** Лесной макет как на референсе: белый текст, без теней, равномерная высота */
const FOREST_LAYOUT_PRESET = {
  textLayout: "spread",
  textPadTop: 9,
  textPadBottom: 9,
  textPadX: 8,
  signatureOverlap: 0,
  sizeGreeting: 0.72,
  sizeNews: 1.02,
  sizeInvite: 0.86,
  sizeDate: 0.92,
  sizeInfo: 0.8,
  sizeSignature: 1.28,
  sizeFarewell: 0.72,
};

const FOREST_CLASSIC_PRESET = {
  ...ORIGINAL_TEXT,
  ...FOREST_BG_PALETTE,
  cardTheme: "forest",
  fontGreeting: "montserrat-light",
  fontNews: "playfair-regular",
  fontInvite: "playfair-regular",
  fontDate: "playfair-regular",
  fontInfo: "playfair-regular",
  fontSignature: "great-vibes",
  fontFarewell: "playfair-regular",
  sizeGreeting: FOREST_LAYOUT_PRESET.sizeGreeting,
  sizeNews: FOREST_LAYOUT_PRESET.sizeNews,
  sizeInvite: FOREST_LAYOUT_PRESET.sizeInvite,
  sizeDate: FOREST_LAYOUT_PRESET.sizeDate,
  sizeInfo: FOREST_LAYOUT_PRESET.sizeInfo,
  sizeSignature: FOREST_LAYOUT_PRESET.sizeSignature,
  sizeFarewell: FOREST_LAYOUT_PRESET.sizeFarewell,
  offsetGreeting: 0,
  offsetNews: 0,
  offsetInvite: 0,
  offsetDate: 0,
  offsetInfo: 0,
  offsetSignature: 0,
  offsetFarewell: 0,
  boldGreeting: true,
  boldNews: true,
  boldInvite: false,
  boldDate: false,
  boldInfo: false,
  boldSignature: false,
  boldFarewell: false,
  blockShiftX: 0,
  blockShiftY: 0,
  textLayout: FOREST_LAYOUT_PRESET.textLayout,
  textPadTop: FOREST_LAYOUT_PRESET.textPadTop,
  textPadBottom: FOREST_LAYOUT_PRESET.textPadBottom,
  textPadX: FOREST_LAYOUT_PRESET.textPadX,
  signatureOverlap: 0,
};

/** Письмо на фоне (пин): коттедж + лист бумаги */
const LETTER_LAYOUT_PRESET = {
  textLayout: "spread",
  textPadTop: 0,
  textPadBottom: 0,
  textPadX: 0,
  signatureOverlap: 0,
  sizeGreeting: 0.66,
  sizeNews: 0.96,
  sizeInvite: 0.84,
  sizeDate: 0.88,
  sizeInfo: 0.76,
  sizeSignature: 1.22,
  sizeFarewell: 0.68,
};

/** Эталон макета (лес + бумага Toile + кольца) — см. privetstvie-rafael-evgenia__13 */
const LETTER_REFERENCE_PRESET = {
  ...ORIGINAL_TEXT,
  ...PAPER_TEXT_PALETTE,
  cardTheme: "letter",
  fontGreeting: "playfair-regular",
  fontNews: "playfair-regular",
  fontInvite: "playfair-regular",
  fontDate: "playfair-regular",
  fontInfo: "playfair-regular",
  fontSignature: "great-vibes",
  fontFarewell: "playfair-regular",
  sizeGreeting: LETTER_LAYOUT_PRESET.sizeGreeting,
  sizeNews: LETTER_LAYOUT_PRESET.sizeNews,
  sizeInvite: LETTER_LAYOUT_PRESET.sizeInvite,
  sizeDate: LETTER_LAYOUT_PRESET.sizeDate,
  sizeInfo: LETTER_LAYOUT_PRESET.sizeInfo,
  sizeSignature: LETTER_LAYOUT_PRESET.sizeSignature,
  sizeFarewell: LETTER_LAYOUT_PRESET.sizeFarewell,
  offsetGreeting: 0,
  offsetNews: 0,
  offsetInvite: 0,
  offsetDate: 0,
  offsetInfo: 0,
  offsetSignature: 0,
  offsetFarewell: 0,
  boldGreeting: false,
  boldNews: true,
  boldInvite: false,
  boldDate: false,
  boldInfo: false,
  boldSignature: false,
  boldFarewell: false,
  blockShiftX: 0,
  blockShiftY: 0,
  textLayout: LETTER_LAYOUT_PRESET.textLayout,
  textPadTop: LETTER_LAYOUT_PRESET.textPadTop,
  textPadBottom: LETTER_LAYOUT_PRESET.textPadBottom,
  textPadX: LETTER_LAYOUT_PRESET.textPadX,
  signatureOverlap: 0,
};

const LETTER_PRESET = { ...LETTER_REFERENCE_PRESET };

/** Альбомная лужайка: фото на весь кадр, белый текст, без бумаги */
const MEADOW_LAYOUT_PRESET = {
  textLayout: "spread",
  textPadTop: 7,
  textPadBottom: 10,
  textPadX: 6.5,
  signatureOverlap: 0,
  sizeGreeting: 0.62,
  sizeNews: 0.9,
  sizeInvite: 0.78,
  sizeDate: 0.82,
  sizeInfo: 0.7,
  sizeSignature: 1.14,
  sizeFarewell: 0.64,
};

const MEADOW_REFERENCE_PRESET = {
  ...ORIGINAL_TEXT,
  ...FOREST_BG_PALETTE,
  cardTheme: "meadow",
  fontGreeting: "playfair-regular",
  fontNews: "playfair-regular",
  fontInvite: "playfair-regular",
  fontDate: "playfair-regular",
  fontInfo: "playfair-regular",
  fontSignature: "great-vibes",
  fontFarewell: "playfair-regular",
  sizeGreeting: MEADOW_LAYOUT_PRESET.sizeGreeting,
  sizeNews: MEADOW_LAYOUT_PRESET.sizeNews,
  sizeInvite: MEADOW_LAYOUT_PRESET.sizeInvite,
  sizeDate: MEADOW_LAYOUT_PRESET.sizeDate,
  sizeInfo: MEADOW_LAYOUT_PRESET.sizeInfo,
  sizeSignature: MEADOW_LAYOUT_PRESET.sizeSignature,
  sizeFarewell: MEADOW_LAYOUT_PRESET.sizeFarewell,
  offsetGreeting: 0,
  offsetNews: 0,
  offsetInvite: 0,
  offsetDate: 0,
  offsetInfo: 0,
  offsetSignature: 0,
  offsetFarewell: 0,
  boldGreeting: false,
  boldNews: true,
  boldInvite: false,
  boldDate: false,
  boldInfo: false,
  boldSignature: false,
  boldFarewell: false,
  blockShiftX: 0,
  blockShiftY: 0,
  ringsOffsetX: 0,
  ringsOffsetY: 0,
  ringsSize: RINGS_SIZE_DEFAULT,
  infoWidth: INFO_WIDTH_DEFAULT,
  textLayout: MEADOW_LAYOUT_PRESET.textLayout,
  textPadTop: MEADOW_LAYOUT_PRESET.textPadTop,
  textPadBottom: MEADOW_LAYOUT_PRESET.textPadBottom,
  textPadX: MEADOW_LAYOUT_PRESET.textPadX,
  signatureOverlap: 0,
};

/** Пин: кремовая открытка с фото-подложкой — тёмный лесной зелёный + читаемость */
const EDITORIAL_FOREST = "#243d2f";
const EDITORIAL_FOREST_MID = "#355744";
const EDITORIAL_FOREST_SOFT = "#4a6b55";

const EDITORIAL_PALETTE = {
  colorGreeting: EDITORIAL_FOREST_MID,
  colorNews: EDITORIAL_FOREST,
  colorDateDay: EDITORIAL_FOREST,
  colorDateMonth: EDITORIAL_FOREST_MID,
  colorDateYear: EDITORIAL_FOREST_MID,
  colorInfo: EDITORIAL_FOREST,
  colorSignature: EDITORIAL_FOREST,
  colorFarewell: EDITORIAL_FOREST_SOFT,
  colorCoupleIllustration: EDITORIAL_FOREST,
};

const EDITORIAL_LAYOUT_PRESET = {
  textLayout: "center",
  textPadTop: 8,
  textPadBottom: 8,
  textPadX: 10,
  signatureOverlap: 0,
  sizeGreeting: 0.58,
  sizeNews: 0.72,
  sizeInvite: 0.62,
  sizeDate: 0.68,
  sizeInfo: 0.48,
  sizeSignature: 2.35,
  sizeFarewell: 0.44,
};

/** Ботаника: льняной фон и палитра как на сайте-приглашении */
const TULIP_PALETTE = {
  colorGreeting: "#6b705c",
  colorNews: "#3c4a33",
  colorDateDay: "#3c4a33",
  colorDateMonth: "#b59a7c",
  colorDateYear: "#3c4a33",
  colorInfo: "#3c4a33",
  colorSignature: "#6b705c",
  colorFarewell: "#6b705c",
  colorCoupleIllustration: "#b59a7c",
};

const TULIP_LAYOUT_PRESET = {
  textLayout: "center",
  textPadTop: 8,
  textPadBottom: 8,
  textPadX: 10,
  signatureOverlap: 0,
  sizeGreeting: 0.42,
  sizeNews: 1.05,
  sizeInvite: 0.46,
  sizeDate: 0.46,
  sizeInfo: 0.42,
  sizeSignature: 1.35,
  sizeFarewell: 0.38,
};

const TULIP_PRESET = {
  ...ORIGINAL_TEXT,
  ...TULIP_PALETTE,
  cardTheme: "tulip",
  botanicalHeadline: "ПРИГЛАШАЕМ вас на СВАДЬБУ",
  botanicalDate: "Дата: 12 сентября 2026",
  fontGreeting: "montserrat-light",
  fontNews: "cormorant-regular",
  fontInvite: "montserrat-light",
  fontDate: "montserrat-light",
  fontInfo: "montserrat-light",
  fontSignature: "cormorant-italic-500",
  fontFarewell: "montserrat-light",
  sizeGreeting: TULIP_LAYOUT_PRESET.sizeGreeting,
  sizeNews: TULIP_LAYOUT_PRESET.sizeNews,
  sizeInvite: TULIP_LAYOUT_PRESET.sizeInvite,
  sizeDate: TULIP_LAYOUT_PRESET.sizeDate,
  sizeInfo: TULIP_LAYOUT_PRESET.sizeInfo,
  sizeSignature: TULIP_LAYOUT_PRESET.sizeSignature,
  sizeFarewell: TULIP_LAYOUT_PRESET.sizeFarewell,
  offsetGreeting: 0,
  offsetNews: 0,
  offsetInvite: 0,
  offsetDate: 0,
  offsetInfo: 0,
  offsetSignature: 0,
  offsetFarewell: 0,
  boldGreeting: false,
  boldNews: true,
  boldInvite: false,
  boldDate: false,
  boldInfo: false,
  boldSignature: false,
  boldFarewell: false,
  blockShiftX: 0,
  blockShiftY: 0,
  ringsOffsetX: 0,
  ringsOffsetY: 0,
  textLayout: TULIP_LAYOUT_PRESET.textLayout,
  textPadTop: TULIP_LAYOUT_PRESET.textPadTop,
  textPadBottom: TULIP_LAYOUT_PRESET.textPadBottom,
  textPadX: TULIP_LAYOUT_PRESET.textPadX,
  signatureOverlap: 0,
};

/** Национальная роспись: зелёный градиент, рамка по краям, светлый текст */
const FOLK_PALETTE = {
  colorGreeting: "#f0e8c8",
  colorNews: "#fffef6",
  colorDateDay: "#ffffff",
  colorDateMonth: "#f5ebc8",
  colorDateYear: "#f5ebc8",
  colorInfo: "#ebe4cc",
  colorSignature: "#fffef8",
  colorFarewell: "#d8d0b0",
  colorCoupleIllustration: "#f5ebc8",
};

const FOLK_LAYOUT_PRESET = {
  textLayout: "center",
  textPadTop: 7,
  textPadBottom: 7,
  textPadX: 24,
  signatureOverlap: 0,
  sizeGreeting: 0.48,
  sizeNews: 0.54,
  sizeInvite: 0.5,
  sizeDate: 0.58,
  sizeInfo: 0.38,
  sizeSignature: 1.65,
  sizeFarewell: 0.36,
};

/** Арка — орнаментальная рамка, кремовый центр, полный текст */
const ARCH_PALETTE = {
  colorGreeting: "#5c4a42",
  colorNews: "#3c4a33",
  colorDateDay: "#6b5348",
  colorDateMonth: "#8b5a62",
  colorDateYear: "#6b5348",
  colorInfo: "#4a5540",
  colorSignature: "#8b5a62",
  colorFarewell: "#6b705c",
  colorCoupleIllustration: "#b59a7c",
};

const ARCH_LAYOUT_PRESET = {
  textLayout: "center",
  textPadTop: 15,
  textPadBottom: 9,
  textPadX: 14,
  signatureOverlap: 0,
  sizeGreeting: 0.44,
  sizeNews: 0.48,
  sizeInvite: 0.44,
  sizeDate: 0.5,
  sizeInfo: 0.4,
  sizeSignature: 1.2,
  sizeFarewell: 0.36,
};

const ARCH_PRESET = {
  ...ORIGINAL_TEXT,
  ...ARCH_PALETTE,
  cardTheme: "arch",
  fontGreeting: "cormorant-regular",
  fontNews: "cormorant-regular",
  fontInvite: "cormorant-regular",
  fontDate: "cormorant-regular",
  fontInfo: "montserrat-light",
  fontSignature: "cormorant-italic-500",
  fontFarewell: "montserrat-light",
  sizeGreeting: ARCH_LAYOUT_PRESET.sizeGreeting,
  sizeNews: ARCH_LAYOUT_PRESET.sizeNews,
  sizeInvite: ARCH_LAYOUT_PRESET.sizeInvite,
  sizeDate: ARCH_LAYOUT_PRESET.sizeDate,
  sizeInfo: ARCH_LAYOUT_PRESET.sizeInfo,
  sizeSignature: ARCH_LAYOUT_PRESET.sizeSignature,
  sizeFarewell: ARCH_LAYOUT_PRESET.sizeFarewell,
  offsetGreeting: 0,
  offsetNews: 0,
  offsetInvite: 0,
  offsetDate: 0,
  offsetInfo: 0,
  offsetSignature: 0,
  offsetFarewell: 0,
  boldGreeting: false,
  boldNews: false,
  boldInvite: false,
  boldDate: false,
  boldInfo: false,
  boldSignature: false,
  boldFarewell: false,
  blockShiftX: 0,
  blockShiftY: 0,
  ringsOffsetX: 0,
  ringsOffsetY: 0,
  textLayout: ARCH_LAYOUT_PRESET.textLayout,
  textPadTop: ARCH_LAYOUT_PRESET.textPadTop,
  textPadBottom: ARCH_LAYOUT_PRESET.textPadBottom,
  textPadX: ARCH_LAYOUT_PRESET.textPadX,
  signatureOverlap: 0,
};

/** Татарская открытка: акварельная рамка, белый центр, кольца */
const TATAR_PALETTE = {
  colorGreeting: "#b8878f",
  colorNews: "#b8878f",
  colorDateDay: "#7b2d3e",
  colorDateMonth: "#c49a9a",
  colorDateYear: "#9a6a72",
  colorInfo: "#7a5a62",
  colorSignature: "#7b2d3e",
  colorFarewell: "#b8878f",
  colorCoupleIllustration: "#b59a7c",
};

const TATAR_LAYOUT_PRESET = {
  textLayout: "center",
  textPadTop: 26,
  textPadBottom: 16,
  textPadX: 20,
  signatureOverlap: 0,
  sizeGreeting: 0.4,
  sizeNews: 0.4,
  sizeInvite: 0.4,
  sizeDate: 0.42,
  sizeInfo: 0.36,
  sizeSignature: 1.32,
  sizeFarewell: 0.32,
};

/** Пин: крем + пыльная роза, фото пары, скрипт (Charlie & Emma) */
const BLUSH_ROSE = "#9e5555";
const BLUSH_CREAM = "#f7f3ec";
const BLUSH_PALETTE = {
  colorGreeting: BLUSH_ROSE,
  colorNews: BLUSH_ROSE,
  colorDateDay: BLUSH_ROSE,
  colorDateMonth: BLUSH_ROSE,
  colorDateYear: BLUSH_ROSE,
  colorInfo: BLUSH_ROSE,
  colorSignature: BLUSH_ROSE,
  colorFarewell: BLUSH_ROSE,
  colorCoupleIllustration: BLUSH_ROSE,
};

const BLUSH_LAYOUT_PRESET = {
  textLayout: "center",
  textPadTop: 10,
  textPadBottom: 10,
  textPadX: 14,
  signatureOverlap: 0,
  sizeGreeting: 0.46,
  sizeNews: 0.46,
  sizeInvite: 0.44,
  sizeDate: 0.44,
  sizeInfo: 0.34,
  sizeSignature: 1.72,
  sizeFarewell: 0.3,
};

const BLUSH_TEXT = {
  greeting: "Приглашаем вас\nна нашу свадьбу",
  body1: "",
  body2: "12 сентября 2026 года. Красногорск, Московская область",
  body3: "дресс-код уточняется",
  signatureNames: "Рафаэль и Евгения",
  signatureFarewell: "подробности следуют",
};

const BLUSH_PRESET = {
  ...BLUSH_TEXT,
  ...BLUSH_PALETTE,
  cardTheme: "blush",
  fontGreeting: "playfair-italic",
  fontNews: "playfair-italic",
  fontInvite: "playfair-regular",
  fontDate: "playfair-regular",
  fontInfo: "montserrat-light",
  fontSignature: "great-vibes",
  fontFarewell: "montserrat-light",
  sizeGreeting: BLUSH_LAYOUT_PRESET.sizeGreeting,
  sizeNews: BLUSH_LAYOUT_PRESET.sizeNews,
  sizeInvite: BLUSH_LAYOUT_PRESET.sizeInvite,
  sizeDate: BLUSH_LAYOUT_PRESET.sizeDate,
  sizeInfo: BLUSH_LAYOUT_PRESET.sizeInfo,
  sizeSignature: BLUSH_LAYOUT_PRESET.sizeSignature,
  sizeFarewell: BLUSH_LAYOUT_PRESET.sizeFarewell,
  offsetGreeting: 0,
  offsetNews: 0,
  offsetInvite: 0,
  offsetDate: 0,
  offsetInfo: 0,
  offsetSignature: 0,
  offsetFarewell: 0,
  boldGreeting: false,
  boldNews: false,
  boldInvite: false,
  boldDate: false,
  boldInfo: false,
  boldSignature: false,
  boldFarewell: false,
  blockShiftX: 0,
  blockShiftY: 0,
  ringsOffsetX: 0,
  ringsOffsetY: 0,
  infoWidth: INFO_WIDTH_DEFAULT,
  textLayout: BLUSH_LAYOUT_PRESET.textLayout,
  textPadTop: BLUSH_LAYOUT_PRESET.textPadTop,
  textPadBottom: BLUSH_LAYOUT_PRESET.textPadBottom,
  textPadX: BLUSH_LAYOUT_PRESET.textPadX,
  signatureOverlap: 0,
};

const FRIENDS_ROSE = "#9e5555";
const FRIENDS_CREAM = "#f7f3ec";
const FRIENDS_PALETTE = {
  colorGreeting: FRIENDS_ROSE,
  colorNews: FRIENDS_ROSE,
  colorDateDay: FRIENDS_ROSE,
  colorDateMonth: FRIENDS_ROSE,
  colorDateYear: FRIENDS_ROSE,
  colorInfo: FRIENDS_ROSE,
  colorSignature: FRIENDS_ROSE,
  colorFarewell: FRIENDS_ROSE,
  colorCoupleIllustration: FRIENDS_ROSE,
  colorFriendsFrame: FRIENDS_ROSE,
};

const FRIENDS_LAYOUT_PRESET = {
  textLayout: "center",
  textPadTop: 11,
  textPadBottom: 9,
  textPadX: 14,
  signatureOverlap: 0,
  sizeGreeting: 0.46,
  sizeNews: 0.46,
  sizeInvite: 0.44,
  sizeDate: 0.44,
  sizeInfo: 0.3,
  sizeSignature: 1.85,
  sizeFarewell: 0.3,
};

const FRIENDS_TEXT = {
  greeting: "Приглашаем вас\nна нашу свадьбу",
  body1: "",
  body2: "12 сентября 2026 года. Красногорск, Московская область",
  body3: "дресс-код уточняется",
  signatureNames: "Рафаэль и Евгения",
  signatureFarewell:
    "скоро мы направим ссылку на сайт для подтверждения присутствия и подробностями!",
};

const FRIENDS_PRESET = {
  ...FRIENDS_TEXT,
  ...FRIENDS_PALETTE,
  cardTheme: "friends",
  fontGreeting: "playfair-italic",
  fontNews: "playfair-italic",
  fontInvite: "playfair-italic",
  fontDate: "playfair-italic",
  fontInfo: "montserrat-light",
  fontSignature: "great-vibes",
  fontFarewell: "montserrat-light",
  sizeGreeting: FRIENDS_LAYOUT_PRESET.sizeGreeting,
  sizeNews: FRIENDS_LAYOUT_PRESET.sizeNews,
  sizeInvite: FRIENDS_LAYOUT_PRESET.sizeInvite,
  sizeDate: FRIENDS_LAYOUT_PRESET.sizeDate,
  sizeInfo: FRIENDS_LAYOUT_PRESET.sizeInfo,
  sizeSignature: FRIENDS_LAYOUT_PRESET.sizeSignature,
  sizeFarewell: FRIENDS_LAYOUT_PRESET.sizeFarewell,
  offsetGreeting: 0,
  offsetNews: 0,
  offsetInvite: 0,
  offsetDate: 0,
  offsetInfo: 0,
  offsetSignature: 0,
  offsetFarewell: 0,
  boldGreeting: false,
  boldNews: false,
  boldInvite: false,
  boldDate: false,
  boldInfo: false,
  boldSignature: false,
  boldFarewell: false,
  blockShiftX: 0,
  blockShiftY: 0,
  ringsOffsetX: 0,
  ringsOffsetY: 0,
  ringsSize: 0.82,
  colorFriendsFrame: FRIENDS_ROSE,
  infoWidth: INFO_WIDTH_DEFAULT,
  textLayout: FRIENDS_LAYOUT_PRESET.textLayout,
  textPadTop: FRIENDS_LAYOUT_PRESET.textPadTop,
  textPadBottom: FRIENDS_LAYOUT_PRESET.textPadBottom,
  textPadX: FRIENDS_LAYOUT_PRESET.textPadX,
  signatureOverlap: 0,
};

const TATAR_PRESET = {
  ...ORIGINAL_TEXT,
  ...TATAR_PALETTE,
  cardTheme: "tatar",
  fontGreeting: "cormorant-regular",
  fontNews: "cormorant-regular",
  fontInvite: "cormorant-regular",
  fontDate: "cormorant-regular",
  fontInfo: "montserrat-light",
  fontSignature: "great-vibes",
  fontFarewell: "cormorant-regular",
  sizeGreeting: TATAR_LAYOUT_PRESET.sizeGreeting,
  sizeNews: TATAR_LAYOUT_PRESET.sizeNews,
  sizeInvite: TATAR_LAYOUT_PRESET.sizeInvite,
  sizeDate: TATAR_LAYOUT_PRESET.sizeDate,
  sizeInfo: TATAR_LAYOUT_PRESET.sizeInfo,
  sizeSignature: TATAR_LAYOUT_PRESET.sizeSignature,
  sizeFarewell: TATAR_LAYOUT_PRESET.sizeFarewell,
  offsetGreeting: 0,
  offsetNews: 0,
  offsetInvite: 0,
  offsetDate: 0,
  offsetInfo: 0,
  offsetSignature: 0,
  offsetFarewell: 0,
  boldGreeting: false,
  boldNews: false,
  boldInvite: false,
  boldDate: false,
  boldInfo: false,
  boldSignature: false,
  boldFarewell: false,
  blockShiftX: 0,
  blockShiftY: 0,
  ringsOffsetX: 0,
  ringsOffsetY: 0,
  infoWidth: TATAR_INFO_WIDTH_DEFAULT,
  textLayout: TATAR_LAYOUT_PRESET.textLayout,
  textPadTop: TATAR_LAYOUT_PRESET.textPadTop,
  textPadBottom: TATAR_LAYOUT_PRESET.textPadBottom,
  textPadX: TATAR_LAYOUT_PRESET.textPadX,
  signatureOverlap: 0,
};

const FOLK_PRESET = {
  ...ORIGINAL_TEXT,
  ...FOLK_PALETTE,
  cardTheme: "folk",
  fontGreeting: "playfair-regular",
  fontNews: "playfair-regular",
  fontInvite: "playfair-regular",
  fontDate: "playfair-regular",
  fontInfo: "montserrat-light",
  fontSignature: "great-vibes",
  fontFarewell: "montserrat-light",
  sizeGreeting: FOLK_LAYOUT_PRESET.sizeGreeting,
  sizeNews: FOLK_LAYOUT_PRESET.sizeNews,
  sizeInvite: FOLK_LAYOUT_PRESET.sizeInvite,
  sizeDate: FOLK_LAYOUT_PRESET.sizeDate,
  sizeInfo: FOLK_LAYOUT_PRESET.sizeInfo,
  sizeSignature: FOLK_LAYOUT_PRESET.sizeSignature,
  sizeFarewell: FOLK_LAYOUT_PRESET.sizeFarewell,
  offsetGreeting: 0,
  offsetNews: 0,
  offsetInvite: 0,
  offsetDate: 0,
  offsetInfo: 0,
  offsetSignature: 0,
  offsetFarewell: 0,
  boldGreeting: false,
  boldNews: false,
  boldInvite: false,
  boldDate: true,
  boldInfo: false,
  boldSignature: false,
  boldFarewell: false,
  blockShiftX: 0,
  blockShiftY: 0,
  ringsOffsetX: 0,
  ringsOffsetY: 0,
  textLayout: FOLK_LAYOUT_PRESET.textLayout,
  textPadTop: FOLK_LAYOUT_PRESET.textPadTop,
  textPadBottom: FOLK_LAYOUT_PRESET.textPadBottom,
  textPadX: FOLK_LAYOUT_PRESET.textPadX,
  signatureOverlap: 0,
};

const EDITORIAL_PRESET = {
  ...ORIGINAL_TEXT,
  ...EDITORIAL_PALETTE,
  cardTheme: "editorial",
  fontGreeting: "playfair-regular",
  fontNews: "playfair-regular",
  fontInvite: "playfair-regular",
  fontDate: "playfair-regular",
  fontInfo: "montserrat-light",
  fontSignature: "great-vibes",
  fontFarewell: "montserrat-light",
  sizeGreeting: EDITORIAL_LAYOUT_PRESET.sizeGreeting,
  sizeNews: EDITORIAL_LAYOUT_PRESET.sizeNews,
  sizeInvite: EDITORIAL_LAYOUT_PRESET.sizeInvite,
  sizeDate: EDITORIAL_LAYOUT_PRESET.sizeDate,
  sizeInfo: EDITORIAL_LAYOUT_PRESET.sizeInfo,
  sizeSignature: EDITORIAL_LAYOUT_PRESET.sizeSignature,
  sizeFarewell: EDITORIAL_LAYOUT_PRESET.sizeFarewell,
  offsetGreeting: 0,
  offsetNews: 0,
  offsetInvite: 0,
  offsetDate: 0,
  offsetInfo: 0,
  offsetSignature: 0,
  offsetFarewell: 0,
  boldGreeting: false,
  boldNews: false,
  boldInvite: false,
  boldDate: false,
  boldInfo: false,
  boldSignature: false,
  boldFarewell: false,
  blockShiftX: 0,
  blockShiftY: 0,
  ringsOffsetX: 0,
  ringsOffsetY: 0,
  textLayout: EDITORIAL_LAYOUT_PRESET.textLayout,
  textPadTop: EDITORIAL_LAYOUT_PRESET.textPadTop,
  textPadBottom: EDITORIAL_LAYOUT_PRESET.textPadBottom,
  textPadX: EDITORIAL_LAYOUT_PRESET.textPadX,
  signatureOverlap: 0,
};

const RHODE_PRESET = {
  ...ORIGINAL_TEXT,
  ...WATERCOLOR_BG_PALETTE,
  cardTheme: "watercolor",
  fontGreeting: "montserrat-light",
  fontNews: "bodoni-moda",
  fontInvite: "bodoni-moda",
  fontDate: "bodoni-moda",
  fontInfo: "montserrat-light",
  fontSignature: "pinyon-script",
  fontFarewell: "montserrat-light",
  sizeGreeting: WATERCOLOR_LAYOUT_PRESET.sizeGreeting,
  sizeNews: WATERCOLOR_LAYOUT_PRESET.sizeNews,
  sizeInvite: WATERCOLOR_LAYOUT_PRESET.sizeInvite,
  sizeDate: WATERCOLOR_LAYOUT_PRESET.sizeDate,
  sizeInfo: WATERCOLOR_LAYOUT_PRESET.sizeInfo,
  sizeSignature: WATERCOLOR_LAYOUT_PRESET.sizeSignature,
  sizeFarewell: WATERCOLOR_LAYOUT_PRESET.sizeFarewell,
  offsetGreeting: 0,
  offsetNews: 0,
  offsetInvite: 0,
  offsetDate: 0,
  offsetInfo: 0,
  offsetSignature: 0,
  offsetFarewell: 0,
  boldGreeting: false,
  boldNews: false,
  boldInvite: false,
  boldDate: false,
  boldInfo: false,
  boldSignature: false,
  boldFarewell: false,
  blockShiftX: 0,
  blockShiftY: 0,
  textLayout: WATERCOLOR_LAYOUT_PRESET.textLayout,
  textPadTop: WATERCOLOR_LAYOUT_PRESET.textPadTop,
  textPadBottom: WATERCOLOR_LAYOUT_PRESET.textPadBottom,
  textPadX: 8,
  signatureOverlap: WATERCOLOR_LAYOUT_PRESET.signatureOverlap,
};

const FONT_OPTIONS = [
  { id: "dm-sans", label: "DM Sans (Rhode)", family: '"DM Sans", system-ui, sans-serif', group: "rhode", weight: "400" },
  { id: "sora", label: "Sora", family: '"Sora", system-ui, sans-serif', group: "rhode", weight: "400" },
  { id: "manrope", label: "Manrope", family: '"Manrope", system-ui, sans-serif', group: "rhode", weight: "400" },
  { id: "good-vibes", label: "Good Vibes", family: '"Good Vibes", cursive', group: "pin1" },
  { id: "min-sans", label: "Min Sans", family: '"Min Sans", sans-serif', group: "pin1", weight: "500" },
  { id: "nyght-serif", label: "Nyght Serif", family: '"Nyght Serif", serif', group: "pin2", weight: "800" },
  {
    id: "transforma",
    label: "Transforma",
    family: '"Transforma", "Transforma Sans", sans-serif',
    group: "pin2",
    weight: "500",
  },
  {
    id: "florisel-script",
    label: "Florisel script",
    family: '"Florisel script Thin", cursive',
    group: "pin2",
  },
  {
    id: "free-serif-italic",
    label: "Free Serif Italic",
    family: '"Free Serif Italic", serif',
    group: "pin3",
    style: "italic",
  },
  { id: "ossem", label: "Ossem", family: '"Ossem", sans-serif', group: "pin3", weight: "700" },
  { id: "great-vibes", label: "Great Vibes (сайт)", family: '"Great Vibes", cursive', group: "site" },
  { id: "playfair-regular", label: "Playfair Display (сайт)", family: '"Playfair Display", serif', group: "site" },
  { id: "playfair-italic", label: "Playfair Display курсив", family: '"Playfair Display", serif', group: "site", style: "italic" },
  { id: "eb-regular", label: "EB Garamond (сайт)", family: '"EB Garamond", serif', group: "site" },
  { id: "cormorant-regular", label: "Cormorant Garamond", family: '"Cormorant Garamond", serif', group: "site" },
  {
    id: "lora-italic",
    label: "Lora курсив (пин закат)",
    family: '"Lora", serif',
    group: "pinSunset",
    style: "italic",
    weight: "500",
  },
  {
    id: "libre-baskerville-italic",
    label: "Libre Baskerville курсив",
    family: '"Libre Baskerville", serif',
    group: "pinSunset",
    style: "italic",
  },
  {
    id: "cormorant-italic-500",
    label: "Cormorant Garamond курсив",
    family: '"Cormorant Garamond", serif',
    group: "pinSunset",
    style: "italic",
    weight: "500",
  },
  {
    id: "playfair-italic-600",
    label: "Playfair Display курсив (крупно)",
    family: '"Playfair Display", serif',
    group: "pinSunset",
    style: "italic",
    weight: "600",
  },
  {
    id: "bodoni-moda",
    label: "Bodoni Moda (serif, пин олива)",
    family: '"Bodoni Moda", serif',
    group: "pinOlive",
    weight: "500",
  },
  {
    id: "dm-serif-display",
    label: "DM Serif Display",
    family: '"DM Serif Display", serif',
    group: "pinOlive",
  },
  {
    id: "pinyon-script",
    label: "Pinyon Script (скрипт)",
    family: '"Pinyon Script", cursive',
    group: "pinOlive",
  },
  { id: "allura", label: "Allura (скрипт)", family: '"Allura", cursive', group: "pinOlive" },
  {
    id: "montserrat-light",
    label: "Montserrat Light (caps)",
    family: '"Montserrat", sans-serif',
    group: "pinOlive",
    weight: "300",
  },
  {
    id: "montserrat-regular",
    label: "Montserrat",
    family: '"Montserrat", sans-serif',
    group: "pinOlive",
    weight: "400",
  },
  { id: "jost-light", label: "Jost Light", family: '"Jost", sans-serif', group: "pinOlive", weight: "300" },
];

const FONT_GROUP_LABELS = {
  rhode: "Rhode / editorial",
  pinSunset: "Пин — закат (скрин 1)",
  pinOlive: "Пин — олива (скрин 2)",
  pin1: "Пин 1",
  pin2: "Пин 2",
  pin3: "Пин 3",
  site: "Сайт свадьбы",
};

const DEFAULTS = { ...MEADOW_REFERENCE_PRESET };

const FONT_SELECT_IDS = [
  "fieldFontGreeting",
  "fieldFontNews",
  "fieldFontInvite",
  "fieldFontDate",
  "fieldFontInfo",
  "fieldFontSignature",
  "fieldFontFarewell",
];

const els = {
  greeting: document.getElementById("fieldGreeting"),
  body1: document.getElementById("fieldBody1"),
  body2: document.getElementById("fieldBody2"),
  botanicalHeadline: document.getElementById("fieldBotanicalHeadline"),
  botanicalDate: document.getElementById("fieldBotanicalDate"),
  body3: document.getElementById("fieldBody3"),
  signatureNames: document.getElementById("fieldSignatureNames"),
  signatureFarewell: document.getElementById("fieldSignatureFarewell"),
  colorGreeting: document.getElementById("fieldColorGreeting"),
  colorNews: document.getElementById("fieldColorNews"),
  colorDateDay: document.getElementById("fieldColorDateDay"),
  colorDateMonth: document.getElementById("fieldColorDateMeta"),
  colorDateYear: document.getElementById("fieldColorDateYear"),
  colorInfo: document.getElementById("fieldColorInfo"),
  colorSignature: document.getElementById("fieldColorSignature"),
  colorFarewell: document.getElementById("fieldColorFarewell"),
  colorCoupleIllustration: document.getElementById("fieldColorCouple"),
  colorFriendsFrame: document.getElementById("fieldColorFriendsFrame"),
  fontGreeting: document.getElementById("fieldFontGreeting"),
  fontNews: document.getElementById("fieldFontNews"),
  fontInvite: document.getElementById("fieldFontInvite"),
  fontDate: document.getElementById("fieldFontDate"),
  fontInfo: document.getElementById("fieldFontInfo"),
  fontSignature: document.getElementById("fieldFontSignature"),
  fontFarewell: document.getElementById("fieldFontFarewell"),
  sizeGreeting: document.getElementById("fieldSizeGreeting"),
  sizeNews: document.getElementById("fieldSizeNews"),
  sizeInvite: document.getElementById("fieldSizeInvite"),
  sizeDate: document.getElementById("fieldSizeDate"),
  sizeInfo: document.getElementById("fieldSizeInfo"),
  sizeSignature: document.getElementById("fieldSizeSignature"),
  sizeFarewell: document.getElementById("fieldSizeFarewell"),
  offsetGreeting: document.getElementById("fieldOffsetGreeting"),
  offsetNews: document.getElementById("fieldOffsetNews"),
  offsetInvite: document.getElementById("fieldOffsetInvite"),
  offsetDate: document.getElementById("fieldOffsetDate"),
  offsetInfo: document.getElementById("fieldOffsetInfo"),
  offsetSignature: document.getElementById("fieldOffsetSignature"),
  offsetFarewell: document.getElementById("fieldOffsetFarewell"),
  infoWidth: document.getElementById("fieldInfoWidth"),
  boldGreeting: document.getElementById("fieldBoldGreeting"),
  boldNews: document.getElementById("fieldBoldNews"),
  boldInvite: document.getElementById("fieldBoldInvite"),
  boldDate: document.getElementById("fieldBoldDate"),
  boldInfo: document.getElementById("fieldBoldInfo"),
  boldSignature: document.getElementById("fieldBoldSignature"),
  boldFarewell: document.getElementById("fieldBoldFarewell"),
  textLayout: document.getElementById("fieldTextLayout"),
  textPadTop: document.getElementById("fieldTextPadTop"),
  textPadBottom: document.getElementById("fieldTextPadBottom"),
  textPadX: document.getElementById("fieldTextPadX"),
  blockShiftX: document.getElementById("fieldBlockShiftX"),
  blockShiftY: document.getElementById("fieldBlockShiftY"),
  ringsOffsetX: document.getElementById("fieldRingsOffsetX"),
  ringsOffsetY: document.getElementById("fieldRingsOffsetY"),
  ringsSize: document.getElementById("fieldRingsSize"),
  cardText: document.getElementById("cardText"),
  cardPaper: document.getElementById("cardPaper"),
  cardSignatureZone: document.getElementById("cardSignatureZone"),
  cardGreeting: document.getElementById("cardGreeting"),
  cardBody1: document.getElementById("cardBody1"),
  cardBody2: document.getElementById("cardBody2"),
  cardBody3: document.getElementById("cardBody3"),
  cardDateBlock: document.getElementById("cardDateBlock"),
  cardDateHero: document.getElementById("cardDateHero"),
  cardDateDay: document.getElementById("cardDateDay"),
  cardDateMonth: document.getElementById("cardDateMonth"),
  cardDateYear: document.getElementById("cardDateYear"),
  cardSignatureBlock: document.getElementById("cardSignatureBlock"),
  cardSignatureNames: document.getElementById("cardSignatureNames"),
  cardSignatureFarewell: document.getElementById("cardSignatureFarewell"),
  cardExport: document.getElementById("invitationCard"),
  cardEditorial: document.getElementById("cardEditorial"),
  cardEditorialIntro: document.getElementById("cardEditorialIntro"),
  cardEditorialPhoto: document.getElementById("cardEditorialPhoto"),
  cardEditorialNames: document.getElementById("cardEditorialNames"),
  cardEditorialNews: document.getElementById("cardEditorialNews"),
  cardEditorialDate: document.getElementById("cardEditorialDate"),
  cardEditorialInvite: document.getElementById("cardEditorialInvite"),
  cardEditorialInfo: document.getElementById("cardEditorialInfo"),
  cardEditorialFarewell: document.getElementById("cardEditorialFarewell"),
  cardEditorialCouple: document.getElementById("cardEditorialCouple"),
  cardEditorialCoupleTint: document.getElementById("cardEditorialCoupleTint"),
  cardEditorialRingsWrap: document.getElementById("cardEditorialRingsWrap"),
  cardFolkFrame: document.getElementById("cardFolkFrame"),
  cardBotanical: document.getElementById("cardBotanical"),
  cardBotanicalGreeting: document.getElementById("cardBotanicalGreeting"),
  cardBotanicalRingsWrap: document.getElementById("cardBotanicalRingsWrap"),
  cardBotanicalHeadline: document.getElementById("cardBotanicalHeadline"),
  cardBotanicalDate: document.getElementById("cardBotanicalDate"),
  cardBotanicalInfo: document.getElementById("cardBotanicalInfo"),
  cardBotanicalNames: document.getElementById("cardBotanicalNames"),
  cardBotanicalFarewell: document.getElementById("cardBotanicalFarewell"),
  cardTulipDeco: document.getElementById("cardTulipDeco"),
  cardBlushPhotoWrap: document.getElementById("cardBlushPhotoWrap"),
  cardBlushPhoto: document.getElementById("cardBlushPhoto"),
  cardBlushMonogram: document.getElementById("cardBlushMonogram"),
  cardFriends: document.getElementById("cardFriends"),
  cardFriendsIntro: document.getElementById("cardFriendsIntro"),
  cardFriendsFrameRings: document.getElementById("cardFriendsFrameRings"),
  cardFriendsNames: document.getElementById("cardFriendsNames"),
  cardFriendsDate: document.getElementById("cardFriendsDate"),
  cardFriendsPlace: document.getElementById("cardFriendsPlace"),
  cardFriendsFooterA: document.getElementById("cardFriendsFooterA"),
  cardFriendsFooterB: document.getElementById("cardFriendsFooterB"),
};

function usesInviteStackLayout(theme) {
  return (
    theme === "editorial" ||
    theme === "folk" ||
    theme === "arch" ||
    theme === "tatar" ||
    theme === "blush" ||
    theme === "friends" ||
    theme === "tulip"
  );
}

function fontMeta(id) {
  return FONT_OPTIONS.find((f) => f.id === id) || FONT_OPTIONS[0];
}

function fontFamily(id) {
  return fontMeta(id).family;
}

function fontStyle(id) {
  return fontMeta(id).style || "normal";
}

function fontWeight(id) {
  return fontMeta(id).weight || "400";
}

function num(value, fallback) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseRussianDate(text) {
  const match = String(text).match(RU_DATE_RE);
  if (!match) {
    return null;
  }
  return {
    day: match[1],
    month: match[2],
    year: match[3],
  };
}

function stripRussianDate(text) {
  return String(text)
    .replace(RU_DATE_RE, "")
    .replace(/\s{2,}/g, " ")
    .replace(/[.,]\s*$/u, "")
    .trim();
}

function formatEditorialNames(raw) {
  return String(raw || "")
    .replace(/\s*&\s*/g, " и ")
    .replace(/[.!]+$/u, "")
    .trim();
}

function formatEditorialDateLine(parsed) {
  if (!parsed) {
    return "";
  }
  return `${parsed.day} ${parsed.month} ${parsed.year}`;
}

function extractBlushLocation(body2, parsed) {
  if (!parsed) {
    return stripRussianDate(body2);
  }
  return String(body2)
    .replace(RU_DATE_RE, "")
    .replace(/^[\s.,:;–—-]+/u, "")
    .trim();
}

function applyBlushChrome(data) {
  const isBlush = data.cardTheme === "blush";
  const card = els.cardExport;
  const bg = card?.querySelector(".card-bg");

  if (els.cardBlushPhotoWrap) {
    els.cardBlushPhotoWrap.hidden = !isBlush;
    els.cardBlushPhotoWrap.setAttribute("aria-hidden", isBlush ? "false" : "true");
  }
  if (els.cardBlushMonogram) {
    els.cardBlushMonogram.hidden = !isBlush;
    els.cardBlushMonogram.setAttribute("aria-hidden", isBlush ? "false" : "true");
  }
  if (els.cardEditorialRingsWrap) {
    els.cardEditorialRingsWrap.hidden = isBlush;
  }
  const coupleWrap = els.cardEditorial?.querySelector(".card-editorial-couple-wrap");
  if (coupleWrap) {
    coupleWrap.hidden = isBlush;
  }
  if (bg) {
    if (isBlush) {
      bg.hidden = true;
      bg.style.display = "none";
      bg.style.visibility = "hidden";
    } else {
      bg.hidden = false;
      bg.style.removeProperty("display");
      bg.style.removeProperty("visibility");
    }
  }
  if (card) {
    card.style.backgroundColor = isBlush ? BLUSH_CREAM : "";
  }
}

function getActiveCardTheme() {
  const card = els.cardExport;
  if (!card) {
    return "meadow";
  }
  if (card.classList.contains("card--editorial")) {
    return "editorial";
  }
  if (card.classList.contains("card--folk")) {
    return "folk";
  }
  if (card.classList.contains("card--arch")) {
    return "arch";
  }
  if (card.classList.contains("card--tatar")) {
    return "tatar";
  }
  if (card.classList.contains("card--friends")) {
    return "friends";
  }
  if (card.classList.contains("card--blush")) {
    return "blush";
  }
  if (card.classList.contains("card--tulip")) {
    return "tulip";
  }
  if (card.classList.contains("card--watercolor")) {
    return "watercolor";
  }
  if (card.classList.contains("card--meadow")) {
    return "meadow";
  }
  if (card.classList.contains("card--letter")) {
    return "letter";
  }
  if (card.classList.contains("card--hills")) {
    return "hills";
  }
  if (card.classList.contains("card--road")) {
    return "road";
  }
  if (card.classList.contains("card--forest")) {
    return "forest";
  }
  return "meadow";
}

function saveEditorialSnapshot() {
  const data = readForm();
  if (getActiveCardTheme() !== "editorial") {
    return false;
  }
  localStorage.setItem(
    EDITORIAL_SNAPSHOT_KEY,
    JSON.stringify({
      ...data,
      cardTheme: "editorial",
      savedAt: Date.now(),
    }),
  );
  return true;
}

function hasEditorialSnapshot() {
  return Boolean(localStorage.getItem(EDITORIAL_SNAPSHOT_KEY));
}

function restoreEditorialSnapshot() {
  try {
    const raw = localStorage.getItem(EDITORIAL_SNAPSHOT_KEY);
    if (!raw) {
      applyEditorialPreset();
      return;
    }
    const data = { ...JSON.parse(raw), cardTheme: "editorial" };
    writeForm(data);
    applyToCard(data);
    save();
  } catch {
    applyEditorialPreset();
  }
}

function saveMeadowSnapshot() {
  const data = readForm();
  if (getActiveCardTheme() !== "meadow") {
    return false;
  }
  localStorage.setItem(
    MEADOW_SNAPSHOT_KEY,
    JSON.stringify({
      ...data,
      cardTheme: "meadow",
      savedAt: Date.now(),
    }),
  );
  return true;
}

function hasMeadowSnapshot() {
  return Boolean(localStorage.getItem(MEADOW_SNAPSHOT_KEY));
}

function restoreMeadowSnapshot() {
  try {
    const raw = localStorage.getItem(MEADOW_SNAPSHOT_KEY);
    if (!raw) {
      applyMeadowReferencePreset();
      return;
    }
    const data = { ...JSON.parse(raw), cardTheme: "meadow" };
    writeForm(data);
    applyToCard(data);
    save();
  } catch {
    applyMeadowReferencePreset();
  }
}

function friendsSnapshotPayload(data) {
  return {
    ...data,
    cardTheme: "friends",
    savedAt: Date.now(),
  };
}

function saveFriendsSnapshot() {
  const data = readForm();
  if (getActiveCardTheme() !== "friends") {
    return false;
  }
  localStorage.setItem(FRIENDS_SNAPSHOT_KEY, JSON.stringify(friendsSnapshotPayload(data)));
  updateFriendsSnapshotUI();
  return true;
}

function updateFriendsSnapshotUI() {
  const el = document.getElementById("editorFriendsSnapshotStatus");
  if (!el) {
    return;
  }
  if (!hasFriendsSnapshot()) {
    el.textContent = "Снимок For friends: не сохранён";
    el.classList.remove("editor-snapshot-status--ok");
    return;
  }
  try {
    const data = JSON.parse(localStorage.getItem(FRIENDS_SNAPSHOT_KEY));
    const when = data.savedAt
      ? new Date(data.savedAt).toLocaleString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";
    const pad = `${data.textPadTop ?? "?"}/${data.textPadX ?? "?"}/${data.textPadBottom ?? "?"}`;
    el.textContent = `Снимок сохранён ${when} · отступы ${pad}% · размеры ${data.sizeGreeting}/${data.sizeSignature}/${data.sizeFarewell} rem`;
    el.classList.add("editor-snapshot-status--ok");
  } catch {
    el.textContent = "Снимок For friends: ошибка чтения";
    el.classList.remove("editor-snapshot-status--ok");
  }
}

function hasFriendsSnapshot() {
  return Boolean(localStorage.getItem(FRIENDS_SNAPSHOT_KEY));
}

function restoreFriendsSnapshot() {
  try {
    const raw = localStorage.getItem(FRIENDS_SNAPSHOT_KEY);
    if (!raw) {
      applyFriendsFactoryPreset();
      return;
    }
    const data = { ...JSON.parse(raw), cardTheme: "friends" };
    setCardBackgroundTheme("friends");
    writeForm(data);
    applyToCard(data);
    save();
  } catch {
    applyFriendsFactoryPreset();
  }
}

function enterFriendsTheme() {
  if (hasFriendsSnapshot()) {
    restoreFriendsSnapshot();
    return;
  }
  applyFriendsFactoryPreset();
}

const EDITOR_UI_LABELS = {
  default: {
    greeting: "1. Обращение к гостям",
    body1: "2. Новость о событии (первая фраза)",
    body2: "3. Приглашение + дата (дата вынесется в блок «4»)",
    body3: "4. О дальнейшей информации",
    signatureNames: "5. Подпись — жених и невеста",
    signatureFarewell: "6. До скорой встречи",
    typeGreeting: "1. Обращение",
    typeNews: "2. Новость",
    typeInvite: "3. Приглашение",
    typeDate: "4. Дата",
    typeInfo: "5. Информация",
    typeSignature: "6. Подпись",
    typeFarewell: "7. Прощание",
    colorHint:
      "Кремовая открытка: 1 обращение, 2 новость, «дата — число» = строка даты, «дата — месяц» = приглашение, 4 информация, 5 подпись, 6 прощание, 7 иллюстрация пары.",
    colorGreeting: "1. Обращение",
    colorNews: "2. Новость",
    colorDateDay: "3. Дата — число",
    colorDateMeta: "3. Дата — месяц",
    colorDateYear: "3. Дата — год",
    colorInfo: "4. Информация",
    colorSignature: "5. Подпись",
    colorFarewell: "6. Прощание",
    colorCouple: "7. Иллюстрация пары",
  },
  friends: {
    greeting: "1. Обращение (курсив, 2 строки)",
    body2: "2. Дата и место",
    body3: "3. Первая строка футера (капс)",
    signatureNames: "4. Имена (script)",
    signatureFarewell: "5. Вторая строка футера (капс)",
    typeGreeting: "1. Обращение",
    typeInvite: "2. Место",
    typeDate: "2. Дата",
    typeInfo: "3. Футер — строка 1",
    typeSignature: "4. Имена",
    typeFarewell: "5. Футер — строка 2",
    colorHint:
      "For friends: цвета текста. Кольца — размер и сдвиг в блоке «Расположение».",
    colorGreeting: "1. Обращение",
    colorDateDay: "2. Дата",
    colorDateMeta: "2. Место",
    colorInfo: "3. Футер — строка 1",
    colorSignature: "4. Имена",
    colorFarewell: "5. Футер — строка 2",
    colorFriendsFrame: "Рамка фото",
  },
  tulip: {
    greeting: "1. Обращение",
    body3: "4. Информация про сайт",
    signatureNames: "5. Имена",
    signatureFarewell: "6. Прощание",
    typeGreeting: "1. Обращение",
    typeNews: "2. Заголовок",
    typeDate: "3. Дата",
    typeInfo: "4. Информация",
    typeSignature: "5. Подпись",
    typeFarewell: "6. Прощание",
    colorHint: "Тюльпаны: 1 обращение, 2 заголовок, 3 дата, 4 информация, 5 подпись, 6 прощание.",
    colorGreeting: "1. Обращение",
    colorNews: "2. Заголовок",
    colorDateDay: "3. Дата",
    colorInfo: "4. Информация",
    colorSignature: "5. Подпись",
    colorFarewell: "6. Прощание",
  },
};

function setText(id, text) {
  const node = document.getElementById(id);
  if (node && text != null) {
    node.textContent = text;
  }
}

function updateEditorForTheme(theme) {
  const isTulip = theme === "tulip";
  const isFriends = theme === "friends";
  const labels = isTulip
    ? EDITOR_UI_LABELS.tulip
    : isFriends
      ? EDITOR_UI_LABELS.friends
      : EDITOR_UI_LABELS.default;

  const blockBody1 = document.getElementById("editorBlockBody1");
  const blockBody2 = document.getElementById("editorBlockBody2");
  const blockTulipHeadline = document.getElementById("editorBlockTulipHeadline");
  const blockTulipDate = document.getElementById("editorBlockTulipDate");
  if (blockBody1) {
    blockBody1.hidden = isTulip || isFriends;
  }
  if (blockBody2) {
    blockBody2.hidden = isTulip;
  }
  if (blockTulipHeadline) {
    blockTulipHeadline.hidden = !isTulip;
  }
  if (blockTulipDate) {
    blockTulipDate.hidden = !isTulip;
  }

  setText("labelGreeting", labels.greeting);
  if (!isTulip) {
    if (labels.body1) {
      setText("labelBody1", labels.body1);
    }
    setText("labelBody2", labels.body2);
  }
  setText("labelBody3", labels.body3);
  setText("labelSignatureNames", labels.signatureNames);
  setText("labelSignatureFarewell", labels.signatureFarewell);

  setText("editorTypeLabelGreeting", labels.typeGreeting);
  setText("editorTypeLabelNews", labels.typeNews);
  if (!isTulip) {
    setText("editorTypeLabelInvite", labels.typeInvite);
  }
  setText("editorTypeLabelDate", labels.typeDate);
  setText("editorTypeLabelInfo", labels.typeInfo);
  setText("editorTypeLabelSignature", labels.typeSignature);
  setText("editorTypeLabelFarewell", labels.typeFarewell);

  const rowInvite = document.getElementById("editorTypeRowInvite");
  if (rowInvite) {
    rowInvite.hidden = isTulip;
  }
  const rowNews = document.getElementById("editorTypeRowNews");
  const colorNewsBlock = document.getElementById("editorColorNews");
  if (rowNews) {
    rowNews.hidden = isFriends;
  }
  if (colorNewsBlock) {
    colorNewsBlock.hidden = isFriends;
  }

  setText("editorColorHint", labels.colorHint);
  setText("labelColorGreeting", labels.colorGreeting);
  setText("labelColorNews", labels.colorNews);
  setText("labelColorDateDay", labels.colorDateDay);
  setText("labelColorInfo", labels.colorInfo);
  setText("labelColorSignature", labels.colorSignature);
  setText("labelColorFarewell", labels.colorFarewell);

  const colorDateMeta = document.getElementById("editorColorDateMeta");
  const colorDateYear = document.getElementById("editorColorDateYear");
  const colorCouple = document.getElementById("editorColorCouple");
  const colorFriendsFrameBlock = document.getElementById("editorColorFriendsFrame");
  if (colorDateMeta) {
    colorDateMeta.hidden = isTulip;
  }
  if (colorDateYear) {
    colorDateYear.hidden = isTulip;
  }
  if (colorCouple) {
    colorCouple.hidden = isTulip || theme === "blush" || theme === "friends";
  }
  if (colorFriendsFrameBlock) {
    colorFriendsFrameBlock.hidden = true;
  }
  if (!isTulip) {
    setText("labelColorDateMeta", EDITOR_UI_LABELS.default.colorDateMeta);
    setText("labelColorDateYear", EDITOR_UI_LABELS.default.colorDateYear);
    setText("labelColorCouple", EDITOR_UI_LABELS.default.colorCouple);
  }
  if (isFriends && labels.colorFriendsFrame) {
    setText("labelColorFriendsFrame", labels.colorFriendsFrame);
  }
}

function migrateTulipTextFields(merged, parsed) {
  if (merged.botanicalHeadline) {
    return;
  }
  const parts = [parsed.botanicalHeroTop, parsed.botanicalHeroScript, parsed.botanicalHeroBottom].filter(
    Boolean,
  );
  if (parts.length) {
    merged.botanicalHeadline = parts.join(" ");
    return;
  }
  merged.botanicalHeadline = TULIP_PRESET.botanicalHeadline;
}

function migrateTulipDateField(merged) {
  if (merged.botanicalDate) {
    return;
  }
  const parsed = parseRussianDate(merged.body2);
  if (parsed) {
    merged.botanicalDate = `Дата: ${formatEditorialDateLine(parsed)}`;
    return;
  }
  merged.botanicalDate = TULIP_PRESET.botanicalDate;
}

function updateActiveThemeUI(theme) {
  const label = THEME_LABELS[theme] || theme || "—";
  const activeEl = document.getElementById("editorActiveTheme");
  if (activeEl) {
    activeEl.textContent = label;
  }
  document.querySelectorAll("[data-card-theme]").forEach((btn) => {
    const isActive = btn.dataset.cardTheme === theme;
    btn.classList.toggle("btn-theme-active", isActive);
    if (btn.dataset.cardTheme === "blush" || btn.dataset.cardTheme === "friends") {
      btn.classList.toggle("btn-secondary", !isActive);
    }
  });
}

function setLayoutMode(theme) {
  const usesStack = usesInviteStackLayout(theme);
  const isEditorialLike =
    theme === "editorial" || theme === "folk" || theme === "arch" || theme === "tatar" || theme === "blush";
  const isFriends = theme === "friends";
  const isTulip = theme === "tulip";
  if (els.cardPaper) {
    els.cardPaper.hidden = usesStack;
  }
  if (els.cardEditorial) {
    els.cardEditorial.hidden = !isEditorialLike;
    els.cardEditorial.setAttribute("aria-hidden", isEditorialLike ? "false" : "true");
  }
  if (els.cardFriends) {
    els.cardFriends.hidden = !isFriends;
    els.cardFriends.setAttribute("aria-hidden", isFriends ? "false" : "true");
  }
  if (els.cardBotanical) {
    els.cardBotanical.hidden = !isTulip;
    els.cardBotanical.setAttribute("aria-hidden", isTulip ? "false" : "true");
  }
  if (els.cardTulipDeco) {
    els.cardTulipDeco.hidden = !isTulip;
    els.cardTulipDeco.setAttribute("aria-hidden", isTulip ? "false" : "true");
  }
  if (els.cardFolkFrame) {
    els.cardFolkFrame.hidden = true;
    els.cardFolkFrame.setAttribute("aria-hidden", "true");
  }
  updateEditorForTheme(theme);
  if (theme === "tatar") {
    syncTatarFonts("greeting");
  }
}

function hexToRgb(hex) {
  const normalized = String(hex || ROSE_ACCENT).replace("#", "");
  if (normalized.length !== 6) {
    return [150, 71, 81];
  }
  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  ];
}

/** html2canvas не рисует CSS mask — запекаем цвет в data URL */
function bakeCoupleTintFromImage(img, color) {
  if (!img?.naturalWidth || !img.naturalHeight) {
    return null;
  }
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const [tr, tg, tb] = hexToRgb(color);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const alpha = imageData.data[i + 3];
    if (alpha > 12) {
      imageData.data[i] = tr;
      imageData.data[i + 1] = tg;
      imageData.data[i + 2] = tb;
    } else {
      imageData.data[i + 3] = 0;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
}

function ensureEditorialCoupleExportImg(root) {
  let exportImg = root.querySelector(".card-editorial-couple-export");
  if (exportImg) {
    return exportImg;
  }
  const wrap = root.querySelector(".card-editorial-couple-wrap");
  if (!wrap) {
    return null;
  }
  exportImg = document.createElement("img");
  exportImg.className = "card-editorial-couple-export";
  exportImg.alt = "";
  exportImg.draggable = false;
  exportImg.setAttribute("aria-hidden", "true");
  wrap.appendChild(exportImg);
  return exportImg;
}

function applyEditorialCouplePngFix(root, data, enabled) {
  const tint = root.querySelector(".card-editorial-couple-tint");
  const srcImg = root.querySelector(".card-editorial-couple");
  if (!tint || !srcImg) {
    return;
  }
  const exportImg = ensureEditorialCoupleExportImg(root);
  if (!enabled) {
    if (exportImg) {
      exportImg.removeAttribute("src");
      exportImg.style.display = "none";
    }
    tint.style.removeProperty("display");
    return;
  }
  const baked = bakeCoupleTintFromImage(srcImg, data.colorCoupleIllustration || ROSE_ACCENT);
  if (!exportImg || !baked) {
    return;
  }
  exportImg.src = baked;
  exportImg.style.display = "block";
  tint.style.display = "none";
}

function clampRingsSize(value) {
  const scale = Number(value);
  if (!Number.isFinite(scale)) {
    return RINGS_SIZE_DEFAULT;
  }
  return Math.min(2.5, Math.max(0.35, scale));
}

function formatRingsWidth(theme, scale) {
  const base = RINGS_THEME_BASE[theme];
  if (!base) {
    return "";
  }
  return `min(${base.pct * scale}%, ${base.maxRem * scale}rem)`;
}

function clearRingsWrapStyle(wrap) {
  if (!wrap) {
    return;
  }
  wrap.style.width = "";
  wrap.style.transform = "";
}

function applyRingsLayout(data) {
  const theme = getActiveCardTheme();
  const base = RINGS_THEME_BASE[theme];
  const editorialWrap = els.cardEditorialRingsWrap;
  const botanicalWrap = els.cardBotanicalRingsWrap;
  const friendsWrap = els.cardFriendsPhotoWrap;

  clearRingsWrapStyle(editorialWrap);
  clearRingsWrapStyle(botanicalWrap);
  clearRingsWrapStyle(friendsWrap);

  if (!base) {
    return;
  }

  const scale = clampRingsSize(data.ringsSize);
  const width = formatRingsWidth(theme, scale);
  const x = Number(data.ringsOffsetX) || 0;
  const y = Number(data.ringsOffsetY) || 0;
  const transform = x || y ? `translate(${x}px, ${y}px)` : "";

  let wrap = editorialWrap;
  if (theme === "tulip") {
    wrap = botanicalWrap;
  } else if (theme === "friends") {
    wrap = friendsWrap;
  }

  if (wrap) {
    wrap.style.width = width;
    wrap.style.transform = transform;
  }
}

function applyFriendsFrameColor(data) {
  const frameColor = data.colorFriendsFrame || data.colorGreeting || FRIENDS_ROSE;
  const card = els.cardExport;
  if (card) {
    card.style.setProperty("--friends-frame-color", frameColor);
  }
  const frame = els.cardFriendsPhotoWrap?.querySelector(".card-friends-photo-frame");
  if (frame) {
    frame.style.borderColor = frameColor;
  }
}

function applyEditorialCoupleColor(data) {
  const tint = els.cardEditorialCoupleTint;
  const srcImg = els.cardEditorialCouple;
  if (!tint) {
    return;
  }
  const color = data.colorCoupleIllustration || ROSE_ACCENT;
  const maskUrl = srcImg?.getAttribute("src") || "assets/card-editorial-couple.png?v=3";
  const root = document.documentElement;
  root.style.setProperty("--editorial-couple-color", color);
  root.style.setProperty("--editorial-couple-mask", `url("${maskUrl}")`);
  tint.style.backgroundColor = color;
  tint.style.webkitMaskImage = `url("${maskUrl}")`;
  tint.style.maskImage = `url("${maskUrl}")`;
}

function applyEditorialLayout(data) {
  const parsed = parseRussianDate(data.body2);
  const isBlush = data.cardTheme === "blush";
  const inviteLine = isBlush ? extractBlushLocation(data.body2, parsed) : stripRussianDate(data.body2);

  if (els.cardEditorialIntro) {
    setCardParagraphText(els.cardEditorialIntro, data.greeting);
  }
  if (els.cardEditorialNames) {
    setCardParagraphText(els.cardEditorialNames, formatEditorialNames(data.signatureNames));
  }
  if (els.cardEditorialNews) {
    setCardParagraphText(els.cardEditorialNews, data.body1);
    els.cardEditorialNews.hidden = isBlush || !String(data.body1 || "").trim();
  }
  if (els.cardEditorialDate) {
    setCardParagraphText(els.cardEditorialDate, formatEditorialDateLine(parsed));
    els.cardEditorialDate.hidden = !parsed;
  }
  if (els.cardEditorialInvite) {
    setCardParagraphText(els.cardEditorialInvite, inviteLine);
    els.cardEditorialInvite.hidden = !inviteLine;
  }
  if (els.cardEditorialInfo) {
    setCardParagraphText(
      els.cardEditorialInfo,
      isBlush ? String(data.body3 || "").trim().toUpperCase() : data.body3,
    );
  }
  if (els.cardEditorialFarewell) {
    const farewell = String(data.signatureFarewell || "").trim();
    setCardParagraphText(els.cardEditorialFarewell, isBlush ? farewell.toUpperCase() : farewell);
  }

  applyColorPalette(data);

  const isTatar = data.cardTheme === "tatar";
  const newsFont = isTatar ? data.fontGreeting : data.fontNews;

  applyTypography(
    els.cardEditorialIntro,
    data.fontGreeting,
    data.sizeGreeting,
    data.offsetGreeting,
    data.boldGreeting,
  );
  applyTypography(
    els.cardEditorialNews,
    newsFont,
    data.sizeNews,
    data.offsetNews,
    data.boldNews,
  );
  applyTypography(
    els.cardEditorialNames,
    data.fontSignature,
    data.sizeSignature,
    data.offsetSignature,
    data.boldSignature,
    "translate",
  );
  applyTypography(
    els.cardEditorialDate,
    data.fontDate,
    data.sizeDate,
    data.offsetDate,
    data.boldDate,
  );
  applyTypography(
    els.cardEditorialInvite,
    data.fontInvite,
    data.sizeInvite,
    data.offsetInvite,
    data.boldInvite,
  );
  applyTypography(
    els.cardEditorialInfo,
    data.fontInfo,
    data.sizeInfo,
    data.offsetInfo,
    data.boldInfo,
  );
  applyTypography(
    els.cardEditorialFarewell,
    data.fontFarewell,
    data.sizeFarewell,
    data.offsetFarewell,
    data.boldFarewell,
    "translate",
  );

  if (els.cardEditorialIntro) {
    els.cardEditorialIntro.style.color = data.colorGreeting;
  }
  if (els.cardEditorialNews) {
    els.cardEditorialNews.style.color = data.colorNews;
  }
  if (els.cardEditorialDate) {
    els.cardEditorialDate.style.color = data.colorDateDay;
  }
  if (els.cardEditorialInvite) {
    els.cardEditorialInvite.style.color = data.colorDateMonth;
  }
  if (els.cardEditorialInfo) {
    els.cardEditorialInfo.style.color = data.colorInfo;
  }
  if (els.cardEditorialNames) {
    els.cardEditorialNames.style.color = data.colorSignature;
  }
  if (els.cardEditorialFarewell) {
    els.cardEditorialFarewell.style.color = data.colorFarewell;
  }

  if (isBlush) {
    if (els.cardEditorialIntro) {
      els.cardEditorialIntro.style.whiteSpace = "pre-line";
      els.cardEditorialIntro.style.maxWidth = "";
    }
  } else {
    applyGreetingSingleLine(els.cardEditorialIntro);
  }
  if (!isBlush) {
    applyInfoParagraphWidth(els.cardEditorialInfo, data);
  }

  applyBlushChrome(data);
  if (!isBlush) {
    applyEditorialCoupleColor(data);
    applyRingsLayout(data);
  } else {
    applyRingsLayout({ ...data, ringsOffsetX: 0, ringsOffsetY: 0, ringsSize: 1 });
  }
}

function applyBotanicalLayout(data) {
  const headline = String(data.botanicalHeadline || TULIP_PRESET.botanicalHeadline).trim();
  const dateLine = String(data.botanicalDate || TULIP_PRESET.botanicalDate).trim();

  if (els.cardBotanicalGreeting) {
    setCardParagraphText(els.cardBotanicalGreeting, String(data.greeting || "").toUpperCase());
  }
  if (els.cardBotanicalHeadline) {
    setCardParagraphText(els.cardBotanicalHeadline, headline);
    els.cardBotanicalHeadline.hidden = !headline;
  }
  if (els.cardBotanicalDate) {
    setCardParagraphText(els.cardBotanicalDate, dateLine);
    els.cardBotanicalDate.hidden = !dateLine;
  }
  if (els.cardBotanicalInfo) {
    setCardParagraphText(els.cardBotanicalInfo, data.body3);
    els.cardBotanicalInfo.hidden = !String(data.body3 || "").trim();
  }
  if (els.cardBotanicalNames) {
    setCardParagraphText(els.cardBotanicalNames, formatEditorialNames(data.signatureNames));
  }
  if (els.cardBotanicalFarewell) {
    setCardParagraphText(els.cardBotanicalFarewell, String(data.signatureFarewell || "").toUpperCase());
    els.cardBotanicalFarewell.hidden = !String(data.signatureFarewell || "").trim();
  }

  applyColorPalette(data);

  applyTypography(
    els.cardBotanicalGreeting,
    data.fontGreeting,
    data.sizeGreeting,
    data.offsetGreeting,
    data.boldGreeting,
  );
  applyTypography(
    els.cardBotanicalHeadline,
    data.fontNews,
    data.sizeNews,
    data.offsetNews,
    data.boldNews,
  );
  applyTypography(
    els.cardBotanicalDate,
    data.fontDate,
    data.sizeDate,
    data.offsetDate,
    data.boldDate,
  );
  applyTypography(
    els.cardBotanicalInfo,
    data.fontInfo,
    data.sizeInfo,
    data.offsetInfo,
    data.boldInfo,
  );
  applyTypography(
    els.cardBotanicalNames,
    data.fontSignature,
    data.sizeSignature,
    data.offsetSignature,
    data.boldSignature,
    "translate",
  );
  applyTypography(
    els.cardBotanicalFarewell,
    data.fontFarewell,
    data.sizeFarewell,
    data.offsetFarewell,
    data.boldFarewell,
    "translate",
  );

  if (els.cardBotanicalGreeting) {
    els.cardBotanicalGreeting.style.color = data.colorGreeting;
  }
  if (els.cardBotanicalHeadline) {
    els.cardBotanicalHeadline.style.color = data.colorNews;
  }
  if (els.cardBotanicalDate) {
    els.cardBotanicalDate.style.color = data.colorDateDay;
  }
  if (els.cardBotanicalInfo) {
    els.cardBotanicalInfo.style.color = data.colorInfo;
  }
  if (els.cardBotanicalNames) {
    els.cardBotanicalNames.style.color = data.colorSignature;
  }
  if (els.cardBotanicalFarewell) {
    els.cardBotanicalFarewell.style.color = data.colorFarewell;
  }

  applyGreetingSingleLine(els.cardBotanicalGreeting);
  applyInfoParagraphWidth(els.cardBotanicalInfo, data);

  applyRingsLayout(data);
}

function applyFriendsZoneLayout(data) {
  if (!els.cardFriends) {
    return;
  }
  const top = data.textPadTop ?? FRIENDS_LAYOUT_PRESET.textPadTop;
  const bottom = data.textPadBottom ?? FRIENDS_LAYOUT_PRESET.textPadBottom;
  const x = data.textPadX ?? FRIENDS_LAYOUT_PRESET.textPadX;
  els.cardFriends.style.padding = `${top}% ${x}% ${bottom}%`;
}

function applyFriendsLayout(data) {
  applyFriendsZoneLayout(data);
  applyRingsLayout(data);
  const parsed = parseRussianDate(data.body2);
  const placeLine = extractBlushLocation(data.body2, parsed);
  const footerA = String(data.body3 || "").trim().toUpperCase();
  const footerB = String(data.signatureFarewell || "").trim().toUpperCase();

  if (els.cardFriendsIntro) {
    setCardParagraphText(els.cardFriendsIntro, data.greeting);
  }
  if (els.cardFriendsNames) {
    setCardParagraphText(els.cardFriendsNames, formatEditorialNames(data.signatureNames));
  }
  if (els.cardFriendsDate) {
    setCardParagraphText(els.cardFriendsDate, formatEditorialDateLine(parsed));
    els.cardFriendsDate.hidden = !parsed;
  }
  if (els.cardFriendsPlace) {
    setCardParagraphText(els.cardFriendsPlace, placeLine);
    els.cardFriendsPlace.hidden = !placeLine;
  }
  if (els.cardFriendsFooterA) {
    setCardParagraphText(els.cardFriendsFooterA, footerA);
    els.cardFriendsFooterA.hidden = !footerA;
  }
  if (els.cardFriendsFooterB) {
    setCardParagraphText(els.cardFriendsFooterB, footerB);
    els.cardFriendsFooterB.hidden = !footerB;
  }

  applyColorPalette(data);

  applyTypography(
    els.cardFriendsIntro,
    data.fontGreeting,
    data.sizeGreeting,
    data.offsetGreeting,
    data.boldGreeting,
  );
  applyTypography(
    els.cardFriendsNames,
    data.fontSignature,
    data.sizeSignature,
    data.offsetSignature,
    data.boldSignature,
    "translate",
  );
  applyTypography(
    els.cardFriendsDate,
    data.fontDate,
    data.sizeDate,
    data.offsetDate,
    data.boldDate,
  );
  applyTypography(
    els.cardFriendsPlace,
    data.fontInvite,
    data.sizeInvite,
    data.offsetInvite,
    data.boldInvite,
  );
  applyTypography(
    els.cardFriendsFooterA,
    data.fontInfo,
    data.sizeInfo,
    data.offsetInfo,
    data.boldInfo,
  );
  applyTypography(
    els.cardFriendsFooterB,
    data.fontFarewell,
    data.sizeFarewell,
    data.offsetFarewell,
    data.boldFarewell,
    "translate",
  );

  if (els.cardFriendsIntro) {
    els.cardFriendsIntro.style.color = data.colorGreeting;
    els.cardFriendsIntro.style.whiteSpace = "pre-line";
  }
  if (els.cardFriendsNames) {
    els.cardFriendsNames.style.color = data.colorSignature;
  }
  if (els.cardFriendsDate) {
    els.cardFriendsDate.style.color = data.colorDateDay;
  }
  if (els.cardFriendsPlace) {
    els.cardFriendsPlace.style.color = data.colorDateMonth;
  }
  if (els.cardFriendsFooterA) {
    els.cardFriendsFooterA.style.color = data.colorInfo;
    els.cardFriendsFooterA.style.textTransform = "uppercase";
    els.cardFriendsFooterA.style.letterSpacing = "0.18em";
  }
  if (els.cardFriendsFooterB) {
    els.cardFriendsFooterB.style.color = data.colorFarewell;
    els.cardFriendsFooterB.style.textTransform = "uppercase";
    els.cardFriendsFooterB.style.letterSpacing = "0.18em";
  }

  applyInfoParagraphWidth(els.cardFriendsFooterA, data);
  applyInfoParagraphWidth(els.cardFriendsFooterB, data);
}

function fillFontSelect(select) {
  const groups = ["rhode", "pinSunset", "pinOlive", "pin1", "pin2", "pin3", "site"];
  groups.forEach((groupId) => {
    const optgroup = document.createElement("optgroup");
    optgroup.label = FONT_GROUP_LABELS[groupId];
    FONT_OPTIONS.filter((f) => f.group === groupId).forEach((opt) => {
      const option = document.createElement("option");
      option.value = opt.id;
      option.textContent = opt.label;
      optgroup.appendChild(option);
    });
    select.appendChild(optgroup);
  });
}

function resolveWeight(fontId, bold) {
  if (bold) {
    const base = Number.parseInt(fontWeight(fontId), 10);
    return Number.isFinite(base) && base >= 700 ? String(base) : "700";
  }
  return fontWeight(fontId);
}

/** margin — сдвигает блок и всё ниже; translate — только эту строку (подпись / прощание). */
function formParagraph(value) {
  return String(value ?? "").replace(/\r\n/g, "\n").trim();
}

function setCardParagraphText(node, text) {
  if (!node) {
    return;
  }
  node.textContent = text ?? "";
}

function getInfoWidthRem(data) {
  const custom = Number(data.infoWidth);
  return custom > 0 ? custom : INFO_WIDTH_DEFAULT;
}

function applyGreetingSingleLine(node) {
  if (!node) {
    return;
  }
  node.style.whiteSpace = "nowrap";
  node.style.maxWidth = "none";
}

function applyInfoParagraphWidth(node, data) {
  if (!node) {
    return;
  }
  const width = getInfoWidthRem(data);
  node.style.maxWidth = width > 0 ? `${width}rem` : "";
  node.style.whiteSpace = "normal";
}

function applyVerticalOffset(node, offsetPx, mode = "margin") {
  if (!node) {
    return;
  }
  if (mode === "translate") {
    node.style.marginTop = "";
    node.style.transform = offsetPx ? `translateY(${offsetPx}px)` : "";
  } else {
    node.style.marginTop = `${offsetPx}px`;
    node.style.transform = "";
  }
}

function applyTypography(node, fontId, sizeRem, offsetPx, bold = false, offsetMode = "margin") {
  if (!node) {
    return;
  }
  node.style.fontSize = `${sizeRem}rem`;
  applyVerticalOffset(node, offsetPx, offsetMode);
  node.style.fontFamily = fontFamily(fontId);
  node.style.fontStyle = fontStyle(fontId);
  node.style.fontWeight = resolveWeight(fontId, bold);
  node.style.textTransform = "none";
  node.style.letterSpacing = "normal";
}

/** Татарская: обращение и новость — один шрифт, остальное независимо */
function syncTatarFonts(source) {
  if (getActiveCardTheme() !== "tatar" || !els.fontGreeting || !els.fontNews) {
    return;
  }
  if (source === "news") {
    els.fontGreeting.value = els.fontNews.value;
    return;
  }
  els.fontNews.value = els.fontGreeting.value;
}

function migrateLegacyColors(parsed, merged) {
  if (parsed.colorGreeting != null) {
    return;
  }
  const main = parsed.colorText || "#fffef9";
  const accent = parsed.colorAccent || "#e4edd6";
  merged.colorGreeting = "#c8d6b8";
  merged.colorNews = main;
  merged.colorDateDay = "#ffffff";
  merged.colorDateMonth = accent;
  merged.colorDateYear = "#a8b89a";
  merged.colorInfo = "#d8e2cc";
  merged.colorSignature = main;
  merged.colorFarewell = "#b8c6aa";
}

function applyColorPalette(data) {
  const root = document.documentElement;
  const invite = data.colorNews;

  root.style.setProperty("--color-greeting", data.colorGreeting);
  root.style.setProperty("--color-news", data.colorNews);
  root.style.setProperty("--color-invite", invite);
  root.style.setProperty("--color-date-day", data.colorDateDay);
  root.style.setProperty("--color-date-month", data.colorDateMonth);
  root.style.setProperty("--color-date-year", data.colorDateYear);
  root.style.setProperty("--color-info", data.colorInfo);
  root.style.setProperty("--color-signature", data.colorSignature);
  root.style.setProperty("--color-farewell", data.colorFarewell);
  root.style.setProperty("--color-rule", data.colorGreeting);
  root.style.setProperty("--color-footer-line", data.colorFarewell);
}

function migrateLegacyTypography(parsed, merged) {
  const bodyFont = parsed.fontBody || "dm-sans";
  const greetFont = parsed.fontGreeting || bodyFont;
  const signFont = parsed.fontSignature || bodyFont;

  if (parsed.fontNews == null) {
    merged.fontNews = greetFont;
  }
  if (parsed.fontInvite == null) {
    merged.fontInvite = parsed.fontNews || greetFont;
  }
  if (parsed.fontDate == null) {
    merged.fontDate = bodyFont;
  }
  if (parsed.fontInfo == null) {
    merged.fontInfo = bodyFont;
  }
  if (parsed.fontFarewell == null) {
    merged.fontFarewell = bodyFont;
  }
  if (parsed.fontGreeting == null) {
    merged.fontGreeting = greetFont;
  }
  if (parsed.fontSignature == null) {
    merged.fontSignature = signFont;
  }

  if (parsed.sizeNews == null && parsed.sizeBody1 != null) {
    merged.sizeNews = parsed.sizeBody1;
  }
  if (parsed.sizeInvite == null) {
    merged.sizeInvite = parsed.sizeInfo != null ? parsed.sizeInfo : DEFAULTS.sizeInvite;
  }
  if (parsed.sizeDate == null) {
    merged.sizeDate = parsed.sizeBody2 != null ? Math.min(1.2, parsed.sizeBody2 * 1.15) : DEFAULTS.sizeDate;
  }
  if (parsed.sizeInfo == null && parsed.sizeBody3 != null) {
    merged.sizeInfo = parsed.sizeBody3;
  }
  if (parsed.sizeFarewell == null && parsed.sizeSignature != null) {
    merged.sizeFarewell = Math.min(1.1, parsed.sizeSignature * 0.88);
  }

  if (parsed.offsetNews == null && parsed.offsetBody1 != null) {
    merged.offsetNews = parsed.offsetBody1;
  }
  if (parsed.offsetInvite == null) {
    merged.offsetInvite = parsed.offsetBody2 != null ? parsed.offsetBody2 : 0;
  }
  if (parsed.offsetDate == null) {
    merged.offsetDate = 0;
  }
  if (parsed.boldInvite == null) {
    merged.boldInvite = false;
  }
  if (parsed.offsetInfo == null && parsed.offsetBody3 != null) {
    merged.offsetInfo = parsed.offsetBody3;
  }
  if (parsed.offsetFarewell == null) {
    merged.offsetFarewell = 0;
  }
}

function readForm() {
  return {
    greeting: formParagraph(els.greeting.value),
    body1: formParagraph(els.body1.value),
    body2: formParagraph(els.body2.value),
    botanicalHeadline: formParagraph(els.botanicalHeadline?.value || ""),
    botanicalDate: formParagraph(els.botanicalDate?.value || ""),
    body3: formParagraph(els.body3.value),
    signatureNames: formParagraph(els.signatureNames.value),
    signatureFarewell: formParagraph(els.signatureFarewell.value),
    colorGreeting: els.colorGreeting.value,
    colorNews: els.colorNews.value,
    colorDateDay: els.colorDateDay.value,
    colorDateMonth: els.colorDateMonth.value,
    colorDateYear: els.colorDateYear.value,
    colorInfo: els.colorInfo.value,
    colorSignature: els.colorSignature.value,
    colorFarewell: els.colorFarewell.value,
    colorCoupleIllustration: els.colorCoupleIllustration?.value || ROSE_ACCENT,
    colorFriendsFrame: els.colorFriendsFrame?.value || FRIENDS_ROSE,
    fontGreeting: els.fontGreeting.value,
    fontNews: els.fontNews.value,
    fontInvite: els.fontInvite.value,
    fontDate: els.fontDate.value,
    fontInfo: els.fontInfo.value,
    fontSignature: els.fontSignature.value,
    fontFarewell: els.fontFarewell.value,
    sizeGreeting: num(els.sizeGreeting.value, DEFAULTS.sizeGreeting),
    sizeNews: num(els.sizeNews.value, DEFAULTS.sizeNews),
    sizeInvite: num(els.sizeInvite.value, DEFAULTS.sizeInvite),
    sizeDate: num(els.sizeDate.value, DEFAULTS.sizeDate),
    sizeInfo: num(els.sizeInfo.value, DEFAULTS.sizeInfo),
    sizeSignature: num(els.sizeSignature.value, DEFAULTS.sizeSignature),
    sizeFarewell: num(els.sizeFarewell.value, DEFAULTS.sizeFarewell),
    offsetGreeting: num(els.offsetGreeting.value, 0),
    offsetNews: num(els.offsetNews.value, 0),
    offsetInvite: num(els.offsetInvite.value, 0),
    offsetDate: num(els.offsetDate.value, 0),
    offsetInfo: num(els.offsetInfo.value, 0),
    offsetSignature: num(els.offsetSignature.value, 0),
    offsetFarewell: num(els.offsetFarewell.value, 0),
    boldGreeting: els.boldGreeting.checked,
    boldNews: els.boldNews.checked,
    boldInvite: els.boldInvite.checked,
    boldDate: els.boldDate.checked,
    boldInfo: els.boldInfo.checked,
    boldSignature: els.boldSignature.checked,
    boldFarewell: els.boldFarewell.checked,
    textLayout: els.textLayout.value,
    textPadTop: num(els.textPadTop.value, DEFAULTS.textPadTop),
    textPadBottom: num(els.textPadBottom.value, DEFAULTS.textPadBottom),
    textPadX: num(els.textPadX.value, DEFAULTS.textPadX),
    signatureOverlap: DEFAULTS.signatureOverlap ?? 9,
    cardTheme: getActiveCardTheme(),
    blockShiftX: num(els.blockShiftX.value, 0),
    blockShiftY: num(els.blockShiftY.value, 0),
    ringsOffsetX: num(els.ringsOffsetX?.value, 0),
    ringsOffsetY: num(els.ringsOffsetY?.value, 0),
    ringsSize: clampRingsSize(num(els.ringsSize?.value, RINGS_SIZE_DEFAULT)),
    infoWidth: num(els.infoWidth?.value, INFO_WIDTH_DEFAULT),
  };
}

function usesPhotoTextLayout() {
  const card = els.cardExport;
  return (
    card?.classList.contains("card--watercolor") ||
    card?.classList.contains("card--road") ||
    card?.classList.contains("card--hills") ||
    card?.classList.contains("card--meadow")
  );
}

const CARD_BG_SRC = {
  meadow: "assets/card-background-meadow.jpg?v=1",
  letter: "assets/card-background-forest.jpg?v=3",
  forest: "assets/card-background-forest.jpg?v=3",
  cottage: "assets/card-background-cottage.jpg?v=1",
  road: "assets/card-background-road.jpg?v=1",
  hills: "assets/card-background-hills.jpg?v=1",
  watercolor: "assets/card-background-watercolor.jpg?v=1",
  editorial: "assets/card-editorial-bg.jpg?v=1",
  folk: "assets/card-folk-bg-clean.jpg?v=1",
  arch: "assets/card-arch-bg-portrait.jpg?v=1",
  tatar: "assets/card-tatar-bg-portrait.png?v=5",
  tulip: "assets/card-tulip-bg-portrait.jpg?v=6",
  friends: "assets/card-friends-frame-bg.jpg?v=1",
};

function setCardBackgroundTheme(theme) {
  const card = els.cardExport;
  if (!card) {
    return;
  }
  const prevTheme = getActiveCardTheme();
  if (prevTheme === "meadow" && theme !== "meadow") {
    saveMeadowSnapshot();
  }
  if (prevTheme === "editorial" && theme !== "editorial") {
    saveEditorialSnapshot();
  }
  if (prevTheme === "friends" && theme !== "friends") {
    saveFriendsSnapshot();
  }

  card.classList.remove(
    "card--watercolor",
    "card--road",
    "card--hills",
    "card--forest",
    "card--letter",
    "card--meadow",
    "card--editorial",
    "card--folk",
    "card--arch",
    "card--tatar",
    "card--blush",
    "card--friends",
    "card--tulip",
  );
  if (
    theme === "watercolor" ||
    theme === "road" ||
    theme === "hills" ||
    theme === "forest" ||
    theme === "letter" ||
    theme === "meadow" ||
    theme === "editorial" ||
    theme === "folk" ||
    theme === "arch" ||
    theme === "tatar" ||
    theme === "blush" ||
    theme === "friends" ||
    theme === "tulip"
  ) {
    card.classList.add(`card--${theme}`);
  }
  setLayoutMode(theme);

  const bg = card.querySelector(".card-bg");
  const overlay = card.querySelector(".card-overlay");
  if (bg && theme === "blush") {
    bg.hidden = true;
    bg.style.display = "none";
    bg.style.visibility = "hidden";
    card.style.backgroundColor = BLUSH_CREAM;
    if (overlay) {
      overlay.hidden = true;
      overlay.style.display = "none";
    }
  } else if (bg && theme === "friends") {
    bg.hidden = false;
    bg.style.removeProperty("display");
    bg.style.visibility = "visible";
    bg.style.display = "";
    bg.src = CARD_BG_SRC.friends;
    bg.setAttribute("width", String(CARD_PORTRAIT_WIDTH));
    bg.setAttribute("height", String(CARD_PORTRAIT_HEIGHT));
    card.style.backgroundColor = FRIENDS_CREAM;
    if (overlay) {
      overlay.hidden = false;
      overlay.style.removeProperty("display");
      overlay.style.visibility = "visible";
    }
  } else if (bg && CARD_BG_SRC[theme]) {
    bg.hidden = false;
    bg.style.removeProperty("display");
    bg.style.removeProperty("visibility");
    card.style.removeProperty("background-color");
    bg.style.display = "";
    bg.src = CARD_BG_SRC[theme];
    const bgW = theme === "tatar" ? TATAR_BG_WIDTH : CARD_PORTRAIT_WIDTH;
    const bgH = theme === "tatar" ? TATAR_BG_HEIGHT : CARD_PORTRAIT_HEIGHT;
    bg.setAttribute("width", String(bgW));
    bg.setAttribute("height", String(bgH));
  }
  updateActiveThemeUI(theme);
}

function applyTextZoneLayout(data) {
  els.cardText.dataset.layout = data.textLayout || "spread";
  const root = document.documentElement;
  root.style.setProperty("--card-pad-top", `${data.textPadTop}%`);
  root.style.setProperty("--card-pad-x", `${data.textPadX}%`);
  root.style.setProperty("--card-illustration-reserve", `${data.textPadBottom}%`);
  root.style.setProperty("--card-pad-bottom", `${data.textPadBottom}%`);
  const overlap = data.signatureOverlap ?? 9;
  root.style.setProperty("--card-signature-overlap", `${overlap}%`);

  const isLetter = els.cardExport?.classList.contains("card--letter");
  const isMeadow = els.cardExport?.classList.contains("card--meadow");
  const isEditorial = els.cardExport?.classList.contains("card--editorial");
  const isFolk = els.cardExport?.classList.contains("card--folk");
  const isArch = els.cardExport?.classList.contains("card--arch");
  const isTatar = els.cardExport?.classList.contains("card--tatar");
  const isBlush = els.cardExport?.classList.contains("card--blush");
  const isFriends = els.cardExport?.classList.contains("card--friends");
  const isTulip = els.cardExport?.classList.contains("card--tulip");
  if (isEditorial || isFolk || isArch || isTatar || isBlush || isFriends || isTulip) {
    els.cardText.style.padding = "";
    els.cardText.style.inset = "";
  } else if (isMeadow || usesPhotoTextLayout()) {
    els.cardText.style.padding = "";
    els.cardText.style.inset = "";
  } else if (isLetter) {
    els.cardText.style.padding = "";
    els.cardText.style.inset = "";
  } else {
    els.cardText.style.padding = `${data.textPadTop}% ${data.textPadX}% ${data.textPadBottom}%`;
  }
}

function applyBlockShift(data) {
  const x = data.blockShiftX;
  const y = data.blockShiftY;
  if (els.cardExport?.classList.contains("card--friends") && els.cardFriends) {
    if (els.cardPaper) {
      els.cardPaper.style.transform = "";
    }
    els.cardText.style.transform = "none";
    if (els.cardEditorial) {
      els.cardEditorial.style.transform = "";
    }
    if (els.cardBotanical) {
      els.cardBotanical.style.transform = "";
    }
    els.cardFriends.style.transform = `translate(${x}px, ${y}px)`;
    return;
  }
  if (
    (els.cardExport?.classList.contains("card--editorial") ||
      els.cardExport?.classList.contains("card--folk") ||
      els.cardExport?.classList.contains("card--arch") ||
      els.cardExport?.classList.contains("card--tatar") ||
      els.cardExport?.classList.contains("card--blush")) &&
    els.cardEditorial
  ) {
    if (els.cardPaper) {
      els.cardPaper.style.transform = "";
    }
    els.cardText.style.transform = "none";
    els.cardEditorial.style.transform = `translate(${x}px, ${y}px)`;
    if (els.cardBotanical) {
      els.cardBotanical.style.transform = "";
    }
    if (els.cardFriends) {
      els.cardFriends.style.transform = "";
    }
    return;
  }
  if (els.cardExport?.classList.contains("card--tulip") && els.cardBotanical) {
    if (els.cardPaper) {
      els.cardPaper.style.transform = "";
    }
    els.cardText.style.transform = "none";
    if (els.cardEditorial) {
      els.cardEditorial.style.transform = "";
    }
    if (els.cardFriends) {
      els.cardFriends.style.transform = "";
    }
    els.cardBotanical.style.transform = `translate(${x}px, ${y}px)`;
    return;
  }
  if (els.cardEditorial) {
    els.cardEditorial.style.transform = "";
  }
  if (els.cardFriends) {
    els.cardFriends.style.transform = "";
  }
  if (els.cardBotanical) {
    els.cardBotanical.style.transform = "";
  }
  if (
    els.cardExport?.classList.contains("card--meadow") ||
    els.cardExport?.classList.contains("card--forest")
  ) {
    if (els.cardPaper) {
      els.cardPaper.style.transform = "";
    }
    els.cardText.style.transform = `translate(${x}px, ${y}px)`;
    return;
  }
  if (els.cardExport?.classList.contains("card--letter") && els.cardPaper) {
    els.cardPaper.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    els.cardPaper.style.left = "";
    els.cardPaper.style.right = "";
    els.cardPaper.style.top = "";
    els.cardPaper.style.bottom = "";
    els.cardPaper.style.marginLeft = "";
    els.cardPaper.style.marginRight = "";
    els.cardText.style.transform = "none";
    return;
  }
  if (els.cardPaper) {
    els.cardPaper.style.transform = "";
    els.cardPaper.style.left = "";
    els.cardPaper.style.right = "";
    els.cardPaper.style.top = "";
    els.cardPaper.style.bottom = "";
    els.cardPaper.style.marginLeft = "";
    els.cardPaper.style.marginRight = "";
  }
  els.cardText.style.transform = `translate(${x}px, ${y}px)`;
}

/**
 * Экспорт PNG — проверенная схема v1. Спека: PNG-EXPORT.md
 * Не менять без ручной проверки «Скачать PNG» на card--letter.
 */
const PNG_EXPORT_IMPL_VERSION = 2;
const PNG_TARGET_WIDTH = 1600;
const PNG_SCALE_MIN = 2;
const PNG_SCALE_MAX = 4;

function preloadCardImages(card) {
  const images = [...card.querySelectorAll("img")].filter((img) => img.src);
  return Promise.all(
    images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        }),
    ),
  );
}

function patchClonedCardForCanvas(_doc, clonedCard) {
  const shiftX = clonedCard.style.getPropertyValue("--capture-shift-x") || "0px";
  const shiftY = clonedCard.style.getPropertyValue("--capture-shift-y") || "0px";
  clonedCard.style.setProperty("--capture-shift-x", shiftX);
  clonedCard.style.setProperty("--capture-shift-y", shiftY);
  clonedCard.classList.add("card--png-capture");

  if (
    clonedCard.classList.contains("card--editorial") ||
    clonedCard.classList.contains("card--folk")
  ) {
    applyEditorialCouplePngFix(clonedCard, readForm(), true);
  }

  const paper = clonedCard.querySelector(".card-paper");
  const text = clonedCard.querySelector(".card-text");
  const sig = clonedCard.querySelector(".card-signature-zone");
  if (paper) {
    paper.style.setProperty("backdrop-filter", "none");
    paper.style.setProperty("-webkit-backdrop-filter", "none");
    paper.style.setProperty("overflow", "visible");
    paper.style.setProperty("transform", "none");
  }
  if (text) {
    text.style.setProperty("overflow", "visible");
    text.style.setProperty("transform", "none");
  }
  ensurePngExportSpacer(clonedCard, true);
  if (sig) {
    sig.style.setProperty("margin-top", "0");
    sig.style.setProperty("padding-top", "0.65rem");
  }
}

function ensurePngExportSpacer(card, enabled) {
  const text = card?.querySelector(".card-text");
  const sigZone = card?.querySelector(".card-signature-zone");
  if (!text || !sigZone) {
    return;
  }
  const existing = text.querySelector(".card-png-export-spacer");
  if (!enabled) {
    existing?.remove();
    return;
  }
  if (existing) {
    return;
  }
  const spacer = document.createElement("div");
  spacer.className = "card-png-export-spacer";
  spacer.setAttribute("aria-hidden", "true");
  text.insertBefore(spacer, sigZone);
}

function setCaptureMode(card, data, enabled) {
  if (!card) {
    return;
  }
  if (!enabled) {
    ensurePngExportSpacer(card, false);
    applyEditorialCouplePngFix(card, data, false);
    card.classList.remove("card--png-capture");
    card.style.removeProperty("--capture-shift-x");
    card.style.removeProperty("--capture-shift-y");
    applyBlockShift(data);
    return;
  }
  card.classList.add("card--png-capture");
  card.style.setProperty("--capture-shift-x", `${data.blockShiftX || 0}px`);
  card.style.setProperty("--capture-shift-y", `${data.blockShiftY || 0}px`);
  if (card.classList.contains("card--friends")) {
    ensurePngExportSpacer(card, false);
  } else if (
    card.classList.contains("card--editorial") ||
    card.classList.contains("card--folk") ||
    card.classList.contains("card--arch") ||
    card.classList.contains("card--tatar") ||
    card.classList.contains("card--blush")
  ) {
    applyEditorialCouplePngFix(
      card,
      data,
      card.classList.contains("card--arch") ||
        card.classList.contains("card--tatar") ||
        card.classList.contains("card--blush")
        ? false
        : true,
    );
  } else {
    ensurePngExportSpacer(card, true);
  }
}

/**
 * Снимок превью: html2canvas на #invitationCard + режим card--png-capture (без transform / auto-margin).
 */
async function exportInvitationPng() {
  if (typeof html2canvas !== "function") {
    alert("Подождите загрузку редактора или сделайте скриншот открытки.");
    return;
  }

  const card = els.cardExport;
  if (!card) {
    return;
  }

  const btn = document.getElementById("btnPng");
  const prevLabel = btn?.textContent ?? "Скачать PNG";
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Готовим PNG…";
  }

  const data = readForm();

  try {
    await document.fonts.ready;
    await preloadCardImages(card);

    card.scrollIntoView({ block: "center", inline: "center" });
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const layoutWidth = card.offsetWidth || card.getBoundingClientRect().width;
    const scale = Math.min(
      PNG_SCALE_MAX,
      Math.max(PNG_SCALE_MIN, PNG_TARGET_WIDTH / Math.max(layoutWidth, 1)),
    );

    setCaptureMode(card, data, true);
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const canvas = await html2canvas(card, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      onclone: patchClonedCardForCanvas,
    });

    if (canvas.width < layoutWidth * PNG_SCALE_MIN * 0.5) {
      throw new Error(`PNG too small: ${canvas.width}x${canvas.height}`);
    }

    const link = document.createElement("a");
    link.download = "privetstvie-rafael-evgenia.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    console.error("PNG export failed:", error);
    alert(
      "Не удалось сохранить PNG. Откройте страницу через локальный сервер (http://…), не как файл с диска, затем обновите и попробуйте снова.",
    );
  } finally {
    setCaptureMode(card, data, false);
    if (btn) {
      btn.disabled = false;
      btn.textContent = prevLabel;
    }
  }
}

function applyDateTypography(data) {
  const base = data.sizeDate;
  const bold = Boolean(data.boldDate);
  if (els.cardDateBlock) {
    applyVerticalOffset(els.cardDateBlock, data.offsetDate, "translate");
  }
  if (els.cardDateHero) {
    els.cardDateHero.style.marginTop = "";
    els.cardDateHero.style.transform = "";
  }
  applyTypography(els.cardDateDay, data.fontDate, base * DATE_SIZE_SCALE.day, 0, bold);
  applyTypography(els.cardDateMonth, data.fontDate, base * DATE_SIZE_SCALE.month, 0, bold);
  applyTypography(els.cardDateYear, data.fontDate, base * DATE_SIZE_SCALE.year, 0, bold);

}

function applyDateHero(data) {
  const parsed = parseRussianDate(data.body2);

  if (parsed) {
    els.cardDateDay.textContent = parsed.day;
    els.cardDateMonth.textContent = parsed.month;
    els.cardDateYear.textContent = parsed.year;
    if (els.cardDateBlock) {
      els.cardDateBlock.hidden = false;
    }
    els.cardDateHero.hidden = false;
    setCardParagraphText(els.cardBody2, stripRussianDate(data.body2));
  } else {
    if (els.cardDateBlock) {
      els.cardDateBlock.hidden = true;
    }
    els.cardDateHero.hidden = true;
    els.cardBody2.innerHTML = data.body2.replace(
      RU_DATE_RE,
      (full) => `<span class="card-date">${full}</span>`,
    );
  }

  if (!els.cardDateHero.hidden) {
    applyDateTypography(data);
  }

  document.querySelectorAll(".card-date").forEach((node) => {
    node.style.color = data.colorDateMonth;
  });
}

function applyToCard(data) {
  if (data.cardTheme) {
    setCardBackgroundTheme(data.cardTheme);
  }
  applyBlushChrome(data);

  if (data.cardTheme === "friends") {
    applyFriendsLayout(data);
    applyTextZoneLayout(data);
    applyBlockShift(data);
    return;
  }

  if (
    data.cardTheme === "editorial" ||
    data.cardTheme === "folk" ||
    data.cardTheme === "arch" ||
    data.cardTheme === "tatar" ||
    data.cardTheme === "blush"
  ) {
    applyEditorialLayout(data);
    applyTextZoneLayout(data);
    applyBlockShift(data);
    return;
  }

  if (data.cardTheme === "tulip") {
    applyBotanicalLayout(data);
    applyTextZoneLayout(data);
    applyBlockShift(data);
    return;
  }

  setCardParagraphText(els.cardGreeting, data.greeting);
  setCardParagraphText(els.cardBody1, data.body1);
  applyDateHero(data);
  setCardParagraphText(els.cardBody3, data.body3);
  setCardParagraphText(els.cardSignatureNames, data.signatureNames);
  setCardParagraphText(els.cardSignatureFarewell, data.signatureFarewell);

  applyColorPalette(data);
  applyTextZoneLayout(data);

  applyTypography(
    els.cardGreeting,
    data.fontGreeting,
    data.sizeGreeting,
    data.offsetGreeting,
    data.boldGreeting,
  );
  applyTypography(els.cardBody1, data.fontNews, data.sizeNews, data.offsetNews, data.boldNews);
  applyTypography(els.cardBody2, data.fontInvite, data.sizeInvite, data.offsetInvite, data.boldInvite);
  applyTypography(els.cardBody3, data.fontInfo, data.sizeInfo, data.offsetInfo, data.boldInfo);
  applyTypography(
    els.cardSignatureNames,
    data.fontSignature,
    data.sizeSignature,
    data.offsetSignature,
    data.boldSignature,
    "translate",
  );
  applyTypography(
    els.cardSignatureFarewell,
    data.fontFarewell,
    data.sizeFarewell,
    data.offsetFarewell,
    data.boldFarewell,
    "translate",
  );

  applyGreetingSingleLine(els.cardGreeting);
  applyInfoParagraphWidth(els.cardBody3, data);

  applyBlockShift(data);
}

function save() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...readForm(),
      textContentVersion: TEXT_CONTENT_VERSION,
      watercolorLayoutVersion: WATERCOLOR_LAYOUT_VERSION,
      cardBgVersion: CARD_BG_VERSION,
      pngExportImplVersion: PNG_EXPORT_IMPL_VERSION,
      letterRestoreVersion: LETTER_RESTORE_VERSION,
      meadowRestoreVersion: MEADOW_RESTORE_VERSION,
      cardTheme: readForm().cardTheme || "meadow",
    }),
  );
}

function load() {
  const legacyKeys = [
    STORAGE_KEY,
    "wedding-standard-invitation-v6",
    "wedding-standard-invitation-v5",
    "wedding-standard-invitation-v4",
    "wedding-standard-invitation-v2",
    "wedding-standard-invitation-v1",
  ];

  try {
    let raw = null;
    for (const key of legacyKeys) {
      raw = localStorage.getItem(key);
      if (raw) {
        break;
      }
    }
    if (!raw) {
      return { ...DEFAULTS };
    }
    const parsed = JSON.parse(raw);
    const merged = { ...DEFAULTS, ...parsed };
    if ((parsed.textContentVersion || 0) < TEXT_CONTENT_VERSION) {
      Object.assign(merged, ORIGINAL_TEXT);
      merged.textContentVersion = TEXT_CONTENT_VERSION;
    }
    if (parsed.textLayout == null) {
      merged.textLayout = "spread";
    }
    if (parsed.textPadTop == null) {
      merged.textPadTop = 9;
    }
    if (parsed.textPadBottom == null) {
      merged.textPadBottom = DEFAULTS.textPadBottom;
    }
    if ((parsed.watercolorLayoutVersion || 0) < WATERCOLOR_LAYOUT_VERSION) {
      Object.assign(merged, WATERCOLOR_BG_PALETTE, WATERCOLOR_LAYOUT_PRESET);
      merged.watercolorLayoutVersion = WATERCOLOR_LAYOUT_VERSION;
    }
    if ((parsed.cardBgVersion || 0) < CARD_BG_VERSION) {
      Object.assign(merged, LETTER_REFERENCE_PRESET);
      merged.cardBgVersion = CARD_BG_VERSION;
    }
    if ((parsed.letterRestoreVersion || 0) < LETTER_RESTORE_VERSION) {
      Object.assign(merged, LETTER_REFERENCE_PRESET);
      merged.cardTheme = "letter";
      merged.letterRestoreVersion = LETTER_RESTORE_VERSION;
    }
    if ((parsed.meadowRestoreVersion || 0) < MEADOW_RESTORE_VERSION) {
      const keepSizing = {
        sizeGreeting: merged.sizeGreeting,
        sizeNews: merged.sizeNews,
        sizeInvite: merged.sizeInvite,
        sizeDate: merged.sizeDate,
        sizeInfo: merged.sizeInfo,
        sizeSignature: merged.sizeSignature,
        sizeFarewell: merged.sizeFarewell,
        offsetGreeting: merged.offsetGreeting,
        offsetNews: merged.offsetNews,
        offsetInvite: merged.offsetInvite,
        offsetDate: merged.offsetDate,
        offsetInfo: merged.offsetInfo,
        offsetSignature: merged.offsetSignature,
        offsetFarewell: merged.offsetFarewell,
        blockShiftX: merged.blockShiftX,
        blockShiftY: merged.blockShiftY,
        boldGreeting: merged.boldGreeting,
        boldNews: merged.boldNews,
        boldInvite: merged.boldInvite,
        boldDate: merged.boldDate,
        boldInfo: merged.boldInfo,
        boldSignature: merged.boldSignature,
        boldFarewell: merged.boldFarewell,
      };
      Object.assign(merged, MEADOW_REFERENCE_PRESET, keepSizing);
      merged.meadowRestoreVersion = MEADOW_RESTORE_VERSION;
    }
    if (parsed.textPadX == null) {
      merged.textPadX = 8;
    }
    migrateLegacyColors(parsed, merged);
    migrateLegacyTypography(parsed, merged);
    if (merged.colorCoupleIllustration == null) {
      merged.colorCoupleIllustration = merged.colorSignature || ROSE_ACCENT;
    }
    if (merged.ringsOffsetX == null) {
      merged.ringsOffsetX = 0;
    }
    if (merged.ringsOffsetY == null) {
      merged.ringsOffsetY = 0;
    }
    if (merged.ringsSize == null) {
      merged.ringsSize = RINGS_SIZE_DEFAULT;
    }
    if (merged.infoWidth == null) {
      merged.infoWidth =
        merged.cardTheme === "tatar" ? TATAR_INFO_WIDTH_DEFAULT : INFO_WIDTH_DEFAULT;
    }
    if (
      merged.cardTheme === "editorial" &&
      (parsed.editorialRestoreVersion || 0) < EDITORIAL_RESTORE_VERSION
    ) {
      Object.assign(merged, EDITORIAL_PALETTE);
      merged.editorialRestoreVersion = EDITORIAL_RESTORE_VERSION;
    }
    if (
      merged.cardTheme === "tulip" &&
      (parsed.tulipRestoreVersion || 0) < TULIP_RESTORE_VERSION
    ) {
      if ((parsed.tulipRestoreVersion || 0) < 2) {
        Object.assign(merged, TULIP_PALETTE, TULIP_LAYOUT_PRESET);
        merged.fontNews = TULIP_PRESET.fontNews;
        merged.fontSignature = TULIP_PRESET.fontSignature;
      }
      migrateTulipTextFields(merged, parsed);
      migrateTulipDateField(merged);
      merged.tulipRestoreVersion = TULIP_RESTORE_VERSION;
    }
    if (
      merged.cardTheme === "tatar" &&
      (parsed.tatarRestoreVersion || 0) < TATAR_RESTORE_VERSION
    ) {
      if ((parsed.tatarRestoreVersion || 0) < 2) {
        merged.fontGreeting = TATAR_PRESET.fontGreeting;
        merged.fontNews = TATAR_PRESET.fontNews;
        merged.fontFarewell = TATAR_PRESET.fontFarewell;
        merged.sizeGreeting = TATAR_PRESET.sizeGreeting;
        merged.sizeNews = TATAR_PRESET.sizeNews;
        merged.colorNews = TATAR_PRESET.colorNews;
      }
      if ((parsed.tatarRestoreVersion || 0) < 3) {
        merged.infoWidth = TATAR_INFO_WIDTH_DEFAULT;
      }
      merged.tatarRestoreVersion = TATAR_RESTORE_VERSION;
    }

    if (parsed.sizeBody != null && parsed.sizeBody1 == null && parsed.sizeNews == null) {
      merged.sizeNews = parsed.sizeBody;
      merged.sizeInfo = parsed.sizeBody;
    }
    if (parsed.signature && !parsed.signatureNames) {
      const legacy = String(parsed.signature).trim();
      const farewellIndex = legacy.search(/до\s+скорой\s+встречи/i);
      if (farewellIndex > 0) {
        merged.signatureNames = legacy.slice(0, farewellIndex).trim();
        merged.signatureFarewell = legacy.slice(farewellIndex).trim();
      } else {
        merged.signatureNames = legacy;
      }
    }
    if (merged.cardTheme === "friends" && hasFriendsSnapshot()) {
      try {
        const snap = JSON.parse(localStorage.getItem(FRIENDS_SNAPSHOT_KEY));
        Object.assign(merged, snap, { cardTheme: "friends" });
      } catch {
        /* keep merged */
      }
    }
    return merged;
  } catch {
    return { ...DEFAULTS };
  }
}

function writeForm(data) {
  els.greeting.value = data.greeting;
  els.body1.value = data.body1;
  els.body2.value = data.body2;
  if (els.botanicalHeadline) {
    els.botanicalHeadline.value = data.botanicalHeadline ?? TULIP_PRESET.botanicalHeadline;
  }
  if (els.botanicalDate) {
    els.botanicalDate.value = data.botanicalDate ?? TULIP_PRESET.botanicalDate;
  }
  els.body3.value = data.body3;
  els.signatureNames.value = data.signatureNames;
  els.signatureFarewell.value = data.signatureFarewell;
  els.colorGreeting.value = data.colorGreeting;
  els.colorNews.value = data.colorNews;
  els.colorDateDay.value = data.colorDateDay;
  els.colorDateMonth.value = data.colorDateMonth;
  els.colorDateYear.value = data.colorDateYear;
  els.colorInfo.value = data.colorInfo;
  els.colorSignature.value = data.colorSignature;
  els.colorFarewell.value = data.colorFarewell;
  if (els.colorCoupleIllustration) {
    els.colorCoupleIllustration.value = data.colorCoupleIllustration || ROSE_ACCENT;
  }
  if (els.colorFriendsFrame) {
    els.colorFriendsFrame.value = data.colorFriendsFrame || data.colorGreeting || FRIENDS_ROSE;
  }
  els.fontGreeting.value = data.fontGreeting;
  els.fontNews.value = data.fontNews;
  els.fontInvite.value = data.fontInvite;
  els.fontDate.value = data.fontDate;
  els.fontInfo.value = data.fontInfo;
  els.fontSignature.value = data.fontSignature;
  els.fontFarewell.value = data.fontFarewell;
  els.sizeGreeting.value = data.sizeGreeting;
  els.sizeNews.value = data.sizeNews;
  els.sizeInvite.value = data.sizeInvite;
  els.sizeDate.value = data.sizeDate;
  els.sizeInfo.value = data.sizeInfo;
  els.sizeSignature.value = data.sizeSignature;
  els.sizeFarewell.value = data.sizeFarewell;
  els.offsetGreeting.value = data.offsetGreeting;
  els.offsetNews.value = data.offsetNews;
  els.offsetInvite.value = data.offsetInvite;
  els.offsetDate.value = data.offsetDate;
  els.offsetInfo.value = data.offsetInfo;
  els.offsetSignature.value = data.offsetSignature;
  els.offsetFarewell.value = data.offsetFarewell;
  els.boldGreeting.checked = Boolean(data.boldGreeting);
  els.boldNews.checked = Boolean(data.boldNews);
  els.boldInvite.checked = Boolean(data.boldInvite);
  els.boldDate.checked = Boolean(data.boldDate);
  els.boldInfo.checked = Boolean(data.boldInfo);
  els.boldSignature.checked = Boolean(data.boldSignature);
  els.boldFarewell.checked = Boolean(data.boldFarewell);
  els.textLayout.value = data.textLayout;
  els.textPadTop.value = data.textPadTop;
  els.textPadBottom.value = data.textPadBottom;
  els.textPadX.value = data.textPadX;
  els.blockShiftX.value = data.blockShiftX;
  els.blockShiftY.value = data.blockShiftY;
  if (els.ringsOffsetX) {
    els.ringsOffsetX.value = data.ringsOffsetX ?? 0;
  }
  if (els.ringsOffsetY) {
    els.ringsOffsetY.value = data.ringsOffsetY ?? 0;
  }
  if (els.ringsSize) {
    els.ringsSize.value = data.ringsSize ?? RINGS_SIZE_DEFAULT;
  }
  if (els.infoWidth) {
    els.infoWidth.value = data.infoWidth ?? INFO_WIDTH_DEFAULT;
  }
}

function applyPreset(partial) {
  if (partial.cardTheme) {
    setCardBackgroundTheme(partial.cardTheme);
  }
  const { cardTheme: _theme, ...rest } = partial;
  writeForm({ ...readForm(), ...rest });
  applyToCard(readForm());
  save();
}

/** Полный возврат к эталону «письмо на лесу» (шрифты, размеры, цвета, сдвиги). */
function applyLetterReferencePreset() {
  const data = {
    ...LETTER_REFERENCE_PRESET,
    textContentVersion: TEXT_CONTENT_VERSION,
    letterRestoreVersion: LETTER_RESTORE_VERSION,
  };
  setCardBackgroundTheme("letter");
  writeForm(data);
  applyToCard(data);
  save();
}

/** Лужайка — фото на весь кадр, без бумаги, белый текст. */
function applyMeadowReferencePreset() {
  const data = {
    ...MEADOW_REFERENCE_PRESET,
    textContentVersion: TEXT_CONTENT_VERSION,
    meadowRestoreVersion: MEADOW_RESTORE_VERSION,
  };
  setCardBackgroundTheme("meadow");
  writeForm(data);
  applyToCard(data);
  save();
}

function applyEditorialPreset() {
  saveMeadowSnapshot();
  const data = {
    ...EDITORIAL_PRESET,
    textContentVersion: TEXT_CONTENT_VERSION,
    editorialRestoreVersion: EDITORIAL_RESTORE_VERSION,
  };
  setCardBackgroundTheme("editorial");
  writeForm(data);
  applyToCard(data);
  save();
}

function applyFolkPreset() {
  if (getActiveCardTheme() === "editorial") {
    saveEditorialSnapshot();
  }
  const data = {
    ...FOLK_PRESET,
    textContentVersion: TEXT_CONTENT_VERSION,
    folkRestoreVersion: FOLK_RESTORE_VERSION,
  };
  setCardBackgroundTheme("folk");
  writeForm(data);
  applyToCard(data);
  save();
}

function applyArchPreset() {
  if (getActiveCardTheme() === "editorial") {
    saveEditorialSnapshot();
  }
  const data = {
    ...ARCH_PRESET,
    textContentVersion: TEXT_CONTENT_VERSION,
    archRestoreVersion: ARCH_RESTORE_VERSION,
  };
  setCardBackgroundTheme("arch");
  writeForm(data);
  applyToCard(data);
  save();
}

function applyTatarPreset() {
  if (getActiveCardTheme() === "editorial") {
    saveEditorialSnapshot();
  }
  const data = {
    ...TATAR_PRESET,
    textContentVersion: TEXT_CONTENT_VERSION,
    tatarRestoreVersion: TATAR_RESTORE_VERSION,
  };
  setCardBackgroundTheme("tatar");
  writeForm(data);
  applyToCard(data);
  save();
}

function applyBlushPreset() {
  if (getActiveCardTheme() === "editorial") {
    saveEditorialSnapshot();
  }
  const data = {
    ...BLUSH_PRESET,
    textContentVersion: TEXT_CONTENT_VERSION,
    blushRestoreVersion: BLUSH_RESTORE_VERSION,
  };
  setCardBackgroundTheme("blush");
  writeForm(data);
  applyToCard(data);
  save();
}

/** Заводской эталон For friends — только при первом входе, без сохранённого снимка */
function applyFriendsFactoryPreset() {
  const data = {
    ...FRIENDS_PRESET,
    textContentVersion: TEXT_CONTENT_VERSION,
    friendsRestoreVersion: FRIENDS_RESTORE_VERSION,
  };
  setCardBackgroundTheme("friends");
  writeForm(data);
  applyToCard(data);
  save();
}

function applyTulipPreset() {
  if (getActiveCardTheme() === "editorial") {
    saveEditorialSnapshot();
  }
  const data = {
    ...TULIP_PRESET,
    textContentVersion: TEXT_CONTENT_VERSION,
    tulipRestoreVersion: TULIP_RESTORE_VERSION,
  };
  setCardBackgroundTheme("tulip");
  writeForm(data);
  applyToCard(data);
  save();
}

function resetDefaults() {
  applyMeadowReferencePreset();
}

function bind() {
  const inputs = [
    els.greeting,
    els.body1,
    els.body2,
    els.botanicalHeadline,
    els.botanicalDate,
    els.body3,
    els.signatureNames,
    els.signatureFarewell,
    els.colorGreeting,
    els.colorNews,
    els.colorDateDay,
    els.colorDateMonth,
    els.colorDateYear,
    els.colorInfo,
    els.colorSignature,
    els.colorFarewell,
    els.colorCoupleIllustration,
    els.colorFriendsFrame,
    els.fontGreeting,
    els.fontNews,
    els.fontInvite,
    els.fontDate,
    els.fontInfo,
    els.fontSignature,
    els.fontFarewell,
    els.sizeGreeting,
    els.sizeNews,
    els.sizeInvite,
    els.sizeDate,
    els.sizeInfo,
    els.sizeSignature,
    els.sizeFarewell,
    els.offsetGreeting,
    els.offsetNews,
    els.offsetInvite,
    els.offsetDate,
    els.offsetInfo,
    els.offsetSignature,
    els.offsetFarewell,
    els.boldGreeting,
    els.boldNews,
    els.boldInvite,
    els.boldDate,
    els.boldInfo,
    els.boldSignature,
    els.boldFarewell,
    els.textLayout,
    els.textPadTop,
    els.textPadBottom,
    els.textPadX,
    els.blockShiftX,
    els.blockShiftY,
    els.ringsOffsetX,
    els.ringsOffsetY,
    els.ringsSize,
    els.infoWidth,
  ];

  [els.fontGreeting, els.fontNews].forEach((el, index) => {
    if (!el) {
      return;
    }
    const source = index === 0 ? "greeting" : "news";
    el.addEventListener("change", () => {
      syncTatarFonts(source);
    });
  });

  inputs.forEach((el) => {
    if (!el) {
      return;
    }
    const eventName = el.type === "checkbox" || el.tagName === "SELECT" ? "change" : "input";
    el.addEventListener(eventName, () => {
      applyToCard(readForm());
      save();
    });
  });

  document.getElementById("btnReset").addEventListener("click", resetDefaults);
  document.getElementById("btnPrint").addEventListener("click", () => window.print());

  document.getElementById("btnPng").addEventListener("click", () => {
    exportInvitationPng();
  });

  document.getElementById("btnRhode").addEventListener("click", () => {
    applyPreset({ ...RHODE_PRESET });
  });

  document.getElementById("btnSaveMeadow")?.addEventListener("click", () => {
    if (saveMeadowSnapshot()) {
      return;
    }
    alert("Сначала переключитесь на макет «лужайка», затем сохраните снимок.");
  });

  document.getElementById("btnRestoreMeadow")?.addEventListener("click", () => {
    restoreMeadowSnapshot();
  });

  document.getElementById("btnEditorialRose")?.addEventListener("click", () => {
    applyEditorialPreset();
  });

  document.getElementById("btnTulip")?.addEventListener("click", () => {
    applyTulipPreset();
  });

  document.getElementById("btnArch")?.addEventListener("click", () => {
    applyArchPreset();
  });

  document.getElementById("btnTatar")?.addEventListener("click", () => {
    applyTatarPreset();
  });

  document.getElementById("btnFriends")?.addEventListener("click", () => {
    enterFriendsTheme();
  });

  document.getElementById("btnSaveFriends")?.addEventListener("click", () => {
    if (saveFriendsSnapshot()) {
      save();
      return;
    }
    alert("Сначала переключитесь на макет «For friends», затем сохраните снимок.");
  });

  document.getElementById("btnRestoreFriends")?.addEventListener("click", () => {
    restoreFriendsSnapshot();
  });

  document.getElementById("btnBlush")?.addEventListener("click", () => {
    applyBlushPreset();
  });

  document.getElementById("btnFolk")?.addEventListener("click", () => {
    applyFolkPreset();
  });

  document.getElementById("btnSaveEditorial")?.addEventListener("click", () => {
    if (saveEditorialSnapshot()) {
      return;
    }
    alert("Сначала переключитесь на «кремовую открытку», затем сохраните снимок.");
  });

  document.getElementById("btnRestoreEditorial")?.addEventListener("click", () => {
    restoreEditorialSnapshot();
  });

  document.getElementById("btnLetterPaper").addEventListener("click", () => {
    if (hasMeadowSnapshot()) {
      restoreMeadowSnapshot();
      return;
    }
    applyMeadowReferencePreset();
  });

  document.getElementById("btnLetterWithPaper")?.addEventListener("click", () => {
    applyLetterReferencePreset();
  });

  document.getElementById("btnForestColors").addEventListener("click", () => {
    applyPreset({ ...FOREST_CLASSIC_PRESET });
  });

  document.getElementById("btnOliveColors").addEventListener("click", () => {
    applyPreset({ ...OLIVE_BG_PALETTE });
  });

  document.getElementById("btnWatercolorColors").addEventListener("click", () => {
    applyPreset({
      cardTheme: "watercolor",
      ...WATERCOLOR_BG_PALETTE,
      ...WATERCOLOR_LAYOUT_PRESET,
    });
  });

  document.getElementById("btnRoadPhoto").addEventListener("click", () => {
    applyPreset({
      cardTheme: "road",
      ...ROAD_BG_PALETTE,
      ...ROAD_LAYOUT_PRESET,
    });
  });

  document.getElementById("btnHillsPhoto").addEventListener("click", () => {
    applyPreset({
      cardTheme: "hills",
      ...HILLS_BG_PALETTE,
      ...HILLS_LAYOUT_PRESET,
    });
  });

  document.getElementById("btnPinSunset").addEventListener("click", () => {
    applyPreset({
      colorGreeting: "#f5e6a8",
      colorNews: "#fff4d8",
      colorDateDay: "#fffef6",
      colorDateMonth: "#f5e6a8",
      colorDateYear: "#d4c490",
      colorInfo: "#ebe0c0",
      colorSignature: "#fff4d8",
      colorFarewell: "#d8c898",
      fontGreeting: "lora-italic",
      fontNews: "playfair-italic-600",
      fontInvite: "playfair-italic-600",
      fontDate: "playfair-italic-600",
      fontInfo: "libre-baskerville-italic",
      fontSignature: "cormorant-italic-500",
      fontFarewell: "lora-italic",
      sizeGreeting: 0.72,
      sizeNews: 2.2,
      sizeInvite: 0.9,
      sizeDate: 0.92,
      sizeInfo: 0.78,
      sizeSignature: 1.2,
      sizeFarewell: 0.7,
    });
  });

  document.getElementById("btnPinOlive").addEventListener("click", () => {
    applyPreset({
      ...OLIVE_BG_PALETTE,
      fontGreeting: "montserrat-light",
      fontNews: "bodoni-moda",
      fontInvite: "bodoni-moda",
      fontDate: "bodoni-moda",
      fontInfo: "montserrat-light",
      fontSignature: "pinyon-script",
      fontFarewell: "montserrat-light",
      sizeGreeting: 0.58,
      sizeNews: 2.15,
      sizeInvite: 0.88,
      sizeSignature: 1.45,
    });
  });

  document.getElementById("btnSiteTheme").addEventListener("click", () => {
    applyPreset({
      ...ORIGINAL_TEXT,
      textContentVersion: TEXT_CONTENT_VERSION,
      colorGreeting: "#ebf7b0",
      colorNews: "#fffef9",
      colorDateDay: "#ffffff",
      colorDateMonth: "#ebf7b0",
      colorDateYear: "#bdd05d",
      colorInfo: "#d4ddb8",
      colorSignature: "#fffef9",
      colorFarewell: "#c5d4a0",
      fontGreeting: "great-vibes",
      fontNews: "great-vibes",
      fontInvite: "playfair-regular",
      fontDate: "playfair-regular",
      fontInfo: "playfair-regular",
      fontSignature: "great-vibes",
      fontFarewell: "playfair-regular",
      sizeGreeting: 1.1,
      sizeNews: 2.1,
      sizeInvite: 0.88,
      sizeDate: 0.95,
      sizeInfo: 0.84,
      sizeSignature: 1.35,
      sizeFarewell: 0.8,
    });
  });

  document.getElementById("btnPin1").addEventListener("click", () => {
    applyPreset({
      ...FOREST_BG_PALETTE,
      colorNews: "#fff9c4",
      colorSignature: "#fff9c4",
      fontGreeting: "good-vibes",
      fontNews: "good-vibes",
      fontInvite: "min-sans",
      fontDate: "min-sans",
      fontInfo: "min-sans",
      fontSignature: "good-vibes",
      fontFarewell: "min-sans",
    });
  });

  document.getElementById("btnPin2").addEventListener("click", () => {
    applyPreset({
      colorGreeting: "#f7f3ea",
      colorNews: "#fffef9",
      colorDateDay: "#ffffff",
      colorDateMonth: "#fff9c4",
      colorDateYear: "#d8c878",
      colorInfo: "#e8e4de",
      colorSignature: "#fffef9",
      colorFarewell: "#d0c8b8",
      fontGreeting: "florisel-script",
      fontNews: "florisel-script",
      fontInvite: "nyght-serif",
      fontDate: "nyght-serif",
      fontInfo: "nyght-serif",
      fontSignature: "transforma",
      fontFarewell: "transforma",
    });
  });

  document.getElementById("btnPin3").addEventListener("click", () => {
    applyPreset({
      colorGreeting: "#e8e0c8",
      colorNews: "#fff9c4",
      colorDateDay: "#ffffff",
      colorDateMonth: "#fff9c4",
      colorDateYear: "#c8b878",
      colorInfo: "#d8d0b0",
      colorSignature: "#fff9c4",
      colorFarewell: "#b8b090",
      fontGreeting: "free-serif-italic",
      fontNews: "free-serif-italic",
      fontInvite: "free-serif-italic",
      fontDate: "ossem",
      fontInfo: "ossem",
      fontSignature: "ossem",
      fontFarewell: "ossem",
    });
  });
}

FONT_SELECT_IDS.forEach((id) => {
  fillFontSelect(document.getElementById(id));
});

let storedTextVersion = 0;
try {
  const rawStored = localStorage.getItem(STORAGE_KEY);
  if (rawStored) {
    storedTextVersion = JSON.parse(rawStored).textContentVersion || 0;
  }
} catch {
  storedTextVersion = 0;
}

const urlTheme = new URLSearchParams(window.location.search).get("theme");
const themePresets = {
  friends: enterFriendsTheme,
  blush: applyBlushPreset,
  tatar: applyTatarPreset,
  editorial: applyEditorialPreset,
  tulip: applyTulipPreset,
  arch: applyArchPreset,
  folk: applyFolkPreset,
};

if (urlTheme && themePresets[urlTheme]) {
  themePresets[urlTheme]();
} else {
  const initial = load();
  writeForm(initial);
  applyToCard(initial);
  if (getActiveCardTheme() === "meadow") {
    saveMeadowSnapshot();
  }
}
bind();
updateActiveThemeUI(getActiveCardTheme());
updateFriendsSnapshotUI();
if (storedTextVersion < TEXT_CONTENT_VERSION) {
  save();
}
