<template>
  <CardBase v-bind="props" @click="emit('click', $event)" @edit="emit('edit', $event)">
    <template #icon="item">
      <slot name="icon" v-bind="item"></slot>
    </template>

    <template #dialog="item">
      <div class="flex justify-center relative mx-2 my-6">
        <VTextField v-model="input" v-bind="getBind(item)" @enter="onChange" @blur="onChange">
          <template #icon>
            <icon-ri-arrow-drop-right-line class="size-8" />
          </template>
        </VTextField>
      </div>
    </template>
  </CardBase>
</template>

<script setup lang="ts">
import type { ICardBaseProps, ICardBaseEmits } from '@/components/dashboard/cards/types';
import type { IDashboardItem } from '@/types';

import { ref, watch } from 'vue';

import CardBase from '@/components/dashboard/cards/CardBase.vue';
import VTextField from '@/components/ui/text-field/VTextField.vue';

const props = defineProps<ICardBaseProps>();

const emit = defineEmits<ICardBaseEmits>();

const input = ref(props.value || '');

const getBind = ({ name, opts = {} }: IDashboardItem) => {
  const { disabled } = opts;
  return { label: name, disabled };
};

const onChange = (e: Event) => emit('setState', (e.target as HTMLInputElement).value);

watch(
  () => props.value,
  (value) => {
    input.value = value;
  }
);
</script>
