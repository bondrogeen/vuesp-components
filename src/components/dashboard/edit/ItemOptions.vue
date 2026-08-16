<template>
  <div class="flex flex-col">
    <div class="flex gap-4 mb-6">
      <VCheckbox :modelValue="disabled" @update:modelValue="onUpdate('disabled', $event ? 1 : 0)">Disabled</VCheckbox>
    </div>

    <div v-if="isType('dimmer')" class="flex gap-4">
      <VTextField :modelValue="min" label="Min" @update:modelValue="onUpdate('min', +$event)" />

      <VTextField :modelValue="max" label="Max" @update:modelValue="onUpdate('max', +$event)" />

      <VTextField :modelValue="step" label="Step" @update:modelValue="onUpdate('step', +$event)" />
    </div>

    <div v-if="isType('list')" class="">
      <div class="flex flex-col md:flex-row gap-4">
        <VTextField v-model="listItem.name" :disabled="isDisabledList" label="Name" @update:model-value="onChangeList" />

        <VTextField v-model="listItem.value" :disabled="isDisabledList" label="Value" @update:model-value="onChangeList" />
      </div>

      <div class="flex gap-4">
        <VSelect :model-value="listItem.value" label="List" :items="listWithId" top="unset" bottom="0" @change="onSelect">
          <template #item="{ item }">
            <div class="flex justify-between flex-auto">
              <span>{{ item.name }}</span>

              <button class="cursor-pointer size-4" @click.prevent.stop="onRemove(item)">
                <icon-ri-close-line />
              </button>
            </div>
          </template>
        </VSelect>

        <VButton class="px-4" color="blue" @click="onAdd">
          <icon-ri-add-line />
        </VButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import type { IListItem, IDashboardItemOptions, TypeValueDashboardItemOptions } from '@/types';
import type { IItemOptionsProps, IItemOptionsEmits } from '@/components/dashboard/edit/types';

import { ref, computed } from 'vue';

import { useDebounceFn } from '@vueuse/core';

import VButton from '@/components/ui/button/VButton.vue';
import VSelect from '@/components/ui/select/VSelect.vue';
import VTextField from '@/components/ui/text-field/VTextField.vue';
import VCheckbox from '@/components/ui/checkbox/VCheckbox.vue';

const { min = 0, max = 255, step = 1, type, items = [] } = defineProps<IItemOptionsProps>();

const emit = defineEmits<IItemOptionsEmits>();

const listWithId = computed(() => items.map((i: IListItem, idx: number) => ({ ...i, id: ++idx })));
const listItem: Ref<IListItem> = ref({ name: '', value: '' });
const listLength = computed(() => items.length + 1);
const isDisabledList = computed(() => !listItem.value?.id);

const isType = (key: string) => type === key;

const onUpdate = <K extends keyof IDashboardItemOptions>(key: K, value: TypeValueDashboardItemOptions) => emit('update', key, value);

const clearListId = (list: IListItem[]) => list.map(({ name, value }) => ({ name, value }));
const onSelect = ({ id, name, value }: IListItem) => (listItem.value = { id, name, value });

const onAdd = () => {
  const id = listLength.value;
  listItem.value = { name: `New_${id}`, value: id, id };
  onUpdate('items', clearListId([...listWithId.value, listItem.value]));
};

const onRemove = (item: IListItem) => {
  if (listItem.value.name === item.name) listItem.value = { name: '', value: '' };
  onUpdate('items', clearListId(listWithId.value.filter((i: IListItem) => i.value !== item.value)));
};

const onChangeList = useDebounceFn(() => {
  const item = listItem.value;
  if (!item.name || !item.value) return;
  const items = listWithId.value.map((i: IListItem) => (i.id === item.id ? item : i));
  onUpdate('items', clearListId(items));
}, 300);
</script>
