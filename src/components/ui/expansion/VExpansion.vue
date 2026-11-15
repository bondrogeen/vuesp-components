<template>
  <div ref="root" class="glass-inset mb-2 overflow-hidden rounded-md">
    <div class="cursor-pointer min-h-16 px-4 flex items-center justify-between" @click="onActive">
      <h4>{{ label }}</h4>

      <div class="transition text-gray-main" :class="{ 'rotate-x-180': isActive }">
        <VIcon name="chevron-down" class="size-6" />
      </div>
    </div>

    <div class="v-expansion__content max-h-0 overflow-hidden transition-all duration-300">
      <div class="p-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import VIcon from '@/components/ui/icon/VIcon.vue';
import type { IVExpansionProps } from '@/components/ui/expansion/types';
import type { Ref } from 'vue';

import { ref, onMounted } from 'vue';

const { label = '', value = false } = defineProps<IVExpansionProps>();

const root: Ref<HTMLDivElement | null> = ref(null);
const isActive = ref(value);

const onChange = () => {
  if (!root.value) return;
  const content: HTMLDivElement | null = root.value.querySelector('.v-expansion__content');
  if (!content) return;
  content.style.maxHeight = isActive.value ? `${content.scrollHeight}px` : '0';
};

const onActive = () => {
  isActive.value = !isActive.value;
  onChange();
};

onMounted(() => {
  onChange();
});
</script>
