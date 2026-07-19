<script setup lang="ts">
import type { IVDialogProps, IVDialogEmits } from './types';
import { computed } from 'vue';
import { useDialog } from '@/composables/useDialog';

import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import VPopup from '@/components/ui/dialog/VPopup.vue';

const { popupSize = 'auto', size = 'md', color = 'white', timeout, isOnlyDialog } = defineProps<IVDialogProps>();

const emit = defineEmits<IVDialogEmits>();

const breakpoints = useBreakpoints(breakpointsTailwind);

import VButton from '@/components/ui/button/VButton.vue';

const { show, onClose, onOpen } = useDialog(emit, timeout);

const sizes = {
  sm: 'max-w-full md:max-w-[330px] h-full md:h-[unset]',
  md: 'max-w-full md:max-w-[672px] h-full md:h-[unset]',
  lg: 'max-w-full md:max-w-[960px] h-full md:h-[unset]',
  full: 'relative max-w-full w-full h-3/4 ',
};

const colors = {
  none: '',
  white: 'bg-white dark:bg-gray-900',
  gray: '',
};

const getClass = computed(() => [sizes[size], colors[color]]);
const isLgOrLarger = breakpoints.greaterOrEqual('lg');
defineExpose({
  show,
  onClose,
});
</script>

<template>
  <Teleport v-if="isOnlyDialog ? true : isLgOrLarger" to="body">
    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-2"
      @after-enter="onOpen"
    >
      <div v-if="show" class="z-20 fixed top-0 h-dvh w-full left-0 flex flex-col" @wheel.stop>
        <div class="absolute h-full w-full top-0 left-0 bg-black/40 bg-blur" @click="onClose" />

        <div class="flex-auto flex align-center overflow-y-auto overscroll-contain" :class="size === 'full' ? '' : ''">
          <div class="m-auto w-full flex flex-col z-20 overflow-auto h-full scrollbar overscroll-contain bg-gray-50 dark:bg-gray-900 shadow-lg rounded-sm" :class="getClass">
            <div class="flex items-center min-h-14 ps-6 pe-3" :class="size === 'full' ? 'absolute top-0 right-4' : ''" @wheel.prevent @touchmove.prevent>
              <h4 v-if="title" class="text-title-md uppercase font-bold flex-auto">
                {{ title }}
              </h4>

              <slot name="header-btn" :close="onClose"></slot>
              <VButton color="transparent" size="md" @click="onClose">
                <icon-ri-close-line />
              </VButton>
            </div>

            <div
              class="relative overflow-auto h-full md:h-auto max-h-dvh scrollbar overflow-y-auto overscroll-contain"
              :class="size === 'full' ? 'flex-auto' : 'md:max-h-147.5 px-6 pb-6'"
              @close="onClose"
            >
              <slot name="default" :close="onClose" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>

  <VPopup v-else :size="popupSize" @close="onClose">
    <template #button>
      <slot name="header-btn" :close="onClose"></slot>
    </template>

    <template #default="{ close }">
      <div class="px-4 pb-4 md:px-6">
        <div class="flex items-center mb-4" :class="size === 'full' ? 'absolute top-0 right-4' : ''" @wheel.prevent @touchmove.prevent>
          <h4 v-if="title" class="text-title-md uppercase font-bold">
            {{ title }}
          </h4>
        </div>

        <slot name="default" :close="close" />
      </div>
    </template>
  </VPopup>
</template>
