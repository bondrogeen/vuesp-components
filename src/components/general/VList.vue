<template>
  <ul class="bg-white dark:bg-gray-800">
    <li
      v-for="(item, i) of list"
      :key="'list_' + i"
      class="whitespace-nowrap cursor-pointer flex items-center min-h-[40px] py-1 px-4 border-b last:border-b-0 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
      @click="onClick(item)"
    >
      <slot :item="item">{{ item.name }}</slot>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

import type { TypeVList } from '@/types/types';

interface Props {
  list: TypeVList[];
}

const { list = [] } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'click', value: TypeVList): void;
}>();

const onClick = (item: TypeVList) => emit('click', item);
</script>
