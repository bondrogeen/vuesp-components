<template>
  <div
    class="flex flex-col border relative aspect-square rounded-md bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 p-2 hover:border-blue-400 dark:hover:border-blue-700 transition-all cursor-pointer"
    @click="onClick"
  >
    <div class="flex-auto flex justify-between">
      <div :class="getColorValue" class="size-8">
        <slot name="icon" v-bind="props"></slot>
      </div>
      <slot name="header" v-bind="props"></slot>
    </div>

    <div>
      <slot name="body" v-bind="props">
        <h6 class="text-sm text-gray-500 font-medium line-clamp-2 overflow-hidden">
          <slot name="name" v-bind="props">
            {{ props.name }}
          </slot>
        </h6>

        <div class="text-sm text-ellipsis overflow-hidden text-nowrap">
          <slot name="value" v-bind="props">
            {{ props.valueTo || props.value }}
          </slot>
        </div>
      </slot>
    </div>

    <div v-if="props.icon" class="absolute left-1/2 top-1/2 size-[calc(50%)] text-gray-200/30 dark:text-gray-800/30 -translate-1/2">
      <slot name="icon" v-bind="props"></slot>
    </div>

    <VDialog v-if="dialog" :size="props.size || 'sm'" :title="name" @close="closeDialog" @open="openDialog">
      <template #header-btn>
        <VButton color="transparent" @click="onEdit">
          <icon-ri-more-line />
        </VButton>
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
              {{ props.valueTo || props.value }}
            </slot>
          </p>
        </div>
      </div>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import type { ICardBaseProps, ICardBaseEmits } from '@/components/dashboard/cards/types';

import { ref, computed } from 'vue';

// import VIcons from '@/components/ui/icon/VIcon.vue';
import VButton from '@/components/ui/button/VButton.vue';

const props = defineProps<ICardBaseProps>();

const emit = defineEmits<ICardBaseEmits>();

const dialog = ref(false);

const getColorValue = computed(() => {
  if (['button', 'dimmer'].includes(props.type || '')) return props.value ? 'text-amber-500' : 'text-gray-400';
  return 'text-gray-400';
});

const onEdit = (e: Event) => emit('edit', e);

const onClick = () => (dialog.value = true);
const openDialog = (e: boolean) => emit('open', e);
const closeDialog = (e: Event) => {
  dialog.value = false;
  emit('close', e);
};
</script>
