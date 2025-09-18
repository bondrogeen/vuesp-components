<template>
  <header class="flex items-center justify-between px-8 py-4 border-b border-gray-300 dark:border-gray-700 sticky top-0 bg-gray-50 dark:bg-gray-900 z-10">
    <div class="w-40">
      <IconLogo></IconLogo>
    </div>
    <div>
      <VButton type="icon" @click="changeTheme">
        <IconTheme></IconTheme>
      </VButton>
    </div>
  </header>

  <MyIcon />

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

        <VTextField v-model="input" component="textarea" label="Textarea" color="gray"></VTextField>

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
                <VButton type="icon" color="gray" class="flex" @click.stop="on.click">
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
import type { IListItem } from '@/types/types';

import IconBurger from '@/assets/icons/IconBurger.svg';
import IconChevron from '@/assets/icons/IconChevron.svg';
import IconClose from '@/assets/icons/IconClose.svg';
import IconTheme from '@/assets/icons/IconTheme.svg';
import IconEyeClose from '@/assets/icons/IconEyeClose.svg';
import IconDots from '@/assets/icons/IconDots.svg';
import IconDevice from '@/assets/icons/IconDevice.svg';
import IconEyeOpen from '@/assets/icons/IconEyeOpen.svg';
import IconFile from '@/assets/icons/IconFile.svg';
import IconFolder from '@/assets/icons/IconFolder.svg';
import IconLogo from '@/assets/icons/IconLogo.svg';
import IconLogout from '@/assets/icons/IconLogout.svg';
import IconNoti from '@/assets/icons/IconNoti.svg';
import IconSave from '@/assets/icons/IconSave.svg';
import IconSearch from '@/assets/icons/IconSearch.svg';
import IconUpdate from '@/assets/icons/IconUpdate.svg';
import IconVideo from '@/assets/icons/IconVideo.svg';
import IconDashboard from '@/assets/icons/IconDashboard.svg';

import { VAutocomplete, VBreadcrumb, VButton, VCheckbox, VDropdown, VList, VSelect, VTextField, VTextFieldFile, VTable } from '@/components/general/';

import VCardGray from '@/components/general/VCardGray.vue';

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

const listMenu: IListItem[] = [
  { id: 2, icon: IconSearch, name: 'Upload' },
  { id: 3, icon: IconUpdate, name: 'Reload' },
  { id: 4, icon: IconSave, name: 'Format' },
];

const headers = [
  { key: 'name', name: 'Name', className: 'w-40' },
  { key: 'value', name: 'Value', className: 'w-80' },
  { key: 'action', name: 'Action', className: 'w-40 text-left' },
];

const onMenu = (item: IListItem) => {
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
