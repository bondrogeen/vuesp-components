<template>
  <VDropdown class="relative w-full" v-bind="$attrs" top="46px" hideOnClick>
    <template #activator="{ on, show }">
      <VTextField :model-value="getValue" readonly hideMessage :disabled="disabled" active :label="label" @click="on.click" @on-icon="on.click">
        <template #icon>
          <IconChevron class="transition" :class="getClass(show)"></IconChevron>
        </template>
      </VTextField>
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

import IconChevron from '@/assets/icons/IconChevron.svg';

interface Props {
  value?: number | string;
  valueName?: string;
  label: string;
  disabled?: boolean;
  list: IListItem[];
}

const { valueName = 'name', value = '', list, disabled = false } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Event): void;
  (e: 'change', item: IListItem): void;
}>();

const getValue = computed(() => {
  const item = list.find((i: IListItem) => i.value === value) ?? null;
  if (!item || !valueName) return '';
  if (valueName in item) {
    return String(item[valueName as keyof IListItem]) || '';
  }
  return '';
});

const getClass = (show: boolean) => ({ 'rotate-x-180': show });

const onChange = (on: any, item: IListItem) => {
  on.click(item);
  emit('change', item);
};
</script>
