<template>
  <ul class="bg-white dark:bg-gray-800">
    <li
      v-for="item of list"
      :key="item.id"
      class="whitespace-nowrap cursor-pointer flex items-center min-h-[40px] py-1 px-6 border-b last:border-b-0 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
      @click="onClick(item)"
    >
      <slot :item="item">{{ item.name }}</slot>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

import type { IListItem } from '@/types/types';

interface Props {
  list: IListItem[];
}

const { list = [] } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'click', value: IListItem): void;
}>();

const onClick = (item: IListItem) => emit('click', item);
</script>
