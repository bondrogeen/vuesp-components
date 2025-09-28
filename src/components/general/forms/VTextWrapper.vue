<template>
  <div class="flex w-full relative">
    <div class="relative w-full min-h-[40px] border border-gray-300 dark:border-gray-700 flex items-center rounded transition bg-white dark:bg-gray-800" :class="getClass">
      <span class="absolute left-4 transition-all rounded -translate-y-1/2 text-gray-600 dark:text-gray-400" :class="getClassLabel">{{ label }}</span>
      <div class="flex gap-2 flex-wrap flex-auto px-2 py-1">
        <slot name="default"></slot>
      </div>
      <button
        v-if="!hideIcon"
        :disabled="disabled"
        class="h-full flex items-center justify-center text-gray-400 border-l border-gray-300 dark:border-gray-700/50 flex-[0_0_50px]"
        :class="{ 'cursor-pointer': !disabled }"
        @click="emit('icon', $event)"
      >
        <slot name="icon">
          <IconPlus class="size-4" />
        </slot>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

import IconPlus from '@/assets/icons/Plus.svg';

interface Props {
  active: boolean;
  label?: string;
  disabled?: boolean;
  hideIcon?: boolean;
}

const { label = 'label', active, disabled = false, hideIcon = false } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'icon', event: Event): void;
}>();

const getClassLabel = computed(() => (active ? 'top-0 left-3 text-xs' : 'top-1/2'));
const getClass = computed(() => [disabled ? 'border-gray-400 opacity-40' : 'border-gray-300 hover:border-gray-400 dark:border-gray-700/50 hover:dark:border-gray-600/50']);
</script>
