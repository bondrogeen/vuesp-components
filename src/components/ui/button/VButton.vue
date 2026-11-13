<script setup lang="ts">
import { computed, resolveComponent } from 'vue';

import type { ButtonColor, ButtonVariant, IVButtonEmits, IVButtonProps } from '@/components/ui/button/types';
import VLoader from '@/components/ui/loader/VLoader.vue';

const {
  href = '',
  to = '',
  color = 'transparent',
  variant = undefined,
  size = 'md',
  type = 'button',
  outline = false,
  block = false,
  disabled = false,
  loading = false,
} = defineProps<IVButtonProps>();

const emit = defineEmits<IVButtonEmits>();

const onClick = (e: Event) => {
  if (!disabled) emit('click', e);
};

const RouterLink = resolveComponent('RouterLink');
const component = computed(() => (to ? RouterLink : href ? 'a' : 'button'));
const nativeType = computed(() => (type === 'submit' || type === 'reset' ? type : 'button'));
const isIcon = computed(() => type === 'icon');

const baseClass =
  'relative inline-flex justify-center items-center gap-2 transition not-disabled:cursor-pointer not-disabled:hover:opacity-90 disabled:pointer-events-none disabled:opacity-40 rounded-md font-medium';

const solidColors: Record<ButtonColor, string> = {
  green: 'border border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400',
  red: 'border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400',
  gray: 'border border-gray-light-10/70 bg-white/50 text-gray-dark-30 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/70',
  blue: 'bg-[var(--color-blue-main)] text-white shadow-[var(--shadow-blue-glow)] hover:brightness-110',
  indigo: 'bg-[var(--color-indigo-main)] text-white shadow-[var(--shadow-indigo-glow)] hover:brightness-110',
  violet: 'bg-[var(--color-violet-main)] text-white shadow-[var(--shadow-violet-glow)] hover:brightness-110',
  emerald: 'bg-[var(--color-green-main)] text-white shadow-[var(--shadow-green-glow)] hover:brightness-110',
  amber: 'bg-[var(--color-amber-main)] text-night-dark-5 shadow-[var(--shadow-amber-glow)] hover:brightness-110',
  rose: 'bg-[var(--color-red-main)] text-white shadow-[var(--shadow-red-glow)] hover:brightness-110',
  slate: 'bg-[var(--color-night-light-10)] text-white shadow-[var(--shadow-slate-glow)] hover:brightness-110',
  transparent: '',
};

const outlineColors: Record<ButtonColor, string> = {
  green: 'border border-green-500/30 text-green-600 dark:text-green-400',
  red: 'border border-red-500/30 text-red-600 dark:text-red-400',
  gray: 'border border-gray-light-10/70 text-gray-dark-30 dark:border-white/15 dark:text-white/70',
  blue: 'border border-[var(--color-blue-main)] text-[var(--color-blue-main)]',
  indigo: 'border border-[var(--color-indigo-main)] text-[var(--color-indigo-main)]',
  violet: 'border border-[var(--color-violet-main)] text-[var(--color-violet-main)]',
  emerald: 'border border-[var(--color-green-main)] text-[var(--color-green-main)]',
  amber: 'border border-[var(--color-amber-main)] text-[var(--color-amber-main)]',
  rose: 'border border-[var(--color-red-main)] text-[var(--color-red-main)]',
  slate: 'border border-[var(--color-night-light-10)] text-[var(--color-night-light-10)]',
  transparent: '',
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-main text-white shadow-[0_12px_32px_-14px_var(--app-accent-shadow,var(--shadow-blue-glow))] hover:brightness-110',
  cyan: 'bg-cyan-main text-night-dark-5 shadow-[var(--shadow-cyan-glow-md)] hover:brightness-110',
  outline: 'border border-white/15 bg-transparent text-white hover:border-white/25 hover:bg-white/5',
  ghost: 'bg-transparent text-slate-main hover:bg-white/5 hover:text-white',
  dark: 'border border-white/10 bg-night-light-10 text-white hover:bg-white/5',
  danger: 'border border-red-main/25 bg-red-main/10 text-red-main hover:bg-red-main/15',
  success: 'border border-green-main/25 bg-green-main/10 text-green-main hover:bg-green-main/15',
  white: 'bg-white text-night-main hover:bg-white/90',
};

const sizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-3 text-sm',
  lg: 'h-12 px-4 text-sm',
  xl: 'h-14 px-5 text-sm',
};

const variantSizes = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-6 text-sm',
  xl: 'h-14 px-6 text-sm',
};

const iconSizes = {
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
  xl: 'size-14',
};

const getClass = computed(() => {
  const classes = [baseClass];

  if (isIcon.value) {
    classes.push('border border-gray-light-10/70 dark:border-white/10', iconSizes[size]);
  } else if (variant) {
    classes.push(variants[variant], variantSizes[size]);
  } else {
    classes.push(outline ? outlineColors[color] : solidColors[color], sizes[size]);
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
    :type="nativeType"
    :disabled="component === 'button' ? disabled : undefined"
    :aria-disabled="disabled || undefined"
    :class="getClass"
    @click="onClick"
  >
    <span :class="loading ? 'opacity-0' : ''">
      <slot></slot>
    </span>

    <VLoader v-if="loading" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
  </component>
</template>
