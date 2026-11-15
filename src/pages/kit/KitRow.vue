<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
  <div class="grid gap-2 sm:grid-cols-[10rem_1fr] sm:items-start">
    <div class="pt-1 text-xs uppercase tracking-wide text-gray-main">{{ label }}</div>
    <div class="min-w-0"><slot /></div>
  </div>
</template>
