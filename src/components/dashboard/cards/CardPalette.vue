<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import type { ICardBaseEmits, ICardBaseProps } from '@/components/dashboard/cards/types';

import CardBase from '@/components/dashboard/cards/CardBase.vue';
import VButton from '@/components/ui/button/VButton.vue';
import VIcon from '@/components/ui/icon/VIcon.vue';

const props = defineProps<ICardBaseProps>();

const emit = defineEmits<ICardBaseEmits>();

const colors = ['#FF0000', '#FFD400', '#7CFF00', '#0000FF'];
const lastValue = ref('');

const current = computed(() => {
  const raw = String(props.valueTo ?? props.value ?? '')
    .trim()
    .toUpperCase();
  const value = raw.startsWith('#') ? raw : raw ? `#${raw}` : '';
  return /^#[0-9A-F]{6}$/.test(value) && value !== '#000000' ? value : '';
});

const hex = computed(() => current.value || '#000000');

const isActive = (color: string) => current.value === color.toUpperCase();

const send = (value: string) => emit('setState', value);
const sendDebounced = useDebounceFn((value: string) => send(value), 120);

const onPicker = (event: Event) => {
  const input = event.target as HTMLInputElement;
  sendDebounced(input.value.toUpperCase());
};

const setState = () => {
  if (current.value) {
    lastValue.value = current.value;
    send('');
  } else {
    send(lastValue.value || colors[0]);
  }
};
</script>

<template>
  <CardBase v-bind="props" @click="emit('click', $event)" @edit="emit('edit', $event)" @clone="emit('clone', $event)" @open="emit('open', $event)" @close="emit('close', $event)">
    <template #icon="item">
      <slot name="icon" v-bind="item"></slot>
    </template>

    <template #header>
      <div class="flex justify-end">
        <VButton
          type="icon"
          :title="current ? 'Disable' : 'Enable'"
          :aria-label="current ? 'Disable' : 'Enable'"
          @click.stop="setState"
        >
          <VIcon name="palette" class="size-6" />
        </VButton>
      </div>
    </template>

    <template #value>
      <span class="font-mono">{{ current || 'OFF' }}</span>
    </template>

    <template #dialog>
      <div class="px-2 pb-2">
        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="color in colors"
            :key="color"
            type="button"
            class="aspect-square rounded-lg border border-white/20 transition-transform hover:scale-105"
            :class="isActive(color) ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-dark-40' : ''"
            :style="{ background: color }"
            :title="color"
            :aria-label="color"
            @click="send(color)"
          ></button>
        </div>

        <div class="mt-3 flex items-center justify-center gap-2">
          <input type="color" :value="hex" class="h-12 w-12 cursor-pointer rounded-md border border-gray-light-10 bg-transparent p-1 dark:border-gray-dark-30" title="Custom color" aria-label="Custom color" @input="onPicker" />
        </div>
      </div>
    </template>
  </CardBase>
</template>
