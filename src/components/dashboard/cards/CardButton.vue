<template>
  <CardBase v-bind="props" @click="emit('click', $event)" @edit="emit('edit', $event)">
    <template #icon="item">
      <slot name="icon" v-bind="item"></slot>
    </template>

    <template #header="item">
      <div class="flex justify-end">
        <VButton v-bind="getBind(item)" type="icon" :class="props.value ? 'text-amber-500' : 'text-gray-500'" @click.stop="setState">
          <icon-ri-shut-down-line class="size-8" />
        </VButton>
      </div>
    </template>

    <template #dialog="item">
      <div class="flex justify-center py-4">
        <VButton v-bind="getBind(item)" type="icon" class="size-18" :class="props.value ? 'text-amber-500' : 'text-gray-500'" @click.stop="setState">
          <icon-ri-shut-down-line class="size-16" />
        </VButton>
      </div>
    </template>
  </CardBase>
</template>

<script setup lang="ts">
import type { ICardBaseProps, ICardBaseEmits } from '@/components/dashboard/cards/types';

import type { IDashboardItem } from '@/types';

import CardBase from '@/components/dashboard/cards/CardBase.vue';

import VButton from '@/components/ui/button/VButton.vue';

const props = defineProps<ICardBaseProps>();

const emit = defineEmits<ICardBaseEmits>();

const getBind = ({ opts = {} }: IDashboardItem) => {
  const { disabled } = opts;
  return { disabled };
};

const setState = () => emit('setState', !props.value);
</script>
