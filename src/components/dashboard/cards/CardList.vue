<template>
  <CardBase v-bind="props" @click="onClick">
    <template #value="item">
      {{ getValue(item) }}
    </template>

    <template #dialog-value="item">
      {{ getValue(item) }}
    </template>

    <template #dialog="{ name, value, list }">
      <div class="flex justify-center py-4">
        <VSelect :value="value" :label="name" :list="list" @change="setState" />
      </div>
    </template>
  </CardBase>
</template>

<script setup lang="ts">
import type { TypeProperty } from '@/types/types';

import CardBase from '@/components/dashboard/cards/CardBase.vue';
import VSelect from '@/components/general/VSelect.vue';

const emit = defineEmits<{
  (e: 'click', event: Event): void;
  (e: 'setState', item: any): void;
}>();

const props = defineProps<TypeProperty>();

const onClick = (event: Event) => emit('click', event);
const setState = ({ value }: any) => emit('setState', { ...props, value });
const getValue = ({ list, value }: any) => (Array.isArray(list) ? list.find((i) => i.value === value)?.name : value + '12121');
</script>
