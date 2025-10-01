<template>
  <CardBase v-bind="props" @click="onClick">
    <template #dialog="item">
      <div class="flex justify-center relative mx-2 my-6">
        <VTextField v-bind="getBind(item)" autofocus @change="onChange"></VTextField>
      </div>
    </template>
  </CardBase>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

import type { IDashboardItem } from '@/types/types';

import CardBase from '@/components/dashboard/cards/CardBase.vue';
import VTextField from '@/components/general/forms/VTextField.vue';

const emit = defineEmits<{
  (e: 'click', event: Event): void;
  (e: 'setState', item: any): void;
}>();

const props = defineProps<IDashboardItem>();

const getBind = ({ name, value, opts = {} }: IDashboardItem) => {
  const { disabled } = opts;
  return { label: name, modelValue: value, disabled };
};

const onChange = (e: Event) => emit('setState', (e.target as HTMLInputElement).value);
const onClick = (event: Event) => emit('click', event);
</script>
