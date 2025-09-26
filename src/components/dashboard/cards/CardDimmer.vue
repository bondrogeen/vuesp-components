<template>
  <CardBase v-bind="props" @click="onClick">
    <template #header="item">
      <div class="flex justify-end">
        <div :class="'text-blue-600 dark:text-blue-400'">
          <svg width="32" height="32" viewBox="-7.5 -7.5 75 75" version="1.1" style="transform: rotate(-90deg)">
            <circle class="stroke-gray-300 dark:stroke-gray-700" r="30" cx="30" cy="30" fill="transparent" stroke-width="10"></circle>
            <circle r="30" cx="30" cy="30" stroke="currentColor" stroke-width="8" stroke-linecap="butt" :stroke-dashoffset="getRangePercent(item)" fill="transparent" stroke-dasharray="187"></circle>
          </svg>
        </div>
      </div>
    </template>

    <template #dialog="item">
      <div class="flex justify-center relative mx-2 my-6">
        <div class="absolute h-10 w-full top-0 left-0 bg-gray-400 dark:bg-gray-800 z-0 rounded-md"></div>

        <div class="absolute h-10 top-0 left-0 bg-blue-600 dark:bg-blue-400 z-0 rounded-md transition-[width_0.3s_linear]" :style="`width: ${getPercent(item)}%`"></div>

        <div class="absolute top-1/2 left-1/2 -translate-1/2 text-white z-10 font-bold text-xl">{{ getPercent(item) }} %</div>

        <input type="range" v-bind="getBind(item)" :value="value" class="w-full h-10 z-10 appearance-none cursor-pointer opacity-0" @change="onChange" />
      </div>
    </template>
  </CardBase>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

import type { IDashboardItem } from '@/types/types';

import CardBase from '@/components/dashboard/cards/CardBase.vue';

const emit = defineEmits<{
  (e: 'click', event: Event): void;
  (e: 'setState', item: any): void;
}>();

const props = defineProps<IDashboardItem>();

const getPercent = ({ options, value }: IDashboardItem) => {
  const { max = 255 } = options || {};
  return Math.round((100 * +value) / max);
};
const getRangePercent = ({ options, value }: IDashboardItem) => {
  const { max = 255 } = options || {};
  return Math.round(187 - (+value / max) * 187);
};

const getBind = ({ options }: IDashboardItem) => {
  const { min = 0, max = 255, step = 1 } = options || {};
  return { min, max, step };
};

const onClick = (event: Event) => emit('click', event);

const onChange = (e: any) => {
  const value = +e?.target?.value || 0;
  emit('setState', value);
};
</script>
