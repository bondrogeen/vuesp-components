<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <section class="space-y-3">
    <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h2 class="text-lg font-semibold text-gray-dark-30 dark:text-white">{{ title }}</h2>
      <p v-if="description" class="text-sm text-gray-dark-25 dark:text-gray-main">{{ description }}</p>
    </div>

    <div class="glass-inset rounded-xl p-4 sm:p-6">
      <slot />
    </div>
  </section>
</template>
