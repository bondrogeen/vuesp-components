<template>
  <label class="inline-flex items-center relative" :class="{ 'cursor-pointer': !disabled }" @click="onClick">
    <input
      type="checkbox"
      :checked="Boolean(modelValue)"
      :disabled="disabled"
      class="peer size-5 appearance-none rounded-md border border-gray-300/80 bg-white/50 transition-all checked:border-[var(--accent-blue)] checked:bg-blue-50 dark:checked:border-[var(--accent-blue)] dark:checked:bg-[var(--accent-blue)] disabled:opacity-40 not-disabled:cursor-pointer dark:border-white/15 dark:bg-white/[0.04]"
      @change="onChange"
    />

    <button class="pointer-events-none absolute left-[10px] top-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--accent-blue)] opacity-0 peer-checked:opacity-100 peer-disabled:opacity-40 dark:text-white">
      <svg class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>
    </button>

    <span class="text-sm ms-2 peer-disabled:opacity-40">
      <slot></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import type { IVCheckboxProps, IVCheckboxEmits } from '@/components/ui/checkbox/types';


const { modelValue = false, disabled = false } = defineProps<IVCheckboxProps>();

const emit = defineEmits<IVCheckboxEmits>();

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
};

const onClick = (e: Event) => emit('click', e);
</script>
