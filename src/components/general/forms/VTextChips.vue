<template>
  <div class="flex w-full relative">
    <div class="relative w-full min-h-[40px] border border-gray-300 dark:border-gray-700 flex items-center rounded transition bg-white dark:bg-gray-800" :class="getClass">
      <span class="absolute left-4 transition-all rounded -translate-y-1/2 text-gray-600 dark:text-gray-400" :class="getClassLabel">{{ label }}</span>
      <div class="flex gap-2 flex-auto">
        <div v-for="item in items" :key="item" class="flex items-center rounded-full bg-gray-900/50 px-2 py-[2px] text-xs">
          {{ item }}
          <button class="cursor-pointer ms-2" @click="onRemote(item)">
            <IconClose class="size-5" />
          </button>
        </div>
      </div>
      <button class="h-full flex items-center justify-center text-gray-400 border-l border-gray-300 dark:border-gray-700/50 flex-[0_0_50px] cursor-pointer" @click="onAdd">
        <IconPlus class="size-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

import IconClose from '@/assets/icons/Close.svg';
import IconPlus from '@/assets/icons/Plus.svg';

interface Props {
  items: string[];
  label?: string;
  disabled?: boolean;
}

const { label = 'label', items, disabled = false } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'add', event: Event): void;
  (e: 'remove', value: string): void;
}>();

const getClassLabel = computed(() => (items.length ? 'top-0 left-3 text-xs' : 'top-1/2'));

const getClass = computed(() => [disabled ? 'border-gray-400 opacity-40' : 'border-gray-300 hover:border-gray-400 dark:border-gray-700/50 hover:dark:border-gray-600/50']);

const onRemote = (item: string) => emit('remove', item);
const onAdd = (event: Event) => emit('add', event);
</script>
