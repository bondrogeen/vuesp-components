<script setup lang="ts">
import type { IDashboardItem } from '@/types';
import type { ICardBaseProps, ICardBaseEmits } from '@/components/dashboard/cards/types';

import CardBase from '@/components/dashboard/cards/CardBase.vue';
import VTextField from '@/components/ui/text-field/VTextField.vue';
import VButton from '@/components/ui/button/VButton.vue';
import { useTemplateRef } from 'vue';

const props = defineProps<ICardBaseProps>();

const emit = defineEmits<ICardBaseEmits>();

const time = useTemplateRef('time');

const datetime = (now: number | string) => new Date(+now * 1000).toISOString().slice(0, 16);

const onChangeDate = (e: Event) => {
  const now: number = (e?.target as HTMLInputElement)?.valueAsNumber;
  if (now) {
    emit('setState', now / 1000);
  }
};

const getBind = ({ name, value, opts = {} }: IDashboardItem) => {
  const { disabled } = opts;
  return { label: name, modelValue: datetime(value), disabled };
};

const onClick = () => {
  const input = time.value?.$el?.querySelector('input') as HTMLInputElement | null;
  if (input?.showPicker) {
    input.showPicker();
  }
};
</script>

<template>
  <CardBase v-bind="props" @click="emit('click', $event)" @edit="emit('edit', $event)" @clone="emit('clone', $event)">
    <template #icon="item">
      <slot name="icon" v-bind="item"></slot>
    </template>

    <template #header="item">
      <div>
        <VButton type="icon" class="text-gray-500" @click.stop="onClick">
          <icon-ri-time-line class="size-7" />
        </VButton>
        <VTextField ref="time" v-bind="getBind(item)" type="datetime-local" class="size-0" hidden @change="onChangeDate"></VTextField>
      </div>
    </template>

    <template #dialog="item">
      <div class="flex justify-center relative mx-2 my-6">
        <VTextField v-bind="getBind(item)" type="datetime-local" @change="onChangeDate"></VTextField>
      </div>
    </template>
  </CardBase>
</template>
