# Changelog

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
