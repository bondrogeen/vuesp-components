<template>
  <button :class="getClass" @click="onClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

interface Props {
  block?: boolean;
  outline?: boolean;
  color?: string;
  size?: string;
  type?: string;
}

const { color = 'gray', block, size = 'normal', type = 'button', outline = false } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'click', value: Event): void;
}>();

const onClick = (e: Event) => emit('click', e);

const gefClass = `relative flex justify-center items-center transition not-disabled:cursor-pointer not-disabled:hover:opacity-90 disabled:opacity-40 rounded`;

const green = outline ? `border border-green-600 text-green-600` : 'bg-green-600 dark:bg-green-800';
const red = outline ? `border border-red-600 text-red-600` : 'bg-red-600 dark:bg-red-800';
const gray = outline ? `border border-gray-600 text-gray-600` : 'bg-gray-700 dark:bg-gray-800';
const blue = outline ? `border border-blue-600 text-blue-600` : 'bg-blue-700 dark:bg-blue-800';

const colors: { [index: string]: string } = { green, red, gray, blue };

const types: { [index: string]: string } = {
  button: 'px-4',
  icon: 'h-10 w-10 rounded-full border border-gray-200 dark:border-gray-800',
};

const sizes: { [index: string]: string } = { normal: 'h-10', small: 'h-8' };

const getSize = (size: string): any => sizes?.[size] || '';

const getType = (type: string): any => types?.[type] || '';

const getColor = (color: string): any => (type === 'icon' ? '' : `${outline ? 'dark:text-white' : 'text-white'} ${colors?.[color] || ''}`);

const getClass = computed(() => [gefClass, getColor(color), getType(type), getSize(size), { 'w-full': block }]);
</script>
