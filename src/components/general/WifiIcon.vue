<template>
  <div class="relative flex items-end gap-0.5 w-10">
    <div
      v-for="(item, i) of [10, 15, 25, 40, 70]"
      :key="item"
      class="w-1 h-5 rounded-lg"
      :class="[isActive(item) ? 'bg-gray-900 dark:bg-gray-100' : 'bg-gray-300 dark:bg-gray-700']"
      :style="`height: ${(i + 1) * 5}px`"
      :title="`rssi: ${rssi} channel: ${channel}`"
    ></div>
    <div class="absolute -top-1 -left-1 text-xs text-gray-600 dark:text-gray-300">{{ channel }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  rssi?: number;
  channel?: number;
}

const { rssi = 0, channel = 0 } = defineProps<Props>();

const quality = 2 * (rssi + 100);

const isActive = (i: number) => i < quality;
</script>
