<template>
  <CardBase v-bind="props" @click="onClick">
    <template #dialog="item">
      <div class="flex justify-center relative mx-2 my-6">
        <VTextField v-bind="getBind(item)" autofocus @enter="onChange" @blur="onChange">
          <template #icon>
            <VIcon name="Chevron" class="size-6 rotate-270" />
          </template>
        </VTextField>
      </div>
    </template>
  </CardBase>
</template>

<script setup lang="ts">
import type { ICardBaseProps, ICardBaseEmits } from '@/components/dashboard/cards/types';

import { defineEmits, defineProps } from 'vue';

import type { IDashboardItem } from '@/types/types';

import CardBase from '@/components/dashboard/cards/CardBase.vue';
import VTextField from '@/components/ui/text-field/VTextField.vue';

import VIcon from '@/components/ui/icon/VIcon.vue';

const props = defineProps<ICardBaseProps>();

const emit = defineEmits<ICardBaseEmits>();

const getBind = ({ name, value, opts = {} }: IDashboardItem) => {
  const { disabled } = opts;
  return { label: name, modelValue: value, disabled };
};

const onChange = (e: Event) => emit('setState', (e.target as HTMLInputElement).value);
const onClick = (event: Event) => emit('click', event);
</script>
