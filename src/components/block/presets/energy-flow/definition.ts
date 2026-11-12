import type { IBlockBindings, IBlockDefinition, IBlockMetric } from '@/components/block/data/types';

import EnergyFlowCard from './EnergyFlowCard.vue';

const defaultBindings: IBlockBindings = {
  title: "'Сетевой инвертор'",
  online: 'true',
};

const defaultMetrics: Record<string, IBlockMetric[]> = {
  solar: [
    { id: 'solar-power', label: 'Генерация', value: 'a', format: "v + ' кВт'" },
    { id: 'solar-today', label: 'Выработка за день', value: 'b', format: "v + ' кВт·ч'" },
  ],
  grid: [
    { id: 'grid-power', label: 'Мощность', value: 'a', format: "v + ' кВт'" },
    { id: 'grid-today', label: 'Энергия за день', value: 'b', format: "v + ' кВт·ч'" },
    { id: 'grid-voltage', label: 'Напряжение', value: 'c', format: "v + ' В'" },
  ],
  battery: [
    { id: 'battery-power', label: 'Мощность', value: 'a', format: "v + ' кВт'" },
    { id: 'battery-soc', label: 'Заряд', value: 'b', format: "v + ' %'" },
    { id: 'battery-voltage', label: 'Напряжение', value: 'c', format: "v + ' В'" },
  ],
  house: [
    { id: 'house-load', label: 'Нагрузка', value: 'a', format: "v + ' кВт'" },
    { id: 'house-today', label: 'Потребление за день', value: 'b', format: "v + ' кВт·ч'" },
  ],
  inverter: [
    { id: 'inverter-voltage', label: 'Напряжение', value: 'a', format: "v + ' В'" },
    { id: 'inverter-frequency', label: 'Частота', value: 'b', format: "v + ' Гц'" },
    { id: 'inverter-generation', label: 'Генерация', value: 'c', format: "v + ' кВт'" },
    { id: 'inverter-temperature', label: 'Температура', value: 'd', format: "v + ' °C'" },
  ],
};

export const energyFlowDefinition: IBlockDefinition = {
  type: 'energy-flow',
  defaultId: 'energy-main',
  name: 'Сетевой инвертор',
  description: 'Солнце, сеть, батарея и дом с анимированным перетеканием энергии.',
  icon: 'bolt',
  component: EnergyFlowCard,
  defaults: defaultBindings,
  metrics: defaultMetrics,
  fields: [
    { key: 'title', plain: true, block: 'general', label: 'Заголовок блока', type: 'string', default: 'Сетевой инвертор' },
    { key: 'online', block: 'general', label: 'Устройство онлайн', type: 'boolean', default: true },

    { key: 'solarTitle', plain: true, block: 'solar', label: 'Заголовок', type: 'string', default: 'Солнечная панель' },
    { key: 'solarFlow', plain: true, block: 'solar', label: 'Направление', type: 'string', default: 'forward' },

    { key: 'gridTitle', plain: true, block: 'grid', label: 'Заголовок', type: 'string', default: 'Сеть' },
    { key: 'gridFlow', plain: true, block: 'grid', label: 'Направление', type: 'string', default: 'idle' },

    { key: 'batteryTitle', plain: true, block: 'battery', label: 'Заголовок', type: 'string', default: 'Батарея' },
    { key: 'batteryFlow', plain: true, block: 'battery', label: 'Направление', type: 'string', default: 'idle' },

    { key: 'houseTitle', plain: true, block: 'house', label: 'Заголовок', type: 'string', default: 'Дом' },
    { key: 'houseFlow', plain: true, block: 'house', label: 'Направление', type: 'string', default: 'forward' },

    { key: 'inverterTitle', plain: true, block: 'inverter', label: 'Заголовок', type: 'string', default: 'Инвертор' },
    { key: 'loadLabel', plain: true, block: 'inverter', label: 'Подпись нагрузки', type: 'string', default: 'нагрузка' },
  ],
};
