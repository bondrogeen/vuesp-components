<template>
  <label class="flex items-center cursor-pointer">
    <input type="file" class="hidden" v-bind="$attrs" @change="onChange" />

    <slot v-bind="selectFiles"></slot>
  </label>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

import type { ITextFieldEvent, ITextFieldInfo } from '@/types/types';

const emit = defineEmits<{
  (e: 'change', value: ITextFieldEvent): void;
}>();

const selectFiles = ref<ITextFieldInfo>({ files: [], totalSize: 0 });

const onChange = async (e: any) => {
  const files: FileList = e.target.files;

  const info: ITextFieldInfo = { files: [], totalSize: 0 };

  for (let i = 0; i < files.length; i++) {
    const file: File | null = files.item(i);
    if (file) {
      info.totalSize += file.size;
      info.files.push({ name: file.name, size: file.size });
    }
  }
  if (!files.length) return;
  selectFiles.value = info;
  emit('change', { files, info });
};
</script>
