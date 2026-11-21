<template>
  <transition
    enter-active-class="duration-300 ease-out"
    enter-from-class="transform opacity-0 translate-x-full"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="transform opacity-0 -translate-y-8"
  >
    <div v-if="isShow" class="glass-inset w-full min-w-64 max-w-xs rounded-xl p-4 shadow-lg" role="alert">
      <div class="flex items-center gap-4 text-sm">
        <slot :isDone="isDone">
          <div class="flex-auto">Progress...</div>

          <span v-if="isDone" class="text-green-600">Done</span>
        </slot>

        <button class="cursor-pointer transition text-gray-dark-30 dark:text-gray-main self-start hover:text-gray-dark-25" @click="close">
          <VIcon name="close" class="size-4" />
        </button>
      </div>

      <div v-if="isProgress" class="relative mt-2 block h-4 w-full select-none overflow-hidden rounded-md bg-gray-light-10/70 dark:bg-white/10">
        <div class="absolute left-36 top-1/2 -translate-1/2 text-sm font-bold text-black dark:text-white text-center leading-none">{{ getPercent }}%</div>

        <div class="bg-blue-600 rounded h-4 overflow-hidden relative transition-all duration-500" :style="`width: ${getPercent}%`">
          <div class="absolute left-36 top-1/2 -translate-1/2 text-sm font-bold text-white text-center leading-none">{{ getPercent }}%</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import VIcon from '@/components/ui/icon/VIcon.vue';
import type { IAppProgressProps } from '@/components/app/types';

import { computed, watch, ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';

const { length = 0, size = 0, status = 0, timeout = 5000 } = defineProps<IAppProgressProps>();

const emit = defineEmits<{ (e: 'close'): void }>();

const isShow = ref(false);

const close = () => {
  isShow.value = false;
  emit('close');
};

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
