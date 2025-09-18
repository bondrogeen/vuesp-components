<template>
  <aside
    :class="sidebarToggle ? 'translate-x-0 lg:w-[90px]' : '-translate-x-full'"
    class="overflow-x-hidden fixed top-0 left-0 z-10 flex lg:static h-screen w-[290px] flex-col overflow-y-auto border-r border-gray-200 px-5 transition-all duration-300 lg:translate-x-0 dark:border-gray-800 bg-white dark:bg-gray-900 -translate-x-full"
  >
    <div :class="sidebarToggle ? 'justify-center' : 'justify-between'" class="sidebar-header flex items-center gap-2 pt-6 pb-6 justify-between">
      <router-link to="/">
        <IconLogoMini v-if="sidebarToggle" class="h-[30px] text-primary" />

        <IconLogo v-else class="h-[30px] text-primary" />
      </router-link>
    </div>

    <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear h-full">
      <nav>
        <div>
          <h3 class="mb-4 text-xs h-5 text-gray-400 uppercase">
            <span v-if="nameDevice" class="menu-group-title text-nowrap" :class="sidebarToggle ? 'lg:hidden' : ''">{{ nameDevice }}</span>

            <!-- <icon-dots :class="sidebarToggle ? 'lg:block hidden' : 'hidden'" class="menu-group-icon mx-auto fill-current hidden" /> -->
          </h3>

          <ul class="mb-6 flex flex-col gap-4">
            <li v-for="{ name, path, icon } of menu" :key="name">
              <router-link :to="path" class="flex gap-2 items-center px-3 py-2 rounded-sm" :class="isActive(path) ? 'bg-blue-500/10' : 'hover:bg-gray-500/10'" @click.prevent="onSelect()">
                <v-icons :name="icon" class="h-5 w-5 flex-[0_0_24px]" />

                <span class="flex-1 first-letter:uppercase" :class="sidebarToggle ? 'lg:hidden' : ''">{{ name }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>

      <div class="flex-auto"></div>

      <slot></slot>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

import type { IMenuItem } from '@/types/types';

import IconLogoMini from '@/assets/icons/IconLogoMini.svg';
import IconLogo from '@/assets/icons/IconLogo.svg';

interface Props {
  sidebarToggle?: boolean;
  menu?: IMenuItem[];
  fullPath?: string;
  nameDevice?: string;
}

const { nameDevice = '', sidebarToggle = false, menu = [], fullPath = '' } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'sidebar', value: boolean): void;
}>();

const onSelect = () => {
  if (sidebarToggle) {
    emit('sidebar', !sidebarToggle);
  }
};

const isActive = (path: string = '') => fullPath === path;
</script>
