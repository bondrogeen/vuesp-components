<template>
  <div class="w-full relative">
    <label class="relative w-full h-[40px] border border-gray-300 dark:border-gray-700 flex items-center rounded transition dark:bg-gray-800" :class="getClassSlot">
      <span class="absolute left-4 transition-all rounded -translate-y-1/2 text-gray-600 dark:text-gray-400" :class="getClassLabel">
        {{ label }}
      </span>

      <input
        v-if="component === 'input'"
        v-bind="$attrs"
        :value="modelValue"
        :disabled="disabled"
        :type="type"
        class="w-full h-full px-4 outline-none overflow-ellipsis flex-auto overflow-hidden w-[calc(100% - 20px)] bg-transparent"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        @click="onClick"
        @keypress.enter="onEnter"
      />

      <textarea
        v-if="component === 'textarea'"
        v-bind="$attrs"
        :value="modelValue"
        :disabled="disabled"
        :type="type"
        rows="2"
        wrap="soft"
        class="h-full w-full px-4 py-2 outline-none flex-auto bg-transparent"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        @click="onClick"
        @keypress.enter="onEnter"
      />

      <button
        v-if="$slots.icon"
        :disabled="disabled"
        style="flex: 0 0 50px"
        class="h-full flex items-center justify-center text-gray-400 border-l border-gray-300 dark:border-gray-700/50"
        @click="onIcon"
      >
        <slot name="icon"></slot>
      </button>
    </label>

    <div v-if="!hideMessage" class="text-red-500 h-[24px] px-2 text-xs">
      <slot name="message">
        {{ message }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue';

interface Props {
  modelValue?: number | string | undefined;
  label?: string;
  component?: string;
  type?: string;
  message?: string;
  readonly?: boolean;
  disabled?: boolean;
  active?: boolean;
  hideMessage?: boolean;
  rules?: any[];
}

const { modelValue = null, label = '', type = 'text', message = '', disabled = false, active = false, hideMessage = false } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', event: string): void;
  (e: 'click', event: Event): void;
  (e: 'on-icon', event: Event): void;
  (e: 'enter', event: Event): void;
  (e: 'blur', event: Event): void;
}>();

const isFocus = ref(false);

const getClassSlot = computed(() => [
  message ? 'border-red-500 hover:border-red-400' : '',
  disabled ? 'border-gray-400 opacity-40' : 'border-gray-300 hover:border-gray-400 dark:border-gray-700/50 hover:dark:border-gray-600/50',
]);

const isValue = (value: number | string | null) => value || value === 0;

const after = 'after:absolute after:h-1 after:w-full after:left-0 after:translate-y-[6px] after:-z-10 dark:after:bg-gray-800 after:bg-white after:transition-all';

const getClassLabel = computed(() => [after, isFocus.value || isValue(modelValue) || active ? 'top-0 left-3 text-xs' : 'top-1/2']);

const onInput = ({ target }: Event) => {
  emit('update:modelValue', (target as HTMLTextAreaElement).value);
};

const onBlur = (e: Event) => {
  isFocus.value = false;
  emit('blur', e);
};
const onEnter = (e: Event) => emit('enter', e);

const onFocus = () => (isFocus.value = true);

const onClick = (e: Event) => emit('click', e);

const onIcon = (e: Event) => {
  if (disabled) return;
  emit('on-icon', e);
};
</script>
