<template>
  <VDropdown class="relative w-full" v-bind="$attrs" top="46px">
    <template #activator="{ on, show }">
      <VTextField :model-value="getValue" readonly hideMessage :disabled="disabled" active :label="label" @click="on.click" @on-icon="on.click">
        <template #icon>
          <VIcon name="Chevron" class="transition" :class="getClass(show)"></VIcon>
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
import type { IVSelectProps, IVSelectEmits, IListItem } from '@/components/ui/select/types';

import { computed, defineEmits, defineProps } from 'vue';

import VTextField from '@/components/ui/text-field/VTextField.vue';
import VDropdown from '@/components/ui/dropdown/VDropdown.vue';
import VList from '@/components/ui/list/VList.vue';
import VIcon from '@/components/ui/icon/VIcon.vue';

const { value = '', list, disabled = false } = defineProps<IVSelectProps>();

const emit = defineEmits<IVSelectEmits>();

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

const onChange = (on: { click: (e: Event) => void }, item: IListItem) => {
  on.click(new Event('click'));
  emit('change', item);
};
</script>
