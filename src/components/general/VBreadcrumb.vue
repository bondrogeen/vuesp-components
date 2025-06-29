<template>
  <nav>
    <ol class="flex items-center gap-1.5">
      <li v-for="(item, i) of items" :key="i" class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400" :class="item.path ? '' : 'text-gray-800 dark:text-white/90'">
        <slot :item="item">
          <component :is="item.path ? 'a' : 'span'" :href="item.path" @click="emit('click', $event)">
            {{ item.name }}
          </component>
        </slot>
        <IconChevron v-if="item.path" class="rotate-270"></IconChevron>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import IconChevron from '@/components/icons/IconChevron.vue';

interface TypeItem {
  name: string;
  path?: string;
}

interface Props {
  items?: TypeItem[];
}

const { items = [] } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'click', value: Event): void;
}>();
</script>
