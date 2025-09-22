<template>
  <div class="w-full min-w-[260px] max-w-xs p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800" role="alert">
    <div class="flex items-center gap-4 text-sm">
      <div class="flex-auto">
        {{ text }}
      </div>

      <span v-if="isProgressDone" class="text-green-600">Done</span>

      <button class="transition text-gray-400 self-start hover:text-gray-600" @click="onClose">
        <IconClose class="h-4 w-4"></IconClose>
      </button>
    </div>

    <div v-if="isProgress" class="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-2">
      <div class="bg-blue-600 text-sm font-medium text-blue-100 text-center leading-none rounded-full" :style="`width: ${getPercent}%`">{{ getPercent }}%</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMessageNotification } from '@/types/types';

import { defineProps, defineEmits, onMounted, computed } from 'vue';

import IconClose from '@/assets/icons/IconClose.svg';

interface Props extends IMessageNotification {
  empty?: number;
  length?: number;
  size?: number;
  status?: number;
}

const { text = '', empty = 0, id = 0, length = 0, size = 0, status = 0, timeout = 0 } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'close', value: Props): void;
}>();

const getPercent = computed(() => (status ? Math.ceil((size * 100) / length) : 100));
const isProgress = computed(() => Boolean(length));
const isProgressDone = computed(() => Boolean(isProgress.value && getPercent.value === 100 && !status));

const onClose = () => {
  emit('close', { text, empty, id, length, size, status, timeout });
};

onMounted(() => {
  if (timeout) {
    setTimeout(() => {
      onClose();
    }, timeout * 1000);
  }
});
</script>
