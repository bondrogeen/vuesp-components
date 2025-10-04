<template>
  <div class="flex items-center gap-2 w-full p-4">
    <div class="relative flex justify-center items-center size-10 border border-gray-900 rounded-full">
      <span :class="isNew ? 'flex' : 'hidden'" class="absolute right-0 top-0.5 z-1 size-2 rounded-full bg-orange-400 flex">
        <span class="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
      </span>

      <IconNoti class="size-5" />
    </div>

    <div class="flex-auto text-sm">
      <div>{{ text }}</div>
      <div class="text-gray-500 dark:text-gray-400">{{ dateUtcToString(new Date()) }}</div>
    </div>

    <VButton type="icon" size="small" @click="onClose">
      <IconClose></IconClose>
    </VButton>
  </div>
</template>

<script setup lang="ts">
import type { IMessageNotification } from '@/types/types';

import { defineProps, defineEmits } from 'vue';
import { dateUtcToString } from '@/helpers/general';

import IconNoti from '@/assets/icons/Noti.svg';
import IconClose from '@/assets/icons/Close.svg';

const { text, id, date, isNew = true, timeout } = defineProps<IMessageNotification>();

const emit = defineEmits<{
  (e: 'close', value: IMessageNotification): void;
}>();

const onClose = () => {
  emit('close', { text, id, timeout });
};
</script>
