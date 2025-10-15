<template>
  <div class="relative rounded-md border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6" :class="{ 'overflow-hidden': props.loading }">
    <div
      v-if="loading"
      class="loader-line w-full absolute top-0 left-0 h-[3px] bg-gray-100 dark:bg-gray-800 before:bg-blue-600 dark:before:bg-blue-800 before:h-1 rounded-xl z-20 before:absolute before:w-[40%] before:-left-1/2 before:content-[''] before:animate-[lineAnim_1s_linear_infinite]"
    ></div>
    <div v-if="loading" class="absolute top-0 left-0 w-full h-full bg-gray-50 dark:bg-gray-900 z-10 opacity-50"></div>

    <div class="mb-6 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">{{ props.title }}</h3>

      <div>
        <slot name="header"></slot>
      </div>
    </div>

    <div class="max-w-full">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  title: string;
  loading: boolean;
}

const props = defineProps<Props>();
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
