<template>
  <div>
    <div class="glass-inset rounded-md p-1">
      <div class="flex gap-1">
        <div v-for="(tab, i) in items" :key="i" class="relative flex-auto">
          <button type="button" class="w-full" @click="setActiveTab(i)">
            <div :class="[getClass(i), size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-sm']" class="rounded-md font-medium transition">
              <slot name="header" :tab="tab" :i="i">
                <div :class="size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1'">
                  {{ tab.title }}
                </div>
              </slot>
            </div>
          </button>
        </div>
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
import { ref } from 'vue';

const { items, value, size = 'md' } = defineProps<IVTabsProps>();

const emit = defineEmits<IVTabsEmit>();

const activeTab = ref(value || 0);

const getClass = (i: number) => [
  activeTab.value === i
    ? 'bg-cyan-main/10 text-cyan-main'
    : 'text-gray-dark-25 hover:bg-white/5 dark:text-white/50 dark:hover:bg-white/5',
];

const setActiveTab = (i: number) => {
  activeTab.value = i;
  emit('click', i);
};

defineExpose({
  setActiveTab,
  activeTab,
});
</script>
