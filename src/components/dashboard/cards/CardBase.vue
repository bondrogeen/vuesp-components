<template>
  <div
    class="glass-inset relative flex aspect-square rounded-xl cursor-pointer flex-col p-2 transition-all hover:border-cyan-main/25 hover:shadow-cyan-glow"
    @click="onClick"
  >
    <div class="flex-auto flex justify-between">
      <div :class="getColorValue" class="size-8 animate-shake">
        <slot name="icon" v-bind="props"></slot>
      </div>
      <slot name="header" v-bind="props"></slot>
    </div>

    <div>
      <slot name="body" v-bind="props">
        <h6 class="text-sm text-gray-dark-25 font-medium line-clamp-2 overflow-hidden dark:text-gray-light-10">
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

    <div v-if="props.icon" class="absolute left-1/2 top-1/2 size-1/2 text-gray-light-10/30 dark:text-white/10 -translate-1/2">
      <slot name="icon" v-bind="props"></slot>
    </div>

    <VDialog v-if="dialog" :size="props.size || 'sm'" :title="name" @close="closeDialog" @open="openDialog">
      <template #header-btn>
        <VButton color="transparent" @click="onEdit">
          <VIcon name="more"  />
        </VButton>

        <VButton color="transparent" @click="onClone">
          <VIcon name="copy" class="size-4 text-gray-dark-25 dark:text-gray-light-10" />
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
import VIcon from '@/components/ui/icon/VIcon.vue';
import type { ICardBaseProps, ICardBaseEmits } from '@/components/dashboard/cards/types';

import { ref, computed } from 'vue';

import VButton from '@/components/ui/button/VButton.vue';
import VDialog from '@/components/ui/dialog/VDialog.vue';

const props = defineProps<ICardBaseProps>();

const emit = defineEmits<ICardBaseEmits>();

const dialog = ref(false);

const getColorValue = computed(() => {
  if (['button', 'dimmer'].includes(props.type || '')) return props.value ? 'text-amber-500' : 'text-gray-main dark:text-gray-light-10';
  return 'text-gray-main dark:text-gray-light-10';
});

const onEdit = (e: Event) => emit('edit', e);
const onClone = (e: Event) => emit('clone', e);

const onClick = () => (dialog.value = true);
const openDialog = (e: boolean) => emit('open', e);
const closeDialog = (e: Event) => {
  dialog.value = false;
  emit('close', e);
};
</script>
