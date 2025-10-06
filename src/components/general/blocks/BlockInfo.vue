<template>
  <div>
    <p class="my-4 text-gray-700 dark:text-gray-400">{{ pkg?.description }}</p>

    <div class="flex flex-col md:flex-row flex-wrap md:gap-4 text-sm">
      <div class="flex gap-2">
        Firmware (hw):
        <span class="text-gray-700 dark:text-gray-400">{{ getFirmware }}</span>
      </div>

      <div class="flex gap-2">
        <div class="flex gap-2">
          Version (web):
          <span class="text-gray-700 dark:text-gray-400">{{ pkg?.version }}</span>
        </div>
      </div>

      <div class="flex-auto"></div>

      <div class="flex gap-2">
        ID:
        <span class="text-gray-700 dark:text-gray-400">{{ id.toString(16) }}</span>
      </div>
    </div>

    <hr class="dark:text-gray-700 text-gray-200 my-2" />

    <div class="flex flex-col gap-4 text-sm">
      <div class="flex gap-4">
        <slot name="links" :links="links"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

import type { IStateInfo } from '@/types/types';

const { id = 0, firmware = [], pkg } = defineProps<IStateInfo>();

const getFirmware = computed(() => firmware.join('.'));

const links = computed(() => {
  const arr = [];
  if (pkg?.homepage) arr.push({ name: 'homepage', href: pkg.homepage });
  if (pkg?.repository?.url) arr.push({ name: 'repository', href: pkg.repository.url });
  if (pkg?.bugs?.url) arr.push({ name: 'bugs', href: pkg.bugs.url });
  if (pkg?.author) arr.push({ name: 'author', href: `mailto:${pkg?.author}` });
  return arr;
});
</script>
