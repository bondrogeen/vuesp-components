<template>
  <label class="inline-flex items-center relative" :class="{ 'cursor-pointer': !disabled }" @click="onClick">
    <input
      type="checkbox"
      :checked="Boolean(modelValue)"
      :disabled="disabled"
      class="peer size-5 transition-all appearance-none rounded border border-gray-300 dark:border-gray-700 disabled:opacity-40"
      :class="{ 'cursor-pointer': !disabled }"
      @change="onChange"
    />

    <button class="absolute opacity-0 peer-checked:opacity-100 peer-disabled:opacity-40 top-1/2 left-[10px] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
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
import { defineProps, defineEmits } from 'vue';

interface Props {
  modelValue?: number | boolean;
  disabled?: boolean;
}

const { modelValue = false, disabled = false } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'click', value: Event): void;
}>();

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
};

const onClick = (e: Event) => emit('click', e);
</script>
