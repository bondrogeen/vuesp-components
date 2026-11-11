<script setup lang="ts">
import type { IEnergyFlowBlockProps, IEnergyFlowBlockEmits } from './types';

import { computed } from 'vue';

import CardMain from '@/components/card/main/CardMain.vue';
import VButton from '@/components/ui/button/VButton.vue';
import VisionIcon from '@/components/ui/vision/VisionIcon.vue';

const {
  title = 'Сетевой инвертор',
  online = true,
  solarPower = 3.2,
  gridPower = -0.6,
  batteryPower = 0.8,
  batterySoc = 78,
  loadPower = 1.8,
  gridVoltage = 230,
  gridFrequency = 50,
  temperature = 34,
} = defineProps<IEnergyFlowBlockProps>();

const emit = defineEmits<IEnergyFlowBlockEmits>();

const power = (value: number) => `${Math.abs(value).toFixed(1)} кВт`;

const links = computed(() => [
  { id: 'solar', d: 'M24 16 L50 50', tone: 'text-amber-500', active: solarPower > 0, reverse: false, path: 'solar' },
  { id: 'battery', d: 'M76 16 L50 50', tone: 'text-emerald-500', active: batteryPower !== 0, reverse: batteryPower > 0, path: 'battery' },
  { id: 'grid', d: 'M24 84 L50 50', tone: 'text-primary', active: gridPower !== 0, reverse: gridPower < 0, path: 'grid' },
  { id: 'home', d: 'M76 84 L50 50', tone: 'text-violet-500', active: loadPower > 0, reverse: true, path: 'home' },
]);

const nodes = computed(() => [
  {
    key: 'solar',
    wrapper: 'col-start-1 row-start-1 justify-self-start',
    icon: 'sun',
    label: 'Солнечная панель',
    value: power(solarPower),
    tone: 'text-amber-500',
    surface: 'border-amber-500/20 bg-amber-500/10',
    active: solarPower > 0,
  },
  {
    key: 'battery',
    wrapper: 'col-start-2 row-start-1 justify-self-end',
    icon: 'battery',
    label: 'Батарея',
    value: `${batterySoc} %`,
    tone: 'text-emerald-500',
    surface: 'border-emerald-500/20 bg-emerald-500/10',
    active: batterySoc > 0,
  },
  {
    key: 'grid',
    wrapper: 'col-start-1 row-start-3 self-end justify-self-start',
    icon: 'plug',
    label: 'Сеть',
    value: `${gridVoltage} В`,
    tone: 'text-primary',
    surface: 'border-primary/20 bg-primary/10',
    active: gridVoltage > 0,
  },
  {
    key: 'home',
    wrapper: 'col-start-2 row-start-3 justify-self-end self-end',
    icon: 'home',
    label: 'Дом',
    value: power(loadPower),
    tone: 'text-violet-500',
    surface: 'border-violet-500/20 bg-violet-500/10',
    active: loadPower > 0,
  },
]);

const metrics = computed(() => [
  { label: 'Напряжение сети', value: `${gridVoltage} В`, icon: 'bolt' },
  { label: 'Частота', value: `${gridFrequency} Гц`, icon: 'chart' },
  { label: 'Генерация', value: power(solarPower), icon: 'sun' },
  { label: 'Нагрузка', value: power(loadPower), icon: 'home' },
  { label: 'Температура', value: `${temperature} °C`, icon: 'temperature' },
]);

const gridState = computed(() => (gridPower < 0 ? 'Отдаём в сеть' : 'Берём из сети'));
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

        <VButton type="icon" size="sm" aria-label="Обновить данные" title="Обновить данные" @click="emit('refresh')">
          <VisionIcon name="refresh" :size="16" />
        </VButton>
      </div>
    </template>

    <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
      <div class="relative min-h-80 sm:min-h-96">
        <svg class="pointer-events-none absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path
            v-for="link of links"
            :id="`energy-line-${link.id}`"
            :key="`base-${link.id}`"
            class="energy-base"
            :d="link.d"
            fill="none"
            vector-effect="non-scaling-stroke"
          />

          <path
            v-for="link of links.filter((item) => item.active)"
            :key="`flow-${link.id}`"
            class="energy-line"
            :class="[link.tone, { 'energy-line--reverse': link.reverse }]"
            :d="link.d"
            fill="none"
            vector-effect="non-scaling-stroke"
          />

          <circle
            v-for="(link, index) of links.filter((item) => item.active)"
            :key="`dot-${link.id}`"
            r="1.5"
            fill="currentColor"
            :class="link.tone"
          >
            <animateMotion
              :dur="`${3 + index * 0.4}s`"
              :begin="`${index * 0.25}s`"
              repeatCount="indefinite"
              calcMode="linear"
              keyTimes="0;1"
              :keyPoints="link.reverse ? '1;0' : '0;1'"
            >
              <mpath :href="`#energy-line-${link.id}`" />
            </animateMotion>
          </circle>
        </svg>

        <div class="relative grid h-full grid-cols-2 grid-rows-3 gap-3">
          <div v-for="node of nodes" :key="node.key" :class="node.wrapper">
            <div class="glass-inset flex min-w-0 items-center gap-2 rounded-md px-2.5 py-2">
              <span class="grid size-9 shrink-0 place-items-center rounded-md border" :class="[node.tone, node.surface, { 'opacity-40': !node.active }]">
                <VisionIcon :name="node.icon" :size="18" />
              </span>

              <span class="min-w-0">
                <span class="block truncate text-xs text-gray-500 dark:text-gray-400">{{ node.label }}</span>
                <span class="block text-sm font-semibold">{{ node.value }}</span>
              </span>
            </div>
          </div>

          <div class="col-span-2 row-start-2 grid place-items-center">
            <div class="relative grid size-20 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
              <span class="absolute inset-0 animate-ping rounded-full border border-primary/20" />

              <span class="relative flex flex-col items-center">
                <VisionIcon name="inverter" :size="26" />
                <span class="mt-1 text-xs font-semibold text-gray-600 dark:text-gray-300">{{ power(loadPower) }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <dl class="grid grid-cols-2 gap-2">
          <div v-for="metric of metrics" :key="metric.label" class="rounded-md bg-white/5 p-3">
            <dt class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <VisionIcon :name="metric.icon" :size="14" />
              {{ metric.label }}
            </dt>
            <dd class="mt-1 text-sm font-semibold">{{ metric.value }}</dd>
          </div>
        </dl>

        <div class="rounded-md bg-white/5 p-3">
          <div class="flex items-center justify-between gap-2 text-xs">
            <span class="text-gray-500 dark:text-gray-400">Батарея</span>
            <span class="font-semibold">{{ batterySoc }} %</span>
          </div>

          <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200/70 dark:bg-white/10">
            <div class="h-full rounded-full bg-emerald-500 transition-all duration-500" :style="{ width: `${batterySoc}%` }" />
          </div>

          <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {{ batteryPower >= 0 ? 'Зарядка' : 'Разрядка' }} · {{ power(batteryPower) }}
          </p>
        </div>

        <div class="rounded-md bg-white/5 p-3 text-xs text-gray-500 dark:text-gray-400">
          <p class="font-medium text-gray-600 dark:text-gray-300">{{ gridState }}</p>
          <p class="mt-1">{{ power(gridPower) }} · {{ gridFrequency }} Гц</p>
        </div>
      </div>
    </div>
  </CardMain>
</template>

<style>
@keyframes energy-flow {
  to {
    stroke-dashoffset: -28;
  }
}

.energy-base {
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-dasharray: 2 4;
  opacity: 0.35;
}

.energy-line {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 6 8;
  animation: energy-flow 0.9s linear infinite;
}

.energy-line--reverse {
  animation-direction: reverse;
}

@media (prefers-reduced-motion: reduce) {
  .energy-line {
    animation: none;
  }
}
</style>
