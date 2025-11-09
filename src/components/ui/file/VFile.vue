<template>
  <label class="flex items-center cursor-pointer">
    <input type="file" class="hidden" v-bind="$attrs" @change="onChange" />
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

import type { IVFileEmits } from '@/components/ui/file/types';

const emit = defineEmits<IVFileEmits>();

const onChange = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target.files) return;
  emit('change', target.files);
};
</script>
