<template>
  <div class="h-dvh overflow-y-auto scrollbar">
    <header class="glass-header sticky top-0 z-30 border-b">
      <div class="container mx-auto flex items-center gap-3 py-3">
        <VIconLogo class="h-7 shrink-0 text-cyan-main" />

        <div class="min-w-0 flex-auto">
          <h1 class="text-lg font-semibold uppercase text-gray-dark-40 dark:text-white">Vuesp Components</h1>
          <p class="text-xs text-gray-dark-25 dark:text-gray-main">Каталог компонентов кита</p>
        </div>

        <VisionThemeToggle />
      </div>
    </header>

    <main class="container mx-auto py-6 sm:py-8">
      <KitShowcase />
    </main>
  </div>
</template>

<script setup lang="ts">
import VIconLogo from '@/components/ui/icon/VIconLogo.vue';
import VisionThemeToggle from '@/components/ui/vision/VisionThemeToggle.vue';

import KitShowcase from '@/pages/kit/KitShowcase.vue';
</script>
