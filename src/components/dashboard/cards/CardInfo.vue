<template>
  <CardBase v-bind="props" @click="onClick">
    <slot name="dialog"></slot>
  </CardBase>
</template>

<script setup lang="ts">
import type { ICardBaseProps, ICardBaseEmits } from '@/components/dashboard/cards/types';

import { defineEmits, defineProps } from 'vue';

import CardBase from '@/components/dashboard/cards/CardBase.vue';

const props = defineProps<ICardBaseProps>();

const emit = defineEmits<ICardBaseEmits>();

const onClick = (e: Event) => emit('click', e);
</script>
