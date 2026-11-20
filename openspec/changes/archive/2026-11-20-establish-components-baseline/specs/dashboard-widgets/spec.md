# dashboard-widgets

## Purpose

Описывает карточки dashboard и редактор плиток, которые используют приложения и hub для отображения и настройки dashboard.

## ADDED Requirements

### Requirement: CardBase wrapper

`CardBase` SHALL задавать общий каркас плитки: заголовок, иконку, слот
содержимого и обработку состояния disabled.

#### Scenario: Card shows title and content

- **WHEN** карточка отрисована с заголовком и содержимым
- **THEN** заголовок и слот отображаются в общем каркасе

### Requirement: Dashboard card types

Пакет SHALL предоставлять карточки `CardButton`, `CardDimmer`, `CardInfo`,
`CardDate`, `CardList` и `CardInput` для соответствующих типов плиток.

#### Scenario: Value and display are separate

- **WHEN** карточка получает значение и его представление
- **THEN** она показывает представление и сообщает новое значение при действии

#### Scenario: Disabled card does not emit changes

- **WHEN** карточка отключена
- **THEN** действие пользователя не приводит к изменению значения

### Requirement: Item editor

`ItemEdit` SHALL редактировать поля плитки: `id`, `name`, `type`, `icon`,
`args`, `opts`, `get`, `getTo`, `set` и `meta`.

#### Scenario: Expression scopes are explained

- **WHEN** пользователь редактирует `get`, `getTo` или `set`
- **THEN** интерфейс подсказывает доступные переменные (`a–d`, `v`)

#### Scenario: Arguments are selected from state

- **WHEN** пользователь добавляет аргумент
- **THEN** он выбирает путь из дерева данных, а не вводит его вслепую
