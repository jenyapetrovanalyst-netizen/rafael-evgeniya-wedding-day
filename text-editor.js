/**
 * Компактный WYSIWYG-редактор текста приглашения.
 * Включается вместе с панелью «Настройка дизайна».
 */
(function initWeddingTextEditor() {
  const RICH_COPY_KEY = "wedding-rich-copy-v1";
  const FONT_OPTIONS = [
    {
      value: "Instrument Serif",
      label: "Instrument Serif (образец сайта Wix Bohemian — заголовки)",
    },
    {
      value: "Helvetica Neue",
      label: "Helvetica Neue (образец сайта Wix Bohemian — текст)",
    },
    {
      value: "IBM Plex Sans",
      label: "IBM Plex Sans (образец сайта Wix Bohemian — виджеты)",
    },
    { value: "DM Sans", label: "Rhode — advertising / editorial" },
    { value: "Sora", label: "Rhode alt — Sora" },
    { value: "Manrope", label: "Rhode alt — Manrope" },
    { value: "Pinyon Script", label: "Pinyon Script — каллиграфия" },
    { value: "Parisienne", label: "Parisienne — каллиграфия" },
    { value: "Great Vibes", label: "Great Vibes — каллиграфия" },
    { value: "Allura", label: "Allura — скрипт" },
    { value: "Alex Brush", label: "Alex Brush — скрипт" },
    { value: "Good Vibes", label: "Good Vibes — открытки" },
    { value: "Florisel script Thin", label: "Florisel script — открытки" },
    { value: "Playfair Display", label: "Playfair Display — serif" },
    { value: "Bodoni Moda", label: "Bodoni Moda — serif" },
    { value: "DM Serif Display", label: "DM Serif Display — открытки" },
    { value: "Nyght Serif", label: "Nyght Serif — открытки" },
    { value: "Free Serif Italic", label: "Free Serif Italic — открытки" },
    { value: "Libre Baskerville", label: "Libre Baskerville — serif" },
    { value: "Cormorant Garamond", label: "Cormorant Garamond — serif" },
    { value: "EB Garamond", label: "EB Garamond — serif" },
    { value: "Lora", label: "Lora — serif" },
    { value: "Forum", label: "Forum — декоративный serif" },
    { value: "DM Sans", label: "DM Sans — открытки" },
    { value: "Min Sans", label: "Min Sans — открытки" },
    { value: "Transforma", label: "Transforma — открытки" },
    { value: "Ossem", label: "Ossem — открытки" },
    { value: "Jost", label: "Jost — открытки" },
    { value: "Lato", label: "Lato — sans" },
    { value: "Montserrat", label: "Montserrat — sans" },
    { value: "Inter", label: "Inter — sans" },
    { value: "Open Sans", label: "Open Sans — sans" },
    { value: "Courier New", label: "Courier New — моно" },
  ];

  const EDITABLE_IDS = [
    "heroTitle",
    "heroNames",
    "heroDate",
    "inviteKicker",
    "heroText",
    "detailsTitle",
    "detailsLocationBody",
    "taxiRouteLabel",
    "transitRouteLabel",
    "routeLabel",
    "timelineTitle",
    "dresscodeTitle",
    "dresscodeText",
    "organizationTitle",
    "orgDrinks",
    "orgKiss",
    "orgKids",
    "rsvpTitle",
    "rsvpIntro",
    "rsvpNameLabel",
    "rsvpAttendanceLabel",
    "rsvpCommentLabel",
    "submitBtn",
    "finalText",
    "finalSignature",
  ];

  /** Только прощание: шрифт/размер сохраняются в localStorage */
  const FOOTER_STYLE_IDS = new Set(["finalText", "finalSignature"]);

  const ALLOWED_TAGS = new Set([
    "B",
    "STRONG",
    "I",
    "EM",
    "U",
    "S",
    "STRIKE",
    "BR",
    "SPAN",
    "P",
    "DIV",
    "UL",
    "OL",
    "LI",
    "FONT",
    "A",
  ]);

  let bar = null;
  let activeId = null;
  let saveTimer = null;
  let dragState = null;
  let savedRange = null;

  function loadRichCopy() {
    try {
      return JSON.parse(localStorage.getItem(RICH_COPY_KEY) || "{}") || {};
    } catch {
      return {};
    }
  }

  function saveRichCopy(map) {
    localStorage.setItem(RICH_COPY_KEY, JSON.stringify(map));
  }

  function sanitizeStyleValue(raw) {
    const allowed = new Set([
      "font-family",
      "font-size",
      "font-style",
      "font-weight",
      "line-height",
      "color",
      "background-color",
      "text-align",
    ]);
    return String(raw || "")
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const idx = part.indexOf(":");
        if (idx < 0) {
          return "";
        }
        const prop = part.slice(0, idx).trim().toLowerCase();
        const value = part.slice(idx + 1).trim();
        if (!allowed.has(prop) || !value || /expression|url\s*\(|javascript:/i.test(value)) {
          return "";
        }
        return `${prop}: ${value}`;
      })
      .filter(Boolean)
      .join("; ");
  }

  function sanitizeHtml(html, options = {}) {
    const allowInlineStyles = Boolean(options.allowInlineStyles);
    const template = document.createElement("template");
    template.innerHTML = String(html || "");
    const walk = (node) => {
      const children = [...node.childNodes];
      children.forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          if (!ALLOWED_TAGS.has(child.tagName)) {
            const text = document.createTextNode(child.textContent || "");
            child.replaceWith(text);
            return;
          }
          [...child.attributes].forEach((attr) => {
            const name = attr.name.toLowerCase();
            if (name === "style") {
              if (allowInlineStyles) {
                const cleaned = sanitizeStyleValue(attr.value);
                if (cleaned) {
                  child.setAttribute("style", cleaned);
                } else {
                  child.removeAttribute(attr.name);
                }
              } else {
                child.removeAttribute(attr.name);
              }
              return;
            }
            if (name === "color" || name === "face" || name === "size") {
              if (!allowInlineStyles) {
                child.removeAttribute(attr.name);
              }
              return;
            }
            if (child.tagName === "A" && name === "href") {
              const href = String(attr.value || "");
              if (!/^https?:\/\//i.test(href) && !href.startsWith("mailto:")) {
                child.removeAttribute(attr.name);
              }
              return;
            }
            child.removeAttribute(attr.name);
          });
          walk(child);
        }
      });
    };
    walk(template.content);

    // Убираем пустые абзацы — они не должны раздувать вертикальные отступы
    template.content.querySelectorAll("p, div").forEach((el) => {
      const text = (el.textContent || "").replace(/\u00a0/g, " ").trim();
      if (!text && !el.querySelector("img, video, br")) {
        el.remove();
        return;
      }
      // Абзац только из <br> / пробелов
      if (!text && el.querySelector("br") && !el.querySelector("img, video")) {
        const onlyBreaks = [...el.childNodes].every(
          (n) =>
            n.nodeType === Node.TEXT_NODE
              ? !(n.textContent || "").replace(/\u00a0/g, " ").trim()
              : n.nodeType === Node.ELEMENT_NODE && n.tagName === "BR"
        );
        if (onlyBreaks) {
          el.remove();
        }
      }
    });

    return template.innerHTML;
  }

  function getTimelineEditableIds() {
    return [...document.querySelectorAll("#timelineList [id^='timelineTime'], #timelineList [id^='timelineEvent']")].map(
      (node) => node.id
    );
  }

  function getAllEditableIds() {
    return [...new Set([...EDITABLE_IDS, ...getTimelineEditableIds()])];
  }

  function getEditableNodes() {
    return getAllEditableIds()
      .map((id) => document.getElementById(id))
      .filter(Boolean);
  }

  function applySavedHtml() {
    const map = loadRichCopy();
    // Миграция старых отдельных полей локации → один блок
    if (!map.detailsLocationBody && (map.detailsVenue || map.detailsAddress || map.mapText || map.mapContact)) {
      const parts = [map.detailsVenue, map.detailsAddress, map.mapText].filter(Boolean);
      let body = parts.join(", ");
      if (map.mapContact) {
        body += (body ? ".<br>" : "") + map.mapContact;
      } else if (body && !/[.!?]$/.test(body.trim())) {
        body += ".";
      }
      if (body) {
        map.detailsLocationBody = body;
        saveRichCopy(map);
      }
    }
    // Актуализация локации: три абзаца как на скрине (21.07.2026)
    const locationCanonical =
      typeof siteContent !== "undefined" && siteContent.location && siteContent.location.bodyHtml
        ? siteContent.location.bodyHtml
        : "";
    if (locationCanonical) {
      const body = map.detailsLocationBody || "";
      const paraCount = (body.match(/<p[\s>]/gi) || []).length;
      const needsUpdate =
        !body ||
        paraCount < 3 ||
        /Спарк\s*холл/i.test(body) ||
        /городской округ Красногорск,\s*Московская область/i.test(body) ||
        !/Мякинино/.test(body) ||
        !/Пенягино/.test(body) ||
        !/209к/.test(body);
      if (needsUpdate) {
        map.detailsLocationBody = locationCanonical;
        saveRichCopy(map);
      }
    }
    if (map.routeLabel && !map.taxiRouteLabel) {
      map.taxiRouteLabel = map.routeLabel;
      saveRichCopy(map);
    }
    if (
      typeof siteContent !== "undefined" &&
      siteContent.location &&
      (map.taxiRouteLabel === "Построить маршрут" || map.routeLabel === "Построить маршрут")
    ) {
      map.taxiRouteLabel = siteContent.location.taxiRouteLabel;
      map.routeLabel = siteContent.location.taxiRouteLabel;
      saveRichCopy(map);
    }

    // Каноническое прощание: текст + размеры из lock-2026-07-22 (30px / 26px)
    {
      const farewellText = "Спасибо, что вы с нами. До встречи 12 сентября.";
      const farewellNames = "Рафаэль и Евгения";
      if (typeof siteContent !== "undefined") {
        if (siteContent.final) {
          siteContent.final.text = farewellText;
        }
        if (siteContent.couple) {
          siteContent.couple.names = farewellNames;
        }
      }

      const plainOf = (html) => {
        const tmp = document.createElement("div");
        tmp.innerHTML = html || "";
        return (tmp.textContent || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
      };

      const farewellMarkup = (text) =>
        `<span style="font-family: &quot;Great Vibes&quot;, cursive">${text}</span>`;

      let farewellChanged = false;
      if (
        plainOf(map.finalText) !== farewellText ||
        !map.finalText ||
        /<div/i.test(map.finalText)
      ) {
        map.finalText = farewellMarkup(farewellText);
        farewellChanged = true;
      }
      if (
        plainOf(map.finalSignature) !== farewellNames ||
        !map.finalSignature ||
        /<div/i.test(map.finalSignature)
      ) {
        map.finalSignature = farewellMarkup(farewellNames);
        farewellChanged = true;
      }
      if (map.finalText__style !== "font-size: 30px !important") {
        map.finalText__style = "font-size: 30px !important";
        farewellChanged = true;
      }
      if (map.finalSignature__style !== "font-size: 26px !important") {
        map.finalSignature__style = "font-size: 26px !important";
        farewellChanged = true;
      }
      if (farewellChanged) {
        saveRichCopy(map);
      }
    }

    getEditableNodes().forEach((node) => {
      const allowInlineStyles = FOOTER_STYLE_IDS.has(node.id);
      const html = map[node.id];
      if (html) {
        node.innerHTML = sanitizeHtml(html, { allowInlineStyles });
      }
      if (!allowInlineStyles) {
        node.removeAttribute("style");
        node.querySelectorAll("[style]").forEach((el) => el.removeAttribute("style"));
      } else {
        const savedStyle = map[`${node.id}__style`];
        if (savedStyle) {
          // На десктопе оставляем размеры из lock (30px / 26px);
          // на мобилке applyMobileFarewellType задаёт 22px поверх.
          node.setAttribute("style", sanitizeStyleValue(savedStyle));
        }
      }
    });
  }

  function captureSelection() {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) {
      return;
    }
    const node = sel.anchorNode;
    const el = node && node.nodeType === Node.ELEMENT_NODE ? node : node && node.parentElement;
    if (!el || !el.closest('[data-editable="true"]')) {
      return;
    }
    try {
      savedRange = sel.getRangeAt(0).cloneRange();
      const editable = el.closest('[data-editable="true"]');
      if (editable && editable.id) {
        activeId = editable.id;
      }
    } catch {
      /* ignore */
    }
  }

  function restoreSelection() {
    if (!savedRange) {
      return false;
    }
    const sel = window.getSelection();
    if (!sel) {
      return false;
    }
    try {
      let probe = savedRange.startContainer;
      if (probe.nodeType !== Node.ELEMENT_NODE) {
        probe = probe.parentElement;
      }
      const editable = probe && probe.closest('[data-editable="true"]');
      if (editable) {
        editable.focus({ preventScroll: true });
      }
      sel.removeAllRanges();
      sel.addRange(savedRange);
      return Boolean(sel.rangeCount);
    } catch {
      return false;
    }
  }

  function persistActive() {
    if (!activeId) {
      return;
    }
    const node = document.getElementById(activeId);
    if (!node) {
      return;
    }
    const map = loadRichCopy();
    map[activeId] = sanitizeHtml(node.innerHTML, {
      allowInlineStyles: FOOTER_STYLE_IDS.has(activeId),
    });
    // Для прощания сохраняем и style на самом блоке (шрифт/размер без выделения)
    if (FOOTER_STYLE_IDS.has(activeId) && node.getAttribute("style")) {
      const cleaned = sanitizeStyleValue(node.getAttribute("style"));
      if (cleaned) {
        map[`${activeId}__style`] = cleaned;
      } else {
        delete map[`${activeId}__style`];
      }
    } else if (FOOTER_STYLE_IDS.has(activeId)) {
      delete map[`${activeId}__style`];
    }
    saveRichCopy(map);

    if (typeof window.WeddingCopyBridge === "object" && window.WeddingCopyBridge.onRichEdit) {
      window.WeddingCopyBridge.onRichEdit(activeId, node.innerText.trim(), node.innerHTML);
    }
  }

  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(persistActive, 250);
  }

  function exec(command, value = null) {
    restoreSelection();
    document.execCommand(command, false, value);
    captureSelection();
    scheduleSave();
    refreshToolbarState();
  }

  function applyInlineStyles(styles) {
    const editable =
      (activeId && document.getElementById(activeId)) ||
      document.querySelector('[data-editable="true"].is-active-edit');
    const styleTargetId = activeId || (editable && editable.id) || "";
    // Шрифт/размер/цвет — только для блока прощания; остальной сайт из CSS
    const canStyleFonts = FOOTER_STYLE_IDS.has(styleTargetId);
    if (
      !canStyleFonts &&
      (styles.fontFamily || styles.fontSizePx || styles.color || styles.backgroundColor)
    ) {
      return;
    }

    const restored = restoreSelection();
    const sel = window.getSelection();
    const hasRange = Boolean(sel && sel.rangeCount);
    const collapsed = !hasRange || sel.isCollapsed;

    document.execCommand("styleWithCSS", false, true);

    if (styles.fontFamily) {
      if (restored && hasRange && !collapsed) {
        document.execCommand("fontName", false, styles.fontFamily);
      } else if (editable) {
        editable.style.setProperty("font-family", `"${styles.fontFamily}"`, "important");
      }
    }
    if (styles.color) {
      if (restored && hasRange && !collapsed) {
        document.execCommand("foreColor", false, styles.color);
      } else if (editable) {
        editable.style.setProperty("color", styles.color, "important");
      }
    }
    if (styles.backgroundColor) {
      if (restored && hasRange && !collapsed) {
        const ok = document.execCommand("hiliteColor", false, styles.backgroundColor);
        if (!ok) {
          document.execCommand("backColor", false, styles.backgroundColor);
        }
      } else if (editable) {
        editable.style.backgroundColor = styles.backgroundColor;
      }
    }
    if (styles.fontSizePx) {
      applyFontSizePx(styles.fontSizePx, editable, sel, restored && hasRange && !collapsed);
    }

    captureSelection();
    scheduleSave();
    refreshToolbarState();
  }

  function applyFontSizePx(px, editable, sel, hasTextSelection) {
    const size = `${px}px`;

    if (hasTextSelection && sel && sel.rangeCount) {
      const range = sel.getRangeAt(0);
      // Если выделение покрывает почти весь блок — ставим размер на сам блок
      if (editable) {
        const blockText = (editable.innerText || "").replace(/\s+/g, " ").trim();
        const selectedText = String(range.toString() || "").replace(/\s+/g, " ").trim();
        if (blockText && selectedText && selectedText === blockText) {
          setEditableFontSize(editable, size);
          return;
        }
      }

      const span = document.createElement("span");
      // !important — иначе CSS-lock 21px перебивает инлайн
      span.style.setProperty("font-size", size, "important");
      try {
        range.surroundContents(span);
      } catch {
        const fragment = range.extractContents();
        span.appendChild(fragment);
        range.insertNode(span);
      }
      sel.removeAllRanges();
      const next = document.createRange();
      next.selectNodeContents(span);
      sel.addRange(next);
      savedRange = next.cloneRange();
      return;
    }

    // Нет выделения — меняем размер всего активного блока
    if (editable) {
      setEditableFontSize(editable, size);
    }
  }

  function setEditableFontSize(editable, size) {
    if (!editable) {
      return;
    }
    editable.style.setProperty("font-size", size, "important");
    // Убираем вложенные размеры, чтобы действовал размер блока
    editable.querySelectorAll("span[style], font[size]").forEach((el) => {
      if (el.style && el.style.fontSize) {
        el.style.removeProperty("font-size");
      }
      if (el.hasAttribute("size")) {
        el.removeAttribute("size");
      }
    });
  }

  function createBar() {
    if (bar) {
      return bar;
    }
    bar = document.createElement("div");
    bar.id = "textEditorBar";
    bar.className = "text-editor-bar";
    bar.setAttribute("role", "toolbar");
    bar.setAttribute("aria-label", "Редактирование текста");

    bar.innerHTML = `
      <span class="text-editor-drag" title="Переместить панель" aria-label="Переместить">⋮⋮</span>
      <div class="text-editor-group">
        <select data-action="font" title="Шрифт" aria-label="Шрифт"></select>
        <input data-action="size" type="number" min="12" max="48" step="1" value="18" title="Размер, px" aria-label="Размер" />
        <input data-action="color" type="color" value="#ebf7b0" title="Цвет текста" aria-label="Цвет текста" />
        <input data-action="highlight" type="color" value="#fff59d" title="Цвет выделения" aria-label="Цвет выделения" />
      </div>
      <div class="text-editor-group">
        <button type="button" class="text-editor-btn" data-cmd="bold" title="Жирный (Ctrl+B)"><b>B</b></button>
        <button type="button" class="text-editor-btn" data-cmd="italic" title="Курсив (Ctrl+I)"><i>I</i></button>
        <button type="button" class="text-editor-btn" data-cmd="underline" title="Подчёркнутый (Ctrl+U)"><u>U</u></button>
        <button type="button" class="text-editor-btn" data-cmd="strikeThrough" title="Зачёркнутый"><s>S</s></button>
      </div>
      <div class="text-editor-group">
        <button type="button" class="text-editor-btn" data-cmd="justifyLeft" title="По левому краю">⟸</button>
        <button type="button" class="text-editor-btn" data-cmd="justifyCenter" title="По центру">≡</button>
        <button type="button" class="text-editor-btn" data-cmd="justifyRight" title="По правому краю">⟹</button>
        <button type="button" class="text-editor-btn" data-cmd="justifyFull" title="По ширине">⇔</button>
      </div>
      <div class="text-editor-group">
        <button type="button" class="text-editor-btn" data-cmd="insertUnorderedList" title="Маркированный список">•</button>
        <button type="button" class="text-editor-btn" data-cmd="insertOrderedList" title="Нумерованный список">1.</button>
      </div>
      <div class="text-editor-group">
        <button type="button" class="text-editor-btn" data-cmd="undo" title="Отменить (Ctrl+Z)">↶</button>
        <button type="button" class="text-editor-btn" data-cmd="redo" title="Повторить (Ctrl+Y)">↷</button>
        <button type="button" class="text-editor-btn" data-cmd="removeFormat" title="Сбросить форматирование">⌫</button>
        <button type="button" class="text-editor-btn" data-style="p" title="Обычный текст">P</button>
        <button type="button" class="text-editor-btn" data-style="h2" title="Заголовок">H</button>
      </div>
      <p class="text-editor-hint">Выделите текст на странице и меняйте оформление. Сохраняется само.</p>
    `;

    const fontSelect = bar.querySelector('[data-action="font"]');
    FONT_OPTIONS.forEach((font) => {
      const option = document.createElement("option");
      option.value = font.value;
      option.textContent = font.label;
      option.style.fontFamily = `"${font.value}", serif`;
      fontSelect.appendChild(option);
    });

    bar.addEventListener("mousedown", (event) => {
      // Сохраняем выделение ДО фокуса на select/input/button
      captureSelection();
      // preventDefault на кнопках — чтобы не сбрасывать selection;
      // на select/color оставляем нативный UI, но range уже сохранён
      if (event.target.closest("button, .text-editor-drag")) {
        event.preventDefault();
      }
    });

    bar.querySelectorAll("[data-cmd]").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        const cmd = btn.getAttribute("data-cmd");
        exec(cmd);
      });
    });

    bar.querySelectorAll("[data-style]").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        const style = btn.getAttribute("data-style");
        if (style === "h2") {
          exec("formatBlock", "h2");
        } else {
          exec("formatBlock", "p");
        }
      });
    });

    fontSelect.addEventListener("mousedown", () => {
      captureSelection();
    });
    fontSelect.addEventListener("change", () => {
      applyInlineStyles({ fontFamily: fontSelect.value });
    });

    const sizeInput = bar.querySelector('[data-action="size"]');
    const applySizeFromInput = () => {
      const size = Number.parseInt(sizeInput.value, 10);
      if (!Number.isNaN(size)) {
        applyInlineStyles({ fontSizePx: Math.min(48, Math.max(12, size)) });
      }
    };
    sizeInput.addEventListener("mousedown", () => {
      captureSelection();
    });
    sizeInput.addEventListener("change", applySizeFromInput);
    sizeInput.addEventListener("input", applySizeFromInput);
    sizeInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        sizeInput.blur();
        applySizeFromInput();
      }
    });

    const colorInput = bar.querySelector('[data-action="color"]');
    colorInput.addEventListener("mousedown", () => {
      captureSelection();
    });
    colorInput.addEventListener("input", () => {
      applyInlineStyles({ color: colorInput.value });
    });

    const highlightInput = bar.querySelector('[data-action="highlight"]');
    highlightInput.addEventListener("mousedown", () => {
      captureSelection();
    });
    highlightInput.addEventListener("input", () => {
      applyInlineStyles({ backgroundColor: highlightInput.value });
    });

    const dragHandle = bar.querySelector(".text-editor-drag");
    dragHandle.addEventListener("mousedown", (event) => {
      event.preventDefault();
      const rect = bar.getBoundingClientRect();
      dragState = {
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
      };
      bar.classList.add("is-dragging");
      bar.style.left = `${rect.left}px`;
      bar.style.top = `${rect.top}px`;
      bar.style.transform = "none";
      bar.style.right = "auto";
      bar.style.bottom = "auto";
    });

    document.body.appendChild(bar);
    return bar;
  }

  function onDragMove(event) {
    if (!dragState || !bar) {
      return;
    }
    const x = Math.min(window.innerWidth - 40, Math.max(8, event.clientX - dragState.offsetX));
    const y = Math.min(window.innerHeight - 40, Math.max(8, event.clientY - dragState.offsetY));
    bar.style.left = `${x}px`;
    bar.style.top = `${y}px`;
  }

  function onDragEnd() {
    if (!dragState) {
      return;
    }
    dragState = null;
    if (bar) {
      bar.classList.remove("is-dragging");
    }
  }

  function normalizeFontFamily(family) {
    return String(family || "")
      .split(",")[0]
      .trim()
      .replace(/^["']|["']$/g, "");
  }

  function rgbToHex(color) {
    const value = String(color || "").trim();
    if (!value || value === "transparent" || value === "inherit") {
      return null;
    }
    if (value.startsWith("#")) {
      if (value.length === 4) {
        return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
      }
      return value.slice(0, 7).toLowerCase();
    }
    const match = value.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
    if (!match) {
      return null;
    }
    const toHex = (part) => Number(part).toString(16).padStart(2, "0");
    return `#${toHex(match[1])}${toHex(match[2])}${toHex(match[3])}`;
  }

  function isTransparentColor(color) {
    const value = String(color || "").trim().toLowerCase();
    if (!value || value === "transparent") {
      return true;
    }
    const match = value.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([0-9.]+))?/i);
    if (match && match[4] !== undefined && Number(match[4]) === 0) {
      return true;
    }
    return false;
  }

  function getSelectionProbeElement() {
    const pickFromRange = (range) => {
      if (!range) {
        return null;
      }
      let node = range.startContainer;
      if (node.nodeType === Node.TEXT_NODE) {
        node = node.parentElement;
      }
      if (!node || !node.closest) {
        return null;
      }
      if (!node.closest('[data-editable="true"]')) {
        return null;
      }
      return node;
    };

    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const fromLive = pickFromRange(sel.getRangeAt(0));
      if (fromLive && !(bar && bar.contains(fromLive))) {
        return fromLive;
      }
    }
    return pickFromRange(savedRange);
  }

  function syncFontSelect(familyName) {
    const fontSelect = bar.querySelector('[data-action="font"]');
    if (!fontSelect || !familyName) {
      return;
    }
    const lower = familyName.toLowerCase();
    const known = FONT_OPTIONS.find((font) => font.value.toLowerCase() === lower);
    const targetValue = known ? known.value : familyName;

    let temp = fontSelect.querySelector('option[data-temp="true"]');
    if (!known) {
      if (!temp) {
        temp = document.createElement("option");
        temp.dataset.temp = "true";
        fontSelect.insertBefore(temp, fontSelect.firstChild);
      }
      temp.value = familyName;
      temp.textContent = `${familyName} (текущий)`;
      temp.style.fontFamily = `"${familyName}", serif`;
    } else if (temp) {
      temp.remove();
    }

    if (fontSelect.value !== targetValue) {
      fontSelect.value = targetValue;
    }
  }

  function refreshToolbarState() {
    if (!bar) {
      return;
    }

    bar.querySelectorAll("[data-cmd]").forEach((btn) => {
      const cmd = btn.getAttribute("data-cmd");
      if (["undo", "redo", "removeFormat", "insertUnorderedList", "insertOrderedList"].includes(cmd)) {
        return;
      }
      try {
        btn.classList.toggle("is-active", document.queryCommandState(cmd));
      } catch {
        btn.classList.remove("is-active");
      }
    });

    const probe = getSelectionProbeElement();
    if (!probe) {
      return;
    }

    const styles = window.getComputedStyle(probe);
    const activeControl = document.activeElement;
    const editingControl =
      activeControl &&
      bar.contains(activeControl) &&
      (activeControl.matches('[data-action="size"]') ||
        activeControl.matches('[data-action="font"]') ||
        activeControl.matches('[data-action="color"]') ||
        activeControl.matches('[data-action="highlight"]'));

    if (!editingControl || !activeControl.matches('[data-action="font"]')) {
      syncFontSelect(normalizeFontFamily(styles.fontFamily));
    }

    const sizeInput = bar.querySelector('[data-action="size"]');
    if (sizeInput && activeControl !== sizeInput) {
      const px = Math.round(Number.parseFloat(styles.fontSize));
      if (!Number.isNaN(px) && String(sizeInput.value) !== String(px)) {
        sizeInput.value = String(px);
      }
    }

    const colorInput = bar.querySelector('[data-action="color"]');
    if (colorInput && activeControl !== colorInput) {
      const hex = rgbToHex(styles.color);
      if (hex && colorInput.value.toLowerCase() !== hex) {
        colorInput.value = hex;
      }
    }

    const highlightInput = bar.querySelector('[data-action="highlight"]');
    if (highlightInput && activeControl !== highlightInput && !isTransparentColor(styles.backgroundColor)) {
      const hex = rgbToHex(styles.backgroundColor);
      if (hex && highlightInput.value.toLowerCase() !== hex) {
        highlightInput.value = hex;
      }
    }
  }

  function setEditingEnabled(enabled) {
    document.body.classList.toggle("is-text-editing", enabled);
    createBar();
    getEditableNodes().forEach((node) => {
      node.dataset.editable = "true";
      node.contentEditable = enabled ? "true" : "false";
      node.spellcheck = true;
      if (!enabled) {
        node.classList.remove("is-active-edit");
      }
    });
    if (!enabled) {
      activeId = null;
      persistActive();
    }
    if (window.WeddingResize && typeof window.WeddingResize.refresh === "function") {
      window.WeddingResize.refresh();
    }
  }

  function refreshEditables() {
    const enabled = document.body.classList.contains("is-text-editing");
    setEditingEnabled(enabled);
  }

  let editableEventsBound = false;

  function bindEditableEvents() {
    if (editableEventsBound) {
      return;
    }
    editableEventsBound = true;

    document.addEventListener("focusin", (event) => {
      if (!document.body.classList.contains("is-text-editing")) {
        return;
      }
      const node = event.target.closest('[data-editable="true"]');
      if (!node || !node.id) {
        return;
      }
      activeId = node.id;
      getEditableNodes().forEach((item) => item.classList.toggle("is-active-edit", item === node));
    });

    document.addEventListener("input", (event) => {
      const node = event.target.closest('[data-editable="true"]');
      if (!node || !node.id) {
        return;
      }
      activeId = node.id;
      scheduleSave();
    });

    document.addEventListener("focusout", (event) => {
      const node = event.target.closest('[data-editable="true"]');
      if (!node) {
        return;
      }
      const next = event.relatedTarget;
      if (next && bar && bar.contains(next)) {
        return;
      }
      persistActive();
    });

    document.addEventListener("mouseup", (event) => {
      if (!event.target.closest('[data-editable="true"]')) {
        return;
      }
      captureSelection();
      refreshToolbarState();
    });

    document.addEventListener("keyup", (event) => {
      if (!event.target.closest('[data-editable="true"]')) {
        return;
      }
      captureSelection();
      refreshToolbarState();
    });

    document.addEventListener("click", (event) => {
      if (!document.body.classList.contains("is-text-editing")) {
        return;
      }
      const node = event.target.closest('[data-editable="true"]');
      if (!node || !node.id) {
        return;
      }
      activeId = node.id;
      captureSelection();
    });

    // Пока редактируем — не уходить по ссылкам-кнопкам
    document.addEventListener(
      "click",
      (event) => {
        if (!document.body.classList.contains("is-text-editing")) {
          return;
        }
        const link = event.target.closest("a");
        if (!link) {
          return;
        }
        if (link.querySelector('[data-editable="true"]') || link.matches('[data-editable="true"]')) {
          event.preventDefault();
        }
      },
      true
    );
  }

  function onKeydown(event) {
    if (!document.body.classList.contains("is-text-editing")) {
      return;
    }
    const meta = event.metaKey || event.ctrlKey;
    if (!meta) {
      return;
    }
    const key = event.key.toLowerCase();
    if (key === "b") {
      event.preventDefault();
      exec("bold");
    } else if (key === "i") {
      event.preventDefault();
      exec("italic");
    } else if (key === "u") {
      event.preventDefault();
      exec("underline");
    } else if (key === "z" && !event.shiftKey) {
      event.preventDefault();
      exec("undo");
    } else if (key === "y" || (key === "z" && event.shiftKey)) {
      event.preventDefault();
      exec("redo");
    }
  }

  function syncWithThemePanel() {
    const panel = document.getElementById("themePanel");
    if (!panel) {
      return;
    }
    const apply = () => {
      const open = !panel.classList.contains("is-collapsed");
      setEditingEnabled(open);
    };
    apply();
    const toggle = document.getElementById("themePanelToggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        // класс меняется в том же обработчике; ждём микротаск
        setTimeout(apply, 0);
      });
    }
    const observer = new MutationObserver(apply);
    observer.observe(panel, { attributes: true, attributeFilter: ["class"] });
  }

  function boot() {
    // Публичный сайт: без панели и без contenteditable для гостей.
    // Включить снова: ?edit=1 в адресе (только для владельцев).
    const editingAllowed = new URLSearchParams(window.location.search).get("edit") === "1";
    applySavedHtml();
    if (!editingAllowed) {
      setEditingEnabled(false);
      document.querySelectorAll("[contenteditable]").forEach((node) => {
        node.removeAttribute("contenteditable");
        node.contentEditable = "false";
      });
      const panel = document.getElementById("themePanel");
      if (panel) {
        panel.hidden = true;
        panel.setAttribute("aria-hidden", "true");
      }
      return;
    }
    createBar();
    bindEditableEvents();
    syncWithThemePanel();
    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragEnd);
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("selectionchange", () => {
      if (!document.body.classList.contains("is-text-editing")) {
        return;
      }
      // Не затирать сохранённый range, пока фокус на панели (select открыт)
      if (bar && bar.contains(document.activeElement)) {
        refreshToolbarState();
        return;
      }
      captureSelection();
      refreshToolbarState();
    });
  }

  window.WeddingTextEditor = {
    applySavedHtml,
    setEditingEnabled,
    refreshEditables,
    loadRichCopy,
    persistActive,
    getAllEditableIds,
    EDITABLE_IDS,
    RICH_COPY_KEY,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
