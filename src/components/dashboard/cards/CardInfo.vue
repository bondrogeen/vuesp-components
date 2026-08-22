<script setup lang="ts">
import type { ICardBaseProps, ICardBaseEmits } from '@/components/dashboard/cards/types';

import CardBase from '@/components/dashboard/cards/CardBase.vue';

const props = defineProps<ICardBaseProps>();

const emit = defineEmits<ICardBaseEmits>();
</script>

<template>
  <CardBase v-bind="props" @click="emit('click', $event)" @edit="emit('edit', $event)" @clone="emit('clone', $event)">
    <template #icon="item">
      <slot name="icon" v-bind="item"></slot>
    </template>

    <slot name="dialog"></slot>
  </CardBase>
</template>
