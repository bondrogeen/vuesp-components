<script setup lang="ts">
import type { IBlockUpdateEmits } from './types';

import { reactive } from 'vue';
import { toByte } from '@/helpers';

import VFile from '@/components/ui/file/VFile.vue';

const emit = defineEmits<IBlockUpdateEmits>();

interface IFiles {
  firmware: FileList | null;
  littlefs: FileList | null;
}

const files = reactive<IFiles>({ firmware: null, littlefs: null });

const getFileNames = (file: FileList | null) =>
  file
    ? Array.from(file)
        .map((i: File) => `${i.name} (${toByte(i.size)})`)
        .join('')
    : '';

const getFormData = (files: FileList, name: string) => {
  const body = new FormData();
  for (let i = 0; i < files.length; i++) {
    const file = files.item(i);
    if (!file) return;
    body.append(`file[${i}]`, file, name);
  }
  return body;
};

const onUpdate = (name: string, files: FileList | null) => {
  if (!files) return;
  const date = getFormData(files, name);
  if (!date) return;
  emit('update', name, date);
};
</script>

<template>
  <div>
    <div v-for="(file, key) in files" :key="key" class="mb-4 flex items-center">
      <VFile accept=".bin" @change="files[key] = $event" class="flex-auto">
        <div class="md:flex">
          <h6 class="text-gray-600 bg:text-gray-400 first-letter:uppercase min-w-19">{{ key }}:</h6>
          <slot :file="getFileNames(file)"></slot>
        </div>
      </VFile>

      <v-button class="min-w-[100px]" color="blue" :disabled="Boolean(!file)" @click="onUpdate(`${key}.bin`, file)">{{ $t('btnUpdate') }}</v-button>
    </div>
  </div>
</template>
