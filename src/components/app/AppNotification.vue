<template>
  <div v-if="props.isNotif" class="overlay fixed left-0 top-0 h-full w-full bg-black/40 bg-blur" @click="onClose"></div>

  <aside
    :class="props.isNotif ? 'translate-x-0 ' : 'translate-x-full'"
    class="overflow-x-hidden fixed top-[73px] right-0 flex h-[calc(100%-73px)] w-[290px] md:w-80 border-l border-gray-200 flex-col overflow-y-auto transition-all duration-350 dark:border-gray-800 bg-white dark:bg-gray-900"
  >
    <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear h-full">
      <div class="flex items-center justify-between py-4 sticky top-0 z-20 bg-gray-50 dark:bg-gray-900 px-2">
        <h5>Notifications</h5>

        <VButton size="small" color="gray" class="text-sm" :disabled="!isNewNotif" @click="onReadAll">Mark all read</VButton>
      </div>

      <div v-if="isNotifLength" class="flex flex-col gap-2 p-2">
        <TransitionGroup
          enter-active-class="transition-all duration-300 "
          enter-from-class="opacity-0 translate-x-1/2"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition-all duration-300 absolute"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 translate-x-1/2"
        >
          <div v-for="item of props.notifications" :key="item.date" class="relative">
            <CardNotification v-bind="item" class="bg-gray-200/50 dark:bg-gray-800/50 rounded-md" @remove="onRemove(item)" @read="onRead(item)"></CardNotification>
          </div>
        </TransitionGroup>
      </div>

      <p v-else class="text-center text-gray-200/50 py-10">Empty</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

import type { IMessageNotification } from '@/types/types';

import CardNotification from '@/components/general/cards/CardNotification.vue';
import VButton from '@/components/general/forms/VButton.vue';

export interface Props {
  isNotif: boolean;
  notifications: IMessageNotification[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'close' | 'read-all', event: Event): void;
  (e: 'remove' | 'read', item: IMessageNotification): void;
}>();

const isNewNotif = computed(() => Boolean(props.notifications.find((i: IMessageNotification) => i.isNew)));
const isNotifLength = computed(() => Boolean(props.notifications.length));

const onClose = (e: Event) => emit('close', e);
const onRemove = (item: IMessageNotification) => emit('remove', item);
const onRead = (item: IMessageNotification) => emit('read', item);
const onReadAll = (e: Event) => emit('read-all', e);
</script>
