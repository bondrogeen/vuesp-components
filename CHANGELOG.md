# Changelog

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
