<script setup lang="ts">
import VButton from '@/components/ui/button/VButton.vue';
import VCheckbox from '@/components/ui/checkbox/VCheckbox.vue';
import VDialog from '@/components/ui/dialog/VDialog.vue';
import VSelect from '@/components/ui/select/VSelect.vue';
import VTabs from '@/components/ui/tabs/VTabs.vue';
import VTextField from '@/components/ui/text-field/VTextField.vue';

import type { IModbusPointDialogEmits, IModbusPointDialogProps, IModbusPointModel } from './types';

const {
  title,
  errors,
  deviceItems,
  fcItems,
  typeItems,
  varItems,
  pointTabs,
  pointTab,
  testAutoCrc,
  testFrame,
  testPending,
  testValid,
  testError,
  testSummary,
  testElapsed,
  testResult,
  testStatusName,
  testStatusClass,
  testResponse,
  testDecoded,
  testException,
} = defineProps<IModbusPointDialogProps>();
const emit = defineEmits<IModbusPointDialogEmits>();
const form = defineModel<IModbusPointModel>({ required: true });

const selectName = (items: Array<{ name: string; value: number }>, value: number) => items.find((item) => item.value === value)?.name ?? '';

const setFlag = (flag: number, value: boolean) => {
  form.value.flags = value ? form.value.flags | flag : form.value.flags & ~flag;
};
</script>

<template>
  <VDialog size="lg" :title="title" @close="emit('close')">
    <form class="flex max-h-[70dvh] min-h-0 flex-col gap-4 xl:max-h-[calc(100dvh-27rem)]" @submit.prevent="emit('save')" @keydown.esc.stop="emit('close')">
      <VTabs :key="pointTab" :value="pointTab" :items="pointTabs" size="sm" @click="emit('update:point-tab', $event)" />
      <div class="flex-1">
        <template v-if="pointTab === 0">
          <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <VTextField size="sm" :error="errors.id" v-model="form.id" :label="$t('modbus.id')" />
            <VTextField size="sm" :error="errors.name" v-model="form.name" :label="$t('name')" />
            <VSelect size="sm" :model-value="selectName(deviceItems, form.device)" :items="deviceItems" :label="$t('modbus.device')" @change="({ value }) => (form.device = value)" />
            <VSelect size="sm" :model-value="selectName(fcItems, form.fc)" :items="fcItems" :label="$t('modbus.fc')" @change="({ value }) => (form.fc = value)" />
            <VTextField size="sm" :error="errors.address" :model-value="String(form.address)" :label="$t('modbus.address')" @update:model-value="form.address = Number($event) || 0" />
            <VSelect size="sm" :model-value="selectName(typeItems, form.type)" :items="typeItems" :label="$t('modbus.type')" @change="({ value }) => { form.type = value; emit('update:type', value); }" />
            <VSelect size="sm" :model-value="selectName(varItems, form.var)" :items="varItems" :label="$t('modbus.variable')" @change="({ value }) => (form.var = value)" />
            <VTextField size="sm" :error="errors.registers" :model-value="String(form.registers)" :label="$t('modbus.registers')" @update:model-value="form.registers = Number($event) || 0" />
            <VTextField size="sm" :error="errors.decimals" :model-value="String(form.decimals)" :label="$t('modbus.decimals')" @update:model-value="form.decimals = Number($event) || 0" />
            <VTextField size="sm" :model-value="String(form.scale)" :label="$t('modbus.scale')" @update:model-value="form.scale = Number($event) || 1" />
            <VTextField size="sm" :model-value="String(form.offset)" :label="$t('modbus.offset')" @update:model-value="form.offset = Number($event) || 0" />
            <VTextField size="sm" :error="errors.unit" v-model="form.unit" :label="$t('modbus.unit')" />
          </div>

          <div class="flex flex-wrap gap-4">
            <VCheckbox :model-value="Boolean(form.flags & 4)" @update:model-value="setFlag(4, Boolean($event))">{{ $t('modbus.writable') }}</VCheckbox>
            <VCheckbox :model-value="Boolean(form.flags & 2)" @update:model-value="setFlag(2, Boolean($event))">{{ $t('modbus.byteLittle') }}</VCheckbox>
            <VCheckbox :model-value="Boolean(form.flags & 1)" @update:model-value="setFlag(1, Boolean($event))">{{ $t('modbus.wordLittle') }}</VCheckbox>
          </div>

          <p v-if="errors.device || errors.var" class="text-xs text-red-600 dark:text-red-400">{{ errors.device || errors.var }}</p>
        </template>

        <template v-else>
          <div class="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h4 class="text-sm font-semibold">{{ $t('modbus.pointTest') }}</h4>
              <p class="mt-1 text-xs text-gray-dark-25 dark:text-gray-light-10">{{ $t('modbus.pointTestHint') }}</p>
            </div>
            <span class="font-mono text-xs text-gray-dark-25 dark:text-gray-light-10">{{ testSummary }}</span>
          </div>

          <div class="mt-3">
            <VCheckbox :model-value="testAutoCrc" @update:model-value="emit('update:test-auto-crc', Boolean($event))">{{ $t('modbus.rawAutoCrc') }}</VCheckbox>
          </div>

          <VTextField size="sm" class="mt-2" hide-message :model-value="testFrame" :label="$t('modbus.rawRequest')" @update:model-value="emit('update:test-frame', String($event))" />

          <p class="mt-1 text-xs text-gray-dark-25 dark:text-gray-light-10">
            {{ testAutoCrc ? $t('modbus.pointTestAutoHint') : $t('modbus.pointTestManualHint') }}
          </p>

          <div class="mt-3 flex flex-wrap items-center gap-2">
            <VButton size="sm" variant="outline" @click="emit('rebuild')">{{ $t('modbus.rawBuild') }}</VButton>
            <VButton size="sm" color="blue" :loading="testPending" :disabled="!testValid" @click="emit('test')">{{ $t('modbus.testRead') }}</VButton>
          </div>

          <p v-if="testError" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ testError }}</p>

          <div v-if="testResult" class="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <div class="text-xs font-semibold text-gray-dark-25 dark:text-gray-light-10">{{ $t('modbus.status') }}</div>
              <div class="mt-1 text-sm font-semibold" :class="testStatusClass">{{ testStatusName }}</div>
            </div>
            <div>
              <div class="text-xs font-semibold text-gray-dark-25 dark:text-gray-light-10">{{ $t('modbus.rawElapsed') }}</div>
              <div class="mt-1 font-mono text-sm">{{ testElapsed }}</div>
            </div>
            <div class="sm:col-span-2">
              <div class="text-xs font-semibold text-gray-dark-25 dark:text-gray-light-10">{{ $t('modbus.rawResponse') }}</div>
              <div class="mt-1 break-all font-mono text-sm">{{ testResponse || $t('modbus.rawEmpty') }}</div>
            </div>
            <div class="sm:col-span-2">
              <div class="text-xs font-semibold text-gray-dark-25 dark:text-gray-light-10">{{ $t('modbus.testValue') }}</div>
              <div class="mt-1 text-sm font-medium">{{ testDecoded }}</div>
            </div>
            <div v-if="testException !== null" class="text-xs text-red-600 dark:text-red-400 sm:col-span-2">{{ $t('modbus.exceptionCode') }}: {{ testException }}</div>
          </div>
        </template>
      </div>

      <div class="flex justify-end gap-3">
        <VButton size="sm" class="min-w-24" color="blue" @click="emit('save')">{{ $t('modbus.apply') }}</VButton>
        <VButton size="sm" class="min-w-24" variant="outline" color="gray" @click="emit('close')">{{ $t('modbus.close') }}</VButton>
        <button type="submit" class="hidden" aria-hidden="true" tabindex="-1"></button>
      </div>
    </form>
  </VDialog>
</template>
