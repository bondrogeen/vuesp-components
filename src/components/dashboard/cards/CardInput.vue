<template>
  <CardBase v-bind="props" @click="onClick">
    <template #dialog="{ value, name }">
      <div class="flex justify-center relative mx-2 my-6">
        <VTextField :modelValue="value" :label="name" @change="onChange"></VTextField>
      </div>
    </template>
  </CardBase>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

import type { IProperty } from '@/types/types';

import CardBase from '@/components/dashboard/cards/CardBase.vue';
import VTextField from '@/components/general/VTextField.vue';

const emit = defineEmits<{
  (e: 'click', event: Event): void;
  (e: 'setState', item: any): void;
}>();

const props = defineProps<IProperty>();

const onChange = (e: any) => {
  const value: number = e?.target?.value;
  emit('setState', { ...props, value });
};

const onClick = (event: Event) => emit('click', event);
</script>
