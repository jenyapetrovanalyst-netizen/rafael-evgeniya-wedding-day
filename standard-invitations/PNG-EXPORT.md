# Экспорт PNG — зафиксированная схема (v1)

Рабочая версия проверена для макета **«Письмо на лесном фоне»** (`card--letter`).

## Как скачивать

1. Открыть через **HTTP**, не `file://`:  
   `http://localhost:8080/wedding-invite-site/standard-invitations/`
2. Дождаться превью и шрифтов.
3. **Скачать PNG** — файл ~1600 px по ширине (scale ×2…×4 от превью).

Текст, сдвиги, шрифты и цвета по-прежнему в `localStorage` (`wedding-standard-invitation-v9`).

## Что нельзя ломать при правках

| Компонент | Зачем |
|-----------|--------|
| `exportInvitationPng()` в `editor.js` | Снимок **живого** `#invitationCard`, без клона на 800px и без `html-to-image` |
| Класс `card--png-capture` в `card.css` | На 1 кадр: лист без `transform`, ширина **88%** (не `max-width: 26.5rem` на 800px) |
| `.card-png-export-spacer` | Прижимает подпись к низу листа вместо `margin-top: auto` (html2canvas его режет) |
| `setCaptureMode` / `ensurePngExportSpacer` | Включают режим до снимка и **полностью снимают** после (превью не «плывёт») |
| `patchClonedCardForCanvas` | Дублирует правки во внутреннем клоне html2canvas |

## Типичные регрессии

- **Обрезанный текст / чёрные поля** — снова включили `x`/`y`/`scroll` в `html2canvas` или снимок с off-screen клона.
- **Узкая полоска бумаги** — на экспорте сработал `max-width: 26.5rem` при ширине карточки 800px.
- **Подпись прыгнула вверх** — убрали spacer и не вернули прижим к низу.
- **Пропал лес** — `crossOrigin` на уже загруженных `<img>` или `allowTaint: false` без CORS.

## Константы (`editor.js`)

- `PNG_EXPORT_IMPL_VERSION` — версия схемы (в `localStorage` вместе с макетом).
- `PNG_TARGET_WIDTH = 1600`, `PNG_SCALE_MIN = 2`, `PNG_SCALE_MAX = 4`.

При смене логики экспорта: увеличить `PNG_EXPORT_IMPL_VERSION`, прогнать скачивание, обновить этот файл.
