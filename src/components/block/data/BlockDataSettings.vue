<script setup lang="ts">
import type { VListObjectReturnData } from '@/types';
import type { BlockMetricGroup, IBlockConfig, IBlockContext, IBlockDefinition, IBlockField, IBlockMetric, IBlockResolvedMetric, IMetricStyle } from './types';

import { computed, onUnmounted, ref, watch } from 'vue';

import VButton from '@/components/ui/button/VButton.vue';
import VDialog from '@/components/ui/dialog/VDialog.vue';
import VListObject from '@/components/ui/list/VListObject.vue';
import VSelect from '@/components/ui/select/VSelect.vue';
import VTextWrapper from '@/components/ui/text-wrapper/VTextWrapper.vue';
import VisionIcon from '@/components/ui/vision/VisionIcon.vue';

import BlockDataHelp from './BlockDataHelp.vue';
import BlockFieldCard from './BlockFieldCard.vue';
import BlockMetricCard from './BlockMetricCard.vue';
import BlockMetricStyleDialog from './BlockMetricStyleDialog.vue';
import { MAX_METRIC_ARGS, MAX_METRICS, resolveBlockBindings, resolveMetricArgValues } from './resolver';

const { definition, config, context } = defineProps<{
  definition: IBlockDefinition;
  config: IBlockConfig;
  context: IBlockContext;
}>();

const emit = defineEmits<{
  close: [];
  'update:config': [config: IBlockConfig];
}>();

const BLOCKS = [
  { key: 'general', label: 'Основное', icon: 'settings' },
  { key: 'solar', label: 'Солнце', icon: 'sun' },
  { key: 'grid', label: 'Сеть', icon: 'plug' },
  { key: 'battery', label: 'Батарея', icon: 'battery' },
  { key: 'house', label: 'Дом', icon: 'home' },
  { key: 'inverter', label: 'Инвертор', icon: 'inverter' },
] as const;

const DIRECTION_OPTIONS: Record<string, Array<{ value: string; name: string }>> = {
  solar: [
    { value: 'forward', name: 'Прямое' },
    { value: 'reverse', name: 'Обратное' },
    { value: 'idle', name: 'Нет потока' },
  ],
  grid: [
    { value: 'import', name: 'Импорт' },
    { value: 'export', name: 'Экспорт' },
    { value: 'idle', name: 'Обмена нет' },
  ],
  battery: [
    { value: 'charge', name: 'Зарядка' },
    { value: 'discharge', name: 'Разрядка' },
    { value: 'idle', name: 'Без обмена' },
  ],
  house: [
    { value: 'forward', name: 'Прямое' },
    { value: 'reverse', name: 'Обратное' },
    { value: 'idle', name: 'Нет потока' },
  ],
};

type TreeTarget = { kind: 'field'; key: string } | { kind: 'groupArg'; argIndex: number };

const clone = (value: IBlockConfig): IBlockConfig => {
  const next = JSON.parse(JSON.stringify(value)) as IBlockConfig;

  next.metricArgs = { ...(next.metricArgs ?? {}) };
  next.metrics = { ...(next.metrics ?? {}) };

  for (const [group, metrics] of Object.entries(definition.metrics ?? {})) {
    if (!next.metrics[group as BlockMetricGroup]) {
      next.metrics[group as BlockMetricGroup] = JSON.parse(JSON.stringify(metrics)) as IBlockMetric[];
    }
  }

  return next;
};

const draft = ref<IBlockConfig>(clone(config));
const activeBlock = ref<string>('general');
const help = ref(false);
const treeOpen = ref(false);
const treeTarget = ref<TreeTarget | null>(null);
const styleMetric = ref<IBlockMetric | null>(null);
const hoverArg = ref<number | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const dragIndex = ref<number | null>(null);
const dragOverIndex = ref<number | null>(null);

let lastSaved = JSON.stringify(draft.value);
let saveTimer: ReturnType<typeof setTimeout> | null = null;

const resolved = computed(() => resolveBlockBindings(definition, draft.value, context));
const resolvedMetrics = computed<Record<string, IBlockResolvedMetric[]>>(() => (resolved.value.metrics ?? {}) as Record<string, IBlockResolvedMetric[]>);

const blocks = computed(() =>
  BLOCKS.map((block) => ({
    ...block,
    count: definition.fields.filter((field) => (field.block ?? 'general') === block.key).length,
  })).filter((block) => block.count > 0)
);

const metricGroups = computed(() => Object.keys(definition.metrics ?? {}) as BlockMetricGroup[]);
const hasMetrics = computed(() => metricGroups.value.includes(activeBlock.value as BlockMetricGroup));

const blockFields = computed<IBlockField[]>(() => definition.fields.filter((field) => (field.block ?? 'general') === activeBlock.value && !field.formatFor));

const titleField = computed<IBlockField | undefined>(() => blockFields.value.find((field) => field.key.endsWith('Title')));

const isGeneral = computed(() => activeBlock.value === 'general');

const directionField = computed<IBlockField | undefined>(() => blockFields.value.find((field) => field.key === `${activeBlock.value}Flow`));

const directionOptions = computed(() => DIRECTION_OPTIONS[activeBlock.value] ?? []);

const directionValue = computed<string>(() => {
  const field = directionField.value;

  if (!field) return '';

  return bindingValue(field) || String(field.default ?? '');
});

const directionName = computed<string>(() => directionOptions.value.find((option) => option.value === directionValue.value)?.name ?? '');

const setDirection = (item: { value: string; name: string }) => {
  if (directionField.value) setBinding(directionField.value, item.value);
};

const generalFields = computed<IBlockField[]>(() => (isGeneral.value ? blockFields.value : []));

const activeGroupArgs = computed<string[]>(() => {
  if (!hasMetrics.value) return [];

  return draft.value.metricArgs?.[activeBlock.value as BlockMetricGroup] ?? [];
});

const activeGroupArgValues = computed<unknown[]>(() => resolveMetricArgValues(activeGroupArgs.value, context, resolved.value));

const activeMetrics = computed<IBlockMetric[]>(() => {
  if (!hasMetrics.value) return [];

  return draft.value.metrics?.[activeBlock.value as BlockMetricGroup] ?? [];
});

watch(blocks, (value) => {
  if (value.length && !value.some((block) => block.key === activeBlock.value)) {
    activeBlock.value = value[0].key;
  }
});

const decodeLiteral = (value: string): string => {
  if (value.startsWith('"') && value.endsWith('"')) {
    try {
      const parsed: unknown = JSON.parse(value);

      return typeof parsed === 'string' ? parsed : value;
    } catch {
      return value;
    }
  }

  if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1);

  return value;
};

const bindingValue = (field: IBlockField): string => {
  const binding = draft.value.bindings[field.key];

  if (typeof binding !== 'string') return field.plain ? String(field.default ?? '') : '';

  return field.plain ? decodeLiteral(binding) : binding;
};

const setBinding = (field: IBlockField, value: string) => {
  if (!value.trim()) {
    delete draft.value.bindings[field.key];

    return;
  }

  draft.value.bindings[field.key] = field.plain ? JSON.stringify(value) : value;
};

const formatFieldFor = (field: IBlockField): IBlockField | undefined => definition.fields.find((item) => item.formatFor === field.key);

const formatBinding = (field: IBlockField): string => {
  const formatField = formatFieldFor(field);

  return formatField ? bindingValue(formatField) : '';
};

const setFormat = (field: IBlockField, value: string) => {
  const formatField = formatFieldFor(field);

  if (formatField) setBinding(formatField, value);
};

const displayValue = (key: string): string => {
  const value = resolved.value[key];

  if (value === undefined) return '—';
  if (typeof value === 'boolean') return value ? 'да' : 'нет';

  return String(value);
};

const placeholderFormat = (field: IBlockField): string => `v + ' ${field.unit ?? 'ед.'}'`;

const flush = () => {
  if (saveTimer) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }

  const next = clone(draft.value);
  const serialized = JSON.stringify(next);

  if (serialized === lastSaved) return;

  lastSaved = serialized;
  emit('update:config', next);
};

const scheduleSave = () => {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(flush, 500);
};

watch(draft, scheduleSave, { deep: true });

const close = () => {
  flush();
  emit('close');
};

const openTree = (key: string) => {
  treeTarget.value = { kind: 'field', key };
  treeOpen.value = true;
};

const openGroupArg = (argIndex?: number) => {
  if (!hasMetrics.value) return;
  if (argIndex === undefined && activeGroupArgs.value.length >= MAX_METRIC_ARGS) return;

  treeTarget.value = { kind: 'groupArg', argIndex: argIndex ?? activeGroupArgs.value.length };
  treeOpen.value = true;
};

const onSelectPath = ({ path }: VListObjectReturnData) => {
  const target = treeTarget.value;

  if (!target) return;

  treeOpen.value = false;

  if (target.kind === 'field') {
    const field = definition.fields.find((item) => item.key === target.key);

    if (field) setBinding(field, path);

    return;
  }

  const args = [...activeGroupArgs.value];
  args[target.argIndex] = path;
  draft.value.metricArgs = {
    ...(draft.value.metricArgs ?? {}),
    [activeBlock.value]: args.slice(0, MAX_METRIC_ARGS),
  };
};

const removeGroupArg = (argIndex: number) => {
  draft.value.metricArgs = {
    ...(draft.value.metricArgs ?? {}),
    [activeBlock.value]: activeGroupArgs.value.filter((_, index) => index !== argIndex),
  };
};

const formatArgValue = (index: number): string => {
  const value = activeGroupArgValues.value[index];

  if (value === undefined || value === null || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'да' : 'нет';
  if (typeof value === 'number') return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));

  return String(value);
};

const onArgHover = (event: string, index: number) => {
  hoverArg.value = event === 'enter' ? index : null;
};

const createMetricId = (): string => `metric-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

const addMetric = () => {
  const metrics = draft.value.metrics?.[activeBlock.value as BlockMetricGroup];

  if (!hasMetrics.value || !metrics || metrics.length >= MAX_METRICS) return;

  metrics.push({ id: createMetricId(), label: 'Показатель', value: '', format: '' });
};

const removeMetric = (id: string) => {
  const metrics = draft.value.metrics?.[activeBlock.value as BlockMetricGroup];

  if (!metrics) return;

  draft.value.metrics = {
    ...(draft.value.metrics ?? {}),
    [activeBlock.value]: metrics.filter((metric) => metric.id !== id),
  };
};

const toggleMetricField = (metric: IBlockMetric, field: 'value' | 'format') => {
  if (field === 'value') {
    updateMetric(metric, { value: metric.value ? '' : 'a' });

    return;
  }

  updateMetric(metric, { format: metric.format ? '' : 'v' });
};

const openStyle = (metric: IBlockMetric) => {
  styleMetric.value = metric;
};

const applyMetricStyle = (style: IMetricStyle) => {
  if (styleMetric.value) updateMetric(styleMetric.value, { style });
};

const onDragStart = (event: DragEvent, index: number) => {
  dragIndex.value = index;

  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(index));
  }
};

const onDragOver = (index: number) => {
  if (dragIndex.value !== null) dragOverIndex.value = index;
};

const onDrop = (index: number) => {
  const from = dragIndex.value;

  dragIndex.value = null;
  dragOverIndex.value = null;

  if (from === null || from === index) return;

  const next = [...activeMetrics.value];
  const [metric] = next.splice(from, 1);
  next.splice(index, 0, metric);

  draft.value.metrics = { ...(draft.value.metrics ?? {}), [activeBlock.value]: next };
};

const onDragEnd = () => {
  dragIndex.value = null;
  dragOverIndex.value = null;
};

const previewFor = (metric: IBlockMetric): string => resolvedMetrics.value[activeBlock.value]?.find((item) => item.id === metric.id)?.value ?? '';

const updateMetric = (metric: IBlockMetric, patch: Partial<IBlockMetric>) => {
  Object.assign(metric, patch);
};

const exportConfig = () => {
  const payload = JSON.stringify(draft.value, null, 2);
  const blob = new Blob([payload], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `${definition.type}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

const openImport = () => fileInput.value?.click();

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);

const importConfig = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  try {
    const parsed: unknown = JSON.parse(await file.text());

    if (!isRecord(parsed) || typeof parsed.type !== 'string' || !isRecord(parsed.bindings)) return;

    draft.value = {
      ...draft.value,
      ...(parsed as unknown as IBlockConfig),
      id: draft.value.id,
      type: definition.type,
    };
    flush();
  } finally {
    input.value = '';
  }
};

onUnmounted(flush);
</script>

<template>
  <VDialog title="Настройка блока" size="lg" @close="close">
    <template #header-btn>
      <div class="me-2 flex items-center gap-2">
        <VButton type="icon" size="sm" aria-label="Справка" title="Справка" @click="help = true">
          <VisionIcon name="help" :size="16" />
        </VButton>

        <VButton type="icon" size="sm" aria-label="Импорт" title="Импорт" @click="openImport">
          <VisionIcon name="upload" :size="16" />
        </VButton>

        <VButton type="icon" size="sm" aria-label="Экспорт" title="Экспорт" @click="exportConfig">
          <VisionIcon name="download" :size="16" />
        </VButton>
      </div>
    </template>

    <input ref="fileInput" type="file" accept="application/json,.json" class="hidden" @change="importConfig" />

    <div class="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]">
      <nav class="flex flex-col gap-1" aria-label="Блоки">
        <button
          v-for="block of blocks"
          :key="block.key"
          type="button"
          class="flex items-center gap-2 rounded-md px-3 py-2 text-left transition"
          :class="activeBlock === block.key ? 'bg-primary/10 text-primary' : 'hover:bg-white/5'"
          @click="activeBlock = block.key"
        >
          <span class="grid size-8 shrink-0 place-items-center rounded-md border border-gray-300/50 dark:border-white/10">
            <VisionIcon :name="block.icon" :size="16" />
          </span>
          <span class="min-w-0 flex-1 truncate text-sm font-medium">{{ block.label }}</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">{{ block.count }}</span>
        </button>
      </nav>

      <div class="flex max-h-120 min-w-0 flex-col gap-3 overflow-y-auto pe-1 scrollbar">
        <template v-if="isGeneral">
          <BlockFieldCard
            v-for="field of generalFields"
            :key="field.key"
            :field="field"
            :model-value="bindingValue(field)"
            :format-value="formatBinding(field)"
            :has-format="Boolean(formatFieldFor(field))"
            :placeholder="displayValue(field.previewKey ?? field.key)"
            :placeholder-format="placeholderFormat(field)"
            :show-reset="false"
            @update:model-value="setBinding(field, $event)"
            @update:format="setFormat(field, $event)"
            @pick="openTree(field.key)"
          />
        </template>

        <template v-else>
          <BlockFieldCard
            v-if="titleField"
            :field="titleField"
            :model-value="bindingValue(titleField)"
            :format-value="formatBinding(titleField)"
            :has-format="Boolean(formatFieldFor(titleField))"
            :placeholder="displayValue(titleField.previewKey ?? titleField.key)"
            :placeholder-format="placeholderFormat(titleField)"
            :show-reset="false"
            @update:model-value="setBinding(titleField, $event)"
            @update:format="setFormat(titleField, $event)"
            @pick="openTree(titleField.key)"
          />

          <section v-if="hasMetrics" class="glass-inset rounded-xl p-3">
            <VTextWrapper :active="Boolean(activeGroupArgs.length)" :icon-disabled="activeGroupArgs.length >= MAX_METRIC_ARGS" label="Аргументы" icon-label="Добавить аргумент" @icon="openGroupArg()">
              <div v-if="activeGroupArgs.length" class="flex gap-2 flex-wrap flex-auto px-2 py-1">
                <div v-for="(arg, i) of activeGroupArgs" :key="arg" class="flex items-center rounded-full bg-gray-200 dark:bg-gray-900/50 px-2 py-[2px] text-xs">
                  <div class="relative group">
                    <span class="select-none">{{ arg }}</span>
                  </div>

                  <button v-if="i ? true : Boolean(activeGroupArgs.length < 2)" type="button" class="ms-1 shrink-0 cursor-pointer text-gray-400 transition hover:text-rose-500" @click="removeGroupArg(i)">
                     <icon-ri-close-line class="size-5" />
                  </button>
                </div>
              </div>
            </VTextWrapper>
          </section>

          <section v-if="hasMetrics" class="flex flex-col gap-2">
            <div class="flex items-center justify-between gap-2">
              <h4 class="text-sm font-semibold">Показатели</h4>

              <VButton type="icon" size="sm" aria-label="Добавить показатель" title="Добавить показатель" :disabled="activeMetrics.length >= MAX_METRICS" @click="addMetric">
                <VisionIcon name="plus" :size="14" />
              </VButton>
            </div>

            <p v-if="!activeMetrics.length" class="glass-inset rounded-xl p-3 text-sm text-gray-500 dark:text-gray-400">Показателей нет. Добавьте первый.</p>

            <div v-else class="flex flex-col gap-2">
              <div
                v-for="(metric, index) of activeMetrics"
                :key="metric.id"
                class="rounded-xl transition"
                :class="{ 'ring-1 ring-primary/50': dragOverIndex === index }"
                @dragover.prevent="onDragOver(index)"
                @drop.prevent="onDrop(index)"
              >
                <BlockMetricCard
                  :metric="metric"
                  :index="index"
                  :args="activeGroupArgs"
                  @remove="removeMetric(metric.id)"
                  @open-style="openStyle(metric)"
                  @toggle-field="toggleMetricField(metric, $event)"
                  @dragstart="onDragStart"
                  @dragend="onDragEnd"
                  @change="updateMetric(metric, $event)"
                  @hover="onArgHover"
                />
              </div>
            </div>
          </section>

          <div v-if="directionField" class="glass-inset rounded-xl p-3">
            <VSelect :model-value="directionName" :items="directionOptions" label="Направление" @change="setDirection" />
          </div>
        </template>
      </div>
    </div>

    <BlockMetricStyleDialog v-if="styleMetric" :label="styleMetric.label" :style="styleMetric.style" :preview="previewFor(styleMetric)" @update="applyMetricStyle" @close="styleMetric = null" />
    <VDialog v-if="treeOpen" title="Выбор данных" size="md" @close="treeOpen = false">
      <div class="relative max-h-120 overflow-auto scrollbar">
        <VListObject :items="context.roots" @click="onSelectPath" />
      </div>
    </VDialog>

    <BlockDataHelp v-if="help" @close="help = false" />
  </VDialog>
</template>
