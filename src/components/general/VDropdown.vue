<template>
  <div v-outside="outside" class="relative">
    <div class="flex items-center cursor-pointer">
      <slot name="activator" :on="{ click: onClick }" :show="isShown"></slot>
    </div>

    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-2"
    >
      <div v-if="isShown" class="z-10 min-w-full absolute overflow-auto shadow-lg" :style="getStyle" @click="onClick">
        <slot :show="onShow" :hide="hide" :is-shown="isShown"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue';

interface Props {
  top?: string;
  left?: string;
  right?: string;
  height?: string;
  hideOnClick?: boolean;
}

const { top = 'calc(100% + 5px)', left = '0', right = '', height = '200px', hideOnClick = false } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'click', value: boolean): void;
  (e: 'show', value: Event): void;
  (e: 'close', value: Event): void;
}>();

const isShown = ref(false);
const getStyle = computed(() => ({ top, left, right, 'max-height': height }));

const outside = (e: Event) => {
  if (isShown.value) hide(e);
};
const onClick = (e: Event) => {
  if (!isShown.value) onShow(e);
  else if (hideOnClick) hide(e);
  emit('click', isShown.value);
};
const onShow = (e: Event) => {
  isShown.value = true;
  emit('show', e);
};
const hide = (e: Event) => {
  isShown.value = false;
  emit('close', e);
};
</script>
