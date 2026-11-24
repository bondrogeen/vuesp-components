# Changelog

## 5.3.1 — 2026-11-25

### Added

- `SerialConsole` settings panel: host settings via `#settings`, built-in `Apply` / `Reset` buttons driven by `dirty` / `onApply` / `onReset` props, and a `#settings-actions` slot to replace them.
- `SerialConsole` extension slots: `#settings-extra`, `#toolbar-extra`, `#footer`.
- `SerialConsole` prop `initialLineEnding` and capability `connection` to hide the connect button when the host owns the port.
- `SerialConsole` follows the host locale through the `locale` prop (board pages switch language together with the rest of the UI).

## 5.3.0 — 2026-11-25

### Added

- `SerialConsole`: ready-made serial terminal block — connection header, RX/TX log with time and counters, text/HEX view, search with highlighting, follow output, clear/copy/download, text and HEX sending, command history, quick commands editor.
- `SerialConsole` display options: text encoding (UTF-8 / CP1251), frame splitting by newline or by idle gap (10–100 ms), pause capture.
- `SerialConsole` is transport-agnostic: pass `start` / `stop` / `send` / `subscribe` callbacks, so the same block works with Web Serial or a device WebSocket.
- `SerialConsole` ships its own `ru`/`en` dictionary (`locale` + `labels` props) and does not require host i18n keys.
- `SerialConsole` slots: `#header-actions` (e.g. baud select) and `#settings` (host port settings).
- `useSerialConsole`: composable with the log state machine, framing, encodings, pause buffering, counters and rates; settings persist to `localStorage` when `storageKey` is provided.

## 5.2.2 — 2026-11-24

### Added

- `CardPalette`: dashboard card for choosing a preset or custom color. The disabled state is an empty string, matching the device contract.
- `udp()` and `fade()` suggestions now include a `description` tooltip, so device projects inherit the explanation from the shared package.

### Changed

- `VButton`: the slot wrapper is now `display: contents`, so `flex`, `block`, `gap` and alignment classes on the button apply directly to slotted content. The loading state hides text with `text-transparent` and elements with `opacity-0` while keeping the original size and loader color.
- `CardDimmer`: removed a redundant nested wrapper around the dimmer control.

### Fixed

- The `udp()` suggestion inserted a literal `call(1)` argument and an empty first argument; it now inserts both arguments as placeholders.
- The `if` and `while` suggestion templates used the removed `$v0` variable; they now use `$u0`.

## 5.2.1 — 2026-11-22

### Fixed

- `VPopup`: increased the top padding of the mobile handle and moved the close buttons up so they no longer overlap the handle.

## 5.2.0 — 2026-11-22

### Added

- `VListObject`: optional `canAdd(path)` callback. When it returns false, the add button is hidden for that value while the row stays visible.
- `VSelect`: optional `hideMessage` prop. By default a select now reserves the same message area as `VTextField`; pass `hide-message` for compact rows.

### Changed

- `VListObject`: clicking a scalar row now selects it when the row is addable; object rows still expand/collapse.
- `VListObject`: row separators are positioned relative to their own row and no longer intercept pointer events.

### Fixed

- `ItemEdit`: the `+` buttons for Set / Get / GetTo now open the expression editor. The component listened to `on-icon` while `VFunc` emits `icon`.
- `CardBase`: Edit and Copy buttons in the tile dialog now have `title` and `aria-label`; the decorative background icon no longer blocks clicks.

## 5.1.0 — 2026-11-22

### Added

- Script editor suggestions for the common `fade()` and `http()` functions, so all devices get autocomplete and highlighting without duplicating them in every `suggestions.json`.
- TypeScript-like signatures in the suggestion `detail` line.

## 5.0.1 — 2026-11-21

### Fixed

- Dashboard cards now update when a referenced value (a port, a device field, etc.) appears after the first render. `vuesp-dashboard-core` path resolution no longer returns early through a non-reactive `hasOwnProperty` check for a missing key.

## 5.0.0 — 2026-11-21

### Breaking

`VButton` now has a single `variant` axis without modifiers.

- Removed `invert`.
- Removed `variant="default"`, `variant="white"` and `color="transparent"`.
- `invertedOutline` renamed to `muted`.
- Variants: `solid`, `soft`, `outline`, `ghost`, `muted`, `none`.
- `solid` is now the default variant, `violet` is the default color.
- `white` is now a color: use `variant="solid" color="white"`.
- Replaced `color=""` (unstyled button) with `variant="none"`.

### Added

- `size="xs"` (24 px) for text and icon buttons.
- `VButton`: `title`, `target` and `ghost` variant.
- `VTextField`: `id`, `name`.
- `VFile`: `multiple`, `accept`.
- `VSelect`: `modelValue` is optional (action menus).
- `AppProgress`: `close` emit.

### Fixed

- `VButton` icon buttons no longer depend on a non-existent `variant`.
