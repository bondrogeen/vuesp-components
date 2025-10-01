<template>
  <div class="flex flex-col">
    <div class="flex gap-4 mb-6">
      <VCheckbox :modelValue="disabled" @update:modelValue="onUpdate('disabled', $event ? 1 : 0)">Disabled</VCheckbox>
    </div>

    <div v-if="isType('dimmer')" class="flex gap-4">
      <VTextField :modelValue="min" label="Min" @update:modelValue="onUpdate('min', +$event)"></VTextField>
      <VTextField :modelValue="max" label="Max" @update:modelValue="onUpdate('max', +$event)"></VTextField>
      <VTextField :modelValue="step" label="Step" @update:modelValue="onUpdate('step', +$event)"></VTextField>
    </div>

    <div v-if="isType('list')" class="">
      <div class="flex flex-col md:flex-row gap-4">
        <VTextField v-model="listItem.name" :disabled="isDisabledList" label="Name" @update:model-value="onChangeList"></VTextField>

        <VTextField v-model="listItem.value" :disabled="isDisabledList" label="Value" @update:model-value="onChangeList">></VTextField>
      </div>

      <div class="flex gap-4">
        <VSelect v-slot="{ item }" :value="listItem.value" label="List" :list="listWithId" @change="onSelect">
          <div class="flex justify-between flex-auto">
            <span>{{ item.name }}</span>

            <button class="cursor-pointer size-4" @click.prevent.stop="onRemove(item)">
              <Close />
            </button>
          </div>
        </VSelect>

        <VButton class="px-4" color="blue" @click="onAdd"><Plus /></VButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import type { IListItem, IDashboardItemOptions } from '@/types/types';

import { ref, defineProps, defineEmits, computed } from 'vue';

import { debounce } from '@/helpers';

import VButton from '@/components/general/forms/VButton.vue';
import VSelect from '@/components/general/forms/VSelect.vue';
import VTextField from '@/components/general/forms/VTextField.vue';
import VCheckbox from '@/components/general/forms/VCheckbox.vue';

import Close from '@/assets/icons/Close.svg';
import Plus from '@/assets/icons/Plus.svg';

interface Props {
  min?: number;
  max?: number;
  step?: number;
  disabled?: number;
  list?: IListItem[];
  value?: string | number;
  type: string;
}

type TypeValue = IDashboardItemOptions[keyof IDashboardItemOptions];

const { min = 0, max = 255, step = 1, type, list = [] } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update', key: keyof IDashboardItemOptions, value: TypeValue): void;
}>();

const listWithId = computed(() => list.map((i: IListItem, idx: number) => ({ ...i, id: ++idx })));

const listItem: Ref<IListItem> = ref({ name: '', value: '' });

const listLength = computed(() => list.length + 1);
const isDisabledList = computed(() => !listItem.value?.id);
const isType = (key: string) => type === key;

const onUpdate = <K extends keyof IDashboardItemOptions>(key: K, value: TypeValue) => emit('update', key, value);

const clearListId = (list: IListItem[]) => list.map(({ name, value }) => ({ name, value }));

const onSelect = ({ id, name, value }: IListItem) => (listItem.value = { id, name, value });

const onAdd = () => {
  const id = listLength.value;
  listItem.value = { name: `New_${id}`, value: id, id };
  onUpdate('list', clearListId([listItem.value, ...listWithId.value]));
};

const onRemove = (item: IListItem) => {
  if (listItem.value.name === item.name) listItem.value = { name: '', value: '' };
  onUpdate('list', clearListId(listWithId.value.filter((i: IListItem) => i.value !== item.value)));
};

const onChangeList = debounce(() => {
  const item = listItem.value;
  if (!item.name || !item.value) return;
  const items = listWithId.value.map((i: IListItem) => (i.id === item.id ? item : i));
  onUpdate('list', clearListId(items));
}, 300);
</script>
