<template>
  <table class="min-w-full">
    <thead class="border-y border-gray-200 py-3 dark:border-gray-800">
      <tr class="bg-gray-200 dark:bg-gray-800">
        <th v-for="(item, i) of headers" :key="i" class="py-2 whitespace-nowrap text-gray-500 dark:text-gray-400 font-normal px-4" :class="getClass(item)">
          <slot name="header" :item="item" :i="i">
            <div class="flex items-center">
              {{ item.name }}
            </div>
          </slot>
        </th>
      </tr>
    </thead>

    <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
      <template v-if="items.length">
        <tr v-for="(item, i) of items" :key="i" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/50" @click="onClick(item, $event)">
          <td v-for="(head, y) of headers" :key="y" class="py-2 px-4">
            <div class="flex items-center text-gray-700 dark:text-gray-400">
              <slot :name="head.key" :item="item" :i="i">{{ getItem(item, head) }}</slot>
            </div>
          </td>
        </tr>
      </template>

      <template v-else>
        <tr>
          <td class="py-3 whitespace-nowrap" colspan="9">
            <div class="flex items-center justify-center text-theme-sm text-gray-700 dark:text-gray-400 px-2">
              <slot name="empty">The list is empty</slot>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts" generic="T">
import type { IVTableProps, IVTableEmits, IHeaderTable } from '@/components/ui/table/types';

const { headers = [], items = [] } = defineProps<IVTableProps<T>>();

const emit = defineEmits<IVTableEmits<T>>();

const onClick = (item: T, event: Event) => emit('click', item, event);

const getClass = (item: IHeaderTable) => item?.className || '';
const getItem = (item: T, { key }: IHeaderTable) => item?.[key as keyof T];
</script>
