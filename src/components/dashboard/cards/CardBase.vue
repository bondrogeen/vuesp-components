<template>
  <div
    class="flex flex-col border aspect-square rounded-sm bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 p-2 hover:border-blue-400 dark:hover:border-blue-700 transition-all"
    @click="onClick"
  >
    <div class="flex-auto flex justify-between">
      <div :class="getColorValue">
        <VIcons :name="icon || ''" class="size-8" />
      </div>
      <slot name="header" v-bind="bind"></slot>
    </div>

    <div>
      <slot name="body" v-bind="bind">
        <h6 class="text-sm text-gray-500 font-medium text-ellipsis overflow-hidden text-nowrap">
          <slot name="name" v-bind="bind">
            {{ name }}
          </slot>
        </h6>

        <div class="text-sm text-ellipsis overflow-hidden text-nowrap">
          <slot name="value" v-bind="bind">
            {{ getModifyValue(value) }}
          </slot>
        </div>
      </slot>
    </div>

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
            <slot name="dialog-name" v-bind="bind">
              {{ name }}
            </slot>
          </h3>

          <slot name="dialog" v-bind="bind"></slot>

          <p class="text-center text-xl mt-4">
            <slot name="dialog-value" v-bind="bind">
              {{ getModifyValue(value) }}
            </slot>
          </p>
        </div>
      </div>
    </AppDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, defineProps } from 'vue';
import type { IProperty } from '@/types/types';

import VIcons from '@/components/general/VIcons.vue';
import VButton from '@/components/general/VButton.vue';

const dialog = ref(false);

const emit = defineEmits<{
  (e: 'edit', event: Event): void;
}>();

export interface IProps extends IProperty {}

const { name, value, icon, min, type, max, list, modifyValue } = defineProps<IProps>();

const getColorValue = computed(() => {
  if (['button', 'switch'].includes(type || '')) return value ? 'text-amber-500' : 'text-gray-400';
  return 'text-gray-400';
});

const onEdit = (e: Event) => emit('edit', e);

const onClick = () => (dialog.value = true);

const getModifyValue = (value: any) => modifyValue?.(value) || value;

const bind = computed(() => ({
  value,
  name,
  min,
  max,
  list,
  modify: getModifyValue(value),
  icon,
}));
</script>
