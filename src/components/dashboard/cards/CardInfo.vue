<template>
  <CardBase v-bind="props" @click="onClick">
    <slot name="dialog"></slot>
  </CardBase>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

import type { IProperty } from '@/types/types';

import CardBase from '@/components/dashboard/cards/CardBase.vue';

const emit = defineEmits<{
  (e: 'click', event: Event): void;
}>();

const props = defineProps<IProperty>();

const onClick = (e: Event) => emit('click', e);
</script>
