<template>
  <div class="">
    <div class="flex border-b border-gray-200 dark:border-gray-700">
      <div v-for="(tab, i) in items" :key="i" class="relative">
        <button
          class="font-medium text-lg transition cursor-pointer before:h-[2px] before:absolute before:w-full before:bg-blue-700 before:left-0 before:bottom-0 px-4 py-2"
          :class="getClass(i)"
          @click="setActiveTab(i)"
        >
          {{ tab.title }}
        </button>
      </div>
    </div>

    <div class="relative my-4">
      <div v-for="(_, i) in items" :key="i" class="tab-panel">
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="transform opacity-0 translate-x-2"
          enter-to-class="transform opacity-100 translate-x-0"
          leave-active-class="transition-all duration-0 ease-in absolute inset-0"
          leave-from-class="transform opacity-100 translate-x-0"
          leave-to-class="transform opacity-0 -translate-x-2"
        >
          <div v-if="activeTab === i">
            <slot :name="`tab-${i}`"></slot>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IVTabsProps, IVTabsEmit } from '@/components/ui/tabs/types';
import { ref, defineProps, defineEmits, defineExpose } from 'vue';

const { items, value } = defineProps<IVTabsProps>();

const emit = defineEmits<IVTabsEmit>();

const activeTab = ref(value || 0);

const getClass = (i: number) => [activeTab.value === i ? '' : 'before:hidden'];

const setActiveTab = (i: number) => {
  activeTab.value = i;
  emit('click', i);
};

defineExpose({
  setActiveTab,
  activeTab,
});
</script>
