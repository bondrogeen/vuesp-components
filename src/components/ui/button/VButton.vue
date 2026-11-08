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

const baseClass = 'relative inline-flex justify-center items-center gap-2 transition not-disabled:cursor-pointer not-disabled:hover:opacity-90 disabled:pointer-events-none disabled:opacity-40 rounded-md font-medium';

const solidColors: Record<ButtonColor, string> = {
  green: 'border border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400',
  red: 'border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400',
  gray: 'border border-gray-200/70 bg-white/50 text-gray-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/70',
  blue: 'bg-[var(--accent-blue)] text-white shadow-[0_8px_24px_-12px_rgba(37,99,235,0.9)] hover:brightness-110',
  indigo: 'bg-[var(--accent-indigo)] text-white shadow-[0_8px_24px_-12px_rgba(99,102,241,0.9)] hover:brightness-110',
  violet: 'bg-[var(--accent-violet)] text-white shadow-[0_8px_24px_-12px_rgba(139,92,246,0.9)] hover:brightness-110',
  emerald: 'bg-[var(--accent-emerald)] text-white shadow-[0_8px_24px_-12px_rgba(16,185,129,0.9)] hover:brightness-110',
  amber: 'bg-[var(--accent-amber)] text-[#231400] shadow-[0_8px_24px_-12px_rgba(245,158,11,0.9)] hover:brightness-110',
  rose: 'bg-[var(--accent-rose)] text-white shadow-[0_8px_24px_-12px_rgba(244,63,94,0.9)] hover:brightness-110',
  slate: 'bg-[var(--accent-slate)] text-white shadow-[0_8px_24px_-12px_rgba(71,85,105,0.9)] hover:brightness-110',
  transparent: '',
};

const outlineColors: Record<ButtonColor, string> = {
  green: 'border border-green-500/30 text-green-600 dark:text-green-400',
  red: 'border border-red-500/30 text-red-600 dark:text-red-400',
  gray: 'border border-gray-300/70 text-gray-700 dark:border-white/15 dark:text-white/70',
  blue: 'border border-[var(--accent-blue)] text-[var(--accent-blue)]',
  indigo: 'border border-[var(--accent-indigo)] text-[var(--accent-indigo)]',
  violet: 'border border-[var(--accent-violet)] text-[var(--accent-violet)]',
  emerald: 'border border-[var(--accent-emerald)] text-[var(--accent-emerald)]',
  amber: 'border border-[var(--accent-amber)] text-[var(--accent-amber)]',
  rose: 'border border-[var(--accent-rose)] text-[var(--accent-rose)]',
  slate: 'border border-[var(--accent-slate)] text-[var(--accent-slate)]',
  transparent: '',
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-vision-primary text-white shadow-[0_12px_32px_-14px_var(--app-accent-shadow,rgba(37,99,235,0.9))] hover:brightness-110',
  cyan: 'bg-[#28b7f0] text-[#03111f] shadow-[0_12px_32px_-14px_rgba(40,183,240,0.9)] hover:bg-[#66d3f1]',
  outline: 'border border-white/15 bg-transparent text-white hover:border-white/25 hover:bg-white/5',
  ghost: 'bg-transparent text-vision-muted hover:bg-white/5 hover:text-white',
  dark: 'border border-white/10 bg-vision-card-2 text-white hover:bg-white/5',
  danger: 'border border-vision-danger/25 bg-vision-danger/10 text-vision-danger hover:bg-vision-danger/15',
  success: 'border border-vision-success/25 bg-vision-success/10 text-vision-success hover:bg-vision-success/15',
  white: 'bg-white text-[#060b28] hover:bg-white/90',
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
    classes.push('border border-gray-200/70 dark:border-white/10', iconSizes[size]);
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
