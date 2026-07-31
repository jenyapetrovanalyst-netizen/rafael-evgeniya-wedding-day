const FONT_CATALOG = {
  "instrument-serif": {
    family: "Instrument Serif",
    style: "normal",
    label: "Instrument Serif (образец сайта Wix Bohemian — заголовки)",
  },
  "helvetica-neue": {
    family: "Helvetica Neue",
    style: "normal",
    label: "Helvetica Neue (образец сайта Wix Bohemian — текст)",
  },
  "ibm-plex-sans": {
    family: "IBM Plex Sans",
    style: "normal",
    label: "IBM Plex Sans (образец сайта Wix Bohemian — виджеты)",
  },
  "pinyon-script": { family: "Pinyon Script", style: "normal", label: "Pinyon Script — каллиграфия" },
  parisienne: { family: "Parisienne", style: "normal", label: "Parisienne — каллиграфия" },
  "great-vibes": { family: "Great Vibes", style: "normal", label: "Great Vibes — каллиграфия" },
  allura: { family: "Allura", style: "normal", label: "Allura — скрипт" },
  "alex-brush": { family: "Alex Brush", style: "normal", label: "Alex Brush — скрипт" },
  "good-vibes": { family: "Good Vibes", style: "normal", label: "Good Vibes — скрипт (открытки)" },
  "florisel-script": {
    family: "Florisel script Thin",
    style: "normal",
    label: "Florisel script — открытки",
  },
  "playfair-italic": {
    family: "Playfair Display",
    style: "italic",
    label: "Playfair Display — serif, курсив",
  },
  "playfair-regular": {
    family: "Playfair Display",
    style: "normal",
    label: "Playfair Display — serif, прямой",
  },
  "playfair-italic-600": {
    family: "Playfair Display",
    style: "italic",
    weight: "600",
    label: "Playfair Display — курсив, крупный (открытки)",
  },
  "bodoni-italic": { family: "Bodoni Moda", style: "italic", label: "Bodoni Moda — serif, курсив" },
  "bodoni-regular": { family: "Bodoni Moda", style: "normal", label: "Bodoni Moda — serif, прямой" },
  "bodoni-moda": {
    family: "Bodoni Moda",
    style: "normal",
    weight: "500",
    label: "Bodoni Moda Medium — открытки",
  },
  "dm-serif-display": {
    family: "DM Serif Display",
    style: "normal",
    label: "DM Serif Display — открытки",
  },
  "nyght-serif": {
    family: "Nyght Serif",
    style: "normal",
    weight: "800",
    label: "Nyght Serif — открытки",
  },
  "free-serif-italic": {
    family: "Free Serif Italic",
    style: "italic",
    label: "Free Serif Italic — открытки",
  },
  "libre-italic": {
    family: "Libre Baskerville",
    style: "italic",
    label: "Libre Baskerville — serif, курсив",
  },
  "libre-regular": {
    family: "Libre Baskerville",
    style: "normal",
    label: "Libre Baskerville — serif, прямой",
  },
  "cormorant-italic": {
    family: "Cormorant Garamond",
    style: "italic",
    label: "Cormorant Garamond — serif, курсив",
  },
  "cormorant-regular": {
    family: "Cormorant Garamond",
    style: "normal",
    label: "Cormorant Garamond — serif, прямой",
  },
  "cormorant-italic-500": {
    family: "Cormorant Garamond",
    style: "italic",
    weight: "500",
    label: "Cormorant Garamond — курсив Medium (открытки)",
  },
  "eb-italic": { family: "EB Garamond", style: "italic", label: "EB Garamond — serif, курсив" },
  "eb-regular": { family: "EB Garamond", style: "normal", label: "EB Garamond — serif, прямой" },
  "lora-regular": { family: "Lora", style: "normal", label: "Lora — serif (открытки)" },
  "lora-italic": {
    family: "Lora",
    style: "italic",
    weight: "500",
    label: "Lora — курсив (открытки)",
  },
  forum: { family: "Forum", style: "normal", label: "Forum — декоративный serif" },
  "dm-sans": { family: "DM Sans", style: "normal", label: "Rhode / DM Sans — advertising" },
  rhode: { family: "DM Sans", style: "normal", label: "Rhode — advertising / editorial" },
  sora: { family: "Sora", style: "normal", label: "Sora — Rhode alt / открытки" },
  "min-sans": {
    family: "Min Sans",
    style: "normal",
    weight: "500",
    label: "Min Sans — открытки",
  },
  transforma: {
    family: "Transforma",
    style: "normal",
    weight: "500",
    label: "Transforma — открытки",
  },
  ossem: { family: "Ossem", style: "normal", weight: "700", label: "Ossem — открытки" },
  "jost-light": { family: "Jost", style: "normal", weight: "300", label: "Jost Light — открытки" },
  "jost-regular": { family: "Jost", style: "normal", weight: "400", label: "Jost — открытки" },
  "lato-regular": { family: "Lato", style: "normal", label: "Lato — sans, прямой" },
  "montserrat-light": {
    family: "Montserrat",
    style: "normal",
    weight: "300",
    label: "Montserrat Light — открытки",
  },
  "montserrat-regular": { family: "Montserrat", style: "normal", label: "Montserrat — sans, прямой" },
  "inter-regular": { family: "Inter", style: "normal", label: "Inter — sans, прямой" },
  "open-sans-regular": { family: "Open Sans", style: "normal", label: "Open Sans — sans, прямой" },
  manrope: { family: "Manrope", style: "normal", label: "Manrope — sans, прямой" },
  courier: { family: "Courier New", style: "normal", label: "Courier New — моноширинный" },
};

const FONT_HEADING_KEYS = [
  "pinyon-script",
  "parisienne",
  "great-vibes",
  "allura",
  "alex-brush",
  "good-vibes",
  "florisel-script",
  "playfair-italic",
  "playfair-italic-600",
  "playfair-regular",
  "bodoni-italic",
  "bodoni-regular",
  "bodoni-moda",
  "dm-serif-display",
  "nyght-serif",
  "free-serif-italic",
  "libre-italic",
  "libre-regular",
  "cormorant-italic",
  "cormorant-italic-500",
  "cormorant-regular",
  "eb-italic",
  "eb-regular",
  "lora-italic",
  "lora-regular",
  "forum",
  "rhode",
  "dm-sans",
  "sora",
  "min-sans",
  "transforma",
  "ossem",
  "jost-light",
  "jost-regular",
  "lato-regular",
  "montserrat-light",
  "montserrat-regular",
  "manrope",
  "courier",
];

const FONT_BODY_KEYS = [
  "dm-sans",
  "rhode",
  "sora",
  "inter-regular",
  "open-sans-regular",
  "lato-regular",
  "montserrat-light",
  "montserrat-regular",
  "manrope",
  "jost-light",
  "jost-regular",
  "min-sans",
  "transforma",
  "playfair-regular",
  "playfair-italic",
  "bodoni-regular",
  "libre-regular",
  "libre-italic",
  "eb-regular",
  "eb-italic",
  "cormorant-regular",
  "cormorant-italic",
  "lora-regular",
  "lora-italic",
  "great-vibes",
  "allura",
  "pinyon-script",
  "good-vibes",
  "courier",
];

const FONT_HEADING_OPTIONS = FONT_HEADING_KEYS;
const FONT_BODY_OPTIONS = FONT_BODY_KEYS;

const TEXT_ALIGN_OPTIONS = [
  { value: "left", label: "Слева" },
  { value: "center", label: "По центру" },
  { value: "right", label: "Справа" },
];

const FONT_EMPHASIS_OPTIONS = [
  { value: "regular", label: "Обычный", style: "normal", weight: "400" },
  { value: "italic", label: "Курсив", style: "italic", weight: "400" },
  { value: "bold", label: "Жирный", style: "normal", weight: "700" },
  { value: "bold-italic", label: "Жирный курсив", style: "italic", weight: "700" },
];

const DEFAULT_FONT_WEIGHT = "400";

function resolveBaseFontWeight(key, variant) {
  if (String(key).includes("light") || String(variant.weight || "") === "300") {
    return "300";
  }
  return DEFAULT_FONT_WEIGHT;
}

function emphasisFromStyleWeight(style, weight) {
  const normalizedStyle = style === "italic" ? "italic" : "normal";
  const numeric = Number.parseInt(String(weight || DEFAULT_FONT_WEIGHT), 10) || 400;
  if (normalizedStyle === "italic" && numeric >= 600) {
    return "bold-italic";
  }
  if (numeric >= 600) {
    return "bold";
  }
  if (normalizedStyle === "italic") {
    return "italic";
  }
  return "regular";
}

function getEmphasisOption(value) {
  return (
    FONT_EMPHASIS_OPTIONS.find((item) => item.value === value) || FONT_EMPHASIS_OPTIONS[0]
  );
}

function fontStyleCssVar(cssVar) {
  return `${cssVar}-style`;
}

function fontWeightCssVar(cssVar) {
  return `${cssVar}-weight`;
}

function resolveFontKey(value) {
  if (!value) {
    return "cormorant-regular";
  }
  const raw = String(value).replace(/["']/g, "").trim();
  if (FONT_CATALOG[raw]) {
    return raw;
  }
  const match = Object.entries(FONT_CATALOG).find(([, variant]) => variant.family === raw);
  return match ? match[0] : "cormorant-regular";
}

function getFontVariant(key) {
  return FONT_CATALOG[resolveFontKey(key)] || FONT_CATALOG["cormorant-regular"];
}

function applyFontThemeSetting(cssVar, key, styleHint, emphasisHint) {
  let variant;
  if (FONT_CATALOG[key]) {
    variant = FONT_CATALOG[key];
  } else {
    const family = String(key).replace(/["']/g, "").trim();
    const style = styleHint === "italic" ? "italic" : "normal";
    const match = Object.entries(FONT_CATALOG).find(
      ([, item]) => item.family === family && item.style === style
    );
    variant = match ? match[1] : { family: family || "Cormorant Garamond", style };
  }

  let style = "normal";
  let weight = resolveBaseFontWeight(key, variant);

  if (emphasisHint) {
    const emphasis = getEmphasisOption(emphasisHint);
    style = emphasis.style;
    weight = emphasis.weight;
    if (emphasis.value === "regular") {
      weight = resolveBaseFontWeight(key, variant);
    }
  } else if (variant.style === "italic" || styleHint === "italic") {
    /* Каталожный курсив (playfair-italic и т.п.) — только стиль, без жирности */
    style = "italic";
  }

  document.documentElement.style.setProperty(cssVar, `"${variant.family}"`);
  document.documentElement.style.setProperty(fontStyleCssVar(cssVar), style);
  document.documentElement.style.setProperty(fontWeightCssVar(cssVar), weight);
  return { ...variant, style, weight };
}

function normalizeTextAlign(value) {
  const align = String(value || "left").trim().toLowerCase();
  return TEXT_ALIGN_OPTIONS.some((item) => item.value === align) ? align : "left";
}

function alignUnderlineMargin(align) {
  if (align === "center") {
    return "auto";
  }
  if (align === "right") {
    return "auto 0";
  }
  return "0 auto";
}

function alignLineCssVar(cssVar) {
  return `${cssVar}-line`;
}

function applyAlignThemeSetting(cssVar, value) {
  const align = normalizeTextAlign(value);
  document.documentElement.style.setProperty(cssVar, align);
  document.documentElement.style.setProperty(alignLineCssVar(cssVar), alignUnderlineMargin(align));
  return align;
}

function findFontKeyFromTheme(cssVar) {
  const family = getComputedStyle(document.documentElement)
    .getPropertyValue(cssVar)
    .trim()
    .replace(/["']/g, "");
  const style =
    getComputedStyle(document.documentElement).getPropertyValue(fontStyleCssVar(cssVar)).trim() ||
    "normal";
  const weight =
    getComputedStyle(document.documentElement).getPropertyValue(fontWeightCssVar(cssVar)).trim() ||
    "400";
  const matchExact = Object.entries(FONT_CATALOG).find(
    ([, variant]) =>
      variant.family === family &&
      variant.style === style &&
      String(variant.weight || "400") === weight
  );
  if (matchExact) {
    return matchExact[0];
  }
  const match = Object.entries(FONT_CATALOG).find(
    ([, variant]) => variant.family === family && variant.style === style
  );
  if (match) {
    return match[0];
  }
  return resolveFontKey(family);
}

function previewFontOnControl(control, key) {
  const variant = getFontVariant(key);
  control.style.fontFamily = `"${variant.family}", serif`;
  control.style.fontStyle = variant.style;
  control.style.fontWeight = variant.weight || "400";
}

window.WeddingFontTheme = {
  FONT_CATALOG,
  FONT_HEADING_KEYS,
  FONT_BODY_KEYS,
  TEXT_ALIGN_OPTIONS,
  FONT_EMPHASIS_OPTIONS,
  fontStyleCssVar,
  fontWeightCssVar,
  alignLineCssVar,
  resolveFontKey,
  getFontVariant,
  applyFontThemeSetting,
  applyAlignThemeSetting,
  normalizeTextAlign,
  emphasisFromStyleWeight,
  getEmphasisOption,
  findFontKeyFromTheme,
  previewFontOnControl,
};

const designGlobalSettings = [
  {
    cssVar: "--linen",
    label: "Фон вокруг секций",
    type: "color",
    defaultValue: "#f9f6f0",
  },
  { cssVar: "--dusty-rose", label: "Кнопки — фон", type: "color", defaultValue: "#d6beb7" },
  { cssVar: "--button-text", label: "Кнопки — текст", type: "color", defaultValue: "#ffffff" },
  { cssVar: "--timer-bg", label: "Таймер — фон", type: "color", defaultValue: "#f5efe6" },
  { cssVar: "--timer-border", label: "Таймер — граница", type: "color", defaultValue: "#b59a7c" },
  { cssVar: "--timer-text", label: "Таймер — текст", type: "color", defaultValue: "#3c4a33" },
  {
    cssVar: "--timer-glass-opacity",
    label: "Таймер — прозрачность",
    type: "opacity-percent",
    defaultValue: "42",
    min: "8",
    max: "80",
    step: "1",
  },
  { cssVar: "--brass", label: "Акцент (линии)", type: "color", defaultValue: "#b59a7c" },
];

const designContentBandSettings = [
  {
    cssVar: "--content-band-bg",
    label: "Цвет фона",
    type: "color",
    defaultValue: "#3a5f28",
  },
  {
    cssVar: "--content-band-ink",
    label: "Цвет текста на этом фоне",
    type: "color",
    defaultValue: "#ebf7b0",
  },
  {
    cssVar: "--section-block-gap",
    label: "Расстояние между блоками",
    type: "size-rem",
    control: "range",
    defaultValue: "4.5",
    min: "1.5",
    max: "8",
    step: "0.25",
  },
];

const designBlockBlueprints = [
  {
    key: "hero",
    title: "Главная страница: Рафаэль и Евгения",
    copyFields: [
      { id: "heroTitleTextInput", label: "Текст надписи" },
      { id: "heroDateTextInput", label: "Текст даты" },
    ],
    settings: [
      { suffix: "bg", label: "Фон блока", type: "color", defaultValue: "#8b9e85" },
      { suffix: "color-kicker", label: "Надпись «Наша свадьба»", type: "color", defaultValue: "#e8efe3" },
      { suffix: "color-heading", label: "Имена", type: "color", defaultValue: "#f7f9f4" },
      { suffix: "color-lead", label: "Дата", type: "color", defaultValue: "#e2eadc" },
      { suffix: "font-kicker", label: "Шрифт — надпись", type: "font-heading", defaultValue: "cormorant-regular" },
      { suffix: "font-heading", label: "Шрифт — имена", type: "font-heading", defaultValue: "cormorant-italic" },
      { suffix: "font-lead", label: "Шрифт — дата и таймер", type: "font-body", defaultValue: "open-sans-regular" },
      { suffix: "size-kicker", label: "Размер — надпись", type: "size-rem", defaultValue: "1.6", min: "1", max: "2.4" },
      { suffix: "size-heading", label: "Размер — имена", type: "size-rem", defaultValue: "4.5", min: "2.2", max: "5.2" },
      { suffix: "size-lead", label: "Размер — дата", type: "size-rem", defaultValue: "1.1", min: "0.9", max: "1.6" },
      { cssVar: "--hero-text-shadow", label: "Тень текста", type: "shadow", defaultValue: "0px 0px 18px rgba(24, 32, 20, 0.5)" },
    ],
  },
  {
    key: "invite",
    title: "Обращение к гостям",
    copyFields: [
      { id: "inviteKickerTextInput", label: "Заголовок блока" },
      { id: "inviteBodyTextInput", label: "Текст приглашения", multiline: true },
    ],
    settings: [
      { suffix: "bg", label: "Фон блока", type: "color", defaultValue: "#f9f6f0" },
      { suffix: "color-title", label: "Название блока (заголовок)", type: "color", defaultValue: "#6b705c" },
      { suffix: "color-body", label: "Текст приглашения", type: "color", defaultValue: "#3c4a33" },
      { suffix: "align-title", label: "Выравнивание заголовка", type: "align", defaultValue: "left" },
      { suffix: "align-body", label: "Выравнивание текста", type: "align", defaultValue: "left" },
      { suffix: "font-title", label: "Шрифт — заголовок", type: "font-heading", defaultValue: "playfair-regular" },
      { suffix: "font-body", label: "Шрифт — текст", type: "font-body", defaultValue: "open-sans-regular" },
      { suffix: "size-title", label: "Размер — заголовок", type: "size-rem", defaultValue: "2", min: "1.6", max: "3.2" },
      { suffix: "size-body", label: "Размер — текст", type: "size-rem", defaultValue: "1.06", min: "0.9", max: "1.4" },
    ],
  },
  {
    key: "details",
    title: "Локация события",
    settings: [
      { suffix: "bg", label: "Фон блока", type: "color", defaultValue: "#ffffff" },
      { suffix: "color-title", label: "Название блока (h2)", type: "color", defaultValue: "#3c4a33" },
      { suffix: "color-lead", label: "Подзаголовок (h3)", type: "color", defaultValue: "#6b705c" },
      { suffix: "color-body", label: "Текст в блоке", type: "color", defaultValue: "#3c4a33" },
      { suffix: "align-title", label: "Выравнивание заголовка", type: "align", defaultValue: "left" },
      { suffix: "align-body", label: "Выравнивание текста", type: "align", defaultValue: "left" },
      { suffix: "font-title", label: "Шрифт — название блока", type: "font-heading", defaultValue: "playfair-regular" },
      { suffix: "font-lead", label: "Шрифт — подзаголовок", type: "font-heading", defaultValue: "playfair-regular" },
      { suffix: "font-body", label: "Шрифт — текст", type: "font-body", defaultValue: "open-sans-regular" },
      { suffix: "size-title", label: "Размер — название блока", type: "size-rem", defaultValue: "2", min: "1.6", max: "3.2" },
      { suffix: "size-lead", label: "Размер — подзаголовок", type: "size-rem", defaultValue: "1.35", min: "1", max: "2" },
      { suffix: "size-body", label: "Размер — текст", type: "size-rem", defaultValue: "1.06", min: "0.9", max: "1.3" },
      {
        cssVar: "--details-venue-sketch-color",
        label: "Схема площадки — цвет штриха",
        type: "color",
        defaultValue: "#a8b5a0",
      },
      {
        cssVar: "--details-venue-sketch-opacity",
        label: "Схема площадки — заметность",
        type: "opacity-percent",
        defaultValue: "38",
        min: "8",
        max: "90",
        step: "1",
      },
    ],
  },
  {
    key: "timeline",
    title: "Программа дня",
    settings: [
      { suffix: "bg", label: "Фон блока", type: "color", defaultValue: "#8b9e85" },
      { suffix: "color-title", label: "Название блока (h2)", type: "color", defaultValue: "#f7f9f4" },
      { suffix: "color-lead", label: "Время", type: "color", defaultValue: "#e8efe3" },
      { suffix: "color-body", label: "Описание события", type: "color", defaultValue: "#f0f4ec" },
      { suffix: "align-title", label: "Выравнивание заголовка", type: "align", defaultValue: "left" },
      { suffix: "align-body", label: "Выравнивание текста", type: "align", defaultValue: "left" },
      {
        cssVar: "--timeline-dot-color",
        label: "Точки у времени",
        type: "color",
        defaultValue: "#f4f8ef",
      },
      {
        cssVar: "--timeline-line-color",
        label: "Линия между точками",
        type: "color",
        defaultValue: "#f3f7ec",
      },
      { suffix: "font-title", label: "Шрифт — название блока", type: "font-heading", defaultValue: "playfair-regular" },
      { suffix: "font-lead", label: "Шрифт — время", type: "font-body", defaultValue: "open-sans-regular" },
      { suffix: "font-body", label: "Шрифт — описание", type: "font-body", defaultValue: "open-sans-regular" },
      { suffix: "size-title", label: "Размер — название блока", type: "size-rem", defaultValue: "2", min: "1.6", max: "3.2" },
      { suffix: "size-lead", label: "Размер — время", type: "size-rem", defaultValue: "1", min: "0.85", max: "1.2" },
      { suffix: "size-body", label: "Размер — описание", type: "size-rem", defaultValue: "1.06", min: "0.9", max: "1.3" },
    ],
  },
  {
    key: "dresscode",
    title: "Дресс-код",
    settings: [
      { suffix: "bg", label: "Фон блока", type: "color", defaultValue: "#f9f6f0" },
      { suffix: "color-title", label: "Название блока (h2)", type: "color", defaultValue: "#3c4a33" },
      { suffix: "color-body", label: "Текст в блоке", type: "color", defaultValue: "#3c4a33" },
      { suffix: "align-title", label: "Выравнивание заголовка", type: "align", defaultValue: "left" },
      { suffix: "align-body", label: "Выравнивание текста", type: "align", defaultValue: "left" },
      { suffix: "font-title", label: "Шрифт — название блока", type: "font-heading", defaultValue: "playfair-regular" },
      { suffix: "font-body", label: "Шрифт — текст", type: "font-body", defaultValue: "open-sans-regular" },
      { suffix: "size-title", label: "Размер — название блока", type: "size-rem", defaultValue: "2", min: "1.6", max: "3.2" },
      { suffix: "size-body", label: "Размер — текст", type: "size-rem", defaultValue: "1.06", min: "0.9", max: "1.3" },
      {
        cssVar: "--dresscode-couple-opacity",
        label: "Схема пары — заметность",
        type: "opacity-percent",
        defaultValue: "42",
        min: "10",
        max: "85",
        step: "1",
      },
    ],
  },
  {
    key: "organization",
    title: "Организационные моменты",
    settings: [
      { suffix: "bg", label: "Фон блока", type: "color", defaultValue: "#ffffff" },
      { suffix: "color-title", label: "Название блока (h2)", type: "color", defaultValue: "#3c4a33" },
      { suffix: "color-body", label: "Текст в блоке", type: "color", defaultValue: "#3c4a33" },
      { suffix: "align-title", label: "Выравнивание заголовка", type: "align", defaultValue: "left" },
      { suffix: "align-body", label: "Выравнивание текста", type: "align", defaultValue: "left" },
      { suffix: "font-title", label: "Шрифт — название блока", type: "font-heading", defaultValue: "playfair-regular" },
      { suffix: "font-body", label: "Шрифт — текст", type: "font-body", defaultValue: "open-sans-regular" },
      { suffix: "size-title", label: "Размер — название блока", type: "size-rem", defaultValue: "2", min: "1.6", max: "3.2" },
      { suffix: "size-body", label: "Размер — текст", type: "size-rem", defaultValue: "1.06", min: "0.9", max: "1.3" },
    ],
  },
  {
    key: "rsvp",
    title: "Анкета гостя",
    copyFields: [
      { id: "rsvpTitleTextInput", label: "Заголовок блока" },
      { id: "rsvpIntroTextInput", label: "Описание под заголовком" },
    ],
    settings: [
      { suffix: "bg", label: "Фон блока", type: "color", defaultValue: "#f9f6f0" },
      { suffix: "color-title", label: "Заголовок блока (h2)", type: "color", defaultValue: "#3c4a33" },
      { suffix: "color-body", label: "Текст и поля формы", type: "color", defaultValue: "#3c4a33" },
      { suffix: "align-title", label: "Выравнивание заголовка", type: "align", defaultValue: "left" },
      { suffix: "align-body", label: "Выравнивание текста", type: "align", defaultValue: "left" },
      { suffix: "font-title", label: "Шрифт — заголовок", type: "font-heading", defaultValue: "playfair-regular" },
      { suffix: "font-body", label: "Шрифт — текст", type: "font-body", defaultValue: "open-sans-regular" },
      { suffix: "size-title", label: "Размер — заголовок", type: "size-rem", defaultValue: "2", min: "1.6", max: "3.2" },
      { suffix: "size-body", label: "Размер — текст", type: "size-rem", defaultValue: "1.06", min: "0.9", max: "1.3" },
      {
        cssVar: "--rsvp-field-opacity",
        label: "Поля ввода — сила градиентной заливки",
        type: "opacity-percent",
        defaultValue: "40",
        min: "12",
        max: "100",
        step: "1",
      },
    ],
  },
  {
    key: "final",
    title: "Финальный блок",
    settings: [
      { suffix: "bg", label: "Фон блока", type: "color", defaultValue: "#f9f6f0" },
      { suffix: "color-heading", label: "Основной текст", type: "color", defaultValue: "#3c4a33" },
      { suffix: "align-heading", label: "Выравнивание текста", type: "align", defaultValue: "left" },
      { suffix: "font-heading", label: "Шрифт — основной текст", type: "font-heading", defaultValue: "cormorant-italic" },
      { suffix: "size-heading", label: "Размер — основной текст", type: "size-rem", defaultValue: "1.15", min: "0.95", max: "1.6" },
    ],
  },
];

function blockVar(key, suffix) {
  return `--${key}-${suffix}`;
}

function expandBlockSettings(block) {
  const expanded = [];
  block.settings.forEach((setting) => {
    const cssVar = setting.cssVar || blockVar(block.key, setting.suffix);
    if (setting.type === "font-heading" || setting.type === "font-body") {
      const defaultKey = resolveFontKey(setting.defaultValue);
      const variant = getFontVariant(defaultKey);
      const defaultEmphasis = emphasisFromStyleWeight(
        variant.style,
        resolveBaseFontWeight(defaultKey, variant)
      );
      expanded.push({
        ...setting,
        cssVar,
        blockKey: block.key,
        defaultValue: defaultKey,
      });
      expanded.push({
        suffix: `${setting.suffix}-emphasis`,
        cssVar: `${cssVar}-emphasis`,
        type: "font-emphasis",
        fontCssVar: cssVar,
        blockKey: block.key,
        defaultValue: defaultEmphasis,
        label: `Начертание — ${setting.label.replace(/^Шрифт — /, "")}`,
      });
      expanded.push({
        suffix: `${setting.suffix}-style`,
        cssVar: fontStyleCssVar(cssVar),
        type: "font-style-auto",
        blockKey: block.key,
        defaultValue: getEmphasisOption(defaultEmphasis).style,
        hidden: true,
      });
      expanded.push({
        suffix: `${setting.suffix}-weight`,
        cssVar: fontWeightCssVar(cssVar),
        type: "font-weight-auto",
        blockKey: block.key,
        defaultValue: getEmphasisOption(defaultEmphasis).weight,
        hidden: true,
      });
      return;
    }
    expanded.push({
      ...setting,
      cssVar,
      blockKey: block.key,
      defaultValue:
        setting.type === "size-rem" ? `${setting.defaultValue}rem` : setting.defaultValue,
    });
  });
  return expanded;
}

function getAllDesignThemeSettings() {
  const all = designGlobalSettings.map((item) => ({ ...item, scope: "global" }));
  designContentBandSettings.forEach((item) => all.push({ ...item, scope: "content-band" }));
  designBlockBlueprints.forEach((block) => {
    expandBlockSettings(block).forEach((item) => all.push({ ...item, scope: "block" }));
  });
  return all;
}

const LEGACY_THEME_MAP = {
  "--section-bg-hero": "--hero-bg",
  "--section-bg-invite": "--invite-bg",
  "--section-bg-details": "--details-bg",
  "--section-bg-dresscode": "--dresscode-bg",
  "--section-bg-timeline": "--timeline-bg",
  "--section-bg-organization": "--organization-bg",
  "--section-bg-rsvp": "--rsvp-bg",
  "--section-bg-final": "--final-bg",
  "--section-heading-color": "--details-color-title",
  "--section-heading-size": "--details-size-title",
  "--invite-kicker-size": "--invite-size-title",
  "--invite-size-lead": "--invite-size-title",
  "--invite-color-lead": "--invite-color-title",
  "--invite-font-lead": "--invite-font-title",
  "--invite-color-kicker": "--invite-color-title",
  "--hero-title-size": "--hero-size-heading",
  "--font-heading": "--details-font-title",
  "--font-body": "--details-font-body",
  "--body-text-size": "--details-size-body",
  "--olive": "--details-color-body",
  "--olive-muted": "--invite-color-title",
};

function cssVarToInputId(cssVar) {
  return cssVar.replace(/^--/, "").replace(/-/g, "_");
}

function createFontSelect(id, keys, selectedKey) {
  const select = document.createElement("select");
  select.id = id;
  select.className = "theme-font-select";
  keys.forEach((key) => {
    const variant = getFontVariant(key);
    const option = document.createElement("option");
    option.value = key;
    option.textContent = variant.label;
    option.style.fontFamily = `"${variant.family}", serif`;
    option.style.fontStyle = variant.style;
    select.appendChild(option);
  });
  const resolvedKey = resolveFontKey(selectedKey);
  select.value = resolvedKey;
  previewFontOnControl(select, resolvedKey);
  select.addEventListener("change", () => {
    previewFontOnControl(select, select.value);
  });
  return select;
}

function createColorInput(setting) {
  const input = document.createElement("input");
  input.type = "color";
  input.id = cssVarToInputId(setting.cssVar);
  input.dataset.cssVar = setting.cssVar;
  input.dataset.settingType = "color";
  input.value = toColorHex(setting.defaultValue);
  return input;
}

function createSettingControl(setting) {
  if (setting.type === "font-style-auto" || setting.type === "font-weight-auto") {
    return null;
  }

  const label = document.createElement("label");
  label.textContent = setting.label;
  const inputId = cssVarToInputId(setting.cssVar);

  if (setting.type === "color") {
    label.appendChild(createColorInput(setting));
  } else if (setting.type === "font-heading") {
    const input = createFontSelect(inputId, FONT_HEADING_OPTIONS, setting.defaultValue);
    input.dataset.cssVar = setting.cssVar;
    input.dataset.settingType = "font";
    label.appendChild(input);
  } else if (setting.type === "font-body") {
    const input = createFontSelect(inputId, FONT_BODY_OPTIONS, setting.defaultValue);
    input.dataset.cssVar = setting.cssVar;
    input.dataset.settingType = "font";
    label.appendChild(input);
  } else if (setting.type === "font-emphasis") {
    const select = document.createElement("select");
    select.id = inputId;
    select.className = "theme-emphasis-select";
    FONT_EMPHASIS_OPTIONS.forEach((optionData) => {
      const option = document.createElement("option");
      option.value = optionData.value;
      option.textContent = optionData.label;
      select.appendChild(option);
    });
    select.value = setting.defaultValue || "regular";
    select.dataset.cssVar = setting.fontCssVar || setting.cssVar.replace(/-emphasis$/, "");
    select.dataset.settingType = "font-emphasis";
    label.appendChild(select);
  } else if (setting.type === "align") {
    const select = document.createElement("select");
    select.id = inputId;
    select.className = "theme-align-select";
    TEXT_ALIGN_OPTIONS.forEach((optionData) => {
      const option = document.createElement("option");
      option.value = optionData.value;
      option.textContent = optionData.label;
      select.appendChild(option);
    });
    select.value = normalizeTextAlign(setting.defaultValue);
    select.dataset.cssVar = setting.cssVar;
    select.dataset.settingType = "align";
    label.appendChild(select);
  } else if (setting.type === "size-rem") {
    const input = document.createElement("input");
    input.type = setting.control === "range" ? "range" : "number";
    input.className = setting.control === "range" ? "theme-spacing-range" : "theme-size-input";
    input.id = inputId;
    input.min = setting.min || "0.9";
    input.max = setting.max || "5.2";
    input.step = setting.step || "0.05";
    input.value = String(Number.parseFloat(setting.defaultValue) || 1);
    if (setting.control !== "range") {
      input.inputMode = "decimal";
    }
    input.dataset.cssVar = setting.cssVar;
    input.dataset.settingType = "size-rem";
    label.appendChild(input);
    if (setting.control === "range") {
      const valueHint = document.createElement("span");
      valueHint.className = "theme-range-value";
      valueHint.textContent = `${Number.parseFloat(setting.defaultValue) || 1} rem`;
      input.addEventListener("input", () => {
        valueHint.textContent = `${input.value} rem`;
      });
      label.appendChild(valueHint);
    }
  } else if (setting.type === "opacity-percent") {
    const input = document.createElement("input");
    input.type = "number";
    input.className = "theme-size-input";
    input.id = inputId;
    input.min = setting.min || "0";
    input.max = setting.max || "100";
    input.step = setting.step || "1";
    input.value = String(Number.parseInt(setting.defaultValue, 10) || 42);
    input.inputMode = "numeric";
    input.dataset.cssVar = setting.cssVar;
    input.dataset.settingType = "opacity-percent";
    label.appendChild(input);
  } else if (setting.type === "shadow") {
    const input = document.createElement("input");
    input.type = "range";
    input.id = inputId;
    input.min = "0";
    input.max = "30";
    input.step = "1";
    input.value = String(shadowToPx(setting.defaultValue));
    input.dataset.cssVar = setting.cssVar;
    input.dataset.settingType = "shadow";
    label.appendChild(input);
  }

  return label;
}

function toColorHex(value) {
  if (!value || !value.startsWith("#")) {
    return "#3c4a33";
  }
  return value.length === 7 ? value : "#3c4a33";
}

function shadowToPx(value) {
  const match = String(value).match(/0px 0px (\d+)px/);
  return match ? Number.parseInt(match[1], 10) : 0;
}

function createThemeTransferSection() {
  const transferSection = document.createElement("section");
  transferSection.className = "theme-block theme-transfer-block";
  transferSection.innerHTML =
    '<h3 class="theme-block-title">Перенос на другой телефон / браузер</h3>';

  const transferHint = document.createElement("p");
  transferHint.className = "theme-transfer-hint";
  transferHint.textContent =
    "Скачайте файл на компьютере, затем на iPhone откройте сайт и загрузите тот же файл — цвета и шрифты совпадут.";
  transferSection.appendChild(transferHint);

  const transferActions = document.createElement("div");
  transferActions.className = "theme-transfer-actions";

  const exportBtn = document.createElement("button");
  exportBtn.type = "button";
  exportBtn.className = "btn btn-outline";
  exportBtn.id = "themeExportBtn";
  exportBtn.textContent = "Скачать настройки (текст + тема)";
  transferActions.appendChild(exportBtn);

  const importLabel = document.createElement("label");
  importLabel.className = "theme-import-label btn btn-outline";
  importLabel.setAttribute("for", "themeImportInput");
  importLabel.textContent = "Загрузить настройки";

  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.id = "themeImportInput";
  importInput.accept = "application/json,.json";
  importInput.hidden = true;

  transferActions.append(importLabel, importInput);

  const mobileLockBtn = document.createElement("button");
  mobileLockBtn.type = "button";
  mobileLockBtn.className = "btn btn-outline";
  mobileLockBtn.id = "themeMobileLockBtn";
  mobileLockBtn.textContent = "Зафиксировать текст + размеры + тему";
  transferActions.appendChild(mobileLockBtn);

  transferSection.appendChild(transferActions);

  const mobileLockHint = document.createElement("p");
  mobileLockHint.className = "theme-transfer-hint theme-mobile-lock-hint";
  mobileLockHint.textContent =
    "Важно: фиксирует то, что вы настроили ВЕРХНЕЙ панелью текста (шрифт, размер, цвет) и пунктирными рамками блоков — плюс цвета из этой боковой панели. Скачайте JSON и замените им mobile-theme-lock.json в проекте (или отправьте в Cursor).";
  transferSection.appendChild(mobileLockHint);

  const transferStatus = document.createElement("p");
  transferStatus.className = "theme-transfer-status";
  transferStatus.id = "themeTransferStatus";
  transferStatus.setAttribute("aria-live", "polite");
  transferSection.appendChild(transferStatus);

  return transferSection;
}

function buildDesignPanelMarkup() {
  const body = document.getElementById("themePanelBody");
  if (!body) {
    return;
  }

  body.innerHTML = "";
  body.appendChild(
    Object.assign(document.createElement("p"), {
      className: "theme-panel-title",
      textContent: "Редактирование",
    })
  );

  const editHint = document.createElement("p");
  editHint.className = "theme-transfer-hint";
  editHint.textContent =
    "Откройте панель и правьте текст на странице. Углом блока можно растянуть его вширь и вниз — текст подстроится. Ниже — цвета, фон и прозрачность полей анкеты.";
  body.appendChild(editHint);

  body.appendChild(createThemeTransferSection());

  const globalSection = document.createElement("section");
  globalSection.className = "theme-block";
  globalSection.innerHTML = '<h3 class="theme-block-title">Общие элементы</h3>';
  const globalGrid = document.createElement("div");
  globalGrid.className = "theme-block-grid";
  designGlobalSettings.forEach((setting) => globalGrid.appendChild(createSettingControl(setting)));
  globalSection.appendChild(globalGrid);
  body.appendChild(globalSection);

  const contentBandSection = document.createElement("section");
  contentBandSection.className = "theme-block";
  contentBandSection.innerHTML =
    '<h3 class="theme-block-title">После главной страницы</h3>';
  const contentBandHint = document.createElement("p");
  contentBandHint.className = "theme-transfer-hint";
  contentBandHint.textContent =
    "Фон разделов ниже hero и расстояние между блоками (обращение, локация, программа и т.д.).";
  contentBandSection.appendChild(contentBandHint);
  const contentBandGrid = document.createElement("div");
  contentBandGrid.className = "theme-block-grid";
  designContentBandSettings.forEach((setting) =>
    contentBandGrid.appendChild(createSettingControl(setting))
  );
  contentBandSection.appendChild(contentBandGrid);
  body.appendChild(contentBandSection);

  const skipTypes = new Set([
    "font-heading",
    "font-body",
    "font-emphasis",
    "font-style-auto",
    "font-weight-auto",
    "align",
    "size-rem",
  ]);

  designBlockBlueprints.forEach((block) => {
    const section = document.createElement("section");
    section.className = "theme-block";
    section.dataset.blockKey = block.key;

    const title = document.createElement("h3");
    title.className = "theme-block-title";
    title.textContent = `${block.title} — цвет`;
    section.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "theme-block-grid";

    expandBlockSettings(block).forEach((setting) => {
      if (skipTypes.has(setting.type)) {
        return;
      }
      const control = createSettingControl(setting);
      if (control) {
        grid.appendChild(control);
      }
    });

    if (!grid.children.length) {
      return;
    }
    section.appendChild(grid);
    body.appendChild(section);
  });

  const actions = document.createElement("div");
  actions.className = "theme-panel-actions";
  const resetBtn = document.createElement("button");
  resetBtn.type = "button";
  resetBtn.className = "btn btn-outline";
  resetBtn.id = "themeResetBtn";
  resetBtn.textContent = "Сбросить все настройки";
  actions.appendChild(resetBtn);
  body.appendChild(actions);
}
