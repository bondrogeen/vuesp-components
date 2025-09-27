<template>
  <div
    class="flex flex-col border relative aspect-square rounded-sm bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 p-2 hover:border-blue-400 dark:hover:border-blue-700 transition-all cursor-pointer"
    @click="onClick"
  >
    <div class="flex-auto flex justify-between">
      <div :class="getColorValue">
        <VIcons :name="props.icon || ''" class="size-8" />
      </div>
      <slot name="header" v-bind="props"></slot>
    </div>

    <div>
      <slot name="body" v-bind="props">
        <h6 class="text-sm text-gray-500 font-medium text-ellipsis overflow-hidden text-nowrap">
          <slot name="name" v-bind="props">
            {{ props.name }}
          </slot>
        </h6>

        <div class="text-sm text-ellipsis overflow-hidden text-nowrap">
          <slot name="value" v-bind="props">
            {{ props.convert || props.value }}
          </slot>
        </div>
      </slot>
    </div>

    <VIcons v-if="props.icon" :name="props.icon || ''" class="absolute left-1/2 top-1/2 size-[calc(50%)] opacity-5 text-gray-200/20 -translate-1/2" />

    <AppDialog v-if="dialog" size="sm" :title="name" @close="dialog = false">
      <template #header>
        <div class="flex-auto flex items-center justify-between gap-6 me-2">
          <VButton type="icon" size="" @click="onEdit">
            <VIcons name="IconDots" class="size-8" />
          </VButton>
        </div>
      </template>

      <div class="min-h-60 relative">
        <div class="pt-6">
          <h3 class="text-center text-3xl text-ellipsis overflow-hidden">
            <slot name="dialog-name" v-bind="props">
              {{ props.name }}
            </slot>
          </h3>

          <slot name="dialog" v-bind="props"></slot>

          <p class="text-center text-xl mt-4">
            <slot name="dialog-value" v-bind="props">
              {{ props.convert || props.value }}
            </slot>
          </p>
        </div>
      </div>
    </AppDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, defineProps } from 'vue';
import type { IDashboardItem } from '@/types/types';

import VIcons from '@/components/general/forms/VIcons.vue';
import VButton from '@/components/general/forms/VButton.vue';

const dialog = ref(false);

const emit = defineEmits<{
  (e: 'edit', event: Event): void;
}>();

const props = defineProps<IDashboardItem>();

const getColorValue = computed(() => {
  if (['button', 'switch'].includes(props.type || '')) return props.value ? 'text-amber-500' : 'text-gray-400';
  return 'text-gray-400';
});

const onEdit = (e: Event) => emit('edit', e);

const onClick = () => (dialog.value = true);
</script>
