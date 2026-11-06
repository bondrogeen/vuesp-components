<template>
  <ul class="glass-popover overflow-hidden rounded-md">
    <li
      v-for="item of items"
      :key="item.name"
      class="flex min-h-[40px] w-full cursor-pointer items-center whitespace-nowrap border-b border-gray-100 px-4 last:border-b-0 hover:bg-primary/10 dark:border-white/5 dark:hover:bg-white/[0.06]"
      @click="onClick(item, $event)"
    >
      <slot :item="item">{{ item.name }}</slot>
    </li>
  </ul>
</template>

<script setup lang="ts" generic="T extends { name: string }">
import type { IVListProps, IVListEmits } from '@/components/ui/list/types';

const { items } = defineProps<IVListProps<T>>();

const emit = defineEmits<IVListEmits<T>>();

const onClick = (item: T, e: Event) => emit('click', item, e);
</script>
