window.WeddingCopyBridge = {
  onRichEdit(id, plainText, html) {
    if (!plainText && !html) {
      return;
    }
    if (id === "heroTitle") {
      siteContent.hero.title = plainText;
    } else if (id === "heroNames") {
      siteContent.couple.names = plainText;
    } else if (id === "heroDate") {
      siteContent.wedding.dateLabel = plainText;
    } else if (id === "inviteKicker") {
      siteContent.hero.inviteKicker = plainText;
    } else if (id === "heroText") {
      siteContent.hero.text = plainText;
    } else if (id === "detailsTitle") {
      siteContent.location.title = plainText;
    } else if (id === "detailsLocationBody") {
      siteContent.location.bodyHtml = html || plainText;
    } else if (id === "taxiRouteLabel" || id === "routeLabel") {
      siteContent.location.taxiRouteLabel = plainText;
      siteContent.location.routeLabel = plainText;
    } else if (id === "transitRouteLabel") {
      siteContent.location.transitRouteLabel = plainText;
    } else if (id === "timelineTitle") {
      siteContent.timelineTitle = plainText;
    } else if (/^timelineTime\d+$/.test(id)) {
      const index = Number(id.replace("timelineTime", ""));
      if (siteContent.timeline[index]) {
        siteContent.timeline[index].time = plainText;
      }
    } else if (/^timelineEvent\d+$/.test(id)) {
      const index = Number(id.replace("timelineEvent", ""));
      if (siteContent.timeline[index]) {
        siteContent.timeline[index].event = plainText;
      }
    } else if (id === "dresscodeTitle") {
      siteContent.dresscode.title = plainText;
    } else if (id === "dresscodeText") {
      siteContent.dresscode.text = plainText;
    } else if (id === "organizationTitle") {
      siteContent.organization.title = plainText;
    } else if (id === "orgDrinks") {
      siteContent.organization.drinks = plainText;
    } else if (id === "orgKiss") {
      siteContent.organization.kiss = plainText;
    } else if (id === "orgKids") {
      siteContent.organization.kids = plainText;
    } else if (id === "rsvpTitle") {
      siteContent.rsvp.title = plainText;
    } else if (id === "rsvpIntro") {
      siteContent.rsvp.intro = plainText;
    } else if (id === "rsvpNameLabel") {
      siteContent.rsvp.nameLabel = plainText;
    } else if (id === "rsvpAttendanceLabel") {
      siteContent.rsvp.attendanceLabel = plainText;
    } else if (id === "rsvpCommentLabel") {
      siteContent.rsvp.commentLabel = plainText;
    } else if (id === "submitBtn") {
      siteContent.rsvp.submitLabel = plainText;
    } else if (id === "finalText") {
      siteContent.final.text = plainText;
    } else if (id === "finalSignature") {
      siteContent.couple.names = plainText;
    }

    saveCopyOverrides({
      heroTitle: siteContent.hero.title,
      heroDate: siteContent.wedding.dateLabel,
      inviteKicker: siteContent.hero.inviteKicker,
      inviteBody: siteContent.hero.text,
      rsvpTitle: siteContent.rsvp.title,
      rsvpIntro: siteContent.rsvp.intro,
    });
  },
};

document.title = siteContent.meta.title;

const weddingDate = new Date(siteContent.wedding.dateISO);
const THEME_STORAGE_KEY = "wedding-theme-vars";
const COPY_STORAGE_KEY = "wedding-copy-overrides";
const MOBILE_THEME_LOCK_STORAGE_KEY = "wedding-mobile-theme-lock";
const MOBILE_THEME_LOCK_FILE = "mobile-theme-lock.json?v=18";
const MOBILE_MEDIA_QUERY = "(max-width: 1024px)";
const EDITOR_SPLIT_MODE = new URLSearchParams(window.location.search).get("editor") === "split";

if (EDITOR_SPLIT_MODE) {
  document.body.classList.add("editor-split-mode");
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function populateSelect(id, options) {
  const select = document.getElementById(id);
  if (!select) {
    return;
  }
  options.forEach((option, index) => {
    const optionNode = document.createElement("option");
    optionNode.value = index === 0 ? "" : option;
    optionNode.textContent = option;
    select.appendChild(optionNode);
  });
}

function renderStaticContent() {
  setText("preloaderMonogram", siteContent.couple.monogram);
  setText("preloaderDate", siteContent.wedding.dateLabel);

  setText("heroTitle", siteContent.hero.title);
  setText("heroNames", siteContent.couple.names);
  setText("heroDate", siteContent.wedding.dateLabel);
  setText("inviteKicker", siteContent.hero.inviteKicker);
  setText("heroText", siteContent.hero.text);
  setText("heroButton", siteContent.hero.buttonLabel);

  setText("detailsTitle", siteContent.location.title);

  const locationBody = document.getElementById("detailsLocationBody");
  if (locationBody) {
    let html = siteContent.location.bodyHtml;
    if (!html) {
      const parts = [
        siteContent.location.venue,
        siteContent.location.address,
        siteContent.location.mapDescription,
      ].filter(Boolean);
      html = parts.join(", ");
      if (html && !/[.!?]$/.test(html.trim())) {
        html += ".";
      }
      if (siteContent.location.howToGet) {
        html += (html ? " " : "") + siteContent.location.howToGet;
      }
      if (siteContent.location.contact) {
        html += (html ? " " : "") + siteContent.location.contact;
      }
    }
    locationBody.innerHTML = html;
  }

  const taxiUrl =
    siteContent.location.taxiRouteUrl || siteContent.location.routeUrl;
  const transitUrl = siteContent.location.transitRouteUrl;
  const taxiLabel =
    siteContent.location.taxiRouteLabel ||
    siteContent.location.routeLabel ||
    "Построить маршрут на такси";
  const transitLabel =
    siteContent.location.transitRouteLabel || "Маршрут на общественном транспорте";

  const bindRouteLink = (el, url) => {
    if (!el || !url) {
      return;
    }
    el.href = url;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  };

  bindRouteLink(document.getElementById("routeLink"), taxiUrl);
  bindRouteLink(document.getElementById("transitRouteLink"), transitUrl);
  bindRouteLink(document.getElementById("navigatorLink"), taxiUrl);

  setText("taxiRouteLabel", taxiLabel);
  setText("transitRouteLabel", transitLabel);
  const legacyRouteLabel = document.getElementById("routeLabel");
  if (legacyRouteLabel) {
    setText("routeLabel", taxiLabel);
  }

  setText("timelineTitle", siteContent.timelineTitle);
  setText("dresscodeTitle", siteContent.dresscode.title);
  setText("dresscodeText", siteContent.dresscode.text);
  setText("organizationTitle", siteContent.organization.title);
  setText("orgDrinks", siteContent.organization.drinks);
  setText("orgKiss", siteContent.organization.kiss);
  setText("orgKids", siteContent.organization.kids);

  setText("rsvpTitle", siteContent.rsvp.title);
  setText("rsvpIntro", siteContent.rsvp.intro);
  setText("rsvpNameLabel", siteContent.rsvp.nameLabel || "Имя и фамилия");
  setText("rsvpAttendanceLabel", siteContent.rsvp.attendanceLabel || "Я буду");
  setText("rsvpPartnerNameLabel", siteContent.rsvp.partnerNameLabel || "Имя и фамилия пары");
  setText("rsvpCommentLabel", siteContent.rsvp.commentLabel);
  setText("submitBtn", siteContent.rsvp.submitLabel || "Отправить");
  setText("finalText", siteContent.final.text);
  setText("finalSignature", siteContent.couple.names);

  if (window.WeddingTextEditor && typeof window.WeddingTextEditor.applySavedHtml === "function") {
    window.WeddingTextEditor.applySavedHtml();
  }
  enforceCanonicalFarewellCopy();
  applyDesktopFarewellSize();
}

function saveCopyOverrides(payload) {
  localStorage.setItem(COPY_STORAGE_KEY, JSON.stringify(payload));
}

function loadCopyOverrides() {
  const raw = localStorage.getItem(COPY_STORAGE_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn("Copy override parsing failed:", error);
    return null;
  }
}

function renderTimeline() {
  const container = document.getElementById("timelineList");
  if (!container) {
    return;
  }

  container.innerHTML = "";
  siteContent.timeline.forEach((item, index) => {
    const row = document.createElement("li");
    row.className = "timeline-item";

    const inner = document.createElement("div");
    inner.className = "timeline-item-row";

    const time = document.createElement("strong");
    time.id = `timelineTime${index}`;
    time.textContent = item.time;

    const event = document.createElement("span");
    event.id = `timelineEvent${index}`;
    event.textContent = item.event;

    inner.append(time, event);
    row.appendChild(inner);
    container.appendChild(row);
  });

  // Сброс устаревших правок программы из localStorage — иначе не виден content.js
  try {
    const key =
      (window.WeddingTextEditor && window.WeddingTextEditor.RICH_COPY_KEY) ||
      "wedding-rich-copy-v1";
    const map = JSON.parse(localStorage.getItem(key) || "{}") || {};
    let changed = false;
    Object.keys(map).forEach((id) => {
      if (/^timeline(Time|Event)\d+$/.test(id)) {
        delete map[id];
        changed = true;
      }
    });
    if (changed) {
      localStorage.setItem(key, JSON.stringify(map));
    }
  } catch {
    /* ignore */
  }

  if (window.WeddingTextEditor && typeof window.WeddingTextEditor.applySavedHtml === "function") {
    window.WeddingTextEditor.applySavedHtml();
  }
  if (window.WeddingTextEditor && typeof window.WeddingTextEditor.refreshEditables === "function") {
    window.WeddingTextEditor.refreshEditables();
  }
  if (window.WeddingResize && typeof window.WeddingResize.refresh === "function") {
    window.WeddingResize.refresh();
  }
}

function renderPalette() {
  const container = document.getElementById("palette");
  if (!container) {
    return;
  }

  const colors = siteContent.dresscode.palette;
  const useFabricTextures = colors.some((color) => color.image);
  container.innerHTML = "";
  container.className = useFabricTextures ? "palette palette--fabric-photo" : "palette";

  colors.forEach((color) => {
    const item = document.createElement("div");
    item.className = "palette-item";
    item.style.setProperty("--swatch-color", color.hex);
    item.title = `${color.name} ${color.hex}`;

    if (color.image) {
      item.classList.add("palette-item--fabric-photo");
      item.style.backgroundImage = `url("${color.image}")`;
      item.style.backgroundColor = color.hex;
    } else {
      item.style.background = color.hex;
    }

    container.appendChild(item);
  });
}

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  const daysNode = document.getElementById("days");
  const hoursNode = document.getElementById("hours");
  const minutesNode = document.getElementById("minutes");

  if (!daysNode || !hoursNode || !minutesNode) {
    return;
  }

  if (diff <= 0) {
    daysNode.textContent = "0";
    hoursNode.textContent = "0";
    minutesNode.textContent = "0";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  daysNode.textContent = String(days);
  hoursNode.textContent = String(hours);
  minutesNode.textContent = String(minutes);
}

function applyMobileFarewellType() {
  if (!window.matchMedia("(max-width: 768px)").matches) {
    return;
  }
  ["finalText", "finalSignature"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    el.style.setProperty("font-family", '"Great Vibes", cursive', "important");
    el.style.setProperty("font-size", "22px", "important");
    el.style.setProperty("line-height", "1.35", "important");
    el.style.setProperty("font-weight", "400", "important");
    el.style.setProperty("font-style", "normal", "important");
    el.style.setProperty("text-align", "center", "important");
    el.querySelectorAll("span, div, p").forEach((node) => {
      node.style.setProperty("font-family", '"Great Vibes", cursive', "important");
      node.style.setProperty("font-size", "22px", "important");
      node.style.setProperty("line-height", "1.35", "important");
      node.style.setProperty("text-align", "center", "important");
    });
  });
}

/** Десктоп: прощание из mobile-theme-lock-2026-07-22.json (editor.__style). */
function applyDesktopFarewellSize() {
  if (!window.matchMedia("(min-width: 769px)").matches) {
    return;
  }
  const sizes = {
    finalText: "30px",
    finalSignature: "26px",
  };
  Object.entries(sizes).forEach(([id, size]) => {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    el.style.setProperty("font-family", '"Great Vibes", cursive', "important");
    el.style.setProperty("font-size", size, "important");
    el.style.setProperty("font-weight", "400", "important");
    el.style.setProperty("font-style", "normal", "important");
    el.style.setProperty("text-align", "center", "important");
    el.style.setProperty("line-height", "1.35", "important");
    el.style.removeProperty("height");
    el.style.removeProperty("min-height");
    el.style.removeProperty("max-height");
    el.style.setProperty("overflow", "visible");
    el.querySelectorAll("span").forEach((node) => {
      node.style.setProperty("font-family", '"Great Vibes", cursive', "important");
      node.style.removeProperty("font-size");
    });
  });
}

/** Жёстко выставляет канонический текст прощания (без смены оформления). */
function enforceCanonicalFarewellCopy() {
  const farewellText = "Спасибо, что вы с нами. До встречи 12 сентября.";
  const farewellNames = "Рафаэль и Евгения";
  if (siteContent.final) {
    siteContent.final.text = farewellText;
  }
  if (siteContent.couple) {
    siteContent.couple.names = farewellNames;
  }

  // Только <span> внутри <p> — <div> в <p> браузер выносит наружу, текст «пропадает»
  const farewellMarkup = (text) =>
    `<span style="font-family: &quot;Great Vibes&quot;, cursive">${text}</span>`;

  const plainOf = (node) =>
    (node?.textContent || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();

  const applyFarewell = (id, nextPlain) => {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    const hasOnlySpan =
      el.childElementCount === 1 &&
      el.firstElementChild?.tagName === "SPAN" &&
      !el.querySelector("div");
    if (plainOf(el) === nextPlain && hasOnlySpan) {
      return;
    }
    el.innerHTML = farewellMarkup(nextPlain);
  };

  applyFarewell("finalText", farewellText);
  applyFarewell("finalSignature", farewellNames);

  try {
    const key =
      (window.WeddingTextEditor && window.WeddingTextEditor.RICH_COPY_KEY) ||
      "wedding-rich-copy-v1";
    const map = JSON.parse(localStorage.getItem(key) || "{}") || {};
    const plainHtml = (html) => {
      const tmp = document.createElement("div");
      tmp.innerHTML = html || "";
      return (tmp.textContent || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
    };
    let changed = false;
    if (plainHtml(map.finalText) !== farewellText || /<div/i.test(map.finalText || "")) {
      map.finalText = farewellMarkup(farewellText);
      changed = true;
    }
    if (plainHtml(map.finalSignature) !== farewellNames || /<div/i.test(map.finalSignature || "")) {
      map.finalSignature = farewellMarkup(farewellNames);
      changed = true;
    }
    if (changed) {
      localStorage.setItem(key, JSON.stringify(map));
    }
  } catch {
    /* ignore */
  }
}

function initPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) {
    return;
  }

  const minVisibleMs = 1800;
  const startedAt = Date.now();
  const dateNode = document.getElementById("preloaderDate");
  if (dateNode && !String(dateNode.textContent || "").trim() && siteContent?.wedding?.dateLabel) {
    dateNode.textContent = siteContent.wedding.dateLabel;
  }

  const revealAndHide = () => {
    preloader.classList.add("is-font-ready");
    const elapsed = Date.now() - startedAt;
    const wait = Math.max(0, minVisibleMs - elapsed);
    window.setTimeout(() => {
      preloader.classList.add("is-hidden");
    }, wait);
  };

  const waitForPreloaderFonts = () => {
    if (!document.fonts || typeof document.fonts.load !== "function") {
      return Promise.resolve();
    }
    return Promise.all([
      document.fonts.load('400 64px "Great Vibes"'),
      document.fonts.load('400 28px "EB Garamond"'),
    ])
      .then(() => document.fonts.ready)
      .catch(() => undefined);
  };

  waitForPreloaderFonts().then(revealAndHide);
}

function initWeddingMusic() {
  const audio = document.getElementById("weddingMusic");
  const music = siteContent.music;

  if (!audio || !music?.src) {
    return;
  }

  if (!audio.getAttribute("src")) {
    audio.src = music.src;
  }
  const targetVolume = Math.min(1, Math.max(0, Number(music.volume) || 0.65));
  audio.volume = targetVolume;
  audio.muted = false;
  audio.loop = true;
  audio.preload = "auto";
  audio.setAttribute("playsinline", "");
  audio.setAttribute("webkit-playsinline", "");

  const startAt = Math.max(0, Number(music.startAt) || 0);
  const label = [music.title, music.artist].filter(Boolean).join(" — ");
  if (label) {
    audio.setAttribute("aria-label", label);
  }

  let shouldResumeAfterTab = false;
  let unlockBound = false;
  let playRequest = null;

  function seekToStart() {
    if (startAt <= 0) {
      return;
    }
    if (audio.readyState >= 1 && Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = Math.min(startAt, Math.max(0, audio.duration - 0.25));
    }
  }

  function resetPlayback() {
    audio.pause();
    if (startAt > 0) {
      seekToStart();
    } else {
      try {
        audio.currentTime = 0;
      } catch (_) {
        /* ignore */
      }
    }
  }

  async function playNow() {
    if (playRequest) {
      try {
        await playRequest;
      } catch (_) {
        /* previous attempt settled */
      }
      if (!audio.paused) {
        return true;
      }
    }

    const attempt = (async () => {
      if (audio.paused && audio.currentTime < 0.2) {
        seekToStart();
      } else if (startAt > 0 && audio.currentTime < startAt - 0.15) {
        seekToStart();
      }
      audio.muted = false;
      audio.volume = targetVolume;
      await audio.play();
      shouldResumeAfterTab = true;
      removeUnlockListeners();
      return true;
    })();

    playRequest = attempt;
    try {
      return await attempt;
    } catch (error) {
      console.info("Автовоспроизведение музыки ожидает действия гостя:", error);
      return false;
    } finally {
      if (playRequest === attempt) {
        playRequest = null;
      }
    }
  }

  const unlock = async () => {
    if (!audio.paused) {
      removeUnlockListeners();
      return;
    }
    const started = await playNow();
    if (!started) {
      /* оставляем слушатели — следующая попытка после нового жеста */
    }
  };

  function bindUnlockOnInteraction() {
    if (unlockBound) {
      return;
    }
    unlockBound = true;
    document.addEventListener("pointerdown", unlock, { capture: true });
    document.addEventListener("touchstart", unlock, { capture: true, passive: true });
    document.addEventListener("click", unlock, { capture: true });
    window.addEventListener("scroll", unlock, { capture: true, passive: true });
    window.addEventListener("wheel", unlock, { capture: true, passive: true });
    window.addEventListener("touchmove", unlock, { capture: true, passive: true });
  }

  function removeUnlockListeners() {
    if (!unlockBound) {
      return;
    }
    document.removeEventListener("pointerdown", unlock, { capture: true });
    document.removeEventListener("touchstart", unlock, { capture: true });
    document.removeEventListener("click", unlock, { capture: true });
    window.removeEventListener("scroll", unlock, { capture: true });
    window.removeEventListener("wheel", unlock, { capture: true });
    window.removeEventListener("touchmove", unlock, { capture: true });
    unlockBound = false;
  }

  async function tryAutoplay() {
    if (!audio.paused) {
      return true;
    }
    const started = await playNow();
    if (!started) {
      bindUnlockOnInteraction();
    }
    return started;
  }

  if (startAt > 0) {
    audio.addEventListener("timeupdate", () => {
      if (audio.paused || audio.currentTime >= startAt - 0.15) {
        return;
      }
      seekToStart();
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      shouldResumeAfterTab = !audio.paused;
      audio.pause();
      return;
    }

    if (shouldResumeAfterTab) {
      playNow().then((ok) => {
        if (!ok) {
          bindUnlockOnInteraction();
        }
      });
    }
  });

  window.addEventListener("pagehide", (event) => {
    shouldResumeAfterTab = !audio.paused;
    audio.pause();
    if (!event.persisted) {
      resetPlayback();
      shouldResumeAfterTab = false;
    }
  });

  window.addEventListener("pageshow", (event) => {
    if (event.persisted && shouldResumeAfterTab) {
      playNow().then((ok) => {
        if (!ok) {
          bindUnlockOnInteraction();
        }
      });
    }
  });

  window.addEventListener("beforeunload", resetPlayback);

  // Сразу пробуем играть; если браузер блокирует — ждём клик / касание / пролистывание
  tryAutoplay();
  audio.addEventListener("loadeddata", () => {
    if (audio.paused) {
      tryAutoplay();
    }
  });
  audio.addEventListener(
    "canplay",
    () => {
      if (audio.paused) {
        tryAutoplay();
      }
    },
    { once: true }
  );
}

function initRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function enhanceRsvpSelect(select) {
  if (!select || select.dataset.rsvpEnhanced === "1") {
    return null;
  }
  select.dataset.rsvpEnhanced = "1";

  const wrap = document.createElement("div");
  wrap.className = "rsvp-select";
  select.parentNode.insertBefore(wrap, select);
  wrap.appendChild(select);
  select.classList.add("rsvp-select-native");
  select.setAttribute("tabindex", "-1");
  select.setAttribute("aria-hidden", "true");

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "rsvp-select-trigger";
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");

  const menu = document.createElement("ul");
  menu.className = "rsvp-select-menu";
  menu.setAttribute("role", "listbox");
  menu.hidden = true;

  const syncTrigger = () => {
    const opt = select.options[select.selectedIndex];
    trigger.textContent = opt ? opt.textContent : "";
    menu.querySelectorAll(".rsvp-select-option").forEach((item) => {
      item.setAttribute(
        "aria-selected",
        item.dataset.value === select.value ? "true" : "false"
      );
    });
  };

  const closeMenu = () => {
    menu.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    wrap.classList.remove("is-open");
  };

  const openMenu = () => {
    menu.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    wrap.classList.add("is-open");
  };

  Array.from(select.options).forEach((opt) => {
    const item = document.createElement("li");
    item.className = "rsvp-select-option";
    item.setAttribute("role", "option");
    item.dataset.value = opt.value;
    item.textContent = opt.textContent;
    item.addEventListener("click", (event) => {
      event.preventDefault();
      select.value = opt.value;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      syncTrigger();
      closeMenu();
    });
    menu.appendChild(item);
  });

  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    if (menu.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!wrap.contains(event.target)) {
      closeMenu();
    }
  });

  wrap.append(trigger, menu);
  syncTrigger();

  return { syncTrigger, closeMenu };
}

function initForm() {
  populateSelect("attendanceSelect", siteContent.rsvp.attendanceOptions);

  const form = document.getElementById("rsvpForm");
  const formMessage = document.getElementById("formMessage");
  const submitBtn = document.getElementById("submitBtn");

  if (!form || !formMessage || !submitBtn) {
    return;
  }

  const attendanceSelect = document.getElementById("attendanceSelect");
  const partnerField = document.getElementById("rsvpPartnerField");
  const partnerInput = document.getElementById("partnerNameInput");
  const commentField = form.querySelector('textarea[name="comment"]');
  const commentCounter = document.getElementById("commentCounter");
  const commentMax = Number(siteContent.rsvp.commentMaxLength) || 300;
  const attendanceUi = attendanceSelect ? enhanceRsvpSelect(attendanceSelect) : null;

  if (commentField) {
    commentField.maxLength = commentMax;
  }

  const updateCommentCounter = () => {
    if (!commentField || !commentCounter) {
      return;
    }
    const length = commentField.value.length;
    commentCounter.textContent = `${length} / ${commentMax}`;
  };

  const syncPartnerField = () => {
    if (!attendanceSelect || !partnerField || !partnerInput) {
      return;
    }
    const withPartner = attendanceSelect.value === "С парой";
    partnerField.hidden = !withPartner;
    partnerInput.required = withPartner;
    if (!withPartner) {
      partnerInput.value = "";
    }
  };

  if (commentField) {
    commentField.addEventListener("input", updateCommentCounter);
    updateCommentCounter();
  }

  if (attendanceSelect) {
    attendanceSelect.addEventListener("change", syncPartnerField);
    syncPartnerField();
  }

  // Не оставляем прошлое «Спасибо» между полями после перезагрузки
  formMessage.textContent = "";
  formMessage.classList.remove("is-success", "is-error");
  formMessage.removeAttribute("style");

  form.addEventListener("reset", () => {
    window.requestAnimationFrame(() => {
      attendanceUi?.syncTrigger();
      syncPartnerField();
      updateCommentCounter();
    });
  });

  const styleFormFeedback = (kind) => {
    formMessage.style.setProperty("font-family", '"EB Garamond", serif', "important");
    formMessage.style.setProperty("font-size", "21px", "important");
    formMessage.style.setProperty("line-height", "1.2", "important");
    formMessage.style.setProperty("font-weight", "400", "important");
    formMessage.style.setProperty("font-style", "normal", "important");
    if (kind === "error") {
      formMessage.style.setProperty("color", "#c98a8a", "important");
      formMessage.classList.remove("is-success");
      formMessage.classList.add("is-error");
    } else if (kind === "success") {
      formMessage.style.setProperty(
        "color",
        "var(--rsvp-color-body, #c0d758)",
        "important"
      );
      formMessage.classList.remove("is-error");
      formMessage.classList.add("is-success");
    }
  };

  form.addEventListener("submit", (event) => {
    if (document.body.classList.contains("is-text-editing")) {
      event.preventDefault();
      return;
    }
    event.preventDefault();

    if (!form.checkValidity()) {
      formMessage.textContent = "Пожалуйста, заполните обязательные поля.";
      styleFormFeedback("error");
      return;
    }

    const endpoint = siteContent.rsvp.endpoint;
    if (!endpoint) {
      formMessage.textContent =
        siteContent.rsvp.errorText || "Отправка пока не настроена.";
      styleFormFeedback("error");
      return;
    }

    const formData = new FormData(form);
    const raw = Object.fromEntries(formData.entries());
    const payload = {
      name: String(raw.name || "").trim(),
      attendance: String(raw.attendance || "").trim(),
      partnerName: String(raw.partnerName || "").trim(),
      comment: String(raw.comment || "").trim(),
    };

    // Мгновенный отклик — не ждём ответ Google
    submitBtn.disabled = true;
    formMessage.textContent = siteContent.rsvp.successText;
    styleFormFeedback("success");
    form.reset();
    attendanceUi?.syncTrigger();
    syncPartnerField();
    updateCommentCounter();

    fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    }).catch(() => {
      formMessage.textContent =
        siteContent.rsvp.errorText ||
        "Не удалось отправить анкету. Попробуйте ещё раз.";
      styleFormFeedback("error");
      submitBtn.disabled = false;
    });
  });
}

function isSizeThemeVar(cssVar) {
  return cssVar.includes("-size-");
}

function normalizeThemeVarValue(cssVar, value, settingType = "") {
  if (value === undefined || value === null || value === "") {
    return value;
  }
  const raw = String(value).trim();
  if (settingType === "font-style-auto") {
    return raw === "italic" ? "italic" : "normal";
  }
  if (settingType === "font-weight-auto" || /--[\w-]+-font-[\w-]+-weight$/.test(cssVar)) {
    const weight = Number.parseInt(raw, 10);
    return Number.isNaN(weight) ? "400" : String(weight);
  }
  if (settingType === "align" || /--[\w-]+-align-(title|body|heading)$/.test(cssVar)) {
    return window.WeddingFontTheme.normalizeTextAlign(raw);
  }
  if (settingType === "font" || /^--[\w-]+-font-/.test(cssVar)) {
    const fontName = raw.replace(/["']/g, "").trim();
    return fontName ? `"${fontName}"` : raw;
  }
  if (settingType === "size-rem" || isSizeThemeVar(cssVar)) {
    // Явный px из freeze-lock — сохраняем (не превращаем 42px в 42rem)
    if (/px$/i.test(raw)) {
      return raw;
    }
    const numeric = Number.parseFloat(raw);
    if (Number.isNaN(numeric)) {
      return raw;
    }
    // Ошибочный экспорт «42rem/21rem» для размеров секций → px
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

function getThemeVarValue(cssVar) {
  const inline = document.documentElement.style.getPropertyValue(cssVar).trim();
  if (inline) {
    return inline;
  }
  return getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
}

function setThemeVar(cssVar, value, settingType = "") {
  document.documentElement.style.setProperty(
    cssVar,
    normalizeThemeVarValue(cssVar, value, settingType)
  );
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function hexToRgb(hex) {
  const sanitized = hex.replace("#", "");
  const bigint = Number.parseInt(sanitized, 16);
  if (sanitized.length !== 6 || Number.isNaN(bigint)) {
    return null;
  }
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function shadeHex(hex, factor) {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return hex;
  }
  const adjust = (v) => clamp(Math.round(v * factor), 0, 255);
  const toHex = (v) => v.toString(16).padStart(2, "0");
  return `#${toHex(adjust(rgb.r))}${toHex(adjust(rgb.g))}${toHex(adjust(rgb.b))}`;
}

function refreshHeroGradientFromLinen(linenHex) {
  setThemeVar("--hero-grad-top", `${linenHex}6b`);
  setThemeVar("--hero-grad-bottom", `${linenHex}bf`);
  setThemeVar("--hero-radial-1", shadeHex(linenHex, 0.98));
  setThemeVar("--hero-radial-2", shadeHex(linenHex, 0.92));
  setThemeVar("--hero-radial-3", shadeHex(linenHex, 0.84));
}

function saveTheme() {
  const payload = {};
  getThemeSettings().forEach((item) => {
    if (item.type === "font-heading" || item.type === "font-body") {
      payload[item.cssVar] = window.WeddingFontTheme.findFontKeyFromTheme(item.cssVar);
      return;
    }
    if (item.type === "font-emphasis") {
      return;
    }
    if (item.type === "font-style-auto" || item.type === "font-weight-auto") {
      const current = getThemeVarValue(item.cssVar);
      payload[item.cssVar] = normalizeThemeVarValue(item.cssVar, current, item.type);
      return;
    }
    if (item.type === "align") {
      const current = getThemeVarValue(item.cssVar);
      payload[item.cssVar] = window.WeddingFontTheme.normalizeTextAlign(current || item.defaultValue);
      return;
    }
    const current = getThemeVarValue(item.cssVar);
    payload[item.cssVar] = normalizeThemeVarValue(item.cssVar, current, item.type);
  });
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(payload));
}

function getThemeSettings() {
  return getAllDesignThemeSettings();
}

function applyLegacyTheme(saved) {
  Object.entries(LEGACY_THEME_MAP).forEach(([legacy, modern]) => {
    if (saved[legacy]) {
      saved[modern] = saved[legacy];
    }
  });
}

function loadTheme() {
  const raw = localStorage.getItem(THEME_STORAGE_KEY);
  if (!raw) {
    return;
  }
  try {
    applyThemeData(JSON.parse(raw), { persist: false, includeCopy: false });
  } catch (error) {
    console.warn("Theme parsing failed:", error);
  }
}

function collectThemeSnapshot() {
  saveTheme();
  let theme = {};
  try {
    theme = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) || "{}");
  } catch {
    theme = {};
  }

  const copy = loadCopyOverrides();
  const editor = collectEditorLayoutSnapshot();
  return {
    version: 2,
    exportedAt: new Date().toISOString(),
    theme,
    ...(copy ? { copy } : {}),
    editor,
  };
}

const EDITOR_RICH_COPY_KEY = "wedding-rich-copy-v1";
const EDITOR_SIZES_KEY = "wedding-editable-sizes-v1";
const EDITOR_FIELD_SIZES_KEY = "wedding-field-sizes-v1";

/** Снимок верхней панели текста + пунктирных размеров блоков */
function collectEditorLayoutSnapshot() {
  if (window.WeddingTextEditor && typeof window.WeddingTextEditor.persistActive === "function") {
    try {
      window.WeddingTextEditor.persistActive();
    } catch {
      /* ignore */
    }
  }
  if (window.WeddingResize && typeof window.WeddingResize.flush === "function") {
    try {
      window.WeddingResize.flush();
    } catch {
      /* ignore */
    }
  }

  const readJson = (key) => {
    try {
      const data = JSON.parse(localStorage.getItem(key) || "{}");
      return data && typeof data === "object" ? data : {};
    } catch {
      return {};
    }
  };

  return {
    richCopy: readJson(EDITOR_RICH_COPY_KEY),
    editableSizes: readJson(EDITOR_SIZES_KEY),
    fieldSizes: readJson(EDITOR_FIELD_SIZES_KEY),
  };
}

function applyEditorLayoutSnapshot(editor) {
  if (!editor || typeof editor !== "object") {
    return;
  }
  if (editor.richCopy && typeof editor.richCopy === "object") {
    localStorage.setItem(EDITOR_RICH_COPY_KEY, JSON.stringify(editor.richCopy));
  }
  if (editor.editableSizes && typeof editor.editableSizes === "object") {
    localStorage.setItem(EDITOR_SIZES_KEY, JSON.stringify(editor.editableSizes));
  }
  if (editor.fieldSizes && typeof editor.fieldSizes === "object") {
    localStorage.setItem(EDITOR_FIELD_SIZES_KEY, JSON.stringify(editor.fieldSizes));
  }
  if (window.WeddingTextEditor && typeof window.WeddingTextEditor.applySavedHtml === "function") {
    window.WeddingTextEditor.applySavedHtml();
  }
  if (window.WeddingResize && typeof window.WeddingResize.refresh === "function") {
    window.WeddingResize.refresh();
  }
}

function buildMobileThemeLockPayload() {
  const snapshot = collectThemeSnapshot();
  return {
    version: 2,
    scope: "mobile-theme-lock",
    lockedAt: new Date().toISOString(),
    comment:
      "Фиксация: панель дизайна + верхняя панель текста (шрифт/размер/цвет) + размеры пунктирных блоков. Замените mobile-theme-lock.json этим файлом.",
    theme: snapshot.theme,
    ...(snapshot.copy ? { copy: snapshot.copy } : {}),
    editor: snapshot.editor,
  };
}

async function fetchRepoMobileThemeLock() {
  try {
    const response = await fetch(MOBILE_THEME_LOCK_FILE);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    if (data && data.theme && typeof data.theme === "object" && Object.keys(data.theme).length) {
      return data;
    }
  } catch (error) {
    console.warn("Mobile theme lock file unavailable:", error);
  }
  return null;
}

function loadDeviceMobileThemeLock() {
  try {
    const data = JSON.parse(localStorage.getItem(MOBILE_THEME_LOCK_STORAGE_KEY) || "null");
    if (data && data.theme && typeof data.theme === "object" && Object.keys(data.theme).length) {
      return data;
    }
  } catch {
    return null;
  }
  return null;
}

async function applySiteThemeLockLayers() {
  const repoLock = await fetchRepoMobileThemeLock();
  const deviceLock = loadDeviceMobileThemeLock();

  if (repoLock) {
    applyThemeData(repoLock, { persist: false, includeCopy: true });
    return;
  }

  if (deviceLock) {
    applyThemeData(deviceLock, { persist: false, includeCopy: Boolean(deviceLock.copy) });
  }
}

function exportSiteThemeLock() {
  const payload = buildMobileThemeLockPayload();
  localStorage.setItem(MOBILE_THEME_LOCK_STORAGE_KEY, JSON.stringify(payload));

  const datePart = new Date().toISOString().slice(0, 10);
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `mobile-theme-lock-${datePart}.json`;
  link.click();
  URL.revokeObjectURL(url);

  setThemeTransferStatus(
    "Зафиксировано: цвета панели + текст/шрифты верхней панели + размеры пунктирных блоков. Скачанный JSON отправьте в Cursor или замените им mobile-theme-lock.json.",
    "is-success"
  );
}

function applyCopyFromSnapshot(copy) {
  if (!copy || typeof copy !== "object") {
    return;
  }

  if (copy.heroTitle) {
    siteContent.hero.title = copy.heroTitle;
  }
  if (copy.heroDate) {
    siteContent.wedding.dateLabel = copy.heroDate;
  }
  if (copy.inviteKicker) {
    siteContent.hero.inviteKicker = copy.inviteKicker;
  }
  if (copy.inviteBody) {
    siteContent.hero.text = copy.inviteBody;
  }
  if (copy.rsvpTitle) {
    siteContent.rsvp.title = copy.rsvpTitle;
  }
  if (copy.rsvpIntro) {
    siteContent.rsvp.intro = copy.rsvpIntro;
  }

  saveCopyOverrides({
    heroTitle: siteContent.hero.title,
    heroDate: siteContent.wedding.dateLabel,
    inviteKicker: siteContent.hero.inviteKicker,
    inviteBody: siteContent.hero.text,
    rsvpTitle: siteContent.rsvp.title,
    rsvpIntro: siteContent.rsvp.intro,
  });
  renderStaticContent();
  syncCopyInputs();
}

function applyThemeData(saved, options = {}) {
  const { persist = true, includeCopy = true } = options;
  const theme = saved && saved.theme && typeof saved.theme === "object" ? saved.theme : saved;

  if (!theme || typeof theme !== "object") {
    throw new Error("В файле нет данных темы");
  }

  applyLegacyTheme(theme);
  getThemeSettings().forEach((item) => {
    if (!theme[item.cssVar]) {
      return;
    }
    if (item.type === "font-heading" || item.type === "font-body") {
      window.WeddingFontTheme.applyFontThemeSetting(
        item.cssVar,
        theme[item.cssVar],
        theme[window.WeddingFontTheme.fontStyleCssVar(item.cssVar)]
      );
      return;
    }
    if (item.type === "font-emphasis") {
      return;
    }
    if (item.type === "align") {
      window.WeddingFontTheme.applyAlignThemeSetting(item.cssVar, theme[item.cssVar]);
      return;
    }
    setThemeVar(item.cssVar, theme[item.cssVar], item.type);
  });

  if (persist) {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  }

  const linen = theme["--linen"];
  if (linen) {
    refreshHeroGradientFromLinen(String(linen).replace(/["']/g, ""));
  }

  if (includeCopy && saved.copy) {
    applyCopyFromSnapshot(saved.copy);
  }

  if (saved.editor) {
    applyEditorLayoutSnapshot(saved.editor);
  }

  syncThemeInputs();
}

function setThemeTransferStatus(message, type = "") {
  const node = document.getElementById("themeTransferStatus");
  if (!node) {
    return;
  }
  node.textContent = message;
  node.classList.remove("is-error", "is-success");
  if (type) {
    node.classList.add(type);
  }
}

function exportThemeToFile() {
  const snapshot = collectThemeSnapshot();
  const datePart = new Date().toISOString().slice(0, 10);
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `wedding-design-settings-${datePart}.json`;
  link.click();
  URL.revokeObjectURL(url);
  setThemeTransferStatus(
    "Файл скачан (включая текст и размеры блоков из верхней панели). Перенесите на iPhone или отправьте в Cursor.",
    "is-success"
  );
}

function importThemeFromFile(file) {
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || ""));
      applyThemeData(parsed, { persist: true, includeCopy: true });
      setThemeTransferStatus("Настройки загружены и применены.", "is-success");
    } catch (error) {
      console.warn("Theme import failed:", error);
      setThemeTransferStatus("Не удалось прочитать файл. Нужен JSON из «Скачать настройки».", "is-error");
    }
  };
  reader.onerror = () => {
    setThemeTransferStatus("Ошибка чтения файла.", "is-error");
  };
  reader.readAsText(file);
}

function readInputValue(input, cssVar, settingType) {
  if (settingType === "font") {
    return `"${input.value}"`;
  }
  if (settingType === "opacity-percent") {
    const min = Number.parseInt(input.min, 10) || 0;
    const max = Number.parseInt(input.max, 10) || 100;
    let value = Number.parseInt(input.value, 10);
    if (Number.isNaN(value)) {
      value = min;
    }
    return String(Math.min(max, Math.max(min, value)));
  }
  if (settingType === "size-rem") {
    const min = Number.parseFloat(input.min) || 0.5;
    const max = Number.parseFloat(input.max) || 6;
    const step = Number.parseFloat(input.step) || 0.05;
    let size = Number.parseFloat(input.value);
    if (Number.isNaN(size)) {
      size = min;
    }
    size = Math.min(max, Math.max(min, size));
    const decimals = String(step).includes(".") ? String(step).split(".")[1].length : 0;
    return `${size.toFixed(decimals)}rem`;
  }
  if (settingType === "shadow") {
    const shadow = Number.parseInt(input.value, 10);
    return `0px 0px ${shadow}px rgba(24, 32, 20, 0.5)`;
  }
  return input.value;
}

function syncThemeInputs() {
  getThemeSettings().forEach((item) => {
    const input = document.querySelector(`[data-css-var="${item.cssVar}"]`);
    if (!input) {
      return;
    }
    const current = getThemeVarValue(item.cssVar);

    if (input.dataset.settingType === "opacity-percent") {
      const fallback = Number.parseInt(item.defaultValue, 10) || 42;
      input.value = String(Number.parseInt(current, 10) || fallback);
      return;
    }
    if (input.dataset.settingType === "size-rem") {
      const fallback = Number.parseFloat(item.defaultValue) || 1;
      const parsed = Number.parseFloat(current);
      input.value = String(Number.isNaN(parsed) ? fallback : parsed);
      const valueHint = input.parentElement && input.parentElement.querySelector(".theme-range-value");
      if (valueHint) {
        valueHint.textContent = `${input.value} rem`;
      }
      return;
    }
    if (input.dataset.settingType === "shadow") {
      const match = current.match(/0px 0px (\d+)px/);
      input.value = match ? match[1] : String(shadowToPx(item.defaultValue));
      return;
    }
    if (input.dataset.settingType === "font") {
      const key = window.WeddingFontTheme.findFontKeyFromTheme(item.cssVar);
      input.value = key;
      window.WeddingFontTheme.previewFontOnControl(input, key);
      return;
    }
    if (input.dataset.settingType === "font-emphasis") {
      const style =
        getThemeVarValue(window.WeddingFontTheme.fontStyleCssVar(item.fontCssVar || input.dataset.cssVar)) ||
        "normal";
      const weight =
        getThemeVarValue(window.WeddingFontTheme.fontWeightCssVar(item.fontCssVar || input.dataset.cssVar)) ||
        "400";
      input.value = window.WeddingFontTheme.emphasisFromStyleWeight(style, weight);
      return;
    }
    if (input.dataset.settingType === "align") {
      input.value = window.WeddingFontTheme.normalizeTextAlign(current || item.defaultValue);
      return;
    }
    if (input.type === "color") {
      input.value = current.startsWith("#") ? current : toColorHex(item.defaultValue);
    }
  });
}

function initThemePanel() {
  buildDesignPanelMarkup();

  const onThemeControlChange = (event) => {
    const cssVar = event.target.dataset.cssVar;
    const settingType = event.target.dataset.settingType;

    if (settingType === "font") {
      const emphasisInput = document.querySelector(
        `[data-setting-type="font-emphasis"][data-css-var="${cssVar}"]`
      );
      const emphasis = emphasisInput ? emphasisInput.value : "regular";
      window.WeddingFontTheme.applyFontThemeSetting(cssVar, event.target.value, undefined, emphasis);
      saveTheme();
      return;
    }

    if (settingType === "font-emphasis") {
      const fontKey = window.WeddingFontTheme.findFontKeyFromTheme(cssVar);
      window.WeddingFontTheme.applyFontThemeSetting(cssVar, fontKey, undefined, event.target.value);
      saveTheme();
      return;
    }

    if (settingType === "align") {
      window.WeddingFontTheme.applyAlignThemeSetting(cssVar, event.target.value);
      saveTheme();
      return;
    }

    const value = readInputValue(event.target, cssVar, settingType);
    setThemeVar(cssVar, value, settingType);

    if (cssVar === "--linen") {
      refreshHeroGradientFromLinen(event.target.value);
    }
    saveTheme();
  };

  document.querySelectorAll("#themePanelBody [data-css-var]").forEach((input) => {
    input.addEventListener("input", onThemeControlChange);
    input.addEventListener("change", onThemeControlChange);
  });

  const exportBtn = document.getElementById("themeExportBtn");
  if (exportBtn) {
    exportBtn.addEventListener("click", exportThemeToFile);
  }

  const importInput = document.getElementById("themeImportInput");
  if (importInput) {
    importInput.addEventListener("change", (event) => {
      const file = event.target.files && event.target.files[0];
      importThemeFromFile(file);
      event.target.value = "";
    });
  }

  const resetBtn = document.getElementById("themeResetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      getThemeSettings().forEach((item) => {
        if (item.type === "font-heading" || item.type === "font-body") {
          window.WeddingFontTheme.applyFontThemeSetting(item.cssVar, item.defaultValue);
          return;
        }
        if (item.type === "align") {
          window.WeddingFontTheme.applyAlignThemeSetting(item.cssVar, item.defaultValue);
          return;
        }
        setThemeVar(item.cssVar, item.defaultValue, item.type);
      });
      refreshHeroGradientFromLinen("#f9f6f0");
      localStorage.removeItem(THEME_STORAGE_KEY);
      localStorage.removeItem(COPY_STORAGE_KEY);
      localStorage.removeItem(MOBILE_THEME_LOCK_STORAGE_KEY);
      if (window.WeddingTextEditor && window.WeddingTextEditor.RICH_COPY_KEY) {
        localStorage.removeItem(window.WeddingTextEditor.RICH_COPY_KEY);
      }
      localStorage.removeItem(EDITOR_RICH_COPY_KEY);
      localStorage.removeItem(EDITOR_SIZES_KEY);
      localStorage.removeItem(EDITOR_FIELD_SIZES_KEY);
      siteContent.hero.title = "Наша свадьба";
      siteContent.wedding.dateLabel = "12 сентября 2026";
      siteContent.hero.inviteKicker = "Дорогие друзья и родные!";
      siteContent.hero.text =
        "Мы рады пригласить вас на самый важный день в нашей жизни — свадьбу! Этот день мы мечтаем провести в кругу самых близких. Мы очень надеемся, что этот день будет уютным, семейным и весёлым.";
      renderStaticContent();
      syncThemeInputs();
      syncCopyInputs();
      setThemeTransferStatus("");
    });
  }

  const panel = document.getElementById("themePanel");
  const toggle = document.getElementById("themePanelToggle");
  if (panel && toggle) {
    if (EDITOR_SPLIT_MODE) {
      panel.classList.remove("is-collapsed");
    } else {
      panel.classList.add("is-collapsed");
      toggle.addEventListener("click", () => {
        panel.classList.toggle("is-collapsed");
      });
    }
  }

  const mobileLockBtn = document.getElementById("themeMobileLockBtn");
  if (mobileLockBtn) {
    mobileLockBtn.addEventListener("click", exportSiteThemeLock);
  }

  applySiteThemeLockLayers().finally(() => {
    // Не вызываем loadTheme() поверх repo lock — иначе localStorage перебьёт фиксацию
    migrateInviteCopyOnce();
    const currentLinen = getComputedStyle(document.documentElement)
      .getPropertyValue("--linen")
      .trim();
    if (currentLinen) {
      refreshHeroGradientFromLinen(currentLinen);
    }
    syncThemeInputs();
    syncCopyInputs();
    renderStaticContent();
    enforceCanonicalFarewellCopy();
    applyDesktopFarewellSize();
  });
}

const ALIGN_UNIFY_STORAGE_KEY = "wedding-align-unify-left-v1";
const FONT_REGULAR_STORAGE_KEY = "wedding-font-regular-v1";
const INVITE_COPY_STORAGE_KEY = "wedding-invite-copy-v2";
const INVITE_BODY_CANONICAL =
  "Мы рады пригласить вас на самый важный день в нашей жизни — свадьбу! Этот день мы мечтаем провести в кругу самых близких. Мы очень надеемся, что этот день будет уютным, семейным и весёлым.";

function migrateContentAlignToLeftOnce() {
  if (localStorage.getItem(ALIGN_UNIFY_STORAGE_KEY) === "1") {
    return;
  }
  getThemeSettings().forEach((item) => {
    if (item.type === "align") {
      window.WeddingFontTheme.applyAlignThemeSetting(item.cssVar, "left");
    }
  });
  localStorage.setItem(ALIGN_UNIFY_STORAGE_KEY, "1");
  saveTheme();
}

function migrateFontsToRegularWeightOnce() {
  if (localStorage.getItem(FONT_REGULAR_STORAGE_KEY) === "1") {
    return;
  }
  getThemeSettings().forEach((item) => {
    if (item.type !== "font-heading" && item.type !== "font-body") {
      return;
    }
    const key = window.WeddingFontTheme.findFontKeyFromTheme(item.cssVar);
    const style =
      getThemeVarValue(window.WeddingFontTheme.fontStyleCssVar(item.cssVar)) || "normal";
    const emphasis = style === "italic" ? "italic" : "regular";
    window.WeddingFontTheme.applyFontThemeSetting(item.cssVar, key, undefined, emphasis);
  });
  localStorage.setItem(FONT_REGULAR_STORAGE_KEY, "1");
  saveTheme();
}

function migrateInviteCopyOnce() {
  if (localStorage.getItem(INVITE_COPY_STORAGE_KEY) === "1") {
    return;
  }
  const current = String(siteContent.hero.text || "");
  if (current.includes("Мы счастливы") || current.includes("окружении природы")) {
    siteContent.hero.text = INVITE_BODY_CANONICAL;
    saveCopyOverrides({
      heroTitle: siteContent.hero.title,
      heroDate: siteContent.wedding.dateLabel,
      inviteKicker: siteContent.hero.inviteKicker,
      inviteBody: siteContent.hero.text,
      rsvpTitle: siteContent.rsvp.title,
      rsvpIntro: siteContent.rsvp.intro,
    });
  }
  localStorage.setItem(INVITE_COPY_STORAGE_KEY, "1");
}

function syncCopyInputs() {
  const titleInput = document.getElementById("heroTitleTextInput");
  const dateInput = document.getElementById("heroDateTextInput");
  const inviteKickerInput = document.getElementById("inviteKickerTextInput");
  const inviteBodyInput = document.getElementById("inviteBodyTextInput");
  const rsvpTitleInput = document.getElementById("rsvpTitleTextInput");
  const rsvpIntroInput = document.getElementById("rsvpIntroTextInput");
  if (titleInput) {
    titleInput.value = siteContent.hero.title;
  }
  if (dateInput) {
    dateInput.value = siteContent.wedding.dateLabel;
  }
  if (inviteKickerInput) {
    inviteKickerInput.value = siteContent.hero.inviteKicker;
  }
  if (inviteBodyInput) {
    inviteBodyInput.value = siteContent.hero.text;
  }
  if (rsvpTitleInput) {
    rsvpTitleInput.value = siteContent.rsvp.title;
  }
  if (rsvpIntroInput) {
    rsvpIntroInput.value = siteContent.rsvp.intro;
  }
}

function initEditableCopy() {
  const saved = loadCopyOverrides();
  if (saved) {
    if (saved.heroTitle) {
      siteContent.hero.title = saved.heroTitle;
    }
    if (saved.heroDate) {
      siteContent.wedding.dateLabel = saved.heroDate;
    }
    if (saved.inviteKicker) {
      siteContent.hero.inviteKicker = saved.inviteKicker;
    }
    if (saved.inviteBody) {
      siteContent.hero.text = saved.inviteBody;
    }
    if (saved.rsvpTitle) {
      siteContent.rsvp.title = saved.rsvpTitle;
    }
    if (saved.rsvpIntro) {
      siteContent.rsvp.intro = saved.rsvpIntro;
    }
  }
  renderStaticContent();
  syncCopyInputs();

  const titleInput = document.getElementById("heroTitleTextInput");
  const dateInput = document.getElementById("heroDateTextInput");
  const inviteKickerInput = document.getElementById("inviteKickerTextInput");
  const inviteBodyInput = document.getElementById("inviteBodyTextInput");
  const rsvpTitleInput = document.getElementById("rsvpTitleTextInput");
  const rsvpIntroInput = document.getElementById("rsvpIntroTextInput");

  const persist = () => {
    saveCopyOverrides({
      heroTitle: siteContent.hero.title,
      heroDate: siteContent.wedding.dateLabel,
      inviteKicker: siteContent.hero.inviteKicker,
      inviteBody: siteContent.hero.text,
      rsvpTitle: siteContent.rsvp.title,
      rsvpIntro: siteContent.rsvp.intro,
    });
  };

  if (titleInput) {
    titleInput.addEventListener("input", (event) => {
      siteContent.hero.title = event.target.value || "Наша свадьба";
      renderStaticContent();
      persist();
    });
  }

  if (dateInput) {
    dateInput.addEventListener("input", (event) => {
      siteContent.wedding.dateLabel = event.target.value || "12 сентября 2026";
      renderStaticContent();
      persist();
    });
  }

  if (inviteKickerInput) {
    inviteKickerInput.addEventListener("input", (event) => {
      siteContent.hero.inviteKicker = event.target.value || "Дорогие друзья и родные!";
      renderStaticContent();
      persist();
    });
  }

  if (inviteBodyInput) {
    inviteBodyInput.addEventListener("input", (event) => {
      siteContent.hero.text = event.target.value;
      renderStaticContent();
      persist();
    });
  }

  if (rsvpTitleInput) {
    rsvpTitleInput.addEventListener("input", (event) => {
      siteContent.rsvp.title = event.target.value || "Анкета гостя";
      renderStaticContent();
      persist();
    });
  }

  if (rsvpIntroInput) {
    rsvpIntroInput.addEventListener("input", (event) => {
      siteContent.rsvp.intro = event.target.value;
      renderStaticContent();
      persist();
    });
  }
}

renderStaticContent();
renderTimeline();
renderPalette();

let paletteLayoutTimer;
window.addEventListener("resize", () => {
  clearTimeout(paletteLayoutTimer);
  paletteLayoutTimer = setTimeout(renderPalette, 150);
});

function initResizableBlocks() {
  const FIELD_SIZE_KEY = "wedding-field-sizes-v1";
  const EDITABLE_SIZE_KEY = "wedding-editable-sizes-v1";

  const loadMap = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key) || "{}") || {};
    } catch {
      return {};
    }
  };

  const saveMap = (key, map) => {
    localStorage.setItem(key, JSON.stringify(map));
  };

  const shouldWrapInTextShell = (node) => {
    if (!node || !node.id) {
      return false;
    }
    // Прощание: без resize-оболочки — иначе сбрасывается выделение текста
    if (node.id === "finalText" || node.id === "finalSignature") {
      return false;
    }
    if (node.closest?.("footer.final")) {
      return false;
    }
    if (node.classList.contains("btn")) {
      return false;
    }
    if (node.closest(".btn")) {
      return false;
    }
    if (node.closest("#rsvpForm")) {
      return false;
    }
    if (node.closest(".rsvp-field-shell")) {
      return false;
    }
    return true;
  };

  const ensureTextSizeShell = (node) => {
    if (!shouldWrapInTextShell(node)) {
      return null;
    }
    if (node.parentElement?.classList.contains("text-size-shell")) {
      const existing = node.parentElement;
      existing.dataset.sizeFor = node.id;
      return existing;
    }
    const shell = document.createElement("div");
    shell.className = "text-size-shell";
    shell.dataset.sizeFor = node.id;
    node.parentNode.insertBefore(shell, node);
    shell.appendChild(node);
    return shell;
  };

  const collectEditableNodes = () => {
    if (window.WeddingTextEditor && typeof window.WeddingTextEditor.getAllEditableIds === "function") {
      return window.WeddingTextEditor.getAllEditableIds()
        .map((id) => document.getElementById(id))
        .filter(Boolean);
    }
    return [...document.querySelectorAll("[id]")].filter((node) => node.dataset.editable === "true");
  };

  /** Кнопка или text-size-shell — куда пишем width/height */
  const sizeTarget = (node) => {
    if (!node) {
      return null;
    }
    if (node.classList?.contains("btn")) {
      return node;
    }
    const btn = node.closest?.(".btn");
    if (btn) {
      return btn;
    }
    const shell = node.closest?.(".text-size-shell");
    if (shell) {
      return shell;
    }
    return node;
  };

  const ensureAllTextShells = () => {
    collectEditableNodes().forEach((node) => {
      ensureTextSizeShell(node);
    });
  };

  const applyFieldSizes = () => {
    const map = loadMap(FIELD_SIZE_KEY);
    document.querySelectorAll("#rsvpForm [data-field-size]").forEach((shell) => {
      const key = shell.getAttribute("data-field-size");
      const size = map[key];
      if (!size) {
        return;
      }
      if (size.width) {
        shell.style.width = size.width;
      }
      if (size.height) {
        shell.style.height = size.height;
      }
    });
  };

  const applyEditableSizes = () => {
    const map = loadMap(EDITABLE_SIZE_KEY);
    const skipIds = new Set([
      "taxiRouteLabel",
      "transitRouteLabel",
      "routeLabel",
      "finalText",
      "finalSignature",
    ]);
    Object.entries(map).forEach(([id, size]) => {
      if (skipIds.has(id)) {
        return;
      }
      const node = document.getElementById(id);
      const target = sizeTarget(node);
      if (!target || !size) {
        return;
      }
      if (size.width) {
        target.style.width = size.width;
      }
      if (size.height) {
        target.style.height = size.height;
      }
    });
    // Кнопки маршрута всегда одного размера — сброс инлайна от редактора
    document.querySelectorAll(".location-routes > .location-route-btn").forEach((btn) => {
      btn.style.removeProperty("width");
      btn.style.removeProperty("height");
      btn.style.removeProperty("min-width");
      btn.style.removeProperty("min-height");
      btn.style.removeProperty("max-width");
      btn.style.removeProperty("padding");
      btn.style.removeProperty("font-size");
      btn.style.removeProperty("background");
      btn.style.removeProperty("color");
    });
  };

  const persistShell = (shell) => {
    const key = shell.getAttribute("data-field-size");
    if (!key) {
      return;
    }
    const map = loadMap(FIELD_SIZE_KEY);
    map[key] = {
      width: shell.style.width || `${shell.offsetWidth}px`,
      height: shell.style.height || `${shell.offsetHeight}px`,
    };
    saveMap(FIELD_SIZE_KEY, map);
  };

  const persistEditable = (node) => {
    if (!node || !node.id) {
      return;
    }
    if (
      node.id === "taxiRouteLabel" ||
      node.id === "transitRouteLabel" ||
      node.id === "routeLabel" ||
      node.id === "finalText" ||
      node.id === "finalSignature"
    ) {
      return;
    }
    if (node.closest?.("footer.final")) {
      return;
    }
    if (node.closest?.(".location-routes > .location-route-btn")) {
      return;
    }
    const target = sizeTarget(node);
    if (!target) {
      return;
    }
    const map = loadMap(EDITABLE_SIZE_KEY);
    map[node.id] = {
      width: target.style.width || `${target.offsetWidth}px`,
      height: target.style.height || `${target.offsetHeight}px`,
    };
    saveMap(EDITABLE_SIZE_KEY, map);
  };

  const refresh = () => {
    ensureAllTextShells();
    // Убрать старые resize-оболочки у прощания (ломали выделение)
    document.querySelectorAll("footer.final .text-size-shell").forEach((shell) => {
      while (shell.firstChild) {
        shell.parentNode.insertBefore(shell.firstChild, shell);
      }
      shell.remove();
    });
    ["finalText", "finalSignature"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) {
        return;
      }
      el.style.removeProperty("height");
      el.style.removeProperty("width");
      el.style.removeProperty("min-height");
    });
    applyFieldSizes();
    applyEditableSizes();
  };

  refresh();

  document.addEventListener("mouseup", () => {
    if (!document.body.classList.contains("is-text-editing")) {
      return;
    }
    document.querySelectorAll("#rsvpForm [data-field-size]").forEach(persistShell);
    collectEditableNodes().forEach(persistEditable);
  });

  const flush = () => {
    document.querySelectorAll("#rsvpForm [data-field-size]").forEach(persistShell);
    collectEditableNodes().forEach(persistEditable);
  };

  window.WeddingResize = { refresh, flush };
}

updateCountdown();
initWeddingMusic();
initPreloader();
initRevealAnimations();
initForm();
initResizableBlocks();
initThemePanel();
initEditableCopy();
applyMobileFarewellType();
window.setTimeout(applyMobileFarewellType, 400);
window.setTimeout(applyMobileFarewellType, 1200);
enforceCanonicalFarewellCopy();
window.setTimeout(enforceCanonicalFarewellCopy, 500);
applyDesktopFarewellSize();
window.setTimeout(applyDesktopFarewellSize, 500);
window.setTimeout(applyDesktopFarewellSize, 1300);
window.setInterval(updateCountdown, 1000);
