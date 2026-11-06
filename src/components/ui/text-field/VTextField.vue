<script setup lang="ts">
import type { IVTextFieldProps, IVTextFieldEmits } from '@/components/ui/text-field/types';

import { ref, computed } from 'vue';

const { modelValue = null, label = '', component = 'input', type = 'text', message = '', disabled = false, active = false, hideMessage = false } = defineProps<IVTextFieldProps>();

const emit = defineEmits<IVTextFieldEmits>();

const componentClass: Record<string, string> = {
  input: 'w-full h-full px-4 outline-none overflow-ellipsis flex-auto overflow-hidden w-[calc(100% - 20px)] bg-transparent',
  textarea: 'h-full w-full px-4 py-2 outline-none flex-auto bg-transparent',
};

const isFocus = ref(false);

const getClassSlot = computed(() => [
  component === 'input' ? 'h-[40px]' : 'min-h-[40px]',
  message ? '!border-red-400/70 ring-1 ring-red-400/25 hover:!border-red-400' : '',
  disabled ? 'border-gray-300 opacity-40 dark:border-gray-700' : 'border-gray-300/80 hover:border-gray-400/80 dark:border-white/10 dark:hover:border-white/20',
]);

const getClassComponent = computed(() => componentClass[component]);

const isValue = (value: number | string | null) => value || value === 0;

const after = 'after:absolute after:h-1 after:w-full after:left-0 after:translate-y-[6px] after:-z-10 after:bg-white dark:after:bg-[#0b1538] after:transition-all';

const getClassLabel = computed(() => [after, isFocus.value || isValue(modelValue) || active ? 'top-0 left-3 text-xs' : 'top-1/2']);
const isInput = computed(() => component === 'input');

const onBlur = (e: Event) => {
  isFocus.value = false;
  emit('blur', e);
};
const onFocus = (e: Event) => {
  isFocus.value = true;
  emit('focus', e);
};

const onInput = ({ target }: Event) => emit('update:modelValue', (target as HTMLTextAreaElement).value);
const onEnter = (e: Event) => emit('enter', e);
const onClick = (e: Event) => emit('click', e);
const onIcon = (e: Event) => {
  if (disabled) return;
  emit('on-icon', e);
};
</script>

<template>
  <div class="w-full relative">
    <label class="glass-inset relative flex w-full items-center rounded-md transition focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/20" :class="getClassSlot">
      <span class="absolute left-3.5 -translate-y-1/2 rounded bg-white/80 px-1 text-gray-500 transition-all dark:bg-[#0b1538]/80 dark:text-gray-400" :class="getClassLabel">
        {{ label }}
      </span>

      <component
        :is="component"
        v-bind="$attrs"
        :value="modelValue"
        :disabled="Boolean(disabled)"
        :type="type"
        :readonly="readonly"
        :rows="isInput ? null : '2'"
        :wrap="isInput ? null : 'soft'"
        :class="getClassComponent"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        @click="onClick"
        @keypress.enter="onEnter"
      />

      <button
        v-if="$slots.icon"
        :disabled="Boolean(disabled)"
        :class="{ 'cursor-pointer': !disabled }"
        class="flex h-full flex-[0_0_50px] items-center justify-center border-l border-gray-200/70 text-gray-400 dark:border-white/10"
        @click="onIcon"
      >
        <slot name="icon"></slot>
      </button>
    </label>

    <div v-if="!hideMessage" class="text-red-400 h-[24px] px-2 text-xs">
      <slot name="message">
        {{ message }}
      </slot>
    </div>
  </div>
</template>
