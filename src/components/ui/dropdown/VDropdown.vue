<script setup lang="ts">
import type { IVDropdownProps, IVDropdownEmits, IVDropdownOn } from './types';
import { ref, computed } from 'vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

import VPopup from '@/components/ui/dialog/VPopup.vue';

const { top = 'calc(100% + 8px)', left = '', right = '0', height = '200px', hideOnClick = true, disabled = false } = defineProps<IVDropdownProps>();

const emit = defineEmits<IVDropdownEmits>();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isLgOrLarger = breakpoints.greaterOrEqual('lg');

const isShow = ref(false);
const getStyle = computed(() => ({ top, left, right, 'max-height': height }));

const outside = (e: Event) => {
  if (!isLgOrLarger) return;
  if (isShow.value) onHide(e);
};
const onClick = (e: Event) => {
  emit('click', isShow.value);
  if (disabled) return;
  if (!isShow.value) onShow(e);
  else if (hideOnClick) onHide(e);
};
const onShow = (e: Event) => {
  isShow.value = true;
  emit('show', e);
};
const onHide = (e: Event) => {
  isShow.value = false;
  emit('close', e);
};
const onSet = (value: boolean) => {
  if (value) {
    onShow(new Event('show'));
  } else {
    onHide(new Event('hide'));
  }
};

const onClose = () => {
  onHide(new Event('hide'));
};

const on: IVDropdownOn = { click: onClick, open: onShow, set: onSet };
</script>

<template>
  <div v-outside="outside" class="relative">
    <div class="flex items-center cursor-pointer">
      <slot name="activator" :on="on" :is-show="isShow" />
    </div>

    <transition
      v-if="isLgOrLarger"
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-2"
    >
      <div v-if="isShow" class="z-30 min-w-full absolute" :style="getStyle">
        <slot :on="on" :show="onShow" :hide="onHide" :is-show="isShow" />
      </div>
    </transition>

    <VPopup v-if="!isLgOrLarger && isShow" @close="onClose">
      <template #default="{ on }">
        <slot :on="on" :show="onShow" :hide="onHide" :is-show="isShow" />
      </template>
    </VPopup>
  </div>
</template>
