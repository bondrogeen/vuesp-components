<script setup lang="ts">
import type { IBlockMetric } from './types';

import VButton from '@/components/ui/button/VButton.vue';
import VFunc from '@/components/ui/func/VFunc.vue';
import VTextField from '@/components/ui/text-field/VTextField.vue';
import VisionIcon from '@/components/ui/vision/VisionIcon.vue';

import { METRIC_ARG_LABELS } from './resolver';

const { metric, index, args } = defineProps<{
  metric: IBlockMetric;
  index: number;
  args: string[];
}>();

const emit = defineEmits<{
  remove: [];
  'open-style': [];
  'toggle-field': [field: 'value' | 'format'];
  dragstart: [event: DragEvent, index: number];
  dragend: [];
  change: [patch: Partial<IBlockMetric>];
  hover: [event: string, index: number];
}>();

const onHover = (event: string, index: number) => emit('hover', event, index);
</script>

<template>
  <div class="glass-inset rounded-xl p-3">
    <div class="flex items-center gap-2">
      <div class="min-w-0 flex-1">
        <VTextField
          active
          hide-message
          :model-value="metric.label"
          label="Название"
          @update:model-value="emit('change', { label: $event })"
        />
      </div>

      <VButton
        type="icon"
        size="sm"
        aria-label="Стиль показателя"
        title="Стиль показателя"
        @click="emit('open-style')"
      >
        <VisionIcon name="palette" :size="18" />
      </VButton>

      <VButton type="icon" size="sm" aria-label="Удалить показатель" title="Удалить показатель" @click="emit('remove')">
        <VisionIcon name="trash" :size="14" />
      </VButton>

      <span
        draggable="true"
        class="-me-1 grid size-8 shrink-0 cursor-grab place-items-center rounded-md text-gray-400 transition hover:bg-white/5 hover:text-white active:cursor-grabbing"
        title="Перетащить показатель"
        @dragstart="emit('dragstart', $event, index)"
        @dragend="emit('dragend')"
      >
        <VisionIcon name="grip" :size="16" />
      </span>
    </div>

    <div class="mt-2 flex flex-col gap-2">
      <VFunc
        :value="metric.value"
        :args="args"
        :params="[...METRIC_ARG_LABELS]"
        label="Значение"
        @icon="emit('toggle-field', 'value')"
        @change="emit('change', { value: $event })"
        @hover="onHover"
      />

      <VFunc
        :value="metric.format"
        :args="args"
        :params="[...METRIC_ARG_LABELS]"
        :prefix="['v']"
        label="Формат"
        @icon="emit('toggle-field', 'format')"
        @change="emit('change', { format: $event })"
        @hover="onHover"
      />
    </div>
  </div>
</template>
