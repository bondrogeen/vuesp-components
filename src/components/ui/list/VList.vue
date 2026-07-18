<template>
  <ul :class="className ?? 'bg-white dark:bg-gray-800'">
    <li
      v-for="item of items"
      :key="item.name"
      class="whitespace-nowrap cursor-pointer flex items-center min-h-[40px] border-b last:border-b-0 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/30 w-full px-4"
      @click="onClick(item, $event)"
    >
      <slot :item="item">{{ item.name }}</slot>
    </li>
  </ul>
</template>

<script setup lang="ts" generic="T extends { name: string }">
import type { IVListProps, IVListEmits } from '@/components/ui/list/types';

const { items, className } = defineProps<IVListProps<T>>();

const emit = defineEmits<IVListEmits<T>>();

const onClick = (item: T, e: Event) => emit('click', item, e);
</script>
