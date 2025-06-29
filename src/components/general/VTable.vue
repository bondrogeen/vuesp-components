<template>
  <table class="min-w-full">
    <thead class="border-y border-gray-100 py-3 dark:border-gray-800">
      <tr class="bg-gray-50 dark:bg-gray-800">
        <th v-for="(item, i) of headers" :key="i" class="py-2 whitespace-nowrap text-gray-500 dark:text-gray-400 font-normal px-4" :class="getClass(item)">
          <slot name="header" :item="item">
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
          <td v-for="(head, i) of headers" :key="i" class="py-2 whitespace-nowrap px-4">
            <div class="flex items-center text-gray-700 dark:text-gray-400">
              <slot :name="head.key" :item="item">{{ item[head.key] }}</slot>
            </div>
          </td>
        </tr>
      </template>

      <template v-else>
        <tr class="">
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

<script setup lang="ts">
interface Props {
  headers: any[];
  items: any[];
}

const { headers = [], items = [] } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'click', data: { item: any; event: Event }): void;
}>();

const onClick = (item: any, event: Event) => {
  emit('click', { item, event });
};

const getClass = (item: any) => item?.className || '';
</script>
