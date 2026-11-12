<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { usePreferredReducedMotion } from '@vueuse/core';

import type { IBlockResolvedMetric } from '@/components/block/data/types';

import CardMain from '@/components/card/main/CardMain.vue';
import VButton from '@/components/ui/button/VButton.vue';
import VisionIcon from '@/components/ui/vision/VisionIcon.vue';

import { metricClasses } from '@/components/block/data/metricStyles';

interface IProps {
  title?: string;
  editable?: boolean;
  online?: boolean;
  solarPower?: number;
  gridPower?: number;
  batteryPower?: number;
  batterySoc?: number;
  loadPower?: number;
  solarFlow?: string;
  gridFlow?: string;
  batteryFlow?: string;
  houseFlow?: string;
  solarTitle?: string;
  gridTitle?: string;
  batteryTitle?: string;
  houseTitle?: string;
  inverterTitle?: string;
  loadLabel?: string;
  metrics?: Record<string, IBlockResolvedMetric[]>;
}

const {
  title = 'Сетевой инвертор',
  editable = false,
  online = true,
  solarPower = 0,
  gridPower = 0,
  batteryPower = 0,
  batterySoc = 0,
  loadPower = 0,
  solarFlow = 'forward',
  gridFlow = 'idle',
  batteryFlow = 'idle',
  houseFlow = 'forward',
  solarTitle = 'Солнечная панель',
  gridTitle = 'Сеть',
  batteryTitle = 'Батарея',
  houseTitle = 'Дом',
  inverterTitle = 'Инвертор',
  loadLabel = 'нагрузка',
  metrics = {},
} = defineProps<IProps>();

const emit = defineEmits<{ refresh: []; settings: [] }>();

const speedFor = (value: number) => Math.min(4.2, Math.max(1.6, 4.2 - Math.abs(value) * 0.55));
const displayText = (value: string) => value.replace(/<br\s*\/?>/gi, '\n');
const formatPower = (value: number) => `${Math.abs(value).toFixed(1)} кВт`;
const groupMetrics = (group: string): IBlockResolvedMetric[] => metrics?.[group] ?? [];

const metricRaw = (group: string, id: string, index: number): unknown => {
  const list = metrics?.[group] ?? [];
  const metric = list.find((item) => item.id === id) ?? list[index];

  return metric?.raw;
};

const toNumber = (value: unknown, fallback: number): number => {
  const number = typeof value === 'number' ? value : Number.parseFloat(String(value));

  return Number.isFinite(number) ? number : fallback;
};

const solarPowerValue = computed(() => toNumber(metricRaw('solar', 'solar-power', 0), solarPower));
const gridPowerValue = computed(() => toNumber(metricRaw('grid', 'grid-power', 0), gridPower));
const batteryPowerValue = computed(() => toNumber(metricRaw('battery', 'battery-power', 0), batteryPower));
const batterySocValue = computed(() => toNumber(metricRaw('battery', 'battery-soc', 1), batterySoc));
const loadPowerValue = computed(() => toNumber(metricRaw('house', 'house-load', 0), loadPower));

const solarActive = computed(() => solarPowerValue.value > 0 && solarFlow !== 'idle');
const solarReverse = computed(() => solarFlow === 'reverse');
const gridActive = computed(() => gridPowerValue.value !== 0 || ['import', 'export'].includes(gridFlow));
const batteryActive = computed(() => batteryPowerValue.value !== 0 || ['charge', 'discharge'].includes(batteryFlow));
const gridReverse = computed(() => (gridFlow === 'export' ? true : gridFlow === 'import' ? false : gridPowerValue.value < 0));
const batteryReverse = computed(() => (batteryFlow === 'charge' ? true : batteryFlow === 'discharge' ? false : batteryPowerValue.value > 0));
const houseActive = computed(() => loadPowerValue.value > 0 && houseFlow !== 'idle');
const houseReverse = computed(() => houseFlow !== 'reverse');

const loadPowerDisplay = computed(() => formatPower(loadPowerValue.value));
const inverterMetrics = computed(() => groupMetrics('inverter'));

const reducedMotion = usePreferredReducedMotion();
const isStatic = computed(() => reducedMotion.value === 'reduce');

const links = computed(() => [
  { id: 'solar', active: solarActive.value, reverse: solarReverse.value, speed: speedFor(solarPowerValue.value) },
  { id: 'battery', active: batteryActive.value, reverse: batteryReverse.value, speed: speedFor(batteryPowerValue.value) },
  { id: 'grid', active: gridActive.value, reverse: gridReverse.value, speed: speedFor(gridPowerValue.value) },
  { id: 'home', active: houseActive.value, reverse: houseReverse.value, speed: speedFor(loadPowerValue.value) },
]);

const activeLinks = computed(() => links.value.filter((link) => link.active));

const nodes = computed(() => [
  {
    key: 'solar',
    wrapper: 'col-start-1 row-start-1 self-start justify-self-start',
    icon: 'sun',
    label: displayText(solarTitle),
    metrics: groupMetrics('solar'),
    tone: 'text-amber-500',
    surface: 'bg-amber-500/10',
    card: 'border-amber-500/25 bg-amber-500/[0.04]',
  },
  {
    key: 'battery',
    wrapper: 'col-start-1 row-start-3 self-end justify-self-start lg:col-start-3 lg:row-start-1 lg:self-start lg:justify-self-end',
    icon: 'battery',
    label: displayText(batteryTitle),
    metrics: groupMetrics('battery'),
    tone: 'text-emerald-500',
    surface: 'bg-emerald-500/10',
    card: 'border-emerald-500/25 bg-emerald-500/[0.04]',
  },
  {
    key: 'grid',
    wrapper: 'col-start-2 row-start-1 self-start justify-self-end lg:col-start-1 lg:row-start-3 lg:self-end lg:justify-self-start',
    icon: 'plug',
    label: displayText(gridTitle),
    metrics: groupMetrics('grid'),
    tone: 'text-primary',
    surface: 'bg-primary/10',
    card: 'border-primary/25 bg-primary/[0.04]',
  },
  {
    key: 'home',
    wrapper: 'col-start-2 row-start-3 justify-self-end self-end lg:col-start-3 lg:row-start-3',
    icon: 'home',
    label: displayText(houseTitle),
    metrics: groupMetrics('house'),
    tone: 'text-violet-500',
    surface: 'bg-violet-500/10',
    card: 'border-violet-500/25 bg-violet-500/[0.04]',
  },
]);


type Side = 'left' | 'right' | 'top' | 'bottom';

interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ILinkBox {
  id: string;
  rect: IRect;
  nodeSide: Side;
  portSide: Side;
  pos: number;
}

interface IGeometry {
  width: number;
  height: number;
  paths: Record<string, string>;
}

const containerRef = ref<HTMLElement | null>(null);
const inverterRef = ref<HTMLElement | null>(null);
const nodeRefs = new Map<string, HTMLElement>();
const geometry = ref<IGeometry | null>(null);

let resizeObserver: ResizeObserver | null = null;

const setNodeRef = (key: string, el: unknown) => {
  if (el instanceof HTMLElement) nodeRefs.set(key, el);
  else nodeRefs.delete(key);
};

const relativeRect = (el: HTMLElement, box: DOMRect): IRect => {
  const rect = el.getBoundingClientRect();

  return { x: rect.left - box.left, y: rect.top - box.top, width: rect.width, height: rect.height };
};

const measure = () => {
  const container = containerRef.value;
  const inverter = inverterRef.value;

  if (!container || !inverter) return;

  const box = container.getBoundingClientRect();

  if (box.width < 2 || box.height < 2) return;

  const inv = relativeRect(inverter, box);
  const invX = inv.x + inv.width / 2;
  const invY = inv.y + inv.height / 2;

  const items = links.value
    .map((link): ILinkBox | null => {
      const el = nodeRefs.get(link.id);

      if (!el) return null;

      const rect = relativeRect(el, box);
      const cx = rect.x + rect.width / 2;
      const cy = rect.y + rect.height / 2;
      const dx = invX - cx;
      const dy = invY - cy;
      const horizontal = Math.abs(dx) >= Math.abs(dy);
      const nodeSide: Side = horizontal ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'bottom' : 'top';
      const portSide: Side = nodeSide === 'left' ? 'right' : nodeSide === 'right' ? 'left' : nodeSide === 'top' ? 'bottom' : 'top';

      return { id: link.id, rect, nodeSide, portSide, pos: horizontal ? cy : cx };
    })
    .filter((item): item is ILinkBox => item !== null);

  const groups: Record<Side, ILinkBox[]> = { left: [], right: [], top: [], bottom: [] };

  for (const item of items) groups[item.portSide].push(item);

  const paths: Record<string, string> = {};
  const sides: Side[] = ['left', 'right', 'top', 'bottom'];

  for (const side of sides) {
    const group = groups[side].sort((a, b) => a.pos - b.pos);

    group.forEach((item, index) => {
      const fraction = group.length === 1 ? 0.5 : (index + 1) / (group.length + 1);
      let portX = 0;
      let portY = 0;

      if (side === 'left') {
        portX = inv.x;
        portY = inv.y + inv.height * fraction;
      } else if (side === 'right') {
        portX = inv.x + inv.width;
        portY = inv.y + inv.height * fraction;
      } else if (side === 'top') {
        portX = inv.x + inv.width * fraction;
        portY = inv.y;
      } else {
        portX = inv.x + inv.width * fraction;
        portY = inv.y + inv.height;
      }

      let nodeX = 0;
      let nodeY = 0;

      if (item.nodeSide === 'left') {
        nodeX = item.rect.x;
        nodeY = item.rect.y + item.rect.height / 2;
      } else if (item.nodeSide === 'right') {
        nodeX = item.rect.x + item.rect.width;
        nodeY = item.rect.y + item.rect.height / 2;
      } else if (item.nodeSide === 'top') {
        nodeX = item.rect.x + item.rect.width / 2;
        nodeY = item.rect.y;
      } else {
        nodeX = item.rect.x + item.rect.width / 2;
        nodeY = item.rect.y + item.rect.height;
      }

      const horizontal = item.portSide === 'left' || item.portSide === 'right';
      const d = horizontal
        ? `M${nodeX.toFixed(1)} ${nodeY.toFixed(1)} C${(nodeX + (portX - nodeX) * 0.55).toFixed(1)} ${nodeY.toFixed(1)} ${(nodeX + (portX - nodeX) * 0.55).toFixed(1)} ${portY.toFixed(1)} ${portX.toFixed(1)} ${portY.toFixed(1)}`
        : `M${nodeX.toFixed(1)} ${nodeY.toFixed(1)} C${nodeX.toFixed(1)} ${(nodeY + (portY - nodeY) * 0.55).toFixed(1)} ${portX.toFixed(1)} ${(nodeY + (portY - nodeY) * 0.55).toFixed(1)} ${portX.toFixed(1)} ${portY.toFixed(1)}`;

      paths[item.id] = d;
    });
  }

  geometry.value = { width: box.width, height: box.height, paths };
};

const observeTargets = () => {
  if (!resizeObserver) return;

  resizeObserver.disconnect();

  if (containerRef.value) resizeObserver.observe(containerRef.value);
  if (inverterRef.value) resizeObserver.observe(inverterRef.value);

  for (const el of nodeRefs.values()) resizeObserver.observe(el);
};

onMounted(async () => {
  resizeObserver = new ResizeObserver(() => measure());

  await nextTick();
  measure();
  observeTargets();
});

onUnmounted(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
});
</script>

<template>
  <CardMain :title="title">
    <template #header>
      <div class="flex items-center gap-2">
        <span
          class="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium"
          :class="online ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'border-gray-300/60 bg-gray-500/10 text-gray-500 dark:border-white/10 dark:text-gray-400'"
        >
          <span class="size-1.5 rounded-full" :class="online ? 'animate-pulse bg-emerald-500' : 'bg-gray-400'" />
          {{ online ? 'Онлайн' : 'Не в сети' }}
        </span>

        <VButton v-if="editable" type="icon" size="sm" aria-label="Настроить блок" title="Настроить блок" @click="emit('settings')">
          <VisionIcon name="settings" :size="16" />
        </VButton>

        <VButton type="icon" size="sm" aria-label="Обновить данные" title="Обновить данные" @click="emit('refresh')">
          <VisionIcon name="refresh" :size="16" />
        </VButton>
      </div>
    </template>

    <div ref="containerRef" class="relative min-h-120 lg:min-h-104">
      <svg
        v-if="geometry"
        class="pointer-events-none absolute inset-0 size-full"
        :viewBox="`0 0 ${geometry.width} ${geometry.height}`"
        aria-hidden="true"
      >
        <path
          v-for="link of links"
          :id="`energy-path-${link.id}`"
          :key="`rail-${link.id}`"
          class="stroke-current text-gray-400 dark:text-white/20 [stroke-width:1.5] [stroke-linecap:round] [stroke-dasharray:2_6] opacity-45"
          :d="geometry.paths[link.id]"
          fill="none"
        />

        <g v-for="link of activeLinks" :key="`flow-${link.id}`">
          <path class="stroke-[var(--color-primary)] [stroke-width:2.5] [stroke-linecap:round] opacity-55" :d="geometry.paths[link.id]" fill="none" />
          <path class="stroke-[var(--color-primary)] [stroke-width:10] [stroke-linecap:round] opacity-20 blur-[6px]" :d="geometry.paths[link.id]" fill="none" />

          <path
            class="animate-energy-flow stroke-[#d6f6ff] [stroke-width:2] [stroke-linecap:round] [stroke-dasharray:16_22] opacity-75 drop-shadow-[0_0_4px_rgba(40,183,240,0.55)] motion-reduce:animate-none motion-reduce:[stroke-dasharray:none]"
            :class="{ '[animation-direction:reverse]': link.reverse }"
            :d="geometry.paths[link.id]"
            :style="{ animationDuration: `${link.speed}s` }"
            fill="none"
          />

          <template v-if="!isStatic">
            <circle
              v-for="(dot, index) of [0, 1, 2]"
              :key="`dot-${link.id}-${dot}`"
              r="2.6"
              fill="#d6f6ff"
              opacity="0"
              class="drop-shadow-[0_0_5px_rgba(40,183,240,0.9)]"
            >
              <animateMotion
                :dur="`${link.speed}s`"
                :begin="`${(index * link.speed) / 3}s`"
                repeatCount="indefinite"
                calcMode="linear"
                keyTimes="0;1"
                :keyPoints="link.reverse ? '1;0' : '0;1'"
              >
                <mpath :href="`#energy-path-${link.id}`" />
              </animateMotion>

              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.15;0.85;1"
                :dur="`${link.speed}s`"
                :begin="`${(index * link.speed) / 3}s`"
                repeatCount="indefinite"
              />
            </circle>
          </template>
        </g>
      </svg>

      <div class="relative grid h-full grid-cols-2 grid-rows-3 gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <div
          v-for="node of nodes"
          :key="node.key"
          :ref="(el) => setNodeRef(node.key, el)"
          :class="node.wrapper"
        >
          <div
            class="relative flex w-full max-w-none flex-col gap-3 rounded-2xl border p-4 shadow-[0_0_60px_-40px_rgba(40,183,240,0.35)] lg:max-w-56"
            :class="node.card"
          >
            <div class="flex items-center gap-2">
              <span class="grid size-8 shrink-0 place-items-center rounded-lg" :class="node.surface">
                <VisionIcon :name="node.icon" :size="16" :class="node.tone" />
              </span>

              <span class="min-w-0 flex-1 truncate text-sm font-semibold">{{ node.label }}</span>
            </div>

            <div v-if="node.metrics.length" class="flex flex-col gap-2">
              <div v-for="metric of node.metrics" :key="metric.id" class="glass-inset rounded-lg px-3 py-2">
                <span class="block text-xs text-gray-500 dark:text-gray-400">{{ metric.label }}</span>
                <span class="mt-0.5 block whitespace-pre" :class="metricClasses(metric.style)">{{ metric.value }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-2 row-start-2 grid place-items-center lg:col-span-1 lg:col-start-2 lg:row-span-3 lg:self-center">
          <div
            ref="inverterRef"
            class="relative w-full max-w-72 rounded-2xl border border-primary/30 bg-primary/10 p-4 text-primary shadow-[0_0_70px_-24px_rgba(40,183,240,0.9)]"
          >
            <span class="absolute -inset-2 rounded-3xl border border-primary/15" />

            <div class="relative">
              <div class="flex items-center gap-2">
                <span class="grid size-9 place-items-center rounded-lg bg-primary/15">
                  <VisionIcon name="inverter" :size="20" />
                </span>
                <span class="text-sm font-semibold text-gray-800 dark:text-white">{{ inverterTitle }}</span>
              </div>

              <div class="mt-3">
                <span class="whitespace-pre-line text-2xl font-bold text-gray-900 dark:text-white">{{ loadPowerDisplay }}</span>
                <span class="ml-1 text-xs text-gray-500 dark:text-gray-400">{{ loadLabel }}</span>
              </div>

              <dl class="mt-3 grid grid-cols-2 gap-2">
                <div v-for="metric of inverterMetrics" :key="metric.id" class="glass-inset rounded-md px-3 py-2">
                  <dt class="min-w-0 truncate text-xs text-gray-500 dark:text-gray-400">{{ metric.label }}</dt>
                  <dd class="mt-0.5 whitespace-pre" :class="metricClasses(metric.style)">{{ metric.value }}</dd>
                </div>
              </dl>

              <div class="glass-inset mt-2 rounded-md px-3 py-2">
                <div class="flex items-center justify-between gap-2 text-xs">
                  <span class="text-gray-500 dark:text-gray-400">Батарея</span>
                  <span class="whitespace-pre-line font-semibold">{{ batterySocValue }} %</span>
                </div>

                <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200/70 dark:bg-white/10">
                  <div class="h-full rounded-full bg-emerald-500 transition-all duration-500" :style="{ width: `${batterySocValue}%` }" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CardMain>
</template>
