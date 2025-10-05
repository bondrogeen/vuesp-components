<template>
  <VDropdown v-bind="$attrs" top="50px" hide-on-click>
    <template #activator="{ on }">
      <VTextField :model-value="modelValue" :name="name" :message="message" :label="label" @update:model-value="onInput" @click="on.open" />
    </template>

    <template #default="{ on }">
      <VList v-slot="{ item }" :list="list" @click="onChange(on, $event)">
        <slot :item="item">{{ item.name }}</slot>
      </VList>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
import type { IListItem } from '@/types/types';
import { defineProps, defineEmits } from 'vue';

import VTextField from '@/components/general/forms/VTextField.vue';
import VDropdown from '@/components/general/forms/VDropdown.vue';
import VList from '@/components/general/forms/VList.vue';

interface Props {
  modelValue?: string | number | undefined;
  label: string;
  name?: string;
  message?: string;
  list: IListItem[];
}

const { modelValue = '', list, message = '', name = '' } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'select', item: IListItem): void;
}>();

const onInput = (value: string) => {
  emit('update:modelValue', value);
};

const onChange = (on: any, item: IListItem) => {
  on.click(item);
  emit('select', item);
};
</script>
