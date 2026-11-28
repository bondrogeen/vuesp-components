<script setup lang="ts">
import VButton from '@/components/ui/button/VButton.vue';
import VDialog from '@/components/ui/dialog/VDialog.vue';
import VSelect from '@/components/ui/select/VSelect.vue';
import VTextField from '@/components/ui/text-field/VTextField.vue';

import type { IModbusDeviceDialogEmits, IModbusDeviceDialogProps, IModbusDeviceModel } from './types';

const { title, errors, enabledItems } = defineProps<IModbusDeviceDialogProps>();
const emit = defineEmits<IModbusDeviceDialogEmits>();
const form = defineModel<IModbusDeviceModel>({ required: true });

const selectName = (value: number) => enabledItems.find((item) => item.value === value)?.name ?? '';
</script>

<template>
  <VDialog size="md" :title="title" @close="emit('close')">
    <form class="flex max-h-[70dvh] min-h-0 flex-col gap-4 xl:max-h-[calc(100dvh-27rem)]" @submit.prevent="emit('save')" @keydown.esc.stop="emit('close')">
      <div class="flex-1">
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <VTextField size="sm" :error="errors.id" v-model="form.id" :label="$t('modbus.id')" />
          <VTextField size="sm" :error="errors.name" v-model="form.name" :label="$t('name')" />
          <VTextField size="sm" :error="errors.address" :model-value="String(form.address)" :label="$t('modbus.address')" @update:model-value="form.address = Number($event) || 0" />
          <VSelect size="sm" :model-value="selectName(form.enabled)" :items="enabledItems" :label="$t('modbus.enabled')" @change="({ value }) => (form.enabled = value)" />
          <VTextField size="sm" :error="errors.interval" :model-value="String(form.interval)" :label="$t('modbus.interval')" @update:model-value="form.interval = Number($event) || 0" />
          <VTextField size="sm" :error="errors.timeout" :model-value="String(form.timeout)" :label="$t('modbus.timeout')" @update:model-value="form.timeout = Number($event) || 0" />
          <VTextField size="sm" :error="errors.retries" :model-value="String(form.retries)" :label="$t('modbus.retries')" @update:model-value="form.retries = Number($event) || 0" />
        </div>
      </div>

      <div class="flex justify-end gap-3">
        <VButton size="sm" class="min-w-24" color="blue" @click="emit('save')">{{ $t('modbus.apply') }}</VButton>
        <VButton size="sm" class="min-w-24" variant="outline" color="gray" @click="emit('close')">{{ $t('modbus.close') }}</VButton>
        <button type="submit" class="hidden" aria-hidden="true" tabindex="-1"></button>
      </div>
    </form>
  </VDialog>
</template>
