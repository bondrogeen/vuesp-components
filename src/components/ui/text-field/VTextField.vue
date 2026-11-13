<script setup lang="ts">
import type { IVTextFieldProps, IVTextFieldEmits } from '@/components/ui/text-field/types';

import { ref, computed } from 'vue';
import VisionIcon from '@/components/ui/vision/VisionIcon.vue';

const {
  modelValue = null,
  label = '',
  placeholder = '',
  component = 'input',
  type = 'text',
  message = '',
  error = '',
  icon = '',
  readonly = false,
  disabled = false,
  active = false,
  hideMessage = false,
} = defineProps<IVTextFieldProps>();

const emit = defineEmits<IVTextFieldEmits>();

const componentClass: Record<string, string> = {
  input: 'w-full h-full px-4 outline-none overflow-ellipsis flex-auto overflow-hidden w-[calc(100% - 20px)] bg-transparent placeholder:text-gray-main dark:placeholder:text-gray-dark-25',
  textarea: 'h-full w-full px-4 py-2 outline-none flex-auto bg-transparent',
};

const isFocus = ref(false);

const effectiveMessage = computed(() => error || message);

const getClassSlot = computed(() => [
  component === 'input' ? 'h-[40px]' : 'min-h-[40px]',
  error ? '!border-red-400/70 ring-1 ring-red-400/25 hover:!border-red-400' : '',
  disabled ? 'border-gray-light-10 opacity-40 dark:border-gray-dark-30' : 'border-gray-light-10/80 hover:border-gray-main/80 dark:border-white/10 dark:hover:border-white/20',
]);

const getClassComponent = computed(() => componentClass[component]);

const isValue = (value: number | string | null) => value || value === 0;

const after = 'after:absolute after:h-1 after:w-full after:left-0 after:translate-y-[6px] after:-z-10 after:bg-white dark:after:bg-night-light-10 after:transition-all';

const isFloating = computed(() => isFocus.value || isValue(modelValue) || active);

const labelLeft = computed(() => (icon ? 'left-11' : 'left-3.5'));

const getClassLabel = computed(() => [
  labelLeft.value,
  isFloating.value ? after : '',
  isFloating.value ? 'top-0 bg-white/80 px-1 text-xs text-gray-dark-25 dark:bg-night-light-10/80 dark:text-gray-main' : 'top-1/2 bg-transparent px-0 text-gray-main dark:text-gray-dark-25',
]);
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
    <label class="glass-inset relative flex w-full items-center rounded-md transition focus-within:border-cyan-main/60 focus-within:ring-1 focus-within:ring-cyan-main/20" :class="getClassSlot">
      <VisionIcon v-if="icon" :name="icon" :size="18" class="ml-3.5 shrink-0 text-gray-main dark:text-gray-dark-25" />

      <span class="absolute -translate-y-1/2 rounded transition-all" :class="getClassLabel">
        {{ label }}
      </span>

      <component
        :is="component"
        v-bind="$attrs"
        :value="modelValue"
        :placeholder="isFloating ? placeholder : ''"
        :disabled="Boolean(disabled)"
        :type="type"
        :readonly="readonly"
        :rows="isInput ? null : '2'"
        :wrap="isInput ? null : 'soft'"
        :class="getClassComponent"
        :aria-invalid="effectiveMessage ? true : undefined"
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
        class="flex h-full flex-[0_0_50px] items-center justify-center border-l border-gray-light-10/70 text-gray-main dark:border-white/10"
        @click="onIcon"
      >
        <slot name="icon"></slot>
      </button>
    </label>

    <div v-if="!hideMessage" class="h-[24px] px-2 text-xs" :class="error ? 'text-red-400' : 'text-gray-dark-25 dark:text-gray-main'">
      <slot name="message">
        {{ effectiveMessage }}
      </slot>
    </div>
  </div>
</template>
