<script setup lang="ts">
import VButton from '@/components/ui/button/VButton.vue';
import VCheckbox from '@/components/ui/checkbox/VCheckbox.vue';
import VDialog from '@/components/ui/dialog/VDialog.vue';
import VIcon from '@/components/ui/icon/VIcon.vue';
import VSelect from '@/components/ui/select/VSelect.vue';
import VTextField from '@/components/ui/text-field/VTextField.vue';

import type { IModbusSlaveDialogEmits, IModbusSlaveDialogProps, IModbusSlaveForm } from './types';

const { title, errors, sourceKindItems, sourceKindName, sourcePath, typeItems, typeText, writableHint, advanced } = defineProps<IModbusSlaveDialogProps>();
const emit = defineEmits<IModbusSlaveDialogEmits>();
const form = defineModel<IModbusSlaveForm>({ required: true });

const selectName = (items: Array<{ name: string; value: number }>, value: number) => items.find((item) => item.value === value)?.name ?? '';
</script>

<template>
  <VDialog size="md" :title="title" @close="emit('close')">
    <form class="flex max-h-[70dvh] min-h-0 flex-col gap-4 xl:max-h-[calc(100dvh-27rem)]" @submit.prevent="emit('save')" @keydown.esc.stop="emit('close')">
      <div class="flex-1">
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <VSelect size="sm" class="mb-4" hide-message :model-value="sourceKindName" :items="sourceKindItems" :label="$t('modbus.source')" @change="({ value }) => emit('source-kind', value)" />
          <div v-if="form.sourceKind === 'data'" class="mb-4 flex items-end gap-2">
            <VTextField size="sm" class="flex-auto" readonly hide-message :model-value="sourcePath || '—'" :label="$t('modbus.value')" />
            <VButton size="sm" type="icon" variant="outline" :title="$t('modbus.pickData')" :aria-label="$t('modbus.pickData')" @click="emit('pick-source')">
              <VIcon name="search" :size="16" />
            </VButton>
          </div>
          <p v-else class="text-xs text-gray-dark-25 dark:text-gray-light-10 sm:col-span-2">{{ $t('modbus.scriptVarHint', { id: form.id }) }}</p>
          <VTextField size="sm" :error="errors.name" v-model="form.name" :label="$t('name')" />
          <VTextField size="sm" :error="errors.address" :model-value="String(form.address)" :label="$t('modbus.address')" @update:model-value="form.address = Number($event) || 0" />
          <VTextField v-if="form.sourceKind === 'data'" size="sm" readonly :model-value="typeText" :label="$t('modbus.type')" />
          <VSelect v-else size="sm" :model-value="selectName(typeItems, form.type)" :items="typeItems" :label="$t('modbus.type')" @change="({ value }) => (form.type = value)" />
          <VTextField size="sm" :error="errors.decimals" :model-value="String(form.decimals)" :label="$t('modbus.decimals')" @update:model-value="form.decimals = Number($event) || 0" />
          <VTextField size="sm" :error="errors.unit" v-model="form.unit" :label="$t('modbus.unit')" />
        </div>

        <div class="mt-3 flex flex-wrap gap-4">
          <VCheckbox :model-value="form.writable" @update:model-value="form.writable = Boolean($event)">{{ $t('modbus.writable') }}</VCheckbox>
        </div>
        <p v-if="writableHint" class="mt-1 text-xs text-amber-600 dark:text-amber-400">{{ $t('modbus.writableHint') }}</p>

        <VButton size="sm" class="mt-3" variant="ghost" @click="emit('update:advanced', !advanced)">
          <div class="flex items-center gap-3">
            {{ $t('modbus.advanced') }}
            <VIcon name="chevron-down" :size="16" :class="advanced ? 'rotate-180' : ''" />
          </div>
        </VButton>
        <div v-if="advanced" class="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <VTextField size="sm" :error="errors.id" v-model="form.id" :label="$t('modbus.id')" />
          <VTextField size="sm" :model-value="String(form.scale)" :label="$t('modbus.scale')" @update:model-value="form.scale = Number($event) || 1" />
          <VTextField size="sm" :model-value="String(form.offset)" :label="$t('modbus.offset')" @update:model-value="form.offset = Number($event) || 0" />
        </div>

        <p v-if="errors.source || errors.address || errors.name || errors.id" class="mt-2 text-xs text-red-600 dark:text-red-400">
          {{ errors.source || errors.address || errors.name || errors.id }}
        </p>
      </div>

      <div class="flex justify-end gap-3">
        <VButton size="sm" class="min-w-24" color="blue" type="submit" @click="emit('save')">{{ $t('modbus.apply') }}</VButton>
        <VButton size="sm" class="min-w-24" variant="outline" color="gray" @click="emit('close')">{{ $t('modbus.close') }}</VButton>
      </div>
    </form>
  </VDialog>
</template>
