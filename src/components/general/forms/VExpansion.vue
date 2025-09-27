<template>
  <div ref="root" class="border-b dark:border-gray-700 border-gray-200">
    <div class="cursor-pointer min-h-[60px] px-4 flex items-center justify-between" @click="onActive">
      <h4>{{ label }}</h4>

      <div class="transition text-gray-400" :class="{ 'rotate-180': isActive }">
        <IconChevron />
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
import type { Ref } from 'vue';
import { ref, defineProps, onMounted } from 'vue';

import IconChevron from '@/assets/icons/Chevron.svg';

interface Props {
  label?: string;
  value?: boolean;
}

const { label = '', value = false } = defineProps<Props>();

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
