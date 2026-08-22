<template>
  <VDropdown v-bind="$attrs" top="50px" hide-on-click>
    <template #activator="{ on }">
      <VTextField :model-value="modelValue" :name="name" :message="message" :label="label" @update:model-value="onInput" @click="on.open" />
    </template>

    <template #default="{ on }">
      <VList v-slot="{ item }" :items="items" @click="onChange(on, $event)">
        <slot :item="item">{{ item.name }}</slot>
      </VList>
    </template>
  </VDropdown>
</template>

<script setup lang="ts" generic="T extends { name: string }">
import type { IVAutocompleteProps, IVAutocompleteEmits } from '@/components/ui/autocomplete/types';

import VTextField from '@/components/ui/text-field/VTextField.vue';
import VDropdown from '@/components/ui/dropdown/VDropdown.vue';
import VList from '@/components/ui/list/VList.vue';

const { modelValue = '', items, message = '', name = '' } = defineProps<IVAutocompleteProps<T>>();

const emit = defineEmits<IVAutocompleteEmits<T>>();

const onInput = (value: string) => emit('update:modelValue', value);

const onChange = (on: { click: (e: Event) => void }, item: T) => {
  on.click(new Event('click'));
  emit('select', item);
};
</script>
