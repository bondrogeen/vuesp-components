<template>
  <div v-if="isNotif" class="lg:hidden overlay fixed left-0 top-0 h-full w-full bg-black/40 bg-blur" @click="onClose"></div>

  <aside
    :class="isNotif ? 'translate-x-0 ' : 'translate-x-full'"
    class="overflow-x-hidden fixed top-[74px] right-0 flex h-[calc(100%-74px)] w-[290px] md:w-80 border-l border-gray-200 flex-col overflow-y-auto px-4 transition-all duration-350 dark:border-gray-800 bg-white dark:bg-gray-900"
  >
    <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear h-full">
      <div class="flex justify-end py-4">
        <button class="text-sm cursor-pointer">Mark all read</button>
      </div>

      <div class="flex flex-col gap-2">
        <CardNotification v-for="item of notifications" :key="item.id" v-bind="item" class="bg-gray-800/50 rounded-lg"></CardNotification>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

import type { IMessageNotification } from '@/types/types';

import CardNotification from '@/components/general/cards/CardNotification.vue';

export interface Props {
  isNotif: boolean;
  notifications?: IMessageNotification[];
}

const { isNotif, notifications = [] } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'close', event: Event): void;
}>();

const onClose = (e: Event) => emit('close', e);
</script>
