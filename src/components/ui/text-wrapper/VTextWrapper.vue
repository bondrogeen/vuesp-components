<script setup lang="ts">
import type { IVTextWrapperProps, IVTextWrapperEmits } from '@/components/ui/text-wrapper/types';
import { computed } from 'vue';

const { label = 'label', active, disabled = false, iconDisabled = false, hideIcon = false, iconLabel = '' } = defineProps<IVTextWrapperProps>();

const emit = defineEmits<IVTextWrapperEmits>();

const getClassLabel = computed(() => [
  'left-3.5',
  active ? 'top-0 bg-white/80 px-1 text-xs text-gray-dark-25 dark:bg-night-light-10/80 dark:text-gray-main' : 'top-1/2 bg-transparent px-0 text-gray-main dark:text-gray-dark-25',
]);
const getClass = computed(() => [disabled ? 'border-gray-main opacity-40' : 'border-gray-light-10 hover:border-gray-main dark:border-gray-dark-30/50 hover:dark:border-gray-dark-25/50']);
</script>

<template>
  <div class="flex w-full relative">
    <div class="glass-inset relative flex min-h-[40px] w-full items-center rounded-md transition focus-within:border-cyan-main/60" :class="getClass">
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
        class="h-full flex items-center justify-center text-gray-main border-l border-gray-light-10 dark:border-gray-dark-30/50 flex-[0_0_50px]"
        @click="emit('icon', $event)"
      >
        <slot name="icon">
          <icon-ri-add-line class="size-4" />
        </slot>
      </button>
    </div>
  </div>
</template>
