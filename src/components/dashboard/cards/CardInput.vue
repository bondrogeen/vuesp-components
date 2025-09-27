<template>
  <CardBase v-bind="props" @click="onClick">
    <template #dialog="{ value, name }">
      <div class="flex justify-center relative mx-2 my-6">
        <VTextField :modelValue="value" :label="name" autofocus @change="onChange"></VTextField>
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

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('setState', target.value);
};

const onClick = (event: Event) => emit('click', event);
</script>
