# theming

## Purpose

Описывает цветовые токены, светлую и тёмную темы, glass-поверхности и CSS-экспорты дизайн-системы Vuesp.

## ADDED Requirements

### Requirement: Color token palette

Пакет SHALL определять цвета семействами `--color-{family}-main`,
`--color-{family}-light-{N}` и `--color-{family}-dark-{N}`, где `N`
кратно 5.

#### Scenario: Components use token utilities

- **WHEN** компонент задаёт цвет
- **THEN** он использует утилиту из токенов, а не произвольный hex

#### Scenario: New shade is agreed

- **WHEN** для задачи не хватает оттенка
- **THEN** он добавляется в палитру после согласования, а не подбирается
  произвольным значением

### Requirement: Light and dark themes

Тема SHALL переключаться классом `dark` на корневом элементе и SHALL менять
значения CSS-переменных без перезагрузки страницы.

#### Scenario: Theme switch updates surfaces

- **WHEN** включается тёмная тема
- **THEN** фон, текст и границы используют тёмные токены

### Requirement: Glass surfaces

Пакет SHALL предоставлять glass-поверхности и вложенные поверхности
`glass-inset` для карточек и полей.

#### Scenario: Main surface is glass

- **WHEN** используется основная карточка
- **THEN** она применяет glass-поверхность с корректной прозрачностью

### Requirement: CSS exports

`style.css` SHALL включать тему и стили компонентов, `theme.css` — только
токены и тему.

#### Scenario: Theme-only consumer

- **WHEN** приложению нужны только токены
- **THEN** оно подключает `vuesp-components/theme.css`

### Requirement: No arbitrary colors in consumers

Потребители SHALL использовать утилиты из `@theme`; произвольные hex и
`var(--...)` в классах не допускаются.

#### Scenario: Arbitrary value is rejected in review

- **WHEN** в разметке появляется `bg-[#...]` или `bg-[var(--...)]`
- **THEN** это считается нарушением правил темы
