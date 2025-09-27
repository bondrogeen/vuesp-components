<template>
  <div v-if="isSidebar" class="lg:hidden overlay fixed left-0 top-0 h-full w-full bg-black/40 bg-blur z-10" @click="onSidebar"></div>
  <aside
    :class="isSidebar ? 'translate-x-0 lg:w-[90px]' : '-translate-x-full'"
    class="overflow-x-hidden fixed top-0 left-0 z-10 flex lg:static h-full w-[290px] flex-col overflow-y-auto border-r border-gray-200 px-5 transition-all duration-350 lg:translate-x-0 dark:border-gray-800 bg-white dark:bg-gray-900 -translate-x-full"
  >
    <div :class="isSidebar ? 'justify-center' : 'justify-between'" class="sidebar-header flex items-center gap-2 pt-6 pb-6 justify-between">
      <router-link to="/">
        <IconLogoMini v-if="isSidebar" class="h-[30px] text-primary" />

        <IconLogo v-else class="h-[30px] text-primary" />
      </router-link>
    </div>

    <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear h-full">
      <slot></slot>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

import IconLogoMini from '@/assets/icons/LogoMini.svg';
import IconLogo from '@/assets/icons/Logo.svg';

interface Props {
  isSidebar?: boolean;
}

const { isSidebar = false } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'sidebar', value: boolean): void;
}>();

const onSidebar = () => {
  if (isSidebar) {
    emit('sidebar', !isSidebar);
  }
};
</script>
