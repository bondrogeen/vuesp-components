<script setup lang="ts">
import { computed } from 'vue';

import type { ICardMainProps } from '@/components/card/main/types';

const { title = '', loading = false, disabled = false, padded = true } = defineProps<ICardMainProps>();

const paddingClass = computed(() => (padded ? 'p-5 sm:p-6' : ''));
</script>

<template>
  <div
    class="glass-panel relative transition-all duration-300 hover:border-cyan-main/25 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_0_60px_-18px_rgba(40,183,240,0.25)]"
    :class="[paddingClass, { 'overflow-hidden': loading }]"
  >
    <div
      v-if="loading"
      class="loader-line w-full absolute top-0 left-0 h-[3px] bg-gray-light-30 dark:bg-white/5 before:bg-cyan-main before:h-1 rounded-xl z-20 before:absolute before:w-[40%] before:-left-1/2 before:content-[''] before:animate-[lineAnim_1s_linear_infinite]"
    ></div>
    <div v-if="loading" class="absolute top-0 left-0 w-full h-full bg-gray-light-30 dark:bg-night-main/75 z-10 opacity-50"></div>

    <div v-if="title || $slots.header" class="mb-4 flex items-center justify-between gap-3">
      <h3 v-if="title" class="text-lg font-semibold text-gray-dark-30 dark:text-white">{{ title }}</h3>

      <div class="ml-auto">
        <slot name="header"></slot>
      </div>
    </div>

    <div class="max-w-full" :inert="disabled" :aria-disabled="disabled || undefined">
      <slot></slot>
    </div>
  </div>
</template>

<style>
@keyframes lineAnim {
  0% {
    left: -40%;
  }
  50% {
    left: 20%;
    width: 80%;
  }
  100% {
    left: 100%;
    width: 100%;
  }
}
</style>
