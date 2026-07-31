(function applyLayoutEarly() {
  try {
    const layout = new URLSearchParams(location.search).get("layout");
    /* Пробный режим: одноколоночный контент + общий фон. Вернуть классику: ?layout=classic */
    if (layout !== "classic") {
      document.documentElement.classList.add("layout-unified");
    }
  } catch {
    /* ignore */
  }
})();

(function applyStoredThemeEarly() {
  const THEME_STORAGE_KEY = "wedding-theme-vars";
  const MOBILE_LOCK_STORAGE_KEY = "wedding-mobile-theme-lock";
  const SITE_LOCK_FILE = "mobile-theme-lock.json?v=18";

  const legacyMap = {
    "--section-bg-invite": "--invite-bg",
    "--section-bg-details": "--details-bg",
    "--section-bg-dresscode": "--dresscode-bg",
    "--section-bg-timeline": "--timeline-bg",
    "--section-bg-organization": "--organization-bg",
    "--section-bg-rsvp": "--rsvp-bg",
    "--section-bg-final": "--final-bg",
    "--section-bg-hero": "--hero-bg",
  };

  function isSizeThemeVar(cssVar) {
    return cssVar.includes("-size-");
  }

  function isFontFamilyVar(cssVar) {
    return /--[\w-]+-font-(title|body|heading|kicker|lead|timer)$/.test(cssVar);
  }

  /** Ключи каталога → CSS font-family (для early-apply до design-theme.js) */
  const FONT_KEY_FAMILY = {
    "cormorant-regular": "Cormorant Garamond",
    "cormorant-italic": "Cormorant Garamond",
    "inter-regular": "Inter",
    "great-vibes": "Great Vibes",
    "eb-regular": "EB Garamond",
    "eb-italic": "EB Garamond",
    "playfair-regular": "Playfair Display",
    "playfair-italic": "Playfair Display",
    "open-sans-regular": "Open Sans",
  };

  function resolveFontFamilyValue(value) {
    const raw = String(value || "").replace(/["']/g, "").trim();
    if (!raw) {
      return raw;
    }
    if (FONT_KEY_FAMILY[raw]) {
      return FONT_KEY_FAMILY[raw];
    }
    return raw;
  }

  function isAlignVar(cssVar) {
    return /--[\w-]+-align-(title|body|heading)$/.test(cssVar);
  }

  function normalizeTextAlign(value) {
    const align = String(value || "left").trim().toLowerCase();
    return align === "center" || align === "right" ? align : "left";
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

  function normalizeThemeVarValue(cssVar, value) {
    if (!value) {
      return value;
    }
    const raw = String(value).trim();
    if (cssVar.endsWith("-style")) {
      return raw === "italic" ? "italic" : "normal";
    }
    if (isAlignVar(cssVar)) {
      return normalizeTextAlign(raw);
    }
    if (isFontFamilyVar(cssVar)) {
      return raw;
    }
    if (isSizeThemeVar(cssVar)) {
      // Явный px из lock/редактора — не трогаем (иначе 42px → 42rem ломает вёрстку)
      if (/px$/i.test(raw)) {
        return raw;
      }
      const numeric = Number.parseFloat(raw);
      if (Number.isNaN(numeric)) {
        return raw;
      }
      // Ошибочный экспорт «42rem/21rem» для заголовков секций → px
      if (
        /rem$/i.test(raw) &&
        numeric >= 14 &&
        !cssVar.startsWith("--hero-size-") &&
        cssVar !== "--section-block-gap"
      ) {
        const whole = Number.isInteger(numeric) ? String(numeric) : numeric.toFixed(2);
        return `${whole}px`;
      }
      if (/rem$/i.test(raw)) {
        return raw;
      }
      const decimals = String(numeric).includes(".") ? 2 : 0;
      return `${numeric.toFixed(decimals)}rem`;
    }
    return raw;
  }

  function applyThemeLayer(theme) {
    if (!theme || typeof theme !== "object") {
      return;
    }

    Object.entries(legacyMap).forEach(([legacy, modern]) => {
      if (theme[legacy] && !theme[modern]) {
        theme[modern] = theme[legacy];
      }
    });

    const rootStyle = document.documentElement.style;
    Object.entries(theme).forEach(([cssVar, value]) => {
      if (!cssVar.startsWith("--") || !value || isFontFamilyVar(cssVar) || cssVar.endsWith("-line")) {
        return;
      }
      if (isAlignVar(cssVar)) {
        const align = normalizeTextAlign(value);
        rootStyle.setProperty(cssVar, align);
        rootStyle.setProperty(`${cssVar}-line`, alignUnderlineMargin(align));
        return;
      }
      rootStyle.setProperty(cssVar, normalizeThemeVarValue(cssVar, value));
    });

    Object.entries(theme).forEach(([cssVar, value]) => {
      if (isFontFamilyVar(cssVar) && value) {
        rootStyle.setProperty(cssVar, resolveFontFamilyValue(value));
        const styleVar = `${cssVar}-style`;
        if (theme[styleVar]) {
          rootStyle.setProperty(styleVar, normalizeThemeVarValue(styleVar, theme[styleVar]));
        }
        if (theme[`${cssVar}-weight`]) {
          rootStyle.setProperty(`${cssVar}-weight`, String(theme[`${cssVar}-weight`]).trim());
        }
      }
    });
  }

  function loadRepoSiteLockSync() {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", SITE_LOCK_FILE, false);
      xhr.send(null);
      if (xhr.status >= 200 && xhr.status < 300 && xhr.responseText) {
        const data = JSON.parse(xhr.responseText);
        if (data && data.theme && typeof data.theme === "object") {
          return data;
        }
      }
    } catch {
      /* ignore */
    }
    return null;
  }

  function loadDeviceMobileLock() {
    try {
      const data = JSON.parse(localStorage.getItem(MOBILE_LOCK_STORAGE_KEY) || "null");
      if (data && data.theme && typeof data.theme === "object") {
        return data;
      }
    } catch {
      /* ignore */
    }
    return null;
  }

  const repoLock = loadRepoSiteLockSync();
  const deviceLock = loadDeviceMobileLock();

  // Старый localStorage — только если нет lock в репозитории
  if (!repoLock) {
    if (deviceLock) {
      applyThemeLayer(deviceLock.theme);
    }
    let saved;
    try {
      saved = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) || "null");
    } catch {
      saved = null;
    }
    if (saved && typeof saved === "object") {
      Object.entries(legacyMap).forEach(([legacy, modern]) => {
        if (saved[legacy] && !saved[modern]) {
          saved[modern] = saved[legacy];
        }
      });
      applyThemeLayer(saved);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(saved));
      } catch {
        /* ignore */
      }
    }
  } else {
    // Зафиксированный дизайн из mobile-theme-lock.json — главный источник
    applyThemeLayer(repoLock.theme);
  }

  const rootStyle = document.documentElement.style;
  const themeColor =
    rootStyle.getPropertyValue("--linen").trim() ||
    rootStyle.getPropertyValue("--hero-bg").trim() ||
    "#4b5620";
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta && /^#[0-9a-fA-F]{3,8}$/.test(themeColor)) {
    themeColorMeta.setAttribute("content", themeColor);
  }
})();
