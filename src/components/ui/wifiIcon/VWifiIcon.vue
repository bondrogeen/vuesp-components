<template>
  <div class="relative flex items-end gap-0.5 w-10">
    <div
      v-for="(item, i) of [10, 15, 25, 40, 70]"
      :key="item"
      class="w-1 h-5 rounded-lg"
      :class="[isActive(item) ? 'bg-gray-dark-40 dark:bg-gray-light-30' : 'bg-gray-light-10 dark:bg-gray-dark-30']"
      :style="`height: ${(i + 1) * 5}px`"
      :title="`rssi: ${rssi} channel: ${channel}`"
    ></div>
    <div class="absolute -top-1 -left-1 text-xs text-gray-dark-25 dark:text-gray-light-10">{{ channel }}</div>
  </div>
</template>

<script setup lang="ts">
import type { IVWifiIconProps } from '@/components/ui/wifiIcon/types';



const { rssi = 0, channel = 0 } = defineProps<IVWifiIconProps>();

const quality = 2 * (rssi + 100);

const isActive = (i: number) => i < quality;
</script>
