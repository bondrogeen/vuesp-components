<template>
  <ul :class="props.className ?? 'bg-white dark:bg-gray-800'">
    <li
      v-for="item of props.list"
      :key="`${item.value}_${item.name}`"
      class="whitespace-nowrap cursor-pointer flex items-center min-h-[40px] py-1 px-6 border-b last:border-b-0 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/30"
      @click="onClick(item, $event)"
    >
      <slot :item="item">{{ item.name }}</slot>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { IListItem } from '@/types/types';
import { defineProps, defineEmits } from 'vue';

interface Props {
  list: IListItem[];
  className?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'click', value: IListItem, event: Event): void;
}>();

const onClick = (item: IListItem, e: Event) => emit('click', item, e);
</script>
