<script setup lang="ts">
import { computed } from 'vue';

import type { ICardProps } from '@/components/ui/card/types';

const {
  variant = 'glass',
  padding = 'lg',
  tone = 'default',
  title = '',
  subtitle = '',
  hover = false,
  disabled = false,
  as = 'div',
} = defineProps<ICardProps>();

const variantClasses: Record<string, string> = {
  glass: 'glass-inset',
  solid: 'border border-gray-light-10/70 bg-white/80 dark:border-white/10 dark:bg-night-light-10/80',
  outline: 'border border-gray-light-10/70 bg-transparent dark:border-white/10',
  ghost: 'bg-transparent',
};

const paddingClasses: Record<string, string> = {
  none: '',
  lg: 'p-5 sm:p-6',
};

const toneClasses: Record<string, string> = {
  default: '',
  info: '!border-blue-main/30 !bg-blue-main/10 text-blue-main',
  success: '!border-green-main/30 !bg-green-main/10 text-green-main',
  warning: '!border-amber-main/30 !bg-amber-main/10 text-amber-main',
  danger: '!border-red-main/30 !bg-red-main/10 text-red-main',
  accent: '!border-violet-main/30 !bg-violet-main/10 text-violet-main',
};

const getClass = computed(() => [
  'relative rounded-xl transition-all duration-300',
  variantClasses[variant],
  paddingClasses[padding],
  toneClasses[tone],
  hover ? 'hover:border-cyan-main/25 hover:shadow-cyan-glow' : '',
]);
</script>

<template>
  <component :is="as" :class="getClass" :aria-disabled="disabled || undefined">
    <div v-if="title || subtitle || $slots.header" class="mb-4 flex items-start justify-between gap-3">
      <div v-if="title || subtitle" class="min-w-0">
        <h3 v-if="title" class="text-lg font-semibold text-gray-dark-30 dark:text-white">{{ title }}</h3>
        <p v-if="subtitle" class="mt-1 text-sm text-gray-dark-25 dark:text-gray-main">{{ subtitle }}</p>
      </div>

      <div v-if="$slots.header" class="ml-auto shrink-0">
        <slot name="header"></slot>
      </div>
    </div>

    <div :inert="disabled" class="max-w-full">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="mt-4 border-t border-gray-light-10/70 pt-4 dark:border-white/10">
      <slot name="footer"></slot>
    </div>
  </component>
</template>
