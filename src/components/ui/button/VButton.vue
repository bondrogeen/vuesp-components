<script setup lang="ts">
import { computed, resolveComponent } from 'vue';

import type { ButtonVariant, IVButtonEmits, IVButtonProps } from '@/components/ui/button/types';
import VLoader from '@/components/ui/loader/VLoader.vue';

const {
  href = '',
  to = '',
  color = 'transparent',
  variant = 'default',
  invert = false,
  size = 'md',
  type = 'button',
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

const isTransparent = computed(() => color === 'transparent');

const colorValue = computed(() =>
  isTransparent.value ? 'var(--color-violet-main)' : `var(--color-${color}-main)`
);

const onColor = computed(() =>
  ['cyan', 'amber', 'green', 'slate', 'gray'].includes(color) ? 'var(--color-night-dark-5)' : '#fff'
);

const glowValue = computed(() => {
  if (color === 'purple') return 'var(--shadow-violet-glow)';
  if (color === 'gray' || isTransparent.value) return '0 0 #0000';
  return `var(--shadow-${color}-glow)`;
});

const variantClass = computed(() => {
  if (isTransparent.value && variant === 'default') return ghostClass;
  if (variant === 'soft' && invert) return ghostClass;
  if (variant === 'outline' && invert) return invertedOutline;
  return variants[variant];
});

const ghostClass = 'bg-transparent text-gray-main hover:bg-[var(--btn-color)]/10 hover:text-[var(--btn-color)]';

const invertedOutline =
  'border border-gray-main text-gray-main hover:border-[var(--btn-color)] hover:bg-[var(--btn-color)]/10 hover:text-[var(--btn-color)]';

const variants: Record<ButtonVariant, string> = {
  default: 'bg-[var(--btn-color)] text-[var(--btn-on)] shadow-[var(--btn-glow)] hover:brightness-110',
  soft: 'border border-[var(--btn-color)]/25 bg-[var(--btn-color)]/10 text-[var(--btn-color)] hover:bg-[var(--btn-color)]/20',
  outline:
    'border border-[var(--btn-color)] text-[var(--btn-color)] hover:border-gray-main hover:bg-gray-main/10 hover:text-gray-dark-30 dark:hover:text-gray-light-10',
  white: 'bg-white text-night-main hover:bg-white/90',
};

const sizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-3 text-sm',
  lg: 'h-12 px-4 text-sm',
  xl: 'h-14 px-5 text-sm',
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
    :type="nativeType"
    :disabled="component === 'button' ? disabled : undefined"
    :aria-disabled="disabled || undefined"
    :class="getClass"
    :style="{ '--btn-color': colorValue, '--btn-on': onColor, '--btn-glow': glowValue }"
    @click="onClick"
  >
    <span :class="loading ? 'opacity-0' : ''">
      <slot></slot>
    </span>

    <VLoader v-if="loading" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
  </component>
</template>
