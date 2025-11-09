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
import type { IVAutocompleteProps, IVAutocompleteEmits, IListItem } from '@/components/ui/autocomplete/types';
import { defineProps, defineEmits } from 'vue';

import VTextField from '@/components/ui/text-field/VTextField.vue';
import VDropdown from '@/components/ui/dropdown/VDropdown.vue';
import VList from '@/components/ui/list/VList.vue';

const { modelValue = '', list, message = '', name = '' } = defineProps<IVAutocompleteProps>();

const emit = defineEmits<IVAutocompleteEmits>();

const onInput = (value: string) => emit('update:modelValue', value);

const onChange = (on: { click: (e: Event) => void }, item: IListItem) => {
  on.click(new Event('click'));
  emit('select', item);
};
</script>
