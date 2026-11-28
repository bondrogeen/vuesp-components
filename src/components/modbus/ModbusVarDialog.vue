<script setup lang="ts">
import VButton from '@/components/ui/button/VButton.vue';
import VDialog from '@/components/ui/dialog/VDialog.vue';
import VSelect from '@/components/ui/select/VSelect.vue';
import VTextField from '@/components/ui/text-field/VTextField.vue';

import type { IModbusVarDialogEmits, IModbusVarDialogProps, IModbusVarModel } from './types';

const { title, errors, typeItems, pointItems } = defineProps<IModbusVarDialogProps>();
const emit = defineEmits<IModbusVarDialogEmits>();
const form = defineModel<IModbusVarModel>({ required: true });

const selectName = (items: Array<{ name: string; value: number }>, value: number) => items.find((item) => item.value === value)?.name ?? '';
</script>

<template>
  <VDialog size="md" :title="title" @close="emit('close')">
    <form class="flex max-h-[70dvh] min-h-0 flex-col gap-4 xl:max-h-[calc(100dvh-27rem)]" @submit.prevent="emit('save')" @keydown.esc.stop="emit('close')">
      <div class="flex-1">
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <VTextField size="sm" :error="errors.id" v-model="form.id" :label="$t('modbus.id')" />
          <VTextField size="sm" :error="errors.name" v-model="form.name" :label="$t('name')" />
          <VSelect
            size="sm"
            :model-value="selectName(typeItems, form.type)"
            :items="typeItems"
            :label="$t('modbus.type')"
            @change="({ value }) => { form.type = value; emit('update:type', value); }"
          />
          <VSelect
            size="sm"
            :disabled="Boolean(form.source)"
            :model-value="selectName(pointItems, form.point)"
            :items="pointItems"
            :label="$t('modbus.point')"
            @change="({ value }) => (form.point = value)"
          />
          <VTextField size="sm" readonly v-model="form.source" :label="$t('modbus.source')" />
          <VTextField size="sm" :error="errors.unit" v-model="form.unit" :label="$t('modbus.unit')" />
          <VTextField size="sm" :error="errors.decimals" :model-value="String(form.decimals)" :label="$t('modbus.decimals')" @update:model-value="form.decimals = Number($event) || 0" />
        </div>

        <p v-if="errors.point" class="text-xs text-red-600 dark:text-red-400">{{ errors.point }}</p>
      </div>

      <div class="flex justify-end gap-3">
        <VButton size="sm" class="min-w-24" color="blue" @click="emit('save')">{{ $t('modbus.apply') }}</VButton>
        <VButton size="sm" class="min-w-24" variant="outline" color="gray" @click="emit('close')">{{ $t('modbus.close') }}</VButton>
        <button type="submit" class="hidden" aria-hidden="true" tabindex="-1"></button>
      </div>
    </form>
  </VDialog>
</template>
