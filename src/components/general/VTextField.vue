<template>
  <div class="w-full relative">
    <label class="relative w-full h-[40px] border border-gray-300 dark:border-gray-700 flex items-center rounded transition dark:bg-gray-800" :class="getClassSlot">
      <span class="absolute left-4 transition-all rounded -translate-y-1/2 text-gray-600 dark:text-gray-400" :class="getClassLabel">
        {{ label }}
      </span>

      <input
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

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Number], default: null },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'text' },
  active: { type: Boolean, default: false },
  hideMessage: { type: Boolean, default: false },
  rules: { type: Array, default: () => [] },
  message: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue', 'click', 'on-icon', 'enter', 'blur']);

const isFocus = ref(false);

const getClassSlot = computed(() => [
  props.message ? 'border-red-500 hover:border-red-400 dark:border-red-700 hover:dark:border-red-800' : '',
  props.disabled ? 'border-gray-400 opacity-40' : 'border-gray-300 hover:border-gray-400 dark:border-gray-700/50 hover:dark:border-gray-600/50',
]);

const isValue = (value) => value || value === 0;

const after = 'after:absolute after:h-1 after:w-full after:left-0 after:translate-y-[6px] after:-z-10 dark:after:bg-gray-800 after:bg-white after:transition-all';

const getClassLabel = computed(() => [after, isFocus.value || isValue(props.modelValue) || props.active ? 'top-0 left-3 text-xs' : 'top-1/2']);

const onInput = ({ target }) => {
  emit('update:modelValue', target.value);
};

const onBlur = (e) => {
  isFocus.value = false;
  emit('blur', e);
};
const onEnter = (e) => emit('enter', e);

const onFocus = () => (isFocus.value = true);

const onClick = (e) => emit('click', e);

const onIcon = (e) => {
  if (props.disabled) return;
  emit('on-icon', e);
};
</script>
