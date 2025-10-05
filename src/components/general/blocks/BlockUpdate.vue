<template>
  <div v-for="(file, key) in files" :key="key" class="mb-4 flex items-center">
    <VFile accept=".bin" @change="files[key] = $event" class="flex-auto">
      <h6 class="text-gray-600 bg:text-gray-400 first-letter:uppercase min-w-19">{{ key }}:</h6>
      {{ getFileNames(file) }}
    </VFile>

    <v-button class="min-w-[100px]" color="blue" size="small" :disabled="Boolean(!file)" @click="onSureFlash(key)">Update</v-button>
  </div>
</template>

<script setup lang="ts">
import type { IDialog } from '@/types/components';

import { nextTick, defineProps, reactive } from 'vue';
import { toByte, useFetch } from '@/helpers';

import VFile from '@/components/general/forms/VFile.vue';

interface Props {
  onDialog: (data: IDialog) => void;
}

interface IFiles {
  firmware: FileList | null;
  littleFS: FileList | null;
}

const { onDialog } = defineProps<Props>();

const files = reactive<IFiles>({ firmware: null, littleFS: null });

const getFileNames = (files: FileList | null) =>
  files
    ? Array.from(files)
        .map((i: File) => `${i.name} (${toByte(i.size)})`)
        .join('')
    : 'Select a file...';

const onFlash = async (files: FileList | null, name: string) => {
  if (!files) return;
  const body = new FormData();
  for (let i = 0; i < files.length; i++) {
    const file = files.item(i);
    if (!file) return;
    body.append(`file[${i}]`, file, name);
  }
  const res = await useFetch.$post('/update', { body });
  if (res?.state) onDialog({ value: true, title: 'Done', message: 'Reboot...' });
};

const updateFirmware = () => nextTick(() => onFlash(files.firmware, 'firmware.bin'));
const updateLittleFS = () => nextTick(() => onFlash(files.littleFS, 'littlefs.bin'));

const onSureFlash = (name: string) =>
  onDialog({
    value: true,
    message: `Are you sure you want to update the ${name}?`,
    callback: name === 'firmware' ? updateFirmware : updateLittleFS,
  });
</script>
