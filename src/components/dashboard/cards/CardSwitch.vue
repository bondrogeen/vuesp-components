<template>
  <CardBase v-bind="props" @click="onClick">
    <template #header>
      <div class="flex justify-end"></div>
    </template>
    <template #dialog>
      <div class="flex justify-center py-4">
        <VButton type="icon" size="sm" class="h-18 w-18" @click.stop="setState" :class="props.value ? 'text-amber-500' : 'text-blue-600 dark:text-blue-400'">
          <div class="size-16">
            <IconPower />
          </div>
        </VButton>
      </div>
    </template>
  </CardBase>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

import type { IDashboardItem } from '@/types/types';

import CardBase from '@/components/dashboard/cards/CardBase.vue';
import IconPower from '@/assets/icons/IconPower.svg';
import VButton from '@/components/general/VButton.vue';

const emit = defineEmits<{
  (e: 'click', event: Event): void;
  (e: 'setState', item: any): void;
}>();

const props = defineProps<IDashboardItem>();

const onClick = (event: Event) => emit('click', event);
const setState = () => emit('setState', props);
</script>
