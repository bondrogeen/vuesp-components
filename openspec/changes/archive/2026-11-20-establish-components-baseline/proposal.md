# Proposal

## Why

`vuesp-components` — общая дизайн-система для сайта, ЛК, hub и встроенного UI
прошивки. Пока её контракт описан только в README и коде, из-за чего изменения
компонентов и токенов сложно согласовывать между потребителями.

## What Changes

- Добавляются три baseline-спеки:
  - `ui-components` — публичные компоненты и точки входа пакета;
  - `theming` — токены, темы, поверхности и CSS-экспорты;
  - `dashboard-widgets` — карточки dashboard и редактор плиток.
- Код пакета не меняется.

## Capabilities

### New Capabilities

- `ui-components`: компоненты форм, навигации, оверлеев и карточек.
- `theming`: цветовые токены, light/dark, glass-поверхности и экспорты стилей.
- `dashboard-widgets`: `CardBase`, типы карточек и `ItemEdit`.

### Modified Capabilities

Нет.

## Impact

- Только `openspec/`.
- Потребители: `vuesp`, `vuesp-hub`, `vuesp.ru`, device-проекты.
