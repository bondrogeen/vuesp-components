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
        Links:
        <div class="flex flex-wrap gap-2 text-gray-700 dark:text-gray-400">
          <router-link v-if="links.homepage" :href="links.homepage" target="_blank" class="me-4">Homepage</router-link>
          <router-link v-if="links.repository" :href="links.repository" target="_blank" class="me-4">Repository</router-link>
          <router-link v-if="links.bugs" :href="links.bugs" target="_blank" class="me-4">Bugs</router-link>
          <router-link v-if="links.author" :href="links.author" target="_blank" class="me-4">Author</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

import type { IStoreInfo } from '@/types/types';

const { id = 0, firmware = [], pkg } = defineProps<IStoreInfo>();

const getFirmware = computed(() => firmware.join('.'));

const links = computed(() => ({
  homepage: pkg?.homepage,
  repository: pkg?.repository?.url,
  bugs: pkg?.bugs?.url,
  author: pkg?.author ? `mailto:${pkg?.author}` : '',
}));
</script>
