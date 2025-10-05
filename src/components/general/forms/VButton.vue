<template>
  <component :is="isComponents" v-bind="$attrs" :href="href" :to="to" :class="getClass" :disabled="Boolean(disabled)" @click="onClick">
    <span :class="loading ? 'opacity-0' : ''">
      <slot></slot>
    </span>

    <VLoader v-if="loading" class="absolute left-1/2 -translate-x-1/2" />
  </component>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

import VLoader from '@/components/general/forms/VLoader.vue';

interface Props {
  block?: boolean;
  outline?: boolean;
  color?: string;
  size?: 'normal' | 'small';
  type?: 'button' | 'icon';
  href?: string;
  to?: string;
  loading?: boolean;
  disabled?: number | boolean;
}

const { href = '', to = '', color = 'gray', block, size = 'normal', type = 'button', outline = false, loading = false, disabled = false } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'click', value: Event): void;
}>();

const onClick = (e: Event) => emit('click', e);

const gefClass = `relative flex justify-center items-center transition not-disabled:cursor-pointer not-disabled:hover:opacity-90 disabled:opacity-40 rounded`;

const green = outline ? `border border-green-600 text-green-600` : 'bg-green-600 dark:bg-green-800';
const red = outline ? `border border-red-600 text-red-600` : 'bg-red-600 dark:bg-red-800';
const gray = outline ? `border border-gray-600 text-gray-600` : 'bg-gray-500 dark:bg-gray-800';
const blue = outline ? `border border-blue-600 text-blue-600` : 'bg-blue-700 dark:bg-blue-800';

const colors: { [index: string]: string } = { green, red, gray, blue };

const types: { [index: string]: string } = {
  button: 'px-4',
  icon: 'rounded-full border border-gray-200 dark:border-gray-800',
};

const sizes = {
  button: { normal: 'h-10', small: 'h-8' },
  icon: { normal: 'size-10', small: 'size-8' },
};

const getSize = (type: keyof typeof sizes, size: 'normal' | 'small'): string => sizes[type]?.[size] || '';

const getType = (type: string): string => types?.[type] || '';

const getColor = (color: string): string => (type === 'icon' ? '' : `${outline ? 'dark:text-white' : 'text-white'} ${colors?.[color] || ''}`);

const getClass = computed(() => [gefClass, getColor(color), getType(type), getSize(type, size), { 'w-full': block }]);
const isComponents = computed(() => (href || to ? 'router-link' : 'button'));
</script>
