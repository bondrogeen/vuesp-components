# ui-components

## Purpose

Описывает публичные компоненты `vuesp-components` и точки входа пакета, которыми пользуются приложения Vuesp.

## ADDED Requirements

### Requirement: Package entry points

Пакет SHALL предоставлять точки входа `vuesp-components`, `/components`,
`/dashboard`, `/composables`, `/helpers`, `/validate`, `/types`, `/style.css`
и `/theme.css`.

#### Scenario: Consumer imports only public entries

- **WHEN** приложение подключает пакет
- **THEN** оно использует один из объявленных entry points

### Requirement: Form controls

`VTextField`, `VSelect`, `VCheckbox` и `VAutocomplete` SHALL поддерживать
`v-model` и SHALL сообщать об изменении значения через модельное событие.

#### Scenario: Text field updates the model

- **WHEN** пользователь вводит текст
- **THEN** связанное значение обновляется

#### Scenario: Select returns the selected item

- **WHEN** пользователь выбирает пункт
- **THEN** модель получает значение этого пункта

### Requirement: Overlays and navigation

`VDialog`, `VDropdown`, `VList`, `VTabs`, `VAccordion`, `VExpansion`,
`VTooltip` и `VTable` SHALL обеспечивать соответствующие паттерны
навигации и оверлеев.

#### Scenario: Dialog blocks the background

- **WHEN** открыт `VDialog`
- **THEN** фон недоступен для взаимодействия, а диалог закрывается по
  предусмотренному действию

#### Scenario: Dropdown closes after selection

- **WHEN** пользователь выбирает пункт `VDropdown`
- **THEN** дропдаун закрывается и сообщает выбранный пункт

### Requirement: Cards and surfaces

`VCard` SHALL поддерживать варианты `glass`, `solid`, `outline`, `ghost`,
паддинг `none`/`lg`, тона `default/info/success/warning/danger/accent`,
заголовок, подзаголовок и слоты `header`/`footer`.

#### Scenario: Nested card uses outline

- **WHEN** карточка вложена в `glass`-карточку
- **THEN** она использует вариант `outline`, чтобы не было двойного осветления

#### Scenario: Tone changes the surface

- **WHEN** у карточки задан цветной `tone`
- **THEN** фон и акценты соответствуют этому тону

### Requirement: Icons

`VIcon` SHALL брать иконки из общего набора `ICONS` по имени и SHALL
использоваться для иконочных действий с `aria-label` и `title`.

#### Scenario: Icon renders by name

- **WHEN** передан известный `name`
- **THEN** отображается соответствующая иконка

#### Scenario: Icon-only action is accessible

- **WHEN** иконка используется как кнопка без текста
- **THEN** у кнопки есть `aria-label` и `title`
