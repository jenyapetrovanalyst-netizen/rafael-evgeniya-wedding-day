# Фиксация сайта (freeze) — 2026-08-01

Свадебное приглашение зафиксировано в текущем визуальном виде для десктопа и мобилки.
После выкладки на сервер гости должны видеть то же, что сейчас локально — **без панели дизайна и без localStorage**.

## Источники правды

| Файл | Назначение |
|------|------------|
| `mobile-theme-lock.json` | Тема + richCopy (freeze). Источник: `mobile-theme-lock-2026-07-31.json` |
| `desktop-theme-lock.json` | Копия того же freeze (экспорт «компьютер» совпал с «мобильным» по содержимому) |
| `styles.css` | Десктопная вёрстка + прощание 30px / 26px, center |
| `styles-mobile.css` | Мобильная вёрстка + прощание **22px**, center (≤768px) |
| `content.js` | Тексты (локация, RSVP, прощание…) |
| `theme-early.js` | Раннее применение lock без мигания; **px не конвертируется в rem** |

Экспорты от 2026-07-31 (Downloads) отличались только полем `lockedAt` — тема и редактор идентичны.

## Прощание (нижний блок)

| | Десктоп (>768px) | Мобилка (≤768px) |
|--|------------------|------------------|
| Шрифт | Great Vibes | Great Vibes |
| Текст | 30px | 22px |
| Подпись | 26px | 22px |
| Выравнивание | center | center |
| Где в коде | `styles.css` + `applyDesktopFarewellSize` | `styles-mobile.css` + `applyMobileFarewellType` |

В lock `finalText__style` / `finalSignature__style` = 30px / 26px (как в редакторе на десктопе).
Мобильные 22px намеренно только в CSS/JS оверлее — чтобы не ломать десктоп.

## Шрифты

В `index.html` подключены через Google Fonts:

- Great Vibes + EB Garamond (`display=block` для прелоадера)
- расширенный набор семейств для темы

## Что не должно ломать деплой

1. `mobile-theme-lock.json` лежит в корне сайта и грузится по HTTP.
2. Repo-lock важнее `localStorage` (`theme-early.js` / `applySiteThemeLockLayers`).
3. Ошибочные `42rem` / `21rem` из старых экспортов нормализуются в `px` при применении.
4. Кеш-бастинг: `?v=` у CSS/JS/lock в `index.html` / `theme-early.js` / `script.js`.

## Не делать после freeze

- Не править тему «на глаз» только в инспекторе.
- Не полагаться на localStorage гостя.
- Любые визуальные правки — сразу в `styles.css` / `styles-mobile.css` / `content.js` / lock JSON.
