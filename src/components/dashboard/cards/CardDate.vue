<template>
  <CardBase v-bind="props" @click="onClick">
    <template #dialog="item">
      <div class="flex justify-center relative mx-2 my-6">
        <VTextField v-bind="getBind(item)" type="datetime-local" @change="onChangeDate"></VTextField>
      </div>
    </template>
  </CardBase>
</template>

<script setup lang="ts">
import type { IDashboardItem } from '@/types/types';
import type { ICardBaseProps, ICardBaseEmits } from '@/components/dashboard/cards/types';

import { defineEmits, defineProps } from 'vue';

import CardBase from '@/components/dashboard/cards/CardBase.vue';
import VTextField from '@/components/ui/text-field/VTextField.vue';

const props = defineProps<ICardBaseProps>();

const emit = defineEmits<ICardBaseEmits>();

const datetime = (now: number | string) => new Date(+now * 1000).toISOString().slice(0, 16);

const onChangeDate = (e: Event) => {
  const now: number = (e?.target as HTMLInputElement)?.valueAsNumber;
  if (now) {
    emit('setState', now / 1000);
  }
};

const getBind = ({ name, value, opts = {} }: IDashboardItem) => {
  const { disabled } = opts;
  return { label: name, modelValue: datetime(value), disabled };
};

const onClick = (event: Event) => emit('click', event);
</script>
