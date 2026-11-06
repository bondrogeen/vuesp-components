<template>
  <component :is="isComponents" v-bind="$attrs" :href="href" :to="to" :class="getClass" @click="onClick">
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

const { href = '', to = '', color = 'transparent', size = 'md', type = 'button', outline = false, loading = false } = defineProps<IVButtonProps>();

const emit = defineEmits<IVButtonEmits>();

const onClick = (e: Event) => emit('click', e);

const gefClass = `relative flex justify-center items-center transition not-disabled:cursor-pointer not-disabled:hover:opacity-90 disabled:opacity-40 rounded-md`;

const green = outline ? `border border-green-500/30 text-green-600 dark:text-green-400` : 'border border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400';
const red = outline ? `border border-red-500/30 text-red-600 dark:text-red-400` : 'border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400';
const gray = outline ? `border border-gray-300/70 text-gray-700 dark:border-white/15 dark:text-white/70` : 'border border-gray-200/70 bg-white/50 text-gray-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/70';
const blue = outline ? 'border border-[var(--accent-blue)] text-[var(--accent-blue)]' : 'bg-[var(--accent-blue)] text-white shadow-[0_8px_24px_-12px_rgba(37,99,235,0.9)] hover:brightness-110';
const indigo = outline ? 'border border-[var(--accent-indigo)] text-[var(--accent-indigo)]' : 'bg-[var(--accent-indigo)] text-white shadow-[0_8px_24px_-12px_rgba(99,102,241,0.9)] hover:brightness-110';
const violet = outline ? 'border border-[var(--accent-violet)] text-[var(--accent-violet)]' : 'bg-[var(--accent-violet)] text-white shadow-[0_8px_24px_-12px_rgba(139,92,246,0.9)] hover:brightness-110';
const emerald = outline ? 'border border-[var(--accent-emerald)] text-[var(--accent-emerald)]' : 'bg-[var(--accent-emerald)] text-white shadow-[0_8px_24px_-12px_rgba(16,185,129,0.9)] hover:brightness-110';
const amber = outline ? 'border border-[var(--accent-amber)] text-[var(--accent-amber)]' : 'bg-[var(--accent-amber)] text-[#231400] shadow-[0_8px_24px_-12px_rgba(245,158,11,0.9)] hover:brightness-110';
const rose = outline ? 'border border-[var(--accent-rose)] text-[var(--accent-rose)]' : 'bg-[var(--accent-rose)] text-white shadow-[0_8px_24px_-12px_rgba(244,63,94,0.9)] hover:brightness-110';
const slate = outline ? 'border border-[var(--accent-slate)] text-[var(--accent-slate)]' : 'bg-[var(--accent-slate)] text-white shadow-[0_8px_24px_-12px_rgba(71,85,105,0.9)] hover:brightness-110';
const transparent = outline ? `` : '';

const colors = { green, red, gray, blue, indigo, violet, emerald, amber, rose, slate, transparent };

const types = {
  button: 'px-3',
  icon: 'rounded-md border border-gray-200/70 dark:border-white/10',
};

const sizes = {
  button: { sm: 'h-8', md: 'h-10', lg: 'h-12', xl: 'h-14' },
  icon: { sm: 'size-8', md: 'size-10', lg: 'size-12', xl: 'size-14' },
};

const getClass = computed(() => [gefClass, getColor(color), getType(type), getSize(type, size)]);
const isComponents = computed(() => (href || to ? 'router-link' : 'button'));

const getSize = (type: string, size: string): string => sizes[type as keyof typeof sizes]?.[size as keyof (typeof sizes)[keyof typeof sizes]] || '';
const getType = (type: string): string => types?.[type as keyof typeof types] || '';
const getColor = (color: string): string => colors?.[color as keyof typeof colors];
</script>
