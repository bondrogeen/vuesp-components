<template>
  <CardBase v-bind="props" @click="emit('click', $event)" @edit="emit('edit', $event)">
    <template #icon="item">
      <slot name="icon" v-bind="item"></slot>
    </template>

    <template #value="item">{{ getValue(item) }}</template>

    <template #dialog-value="item">{{ getValue(item) }}</template>

    <template #header="item">
      <div @click.prevent.stop>
        <VSelect v-bind="getBind(item)" is-popup top="0" left="-115px" @change="setState">
          <template #activator="{ on }">
            <VButton type="icon" class="text-gray-500" @click.stop="on.click">
              <icon-ri-list-check class="size-6" />
            </VButton>
          </template>
        </VSelect>
      </div>
    </template>

    <template #dialog="item">
      <div class="flex justify-center py-4">
        <VSelect v-bind="getBind(item)" top="-50%" left="50%" @change="setState" />
      </div>
    </template>
  </CardBase>
</template>

<script setup lang="ts">
import type { ICardBaseProps, ICardBaseEmits } from '@/components/dashboard/cards/types';

import type { IDashboardItem, IListItem } from '@/types';

import CardBase from '@/components/dashboard/cards/CardBase.vue';
import VSelect from '@/components/ui/select/VSelect.vue';
import VButton from '@/components/ui/button/VButton.vue';

const props = defineProps<ICardBaseProps>();

const emit = defineEmits<ICardBaseEmits>();

const setState = ({ value }: IListItem) => emit('setState', value);
const getValue = ({ opts, value }: IDashboardItem) => (Array.isArray(opts?.items) ? opts?.items.find((i) => i.value == value)?.name || value : value);

const getBind = ({ name, value, opts = {} }: IDashboardItem) => {
  const { items = [], disabled } = opts;
  const modelValue = items.find((i) => i.value == value)?.name || value;
  return { label: name, modelValue, items, disabled: Boolean(disabled) };
};
</script>
