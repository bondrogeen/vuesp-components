<script setup lang="ts">
import type { IVTextWrapperProps, IVTextWrapperEmits } from '@/components/ui/text-wrapper/types';
import { computed } from 'vue';

const { label = 'label', active, disabled = false, iconDisabled = false, hideIcon = false, iconLabel = '' } = defineProps<IVTextWrapperProps>();

const emit = defineEmits<IVTextWrapperEmits>();

const getClassLabel = computed(() => [
  'left-3.5',
  active ? 'top-0 bg-white/80 px-1 text-xs text-gray-500 dark:bg-[#0b1538]/80 dark:text-gray-400' : 'top-1/2 bg-transparent px-0 text-gray-400 dark:text-gray-500',
]);
const getClass = computed(() => [disabled ? 'border-gray-400 opacity-40' : 'border-gray-300 hover:border-gray-400 dark:border-gray-700/50 hover:dark:border-gray-600/50']);
</script>

<template>
  <div class="flex w-full relative">
    <div class="glass-inset relative flex min-h-[40px] w-full items-center rounded-md transition focus-within:border-primary/60" :class="getClass">
      <span class="absolute -translate-y-1/2 rounded transition-all" :class="getClassLabel">
        {{ label }}
      </span>

      <div class="flex gap-2 flex-wrap flex-auto px-2 py-1">
        <slot name="default"></slot>
      </div>

      <button
        v-if="!hideIcon"
        :disabled="disabled || iconDisabled"
        :aria-label="iconLabel || undefined"
        :title="iconLabel || undefined"
        :class="{ 'cursor-pointer': !disabled && !iconDisabled, 'opacity-40': iconDisabled }"
        class="h-full flex items-center justify-center text-gray-400 border-l border-gray-300 dark:border-gray-700/50 flex-[0_0_50px]"
        @click="emit('icon', $event)"
      >
        <slot name="icon">
          <icon-ri-add-line class="size-4" />
        </slot>
      </button>
    </div>
  </div>
</template>
