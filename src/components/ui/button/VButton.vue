<template>
  <component :is="isComponents" v-bind="$attrs" :href="href" :to="to" :class="getClass" :disabled="Boolean(disabled)" @click="onClick">
    <span :class="loading ? 'opacity-0' : ''">
      <slot></slot>
    </span>

    <VLoader v-if="loading" class="absolute left-1/2 -translate-x-1/2" />
  </component>
</template>

<script setup lang="ts">
import type { IVButtonProps, IVButtonEmits } from '@/components/ui/button/types';
import { computed } from 'vue';

import VLoader from '@/components/ui/loader/VLoader.vue';

const { href = '', to = '', color = 'gray', block, size = 'md', type = 'button', outline = false, loading = false, disabled = false } = defineProps<IVButtonProps>();

const emit = defineEmits<IVButtonEmits>();

const onClick = (e: Event) => emit('click', e);

const gefClass = `relative flex justify-center items-center transition not-disabled:cursor-pointer not-disabled:hover:opacity-90 disabled:opacity-40 rounded`;

const green = outline ? `border border-green-600 text-green-600` : 'bg-green-600 dark:bg-green-800';
const red = outline ? `border border-red-600 text-red-600` : 'bg-red-600 dark:bg-red-800';
const gray = outline ? `border border-gray-600 text-gray-600` : 'bg-gray-500 dark:bg-gray-800';
const blue = outline ? `border border-blue-600 text-blue-600` : 'bg-blue-700 dark:bg-blue-800';
const transparent = outline ? `` : '';

const colors = { green, red, gray, blue, transparent };

const types = {
  button: 'px-3',
  icon: 'rounded-full border border-gray-200 dark:border-gray-800',
};

const sizes = {
  button: { sm: 'h-8', md: 'h-10', lg: 'h-12', xl: 'h-14' },
  icon: { sm: 'size-8', md: 'size-10', lg: 'size-12', xl: 'size-14' },
};

const getClass = computed(() => [gefClass, getColor(color), getType(type), getSize(type, size), { 'w-full': block }]);
const isComponents = computed(() => (href || to ? 'router-link' : 'button'));

const getSize = (type: string, size: string): string => sizes[type as keyof typeof sizes]?.[size as keyof (typeof sizes)[keyof typeof sizes]] || '';
const getType = (type: string): string => types?.[type as keyof typeof types] || '';
const getColor = (color: string): string => (type === 'icon' ? '' : `${outline ? 'dark:text-white' : 'text-white'} ${colors?.[color as keyof typeof colors] || ''}`);
</script>
