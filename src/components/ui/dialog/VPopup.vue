<script setup lang="ts">
import VIcon from '@/components/ui/icon/VIcon.vue';
import type { IVPopupProps, IVDialogEmits } from './types';
import type { IVDropdownOn } from '../dropdown/types';
import { computed, shallowRef } from 'vue';

import VButton from '@/components/ui/button/VButton.vue';
import { useFocusTrap } from '@/composables/useFocusTrap';
import { useSwipeDown } from '@/composables/useSwipeDown';
import { useDialog } from '@/composables/useDialog';

const { size = 'auto', trapFocus = false, ariaLabel = '' } = defineProps<IVPopupProps>();

const emit = defineEmits<IVDialogEmits>();

const { show, overlay, onClose, onOpen } = useDialog(emit);

const target = shallowRef<HTMLElement | null>(null);
const container = shallowRef<HTMLElement | null>(null);

const { opacity, transform } = useSwipeDown(target, container, onClose);

useFocusTrap(container, () => show.value && trapFocus);

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
  auto: 'max-h-[calc(100dvh-3rem)]',
  full: 'h-[calc(100dvh-1.5rem)] md:h-[calc(100dvh-6rem)]',
  screen: 'h-dvh',
}));

const getSizeContent = computed(() => ({
  auto: 'max-h-[calc(100dvh-4rem)]',
  full: 'h-[calc(100dvh-2.5rem)] md:h-[calc(100dvh-7rem)]',
  screen: 'h-[calc(100dvh-1rem)]',
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
      <div
        v-if="show"
        ref="container"
        class="fixed bottom-0 left-0 w-full z-15"
        tabindex="-1"
        :role="trapFocus ? 'dialog' : undefined"
        :aria-modal="trapFocus ? 'true' : undefined"
        :aria-label="trapFocus ? ariaLabel || undefined : undefined"
      >
        <div
          v-if="overlay"
          class="fixed h-full w-full top-0 left-0 bg-black/40 bg-blur xl:hidden animate-opacity overscroll-contain"
          :style="{ opacity }"
          @click="onClose"
          @wheel.prevent
          @touchmove.prevent
        />

        <div class="glass-popover relative w-full rounded-t-lg border-t shadow-nav" :class="getSize[size]" :style="{ transform }">
          <div ref="target" class="flex justify-center py-3 md:pb-6" @wheel.prevent @touchmove.prevent>
            <div class="self-end h-1 w-12 bg-gray-main" />
          </div>

          <div class="flex items-center absolute right-3 top-5 z-10">
            <slot name="button" :close="onClose"></slot>

            <VButton
              type="icon"
              size="sm"
              color="gray"
              aria-label="Close"
              title="Close"
              @click="onClose"
            >
              <VIcon name="close" :size="16" />
            </VButton>
          </div>

          <div class="overflow-y-auto max-h-[calc(100dvh-2.5rem)] overscroll-contain no-scrollbar" :class="getSizeContent[size]">
            <slot :close="onClose" :on="on" />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
