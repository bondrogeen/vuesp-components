<script setup lang="ts">
import type { IMetricStyle, MetricAlign, MetricColor, MetricSize, MetricWeight } from './types';

import { computed } from 'vue';

import VButton from '@/components/ui/button/VButton.vue';
import VDialog from '@/components/ui/dialog/VDialog.vue';
import VSelect from '@/components/ui/select/VSelect.vue';

import {
  DEFAULT_METRIC_STYLE,
  METRIC_ALIGN_OPTIONS,
  METRIC_COLOR_OPTIONS,
  METRIC_SIZE_OPTIONS,
  METRIC_WEIGHT_OPTIONS,
  metricClasses,
} from './metricStyles';

const { label, style, preview = '' } = defineProps<{
  label: string;
  style?: IMetricStyle;
  preview?: string;
}>();

const emit = defineEmits<{
  close: [];
  update: [style: IMetricStyle];
}>();

const resolved = computed<Required<IMetricStyle>>(() => ({ ...DEFAULT_METRIC_STYLE, ...style }));

const nameOf = <T extends string>(options: Array<{ value: T; name: string }>, value: T): string =>
  options.find((option) => option.value === value)?.name ?? '';

const sizeName = computed(() => nameOf(METRIC_SIZE_OPTIONS, resolved.value.size));
const colorName = computed(() => nameOf(METRIC_COLOR_OPTIONS, resolved.value.color));
const weightName = computed(() => nameOf(METRIC_WEIGHT_OPTIONS, resolved.value.weight));
const alignName = computed(() => nameOf(METRIC_ALIGN_OPTIONS, resolved.value.align));

const update = (patch: Partial<IMetricStyle>) => {
  emit('update', { ...resolved.value, ...patch });
};

const setSize = (item: { value: MetricSize; name: string }) => update({ size: item.value });
const setColor = (item: { value: MetricColor; name: string }) => update({ color: item.value });
const setWeight = (item: { value: MetricWeight; name: string }) => update({ weight: item.value });
const setAlign = (item: { value: MetricAlign; name: string }) => update({ align: item.value });
</script>

<template>
  <VDialog title="Стиль показателя" size="md" @close="emit('close')">
    <div class="flex min-h-96 flex-col gap-4">
      <p class="text-sm text-gray-dark-25 dark:text-gray-main">
        Показатель:
        <span class="font-medium text-gray-dark-40 dark:text-white">{{ label }}</span>
      </p>

      <div class="glass-inset rounded-md p-3">
        <span class="block text-xs text-gray-dark-25 dark:text-gray-main">Предпросмотр</span>
        <span class="mt-1 block whitespace-pre" :class="metricClasses(resolved)">{{ preview || '1 234 кВт·ч' }}</span>
      </div>

      <div class="grid gap-3 sm:grid-cols-2">
        <VSelect
          :model-value="sizeName"
          :items="METRIC_SIZE_OPTIONS"
          label="Размер"
          @change="setSize"
        />

        <VSelect
          :model-value="colorName"
          :items="METRIC_COLOR_OPTIONS"
          label="Цвет"
          @change="setColor"
        />

        <VSelect
          :model-value="weightName"
          :items="METRIC_WEIGHT_OPTIONS"
          label="Начертание"
          @change="setWeight"
        />

        <VSelect
          :model-value="alignName"
          :items="METRIC_ALIGN_OPTIONS"
          label="Выравнивание"
          @change="setAlign"
        />
      </div>

      <div class="mt-auto flex justify-end">
        <VButton variant="primary" @click="emit('close')">Готово</VButton>
      </div>
    </div>
  </VDialog>
</template>
