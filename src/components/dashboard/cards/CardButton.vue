<template>
  <CardBase v-bind="props" @click="onClick">
    <template #header="item">
      <div class="flex justify-end">
        <VButton v-bind="getBind(item)" type="icon" class="text-gray-500" @click.stop="setState">
          <IconPower class="size-10" />
        </VButton>
      </div>
    </template>
    <template #dialog="item">
      <div class="flex justify-center py-4">
        <VButton v-bind="getBind(item)" type="icon" class="size-18" :class="props.value ? 'text-amber-500' : 'text-blue-600 dark:text-blue-400'" @click.stop="setState">
          <IconPower class="size-16" />
        </VButton>
      </div>
    </template>
  </CardBase>
</template>

<script setup lang="ts">
import type { IDashboardItem } from '@/types/types';
import { defineEmits, defineProps } from 'vue';

import CardBase from '@/components/dashboard/cards/CardBase.vue';
import VButton from '@/components/general/forms/VButton.vue';
import IconPower from '@/assets/icons/Power.svg';

const emit = defineEmits<{
  (e: 'click', event: Event): void;
  (e: 'setState', item: any): void;
}>();

const props = defineProps<IDashboardItem>();

const getBind = ({ opts = {} }: IDashboardItem) => {
  const { disabled } = opts;
  return { disabled };
};

const onClick = (event: Event) => emit('click', event);
const setState = () => emit('setState', !props.value);
</script>
