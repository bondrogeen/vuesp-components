# Vuesp components

Component library for [Vuesp](https://github.com/bondrogeen/vuesp) - Template for your arduino projects with a web interface.

## Installation

### npm

```bash
npm install vuesp-components
```

### yarn

```bash
yarn add vuesp-components
```

### pnpm

```bash
pnpm add vuesp-components
```

## Usage

### Basic Setup

Import the components and styles in your Vue app:

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import * as components from 'vuesp-components'
import 'vuesp-components/dist/style.css'

const app = createApp(App)

// Register all components globally
Object.entries(components).forEach(([name, component]) => {
  if (typeof component === 'object' && component.name) {
    app.component(component.name, component)
  }
})

app.mount('#app')
```

### Using Components

#### UI Components

```vue
<template>
  <div>
    <VButton color="primary" @click="handleClick">Click me</VButton>
    <VTextField v-model="text" label="Input text" />
    <VSelect v-model="selected" :list="options" />
    <VCheckbox v-model="checked" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
const selected = ref('')
const checked = ref(false)
const options = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
]

const handleClick = () => {
  console.log('Button clicked')
}
</script>
```

#### App Layout Components

```vue
<template>
  <div class="app">
    <AppHeader :changeTheme="toggleTheme" :notifications="notifications" />
    <AppNav :menu="menuItems" :fullPath="route.path" />
    <div class="app-content">
      <RouterView />
    </div>
    <AppNotification ref="notification" />
  </div>
</template>
```

#### Dashboard Components

```vue
<template>
  <div class="dashboard">
    <CardBase label="Temperature" icon="thermometer">
      <CardInput :value="temperature" @input="updateTemp" />
    </CardBase>
    <CardBase label="Status" icon="info">
      <CardButton label="Toggle" @click="toggleStatus" />
    </CardBase>
  </div>
</template>
```

### Composables

```typescript
import { useForms } from 'vuesp-components/composables'

const { formData, submitForm, resetForm } = useForms()
```

### Helpers

```typescript
import { someHelper } from 'vuesp-components/helpers'
```

### Plugins

```typescript
import { i18nPlugin } from 'vuesp-components/plugins'

app.use(i18nPlugin, {
  locale: 'en',
})
```

## Features

- ✅ Vue 3 with TypeScript support
- ✅ Tailwind CSS styling
- ✅ Fully typed components
- ✅ Accessible UI components
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Dashboard components for IoT interfaces
- ✅ Form utilities and composables
- ✅ i18n integration

## Components

### UI Components
- `VButton` - Button component
- `VCheckbox` - Checkbox component
- `VTextField` - Text input field
- `VSelect` - Select dropdown
- `VAutocomplete` - Autocomplete input
- `VTable` - Data table
- `VTabs` - Tabs component
- `VAccordion` - Accordion component
- `VDropdown` - Dropdown menu
- `VLoader` - Loading spinner
- `VIcon` - Icon component
- `VFile` - File upload
- `VDragDrop` - Drag and drop
- `VExpansion` - Expansion panel
- `VList` - List component

### App Components
- `AppHeader` - Header with theme toggle
- `AppNav` - Navigation menu
- `AppAside` - Sidebar
- `AppDialog` - Modal dialog
- `AppNotification` - Toast notifications
- `AppProgress` - Progress bar

### Dashboard Components
- `CardBase` - Base card
- `CardButton` - Button card
- `CardDate` - Date card
- `CardDimmer` - Dimmer control
- `CardInfo` - Info card
- `CardInput` - Input card
- `CardList` - List card
- `ItemEdit` - Edit item component
- `ItemOptions` - Options component

## License

## 1.3.1 (2026-06-22)

- (bondrogeen) Build fixes and documentation updates

## 1.3.0 (2025-10-09)

- (bondrogeen) Minor changes

### 0.0.1 (2024-01-07)

- (bondrogeen) init

## License

The MIT License (MIT)

Copyright (c) 2021-2025, bondrogeen <bondrogeen@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
