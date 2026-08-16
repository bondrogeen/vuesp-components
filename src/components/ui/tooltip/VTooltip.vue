<script setup lang="ts">
import type { IVTooltipProps } from './types';
import { ref, useTemplateRef } from 'vue';
import { onClickOutside } from '@vueuse/core';

const { disabled } = defineProps<IVTooltipProps>();

const show = ref(false);
const onShow = () => {
  if (disabled) return;
  show.value = true;
};
const onLeave = () => {
  show.value = false;
};

const tooltipRef = useTemplateRef('tooltip');

onClickOutside(tooltipRef, () => onLeave());
</script>

<template>
  <div ref="tooltip" class="relative v-tooltip" @mouseenter="onShow" @mouseleave="onLeave">
    <button type="button" @click="onShow">
      <slot name="activator" />
    </button>

    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-2"
    >
      <slot name="default" :show="show"></slot>
    </transition>
  </div>
</template>
