<script setup lang="ts">
import type { IBlockField } from './types';

import VButton from '@/components/ui/button/VButton.vue';
import VTextField from '@/components/ui/text-field/VTextField.vue';
import VisionIcon from '@/components/ui/vision/VisionIcon.vue';

const {
  field,
  modelValue,
  formatValue = '',
  hasFormat = false,
  placeholder = '',
  placeholderFormat = '',
  showReset = true,
} = defineProps<{
  field: IBlockField;
  modelValue: string;
  formatValue?: string;
  hasFormat?: boolean;
  placeholder?: string;
  placeholderFormat?: string;
  showReset?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'update:format': [value: string];
  pick: [];
  reset: [];
}>();
</script>

<template>
  <div class="glass-inset rounded-xl p-3">
    <div class="flex items-end gap-2">
      <div class="grid min-w-0 flex-1 gap-2" :class="{ 'sm:grid-cols-2': hasFormat }">
        <VTextField
          v-if="field.plain"
          active
          hide-message
          :model-value="modelValue"
          :label="field.label"
          @update:model-value="emit('update:modelValue', $event)"
        />

        <VTextField
          v-else
          active
          hide-message
          :model-value="modelValue"
          :label="field.label"
          :placeholder="placeholder"
          @update:model-value="emit('update:modelValue', $event)"
          @on-icon="emit('pick')"
        >
          <template #icon>
            <VisionIcon name="search" :size="16" />
          </template>
        </VTextField>

        <VTextField
          v-if="hasFormat"
          active
          hide-message
          :model-value="formatValue"
          label="Формат"
          :placeholder="placeholderFormat"
          @update:model-value="emit('update:format', $event)"
        />
      </div>

      <VButton
        v-if="showReset"
        type="icon"
        class="shrink-0"
        aria-label="Сбросить поле"
        title="Сбросить поле"
        @click="emit('reset')"
      >
        <VisionIcon name="refresh" :size="14" />
      </VButton>
    </div>

    <p v-if="field.hint" class="mt-1.5 text-xs text-gray-500 dark:text-gray-400">{{ field.hint }}</p>
  </div>
</template>
