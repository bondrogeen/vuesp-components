<script setup lang="ts">
import VDialog from '@/components/ui/dialog/VDialog.vue';
import VTable from '@/components/ui/table/VTable.vue';

import ModbusMapDetails from './ModbusMapDetails.vue';
import type { IModbusMapTableEmits, IModbusMapTableProps } from './types';

const { headers, items, details, isDesktop } = defineProps<IModbusMapTableProps>();
const emit = defineEmits<IModbusMapTableEmits>();
</script>

<template>
  <div>
    <VTable :headers="headers" :items="items" @click="emit('click', $event)">
      <template #type="{ item }">
        <div class="text-gray-dark-25 dark:text-gray-light-10">{{ item.type }}</div>
      </template>
      <template #target="{ item }">
        <div class="flex flex-col">
          <span>{{ item.target }}</span>
        </div>
      </template>
    </VTable>

    <ModbusMapDetails
      v-if="details && isDesktop"
      class="mt-4 border-t border-gray-light-10/70 pt-4 dark:border-white/10"
      :details="details"
      closable
      @close="emit('close')"
    />

    <VDialog v-if="details && !isDesktop" size="md" :title="$t('modbus.mapDetails')" @close="emit('close')">
      <ModbusMapDetails :details="details" />
    </VDialog>
  </div>
</template>
