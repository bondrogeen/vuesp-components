<template>
  <nav>
    <ol class="flex items-center gap-1.5">
      <li v-for="(item, i) of items" :key="i" class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400" :class="item.path ? '' : 'text-gray-800 dark:text-white/90'">
        <slot :item="item">
          <component :is="item.path ? 'a' : 'span'" :href="item.path" @click="onClick(item)">
            {{ item.name }}
          </component>
        </slot>

        <VIcon v-if="item.path" class="rotate-270" name="Chevron"></VIcon>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import type { IBlockBreadcrumbProps, IBlockBreadcrumbEmits, IBreadcrumb } from '@/components/block/breadcrumb/types';

import { defineProps, defineEmits } from 'vue';

import VIcon from '@/components/ui/icon/VIcon.vue';

const { items = [] } = defineProps<IBlockBreadcrumbProps>();

const emit = defineEmits<IBlockBreadcrumbEmits>();

const onClick = (item: IBreadcrumb) => emit('click', item);
</script>
