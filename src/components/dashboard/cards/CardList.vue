<template>
  <CardBase v-bind="props" @click="onClick">
    <template #value="item">{{ getValue(item) }}</template>

    <template #dialog-value="item">{{ getValue(item) }}</template>

    <template #dialog="item">
      <div class="flex justify-center py-4">
        <VSelect v-bind="getBind(item)" @change="setState" />
      </div>
    </template>
  </CardBase>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

import type { IDashboardItem, IListItem } from '@/types/types';

import CardBase from '@/components/dashboard/cards/CardBase.vue';
import VSelect from '@/components/general/forms/VSelect.vue';

const emit = defineEmits<{
  (e: 'click', event: Event): void;
  (e: 'setState', item: any): void;
}>();

const props = defineProps<IDashboardItem>();

const onClick = (event: Event) => emit('click', event);
const setState = ({ value }: IListItem) => emit('setState', value);
const getValue = ({ opts, value }: IDashboardItem) => (Array.isArray(opts?.list) ? opts?.list.find((i) => i.value === value)?.name || value : value);

const getBind = ({ name, value, opts = {} }: IDashboardItem) => {
  const { list = [], disabled } = opts;
  return { label: name, value, list, disabled };
};
</script>
