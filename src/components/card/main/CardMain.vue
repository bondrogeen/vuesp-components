<template>
  <div class="glass-panel relative p-5 transition-all duration-300 hover:border-primary/25 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_0_60px_-18px_rgba(40,183,240,0.25)] sm:p-6" :class="{ 'overflow-hidden': loading }">
    <div
      v-if="loading"
      class="loader-line w-full absolute top-0 left-0 h-[3px] bg-gray-100 dark:bg-white/5 before:bg-primary before:h-1 rounded-xl z-20 before:absolute before:w-[40%] before:-left-1/2 before:content-[''] before:animate-[lineAnim_1s_linear_infinite]"
    ></div>
    <div v-if="loading" class="absolute top-0 left-0 w-full h-full bg-gray-50 dark:bg-[#060b28]/75 z-10 opacity-50"></div>

    <div v-if="title" class="mb-4 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ title }}</h3>

      <div>
        <slot name="header"></slot>
      </div>
    </div>

    <div class="max-w-full" :inert="disabled" :aria-disabled="disabled || undefined">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ICardMainProps } from '@/components/card/main/types';

const { title, loading, disabled } = defineProps<ICardMainProps>();
</script>

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
