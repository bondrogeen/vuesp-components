<script setup lang="ts">
import VButton from '@/components/ui/button/VButton.vue';
import VCard from '@/components/ui/card/VCard.vue';
import VIcon from '@/components/ui/icon/VIcon.vue';
import VSelect from '@/components/ui/select/VSelect.vue';
import VTextField from '@/components/ui/text-field/VTextField.vue';

import type { IModbusConnectionCardEmits, IModbusConnectionCardProps } from './types';

const {
  form,
  status,
  isConnected,
  isDirty,
  isSettingsOpen,
  roles,
  bauds,
  parities,
  stopBits,
  statusItems,
  roleName,
  baudName,
  parityName,
  stopBitsName,
  formatText,
  statusText,
  statusDotClass,
} = defineProps<IModbusConnectionCardProps>();
const emit = defineEmits<IModbusConnectionCardEmits>();
</script>

<template>
  <VCard variant="glass" padding="none" class="relative z-20">
    <div class="flex flex-wrap items-center gap-3 border-b border-gray-light-10/70 px-3 py-2.5 dark:border-white/10">
      <div class="flex items-center gap-2">
        <span class="size-2.5 rounded-full" :class="statusDotClass" />
        <span class="text-sm font-medium">{{ statusText }}</span>
      </div>
      <span class="hidden h-4 w-px bg-gray-light-10/70 dark:bg-white/10 sm:block" />
      <span class="min-w-0 truncate font-mono text-xs text-gray-dark-25 dark:text-gray-main">
        {{ form.role === 1 ? `${$t('modbus.address')} ${form.address} · ` : '' }}{{ formatText }}
      </span>
      <span class="hidden h-4 w-px bg-gray-light-10/70 dark:bg-white/10 sm:block" />
      <span class="hidden font-mono text-[11px] text-gray-dark-25 dark:text-gray-main sm:inline">
        {{ $t('modbus.requests') }} {{ status.requests }} · {{ $t('modbus.errors') }} {{ status.errors }}
      </span>
      <span v-if="isDirty" class="flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400">
        <span class="size-1.5 rounded-full bg-amber-500" />
        {{ $t('modbus.unsaved') }}
      </span>
      <div class="ml-auto flex flex-wrap items-center gap-2">
        <div class="w-32 shrink-0">
          <VSelect size="sm" hide-message :model-value="roleName" :items="roles" :disabled="isConnected" :label="$t('modbus.role')" @change="emit('role', $event)" />
        </div>
        <div class="w-28 shrink-0">
          <VSelect size="sm" hide-message :model-value="baudName" :items="bauds" :disabled="isConnected" :label="$t('modbus.baud')" @change="emit('baud', $event)" />
        </div>
        <VButton size="sm" :color="isConnected ? 'red' : 'blue'" :variant="isConnected ? 'outline' : 'solid'" @click="emit('toggle-connection')">
          {{ isConnected ? $t('modbus.disconnect') : $t('modbus.connect') }}
        </VButton>
        <VButton
          type="icon"
          size="sm"
          :variant="isSettingsOpen ? 'soft' : 'ghost'"
          color="gray"
          :title="$t('modbus.settings')"
          :aria-label="$t('modbus.settings')"
          @click="emit('toggle-settings')"
        >
          <VIcon name="settings" :size="17" />
        </VButton>
      </div>
    </div>

    <div v-if="isSettingsOpen" class="border-b border-gray-light-10/70 px-3 py-3 dark:border-white/10">
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <VSelect size="sm" hide-message :model-value="parityName" :items="parities" :disabled="isConnected" :label="$t('modbus.parity')" @change="emit('parity', $event)" />
        <VSelect size="sm" hide-message :model-value="stopBitsName" :items="stopBits" :disabled="isConnected" :label="$t('modbus.stopBits')" @change="emit('stop-bits', $event)" />
        <VTextField
          v-if="form.role !== 2"
          size="sm"
          hide-message
          :model-value="String(form.address)"
          :disabled="isConnected || form.role !== 1"
          :label="$t('modbus.address')"
          @update:model-value="emit('address', String($event))"
        />
        <VTextField
          size="sm"
          hide-message
          :model-value="String(form.txPin)"
          :disabled="isConnected"
          :label="$t('modbus.txPin')"
          @update:model-value="emit('pin', 'tx', String($event))"
        />
        <VTextField
          size="sm"
          hide-message
          :model-value="String(form.rxPin)"
          :disabled="isConnected"
          :label="$t('modbus.rxPin')"
          @update:model-value="emit('pin', 'rx', String($event))"
        />
        <VTextField
          size="sm"
          hide-message
          :model-value="String(form.dePin)"
          :disabled="isConnected"
          :label="$t('modbus.dePin')"
          @update:model-value="emit('pin', 'de', String($event))"
        />
      </div>

      <p class="mt-2 text-[11px] text-gray-dark-25 dark:text-gray-main">{{ $t('modbus.format') }}: {{ formatText }} · DE -1 — {{ $t('modbus.deAuto') }}</p>

      <div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div v-for="item in statusItems" :key="item.label">
          <div class="text-[11px] text-gray-dark-25 dark:text-gray-main">{{ item.label }}</div>
          <div class="mt-1 text-sm font-semibold" :class="item.className">{{ item.value }}</div>
        </div>
      </div>
    </div>

    <slot />
  </VCard>
</template>
