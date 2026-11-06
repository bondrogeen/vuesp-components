<template>
  <div v-if="props.value" class="overlay fixed left-0 top-0 h-full w-full bg-black/40 bg-blur" @click="onClose"></div>

  <aside
    :class="props.value ? 'translate-x-0 ' : 'translate-x-full'"
    class="overflow-x-hidden fixed top-[73px] right-0 flex h-[calc(100%-73px)] w-[290px] md:w-80 border-l border-gray-200/70 flex-col overflow-y-auto transition-all duration-350 dark:border-white/10 bg-white/90 backdrop-blur-2xl dark:bg-[#07112c]/80"
  >
    <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear h-full">
      <slot name="header" :isNew="isNew"></slot>

      <div v-if="isNotificationLength" class="flex flex-col gap-2 p-2">
        <TransitionGroup
          enter-active-class="transition-all duration-300 "
          enter-from-class="opacity-0 translate-x-1/2"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition-all duration-300 absolute"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 translate-x-1/2"
        >
          <div v-for="item of props.notifications" :key="item.date" class="relative">
            <slot name="card" :item="item">
              <CardNotification v-bind="item" class="rounded-md border border-gray-200/60 bg-white/50 dark:border-white/5 dark:bg-white/[0.03]" @remove="onRemove(item)" @read="onRead(item)"></CardNotification>
            </slot>
          </div>
        </TransitionGroup>
      </div>

      <template v-else>
        <slot name="empty"></slot>
      </template>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { INotification } from '@/types';
import type { IAppNotificationProps, IAppNotificationEmits } from '@/components/app/types';

import { computed } from 'vue';

import CardNotification from '@/components/card/notification/CardNotification.vue';

const props = defineProps<IAppNotificationProps>();

const emit = defineEmits<IAppNotificationEmits>();

const isNew = computed(() => Boolean(props.notifications.find((i: INotification) => i.isNew)));
const isNotificationLength = computed(() => Boolean(props.notifications.length));

const onClose = (e: Event) => emit('close', e);
const onRemove = (item: INotification) => emit('remove', item);
const onRead = (item: INotification) => emit('read', item);
</script>
