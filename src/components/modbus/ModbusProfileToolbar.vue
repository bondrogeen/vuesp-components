<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';

import VButton from '@/components/ui/button/VButton.vue';
import VIcon from '@/components/ui/icon/VIcon.vue';

import { useI18n } from '@/composables/useI18n';
import type { IModbusProfileToolbarEmits, IModbusProfileToolbarProps } from './types';

const { isDirty, isLoading, isSending, message, error, isValid } = defineProps<IModbusProfileToolbarProps>();
const emit = defineEmits<IModbusProfileToolbarEmits>();
const { $t } = useI18n();
const fileInput = useTemplateRef<HTMLInputElement>('fileInput');

const sendingText = computed(() => (isSending === 'save' ? $t('modbus.profileSaving') : $t('modbus.profileApplying')));

const onImport = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = '';
  if (file) emit('import', file);
};
</script>

<template>
  <div class="flex flex-wrap items-center justify-end gap-2 pt-2 text-xs">
    <p v-if="isLoading" class="whitespace-nowrap text-gray-dark-25 dark:text-gray-light-10">{{ $t('modbus.profileLoading') }}</p>
    <p v-else-if="isSending" class="whitespace-nowrap text-amber-600 dark:text-amber-400">{{ sendingText }}</p>
    <p v-else-if="isDirty" class="whitespace-nowrap text-amber-600 dark:text-amber-400">{{ $t('modbus.profileDirty') }}</p>
    <p v-else-if="message" class="whitespace-nowrap text-green-600 dark:text-green-400">{{ message }}</p>
    <p v-if="error" class="text-red-600 dark:text-red-400">{{ error }}</p>
    <input ref="fileInput" class="hidden" type="file" accept=".bin,application/octet-stream" @change="onImport" />
    <VButton size="sm" type="icon" variant="outline" :disabled="isLoading || isSending !== null" :title="$t('modbus.importProfile')" :aria-label="$t('modbus.importProfile')" @click="fileInput?.click()">
      <VIcon name="upload" :size="16" />
    </VButton>
    <VButton size="sm" type="icon" variant="outline" :disabled="isLoading || isSending !== null" :title="$t('modbus.exportProfile')" :aria-label="$t('modbus.exportProfile')" @click="emit('export')">
      <VIcon name="download" :size="16" />
    </VButton>
    <VButton size="sm" type="icon" variant="outline" :disabled="!isValid || isLoading || isSending !== null" :loading="isSending === 'apply'" :title="$t('modbus.applyProfile')" :aria-label="$t('modbus.applyProfile')" @click="emit('apply')">
      <VIcon name="check" :size="16" />
    </VButton>
    <VButton size="sm" type="icon" color="blue" :disabled="!isValid || isLoading || isSending !== null" :loading="isSending === 'save'" :title="$t('modbus.saveProfile')" :aria-label="$t('modbus.saveProfile')" @click="emit('save')">
      <VIcon name="save" :size="16" />
    </VButton>
  </div>
</template>
