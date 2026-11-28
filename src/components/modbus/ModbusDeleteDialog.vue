<script setup lang="ts">
import VButton from '@/components/ui/button/VButton.vue';
import VDialog from '@/components/ui/dialog/VDialog.vue';

import type { IModbusDeleteDialogEmits, IModbusDeleteDialogProps } from './types';

defineProps<IModbusDeleteDialogProps>();
const emit = defineEmits<IModbusDeleteDialogEmits>();
</script>

<template>
  <VDialog size="sm" :title="$t('modbus.deleteTitle')" @close="emit('close')">
    <p class="text-sm text-gray-dark-30 dark:text-gray-main">{{ hint }}</p>
    <div class="mt-4 flex justify-end gap-3">
      <VButton size="sm" class="min-w-24" color="red" @click="emit('confirm')">{{ $t('modbus.remove') }}</VButton>
      <VButton size="sm" class="min-w-24" variant="outline" color="gray" @click="emit('close')">{{ $t('modbus.close') }}</VButton>
    </div>
  </VDialog>
</template>
