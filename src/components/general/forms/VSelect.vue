<template>
  <VDropdown class="relative w-full" v-bind="$attrs" top="46px">
    <template #activator="{ on, show }">
      <VTextField :model-value="getValue" readonly hideMessage :disabled="disabled" active :label="label" @click="on.click" @on-icon="on.click">
        <template #icon>
          <IconChevron class="transition" :class="getClass(show)"></IconChevron>
        </template>
      </VTextField>
      <select class="md:hidden absolute left-0 top-0 w-full h-full opacity-0" name="select" @change="onSelect">
        <option v-for="item of list" :key="item.value" :value="item.value" :selected="value === item.value">{{ item.name }}</option>
      </select>
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
import { computed, defineEmits, defineProps } from 'vue';

import VTextField from '@/components/general/forms/VTextField.vue';
import VDropdown from '@/components/general/forms/VDropdown.vue';
import VList from '@/components/general/forms/VList.vue';

import IconChevron from '@/assets/icons/Chevron.svg';

interface Props {
  value?: number | string;
  label: string;
  disabled?: boolean | number;
  list: IListItem[];
}

const { value = '', list, disabled = false } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Event): void;
  (e: 'change', item: IListItem): void;
}>();

const getValue = computed(() => {
  const item = list.find((i: IListItem) => i.value === value);
  return item?.name || '';
});

const getClass = (show: boolean) => ({ 'rotate-x-180': show });

const onSelect = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  const value = target?.value || 0;
  const item = list.find((i: IListItem) => i.value == value);
  if (item) emit('change', item);
};

const onChange = (on: any, item: IListItem) => {
  on.click(item);
  emit('change', item);
};
</script>
