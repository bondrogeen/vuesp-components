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
          <IconClose class="h-4 w-4"></IconClose>
        </button>
      </div>

      <div v-if="isProgress" class="h-[2px] fixed top-0 left-0 w-full bg-blue-600 transition-all duration-500" :style="`width: ${getPercent}%`"></div>

      <div v-if="isProgress" class="relative w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-2 overflow-hidden h-5">
        <div class="absolute left-[140px] top-1/2 -translate-1/2 text-sm font-bold text-black dark:text-white text-center leading-none">{{ getPercent }}%</div>
        <div class="bg-blue-600 rounded-full h-5 overflow-hidden relative transition-all duration-500" :style="`width: ${getPercent}%`">
          <div class="absolute left-[140px] top-1/2 -translate-1/2 text-sm font-bold text-white text-center leading-none">{{ getPercent }}%</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { IMessageProgress } from '@/types/types';

import { defineProps, computed, watch, ref } from 'vue';
import { debounce } from '@/helpers/utils';

import IconClose from '@/assets/icons/Close.svg';

interface Props extends IMessageProgress {
  timeout?: number;
}

const { length = 0, size = 0, status = 0, timeout = 5000 } = defineProps<Props>();

const isShow = ref(false);

const getPercent = computed(() => (status ? Math.ceil((size * 100) / length) : 100));
const isProgress = computed(() => Boolean(length));
const isDone = computed(() => Boolean(isProgress.value && getPercent.value === 100 && !status));

const onClose = debounce(() => {
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
