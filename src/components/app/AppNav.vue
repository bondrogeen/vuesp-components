<template>
  <nav>
    <ul class="mb-6 flex flex-col gap-4">
      <li v-for="{ name, path, icon } of menu" :key="name">
        <router-link :to="path" class="flex gap-2 items-center px-3 py-2 rounded-sm" :class="isActive(path) ? 'bg-blue-500/10' : 'hover:bg-gray-500/10'" @click.prevent="onSidebar()">
          <v-icons :name="icon" class="h-5 w-5 flex-[0_0_24px]" />

          <span class="flex-1 first-letter:uppercase" :class="isSidebar ? 'lg:hidden' : ''">{{ name }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

import type { IMenuItem } from '@/types/types';

interface Props {
  menu?: IMenuItem[];
  fullPath?: string;
  isSidebar?: boolean;
}

const { isSidebar = false, menu = [], fullPath = '' } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'sidebar', value: boolean): void;
}>();

const onSidebar = () => {
  if (isSidebar) {
    emit('sidebar', !isSidebar);
  }
};

const isActive = (path: string = '') => fullPath === path;
</script>
