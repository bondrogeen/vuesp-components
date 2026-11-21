<script setup lang="ts">
import { computed, resolveComponent } from 'vue';

import type { TButtonColor, IVButtonEmits, IVButtonProps } from '@/components/ui/button/types';
import VLoader from '@/components/ui/loader/VLoader.vue';

const {
  href = '',
  to = '',
  color = 'violet',
  variant = 'solid',
  size = 'md',
  type = 'button',
  block = false,
  disabled = false,
  loading = false,
  title = '',
  target = '',
} = defineProps<IVButtonProps>();

const emit = defineEmits<IVButtonEmits>();

const onClick = (e: Event) => {
  if (!disabled) emit('click', e);
};

const RouterLink = computed(() => (to ? resolveComponent('RouterLink') : null));
const component = computed(() => (to ? RouterLink.value : href ? 'a' : 'button'));
const nativeType = computed(() => (type === 'submit' || type === 'reset' ? type : 'button'));
const isIcon = computed(() => type === 'icon');

const baseClass =
  'relative inline-flex justify-center items-center gap-2 transition not-disabled:cursor-pointer not-disabled:hover:opacity-90 disabled:pointer-events-none disabled:opacity-40 rounded-md font-medium';

interface IColorClasses {
  solid: string;
  soft: string;
  outline: string;
  ghost: string;
  muted: string;
}

const colorClasses: Record<TButtonColor, IColorClasses> = {
  cyan: {
    solid: 'bg-cyan-main text-night-dark-5 shadow-cyan-glow hover:brightness-110',
    soft: 'bg-cyan-main/10 text-cyan-main hover:bg-cyan-main/20',
    outline: 'border border-cyan-main text-cyan-main hover:border-gray-main hover:bg-gray-main/10 hover:text-gray-dark-30 dark:hover:text-gray-light-10',
    ghost: 'bg-transparent text-gray-main hover:bg-cyan-main/10 hover:text-cyan-main',
    muted: 'border border-gray-main text-gray-main hover:border-cyan-main hover:bg-cyan-main/10 hover:text-cyan-main',
  },
  blue: {
    solid: 'bg-blue-main text-white shadow-blue-glow hover:brightness-110',
    soft: 'bg-blue-main/10 text-blue-main hover:bg-blue-main/20',
    outline: 'border border-blue-main text-blue-main hover:border-gray-main hover:bg-gray-main/10 hover:text-gray-dark-30 dark:hover:text-gray-light-10',
    ghost: 'bg-transparent text-gray-main hover:bg-blue-main/10 hover:text-blue-main',
    muted: 'border border-gray-main text-gray-main hover:border-blue-main hover:bg-blue-main/10 hover:text-blue-main',
  },
  indigo: {
    solid: 'bg-indigo-main text-white shadow-indigo-glow hover:brightness-110',
    soft: 'bg-indigo-main/10 text-indigo-main hover:bg-indigo-main/20',
    outline: 'border border-indigo-main text-indigo-main hover:border-gray-main hover:bg-gray-main/10 hover:text-gray-dark-30 dark:hover:text-gray-light-10',
    ghost: 'bg-transparent text-gray-main hover:bg-indigo-main/10 hover:text-indigo-main',
    muted: 'border border-gray-main text-gray-main hover:border-indigo-main hover:bg-indigo-main/10 hover:text-indigo-main',
  },
  violet: {
    solid: 'bg-violet-main text-white shadow-violet-glow hover:brightness-110',
    soft: 'bg-violet-main/10 text-violet-main hover:bg-violet-main/20',
    outline: 'border border-violet-main text-violet-main hover:border-gray-main hover:bg-gray-main/10 hover:text-gray-dark-30 dark:hover:text-gray-light-10',
    ghost: 'bg-transparent text-gray-main hover:bg-violet-main/10 hover:text-violet-main',
    muted: 'border border-gray-main text-gray-main hover:border-violet-main hover:bg-violet-main/10 hover:text-violet-main',
  },
  purple: {
    solid: 'bg-purple-main text-white shadow-violet-glow hover:brightness-110',
    soft: 'bg-purple-main/10 text-purple-main hover:bg-purple-main/20',
    outline: 'border border-purple-main text-purple-main hover:border-gray-main hover:bg-gray-main/10 hover:text-gray-dark-30 dark:hover:text-gray-light-10',
    ghost: 'bg-transparent text-gray-main hover:bg-purple-main/10 hover:text-purple-main',
    muted: 'border border-gray-main text-gray-main hover:border-purple-main hover:bg-purple-main/10 hover:text-purple-main',
  },
  amber: {
    solid: 'bg-amber-main text-night-dark-5 shadow-amber-glow hover:brightness-110',
    soft: 'bg-amber-main/10 text-amber-main hover:bg-amber-main/20',
    outline: 'border border-amber-main text-amber-main hover:border-gray-main hover:bg-gray-main/10 hover:text-gray-dark-30 dark:hover:text-gray-light-10',
    ghost: 'bg-transparent text-gray-main hover:bg-amber-main/10 hover:text-amber-main',
    muted: 'border border-gray-main text-gray-main hover:border-amber-main hover:bg-amber-main/10 hover:text-amber-main',
  },
  green: {
    solid: 'bg-green-main text-night-dark-5 shadow-green-glow hover:brightness-110',
    soft: 'bg-green-main/10 text-green-main hover:bg-green-main/20',
    outline: 'border border-green-main text-green-main hover:border-gray-main hover:bg-gray-main/10 hover:text-gray-dark-30 dark:hover:text-gray-light-10',
    ghost: 'bg-transparent text-gray-main hover:bg-green-main/10 hover:text-green-main',
    muted: 'border border-gray-main text-gray-main hover:border-green-main hover:bg-green-main/10 hover:text-green-main',
  },
  red: {
    solid: 'bg-red-main text-white shadow-red-glow hover:brightness-110',
    soft: 'bg-red-main/10 text-red-main hover:bg-red-main/20',
    outline: 'border border-red-main text-red-main hover:border-gray-main hover:bg-gray-main/10 hover:text-gray-dark-30 dark:hover:text-gray-light-10',
    ghost: 'bg-transparent text-gray-main hover:bg-red-main/10 hover:text-red-main',
    muted: 'border border-gray-main text-gray-main hover:border-red-main hover:bg-red-main/10 hover:text-red-main',
  },
  slate: {
    solid: 'bg-slate-main text-night-dark-5 shadow-slate-glow hover:brightness-110',
    soft: 'bg-slate-main/10 text-slate-main hover:bg-slate-main/20',
    outline: 'border border-slate-main text-slate-main hover:border-gray-main hover:bg-gray-main/10 hover:text-gray-dark-30 dark:hover:text-gray-light-10',
    ghost: 'bg-transparent text-gray-main hover:bg-slate-main/10 hover:text-slate-main',
    muted: 'border border-gray-main text-gray-main hover:border-slate-main hover:bg-slate-main/10 hover:text-slate-main',
  },
  gray: {
    solid: 'bg-gray-main text-night-dark-5 hover:brightness-110',
    soft: 'bg-gray-main/10 text-gray-main hover:bg-gray-main/20',
    outline: 'border border-gray-main text-gray-main hover:border-gray-main hover:bg-gray-main/10 hover:text-gray-dark-30 dark:hover:text-gray-light-10',
    ghost: 'bg-transparent text-gray-main hover:bg-gray-main/10 hover:text-gray-main',
    muted: 'border border-gray-main text-gray-main hover:border-gray-main hover:bg-gray-main/10 hover:text-gray-main',
  },
  white: {
    solid: 'bg-white text-night-main hover:bg-white/90',
    soft: 'bg-white/15 text-white hover:bg-white/25',
    outline: 'border border-white text-white hover:border-gray-main hover:bg-gray-main/10 hover:text-gray-dark-30 dark:hover:text-gray-light-10',
    ghost: 'bg-transparent text-gray-main hover:bg-white/10 hover:text-white',
    muted: 'border border-gray-main text-gray-main hover:border-white hover:bg-white/10 hover:text-white',
  },
};

const variantClass = computed(() => {
  if (variant === 'none') return '';

  const palette = colorClasses[color] ?? colorClasses.violet;
  return palette[variant];
});

const sizes = {
  none: '',
  xs: 'h-6 px-2 text-xs',
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-3 text-sm',
  lg: 'h-12 px-4 text-sm',
  xl: 'h-14 px-5 text-sm',
};

const iconSizes = {
  none: '',
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
  xl: 'size-14',
};

const getClass = computed(() => {
  const classes = [baseClass];

  if (isIcon.value) {
    classes.push('border border-gray-light-10/70 dark:border-white/10', iconSizes[size]);
  } else {
    classes.push(variantClass.value, sizes[size]);
  }

  if (block) classes.push('w-full');
  if (disabled) classes.push('pointer-events-none opacity-40');

  return classes;
});
</script>

<template>
  <component
    :is="component"
    v-bind="$attrs"
    :href="href || undefined"
    :to="to || undefined"
    :target="target || undefined"
    :type="nativeType"
    :disabled="component === 'button' ? disabled : undefined"
    :aria-disabled="disabled || undefined"
    :title="title || undefined"
    :class="getClass"
    @click="onClick"
  >
    <span :class="loading ? 'opacity-0' : ''">
      <slot></slot>
    </span>

    <VLoader v-if="loading" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
  </component>
</template>
