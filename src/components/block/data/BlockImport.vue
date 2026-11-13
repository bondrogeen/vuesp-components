<script setup lang="ts">
import type { IBlockConfig } from './types';

import { ref } from 'vue';

import VButton from '@/components/ui/button/VButton.vue';
import VDialog from '@/components/ui/dialog/VDialog.vue';

const emit = defineEmits<{
  close: [];
  import: [config: IBlockConfig];
}>();

const text = ref('');
const error = ref('');

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const decode = (): IBlockConfig | null => {
  try {
    const parsed: unknown = JSON.parse(text.value);

    if (!isRecord(parsed) || typeof parsed.type !== 'string' || !isRecord(parsed.bindings)) {
      error.value = 'Нужен JSON блока с полями type и bindings.';

      return null;
    }

    return {
      id: `imported-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type: parsed.type,
      provider: typeof parsed.provider === 'string' ? parsed.provider : undefined,
      bindings: parsed.bindings as IBlockConfig['bindings'],
      units: isRecord(parsed.units) ? (parsed.units as Record<string, string>) : undefined,
      metricArgs: isRecord(parsed.metricArgs) ? (parsed.metricArgs as IBlockConfig['metricArgs']) : undefined,
      metrics: isRecord(parsed.metrics) ? (parsed.metrics as IBlockConfig['metrics']) : undefined,
    };
  } catch {
    error.value = 'Не удалось разобрать JSON.';

    return null;
  }
};

const submit = () => {
  error.value = '';
  const config = decode();

  if (!config) return;

  emit('import', config);
  emit('close');
};
</script>

<template>
  <VDialog title="Импорт блока" size="md" @close="emit('close')">
    <div class="flex flex-col gap-3">
      <p class="text-sm text-gray-dark-25 dark:text-gray-main">
        Вставь JSON, который был скопирован кнопкой «Экспорт».
      </p>

      <textarea
        v-model="text"
        class="glass-inset min-h-40 w-full rounded-md p-3 font-mono text-xs outline-none"
        spellcheck="false"
        placeholder='{"type":"energy-flow","bindings":{...}}'
      ></textarea>

      <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

      <div class="flex justify-end gap-2">
        <VButton color="gray" outline @click="emit('close')">Отмена</VButton>
        <VButton variant="primary" @click="submit">Добавить</VButton>
      </div>
    </div>
  </VDialog>
</template>
