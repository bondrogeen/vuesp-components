<script setup lang="ts">
import VButton from '@/components/ui/button/VButton.vue';
import VIcon from '@/components/ui/icon/VIcon.vue';

import type { IModbusSlaveListEmits, IModbusSlaveListProps } from './types';

const { items, countLabel, canAdd, isDisabled } = defineProps<IModbusSlaveListProps>();
const emit = defineEmits<IModbusSlaveListEmits>();
</script>

<template>
  <div class="mt-6 flex items-center justify-between gap-4">
    <h4 class="text-sm font-semibold">
      {{ $t('modbus.slaveValues') }}
      <span class="ml-1 text-xs font-normal text-gray-dark-25 dark:text-gray-light-10">{{ countLabel }}</span>
    </h4>
    <VButton size="sm" type="icon" variant="outline" :disabled="isDisabled || !canAdd" :title="$t('modbus.addSlaveValue')" :aria-label="$t('modbus.addSlaveValue')" @click="emit('add')">
      <VIcon name="add" :size="16" />
    </VButton>
  </div>

  <div class="mt-2 flex flex-col gap-2">
    <div v-for="item in items" :key="`slave-${item.index}`" class="flex flex-wrap items-center gap-3 rounded-lg bg-black/5 px-3 py-2 dark:bg-white/5">
      <div class="min-w-0 flex-1">
        <div class="truncate text-sm font-medium">{{ item.title }}</div>
        <div class="truncate text-xs text-gray-dark-25 dark:text-gray-light-10">{{ item.meta }}</div>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium">{{ item.value }}</span>
        <span class="rounded px-2 py-1 text-xs font-semibold" :class="item.qualityClass">{{ item.quality }}</span>
      </div>
      <VButton size="sm" type="icon" variant="ghost" :title="$t('modbus.edit')" :aria-label="$t('modbus.edit')" @click="emit('edit', item.index)">
        <VIcon name="edit" :size="16" />
      </VButton>
      <VButton size="sm" type="icon" variant="ghost" color="red" :title="$t('modbus.remove')" :aria-label="$t('modbus.remove')" @click="emit('remove', item.index)">
        <VIcon name="trash" :size="16" />
      </VButton>
    </div>
    <p v-if="items.length === 0" class="text-sm text-gray-dark-25 dark:text-gray-light-10">{{ $t('modbus.noSlaveValues') }}</p>
  </div>
</template>
