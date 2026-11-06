<template>
  <div v-if="isSidebar" class="lg:hidden overlay fixed left-0 top-0 h-full w-full bg-black/40 z-10 bg-blur" @click="onClose"></div>
  <aside
    :class="isSidebar ? 'translate-x-0 lg:w-[90px]' : '-translate-x-full'"
    class="overflow-x-hidden fixed top-0 left-0 z-10 flex lg:static h-full w-[290px] flex-col overflow-y-auto border-r border-gray-200/70 bg-white/70 px-5 backdrop-blur-2xl transition-all duration-350 lg:translate-x-0 dark:border-white/10 dark:bg-[#07112c]/70"
  >
    <div :class="isSidebar ? 'justify-center' : 'justify-between'" class="sidebar-header flex items-center gap-2 border-b border-gray-200/60 pt-6 pb-6 justify-between dark:border-white/5">
      <router-link to="/">
        <VIconLogoMini v-if="isSidebar" class="h-[30px] text-primary" />

        <VIconLogo v-else class="h-[30px] text-primary" />
      </router-link>
    </div>

    <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear h-full">
      <slot></slot>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { IAppAsideProps, IAppAsideEmits } from '@/components/app/types';

import VIconLogo from '@/components/ui/icon/VIconLogo.vue';
import VIconLogoMini from '@/components/ui/icon/VIconLogoMini.vue';

const { isSidebar = false } = defineProps<IAppAsideProps>();

const emit = defineEmits<IAppAsideEmits>();

const onClose = () => {
  if (isSidebar) {
    emit('sidebar', !isSidebar);
  }
};
</script>
