<template>
  <div class="glass-inset overflow-x-auto rounded-md">
    <table class="min-w-full">
    <thead class="border-y border-gray-200/70 py-3 dark:border-white/10">
      <tr class="bg-gray-100/70 dark:bg-white/[0.04]">
        <th v-for="(item, i) of headers" :key="i" class="px-4 py-2 whitespace-nowrap font-normal text-gray-500 dark:text-white/50" :class="getClass(item)">
          <slot name="header" :item="item" :i="i">
            <div class="flex items-center">
              {{ item.name }}
            </div>
          </slot>
        </th>
      </tr>
    </thead>

    <tbody class="divide-y divide-gray-100 dark:divide-white/5">
      <template v-if="items.length">
        <tr v-for="(item, i) of items" :key="i" class="transition-colors hover:bg-primary/[0.04] dark:hover:bg-white/[0.04]" @click="onClick(item, $event)">
          <td v-for="(head, y) of headers" :key="y" class="py-2 px-4">
            <div class="flex items-center text-gray-700 dark:text-white/70">
              <slot :name="head.key" :item="item" :i="i">{{ getItem(item, head) }}</slot>
            </div>
          </td>
        </tr>
      </template>

      <template v-else>
        <tr>
          <td class="py-3 whitespace-nowrap" colspan="9">
            <div class="flex items-center justify-center px-2 text-sm text-gray-500 dark:text-white/50">
              <slot name="empty">The list is empty</slot>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  </div>
</template>

<script setup lang="ts" generic="T">
import type { IVTableProps, IVTableEmits, IHeaderTable } from '@/components/ui/table/types';

const { headers = [], items = [] } = defineProps<IVTableProps<T>>();

const emit = defineEmits<IVTableEmits<T>>();

const onClick = (item: T, event: Event) => emit('click', item, event);

const getClass = (item: IHeaderTable) => item?.className || '';
const getItem = (item: T, { key }: IHeaderTable) => item?.[key as keyof T];
</script>
