# Changelog

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
