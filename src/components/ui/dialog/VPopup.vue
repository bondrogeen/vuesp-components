<script setup lang="ts">
import type { IVPopupProps, IVDialogEmits } from './types';
import type { IVDropdownOn } from '../dropdown/types';
import { computed, shallowRef } from 'vue';

import { useSwipeDown } from '@/composables/useSwipeDown';
import { useDialog } from '@/composables/useDialog';

const { size = 'auto' } = defineProps<IVPopupProps>();

const emit = defineEmits<IVDialogEmits>();

const { show, overlay, onClose, onOpen } = useDialog(emit);

const target = shallowRef<HTMLElement | null>(null);
const container = shallowRef<HTMLElement | null>(null);

const { opacity, transform } = useSwipeDown(target, container, onClose);

const onSet = (value: boolean) => {
  if (value) {
    onOpen();
  } else {
    onClose(new Event('hide'));
  }
};

const onClick = (e: Event) => {
  emit('click', e);
};

const on: IVDropdownOn = { click: onClick, open: onOpen, set: onSet };
const getSize = computed(() => ({
  auto: 'max-h-[calc(100dvh-50px)]',
  full: 'h-[calc(100dvh-24px)] md:h-[calc(100dvh-100px)]',
  screen: 'h-dvh',
}));

const getSizeContent = computed(() => ({
  auto: 'max-h-[calc(100dvh-50px-16px)]',
  full: 'h-[calc(100dvh-24px-16px)] md:h-[calc(100dvh-100px-16px)]',
  screen: 'h-[calc(100dvh-16px)]',
}));
</script>

<template>
  <Teleport to="body">
    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0 translate-y-full xl:-translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 translate-y-full xl:-translate-y-2"
    >
      <div v-if="show" ref="container" class="fixed bottom-0 left-0 w-full z-15">
        <div
          v-if="overlay"
          class="fixed h-full w-full top-0 left-0 bg-black/40 bg-blur xl:hidden animate-opacity overscroll-contain"
          :style="{ opacity }"
          @click="onClose"
          @wheel.prevent
          @touchmove.prevent
        />

        <div class="bg-white dark:bg-gray-900 w-full shadow-nav relative" :class="getSize[size]" :style="{ transform }">
          <div ref="target" class="flex justify-center py-3 md:pb-6" @wheel.prevent @touchmove.prevent>
            <div class="self-end h-1 w-12 bg-gray-400" />
          </div>

          <div class="flex items-center absolute right-3 top-5 z-10">
            <slot name="button" :close="onClose"></slot>

            <v-button class="size-5 md:size-6" color="transparent" size="none" icon aria-label="Close" @click="onClose">
              <icon-ri-close-line class="size-5" />
            </v-button>
          </div>

          <div class="overflow-y-auto max-h-[calc(100dvh-24px-16px)] overscroll-contain scrollbar" :class="getSizeContent[size]">
            <slot :close="onClose" :on="on" />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
