<template>
  <header class="flex items-center justify-between px-8 py-4 border-b border-gray-300 dark:border-gray-700 sticky top-0 bg-gray-50 dark:bg-gray-900 z-10">
    <div class="w-40">
      <IconLogo></IconLogo>
    </div>
    <div>
      <VButton color="" type="icon" @click="changeTheme">
        <IconTheme class="h-1 w-1"></IconTheme>
      </VButton>
    </div>
  </header>

  <div class="flex flex-col gap-6 p-8">
    <VBreadcrumb :items="[{ name: 'Home', path: '/' }, { name: 'List' }]"></VBreadcrumb>

    <VCardGray title="Button">
      <template #header>
        <VDropdown right="0" left="unset" top="0">
          <template #activator="{ on }">
            <VButton color="" type="icon" @click="on.click">
              <IconDots class="rotate-90"></IconDots>
            </VButton>
          </template>

          <VList v-slot="{ item }" :list="listMenu" @click="onMenu">
            <component :is="item.icon"></component>
            <span class="ms-2">{{ item.name }}</span>
          </VList>
        </VDropdown>
      </template>

      <div class="flex justify-between">
        <div>
          <div class="flex gap-4 mb-4">
            <VButton v-for="color of colors" size="small" :key="color" :color="color">Button</VButton>
          </div>

          <div class="flex gap-4 mb-4">
            <VButton v-for="color of colors" :key="color" :color="color">Button</VButton>
          </div>

          <div class="flex gap-4 mb-4">
            <VButton v-for="color of colors" :key="color" :color="color" loading>Button</VButton>
          </div>

          <div class="flex gap-4 mb-4">
            <VButton v-for="color of colors" :key="color" :color="color" disabled>Button</VButton>
          </div>
        </div>

        <div>
          <div class="flex gap-4 mb-4">
            <VButton v-for="color of colors" size="small" :key="color" :color="color" outline>Button</VButton>
          </div>

          <div class="flex gap-4 mb-4">
            <VButton v-for="color of colors" :key="color" :color="color" outline>Button</VButton>
          </div>

          <div class="flex gap-4 mb-4">
            <VButton v-for="color of colors" :key="color" :color="color" outline loading>Button</VButton>
          </div>

          <div class="flex gap-4">
            <VButton v-for="color of colors" :key="color" :color="color" outline disabled>Button</VButton>
          </div>
        </div>
      </div>
    </VCardGray>

    <VCardGray title="Form">
      <div class="flex flex-col mb-4">
        <div class="flex gap-4 mb-4">
          <VCheckbox>Checkbox</VCheckbox>

          <VCheckbox disabled>Checkbox</VCheckbox>
        </div>

        <VAutocomplete v-model="input" label="Autocomplete" :list="listSelect"></VAutocomplete>

        <div class="grid grid-cols-3 gap-4">
          <VTextField v-model="input" label="Input"></VTextField>

          <VTextField v-model="input" label="Input" disabled></VTextField>

          <VTextField v-model="input" label="Input" message="Error"></VTextField>
        </div>

        <VTextarea v-model="input" label="Textarea" color="gray"></VTextarea>

        <VTextFieldFile color="gray"></VTextFieldFile>

        <VSelect :value="select" label="Select" :list="listSelect" message="Error" @change="select = $event.name"></VSelect>
      </div>
    </VCardGray>

    <VCardGray title="Tablet">
      <VTable :headers="headers" :items="listTable" @click="onClickItem">
        <template #header="{ item }">
          <div class="flex items-center" :class="{ 'justify-end': item.key === 'action' }">
            {{ item.name }}
          </div>
        </template>

        <template #value="{ item }">
          <span :class="item.value % 2 ? 'text-green-500' : 'text-amber-200'">{{ item.value }}</span>
        </template>

        <template #action>
          <div class="flex-auto flex justify-end">
            <VDropdown left="unset" right="0" top="0">
              <template #activator="{ on }">
                <VButton type="icon" color="gray" class="flex" @click.stop="on.click()">
                  <IconDots />
                </VButton>
              </template>

              <VList :list="listMenu" />
            </VDropdown>
          </div>
        </template>
      </VTable>
    </VCardGray>

    <VCardGray title="Icons">
      <div class="flex gap-4">
        <div v-for="(icon, i) of icons" :key="i" class="flex">
          <component :is="icon"></component>
        </div>
      </div>
    </VCardGray>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TypeVList } from '@/types/types.ts';

import { VAutocomplete, VBreadcrumb, VButton, VCheckbox, VDropdown, VList, VSelect, VTextarea, VTextField, VTextFieldFile, VTable } from '@/components/general/index.ts';

import {
  IconBurger,
  IconChevron,
  IconClose,
  IconTheme,
  IconDashboard,
  IconDevice,
  IconDots,
  IconEyeClose,
  IconEyeOpen,
  IconFile,
  IconFolder,
  IconLogo,
  IconLogout,
  IconNoti,
  IconSave,
  IconSearch,
  IconUpdate,
  IconVideo,
} from '@/components/icons/index.ts';

import { VCardGray } from '@/components/cards/index.ts';

const input = ref('');
const select = ref('item1');
let theme = 'light';

const icons = [
  IconBurger,
  IconChevron,
  IconClose,
  IconTheme,
  IconDashboard,
  IconDevice,
  IconDots,
  IconEyeClose,
  IconEyeOpen,
  IconFile,
  IconFolder,
  IconLogout,
  IconNoti,
  IconSave,
  IconSearch,
  IconUpdate,
  IconVideo,
];

const colors: string[] = ['gray', 'blue', 'red', 'green'];

const listSelect = [
  { name: 'item1', value: 1 },
  { name: 'item2', value: 2 },
];
const listTable = [
  { name: 'item1', value: 1 },
  { name: 'item2', value: 2 },
];

const listMenu: TypeVList[] = [
  { id: 2, icon: IconSearch, name: 'Upload' },
  { id: 3, icon: IconUpdate, name: 'Reload' },
  { id: 4, icon: IconSave, name: 'Format' },
];

const headers = [
  { key: 'name', name: 'Name', className: 'w-40' },
  { key: 'value', name: 'Value', className: 'w-80' },
  { key: 'action', name: 'Action', className: 'w-40 text-left' },
];

const onMenu = (item: TypeVList) => {
  console.log(item);
};

const onClickItem = (item: any) => {
  console.log(item);
};

const changeTheme = () => {
  theme = theme === 'light' ? 'dark' : 'light';
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.remove('light');
  document.documentElement.classList.add(theme);
};
</script>
