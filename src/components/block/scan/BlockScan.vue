<script setup lang="ts">
import type { IMessageScan } from '@/types';
import type { IBlockScanProps, IBlockScanEmit } from './types';

const { items = [] } = defineProps<IBlockScanProps>();

const emit = defineEmits<IBlockScanEmit>();

const listEncryption: string[] = ['OPEN', 'WEP', 'WPA_PSK', 'WPA2_PSK', 'WPA_WPA2_PSK', 'MAX', '', 'NO', 'AUTO'];

const onSelect = (item: IMessageScan) => emit('select', item);
const onScan = (e: Event) => emit('scan', e);
</script>

<template>
  <div>
    <v-list v-slot="{ item }" :items="items" class="bg-transparent! ring-0!">
      <div class="flex items-center w-full" @click="onSelect(item)">
        <div class="mr-2">
          <v-wifi-icon v-bind="item" />
        </div>

        <div>
          <div class="text-sm">{{ item.ssid }}</div>

          <div class="text-gray-400 text-xs">{{ $t('security') }} : {{ listEncryption[item.encryptionType] || 'unknown' }}</div>
        </div>
      </div>
    </v-list>

    <div v-if="!items.length" class="flex justify-center">
      <v-loader class="text-primary"></v-loader>
    </div>

    <div class="flex justify-end mt-4">
      <v-button color="blue" @click="onScan">{{ $t('scan') }}</v-button>
    </div>
  </div>
</template>
