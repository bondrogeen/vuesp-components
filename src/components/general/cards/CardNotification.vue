<template>
  <div class="relative flex items-center gap-2 w-full p-2 overflow-hidden">
    <div class="absolute left-0 top-0 w-[3px] h-full" :class="getColor(props.color)"></div>

    <VButton class="shrink-0" type="icon" color="gray" @click="onRead">
      <span :class="props.isNew ? 'flex' : 'hidden'" class="absolute right-0 top-0.5 z-1 h-2 w-2 rounded-full bg-orange-400">
        <span class="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
      </span>

      <IconNoti class="size-5" />
    </VButton>

    <div class="flex-auto text-xs">
      <div>{{ props.text }}</div>

      <div class="text-gray-500 dark:text-gray-400 mt-1">{{ dateUtcToString(props.date) }} ({{ timeUtcToString(props.date) }})</div>
    </div>

    <VButton class="shrink-0" type="icon" size="small" @click="onRemove">
      <IconClose class="size-4"></IconClose>
    </VButton>
  </div>
</template>

<script setup lang="ts">
import type { IMessageNotification } from '@/types/types';

import { defineProps, defineEmits } from 'vue';
import { dateUtcToString, timeUtcToString } from '@/helpers/general';

import VButton from '@/components/general/forms/VButton.vue';

import IconNoti from '@/assets/icons/Noti.svg';
import IconClose from '@/assets/icons/Close.svg';

const props = defineProps<IMessageNotification>();

const emit = defineEmits<{
  (e: 'remove' | 'read', event: Event): void;
}>();

const colors = ['', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500'];
const getColor = (color: number) => colors[color];

const onRemove = (e: Event) => emit('remove', e);
const onRead = (e: Event) => emit('read', e);
</script>
