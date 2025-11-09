<template>
  <transition
    enter-active-class="duration-300 ease-out"
    enter-from-class="transform opacity-0 translate-x-full"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="transform opacity-0 -translate-y-8"
  >
    <div v-if="isShow" class="w-full min-w-[260px] max-w-xs p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800" role="alert">
      <div class="flex items-center gap-4 text-sm">
        <slot :isDone="isDone">
          <div class="flex-auto">Progress...</div>

          <span v-if="isDone" class="text-green-600">Done</span>
        </slot>

        <button class="cursor-pointer transition text-gray-700 dark:text-gray-400 self-start hover:text-gray-600" @click="isShow = false">
          <VIcon name="Close" class="h-4 w-4"></VIcon>
        </button>
      </div>

      <div v-if="isProgress" class="h-[2px] fixed top-0 left-0 w-full bg-blue-600 transition-all duration-500" :style="`width: ${getPercent}%`"></div>

      <div v-if="isProgress" class="relative block h-4 w-full rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-900/50 select-none mt-2">
        <div class="absolute left-[140px] top-1/2 -translate-1/2 text-sm font-bold text-black dark:text-white text-center leading-none">{{ getPercent }}%</div>

        <div class="bg-blue-600 rounded-full h-4 overflow-hidden relative transition-all duration-500" :style="`width: ${getPercent}%`">
          <div class="absolute left-[140px] top-1/2 -translate-1/2 text-sm font-bold text-white text-center leading-none">{{ getPercent }}%</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { IAppProgressProps } from '@/components/app/types';

import { defineProps, computed, watch, ref } from 'vue';
import { useDebounceFn } from '@vueuse/core'

import VIcon from '@/components/ui/icon/VIcon.vue';

const { length = 0, size = 0, status = 0, timeout = 5000 } = defineProps<IAppProgressProps>();

const isShow = ref(false);

const isProgress = computed(() => Boolean(length));
const isDone = computed(() => Boolean(isProgress.value && getPercent.value === 100 && !status));

const getPercent = computed(() => (status ? Math.ceil((size * 100) / length) : 100));

const onClose = useDebounceFn(() => {
  isShow.value = false;
}, timeout);

watch(
  () => [size, status],
  () => {
    isShow.value = true;
    onClose();
  }
);
</script>
