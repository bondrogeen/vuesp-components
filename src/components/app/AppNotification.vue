<template>
  <div>
    <TransitionGroup name="list" tag="ul" class="flex flex-col gap-2">
      <VNotification v-for="item of notifications" :key="item.id" v-bind="item" @close="emit('close', item)"></VNotification>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

import type { INotificationItem } from '@/types/types';

import VNotification from '@/components/general/cards/CardNotification.vue';

export interface Props {
  notifications?: INotificationItem[];
}

const { notifications = [] } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'close', value: INotificationItem): void;
}>();
</script>
