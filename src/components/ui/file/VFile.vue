<template>
  <label class="flex items-center cursor-pointer">
    <input type="file" class="hidden" v-bind="$attrs" :multiple="Boolean(multiple)" :accept="accept || undefined" @change="onChange" />
    <slot></slot>
  </label>
</template>

<script setup lang="ts">

import type { IVFileEmits, IVFileProps } from '@/components/ui/file/types';

const { multiple = false, accept = '' } = defineProps<IVFileProps>();

const emit = defineEmits<IVFileEmits>();

const onChange = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target.files) return;
  emit('change', target.files);
};
</script>
