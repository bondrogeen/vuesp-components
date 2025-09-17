<template>
  <CardBase v-bind="props" @click="onClick">
    <template #header>
      <div class="flex justify-end">
        <VButton type="icon" size="sm" class="text-gray-500" @click.stop="setState">
          <IconPower class="size-10" />
        </VButton>
      </div>
    </template>
    <template #dialog>
      <div class="flex justify-center py-4">
        <VButton type="icon" size="sm" class="h-18 w-18" :class="props.value ? 'text-amber-500' : 'text-blue-600 dark:text-blue-400'" @click.stop="setState">
          <IconPower class="size-16" />
        </VButton>
      </div>
    </template>
  </CardBase>
</template>

<script setup lang="ts">
import type { TypeProperty } from '@/types/types';

import CardBase from '@/components/dashboard/cards/CardBase.vue';
import IconPower from '@/assets/icons/IconPower.svg';
import VButton from '@/components/general/VButton.vue';

const emit = defineEmits<{
  (e: 'click', event: Event): void;
  (e: 'setState', item: any): void;
}>();

const props = defineProps<TypeProperty>();

const onClick = (event: Event) => emit('click', event);
const setState = () => emit('setState', { ...props, value: !props.value });
</script>
