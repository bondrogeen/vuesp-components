<template>
  <Teleport to="body">
    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-2"
      @after-enter="onOpen"
    >
      <div v-if="show" class="z-20 fixed top-0 h-[100dvh] w-full left-0 flex flex-col" @wheel.stop>
        <div class="absolute h-full w-full top-0 left-0 bg-black/40 bg-blur" @click="onClose"></div>

        <div class="flex-auto flex align-center md:px-4 overflow-y-auto no-scrollbar">
          <div class="m-auto w-full bg-gray-50 dark:bg-gray-900 shadow-lg flex flex-col rounded-sm z-30" :class="getClass">
            <div class="flex items-center justify-between px-4 py-2 rounded-md border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 sticky top-0 z-30">
              <slot name="header">
                <h4>
                  {{ title }}
                </h4>
              </slot>

              <VButton type="icon" @click="onClose">
                <VIcon name="Close"></VIcon>
              </VButton>
            </div>

            <div class="px-4 py-2 flex-auto scroll-none">
              <slot>
                <div v-html="message"></div>
              </slot>
            </div>

            <div v-if="$slots.footer || callback" class="px-4 py-2 flex justify-end">
              <slot name="footer">
                <VButton color="blue" size="small" @click="onButton">{{ button }}</VButton>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { IAppDialogProps, IAppDialogEmits } from '@/components/app/types';
import { ref, defineProps, defineEmits, computed, onMounted } from 'vue';

import VIcon from '@/components/ui/icon/VIcon.vue';
import VButton from '@/components/ui/button/VButton.vue';

const { title, message = '', callback, button = 'OK', size = 'sm' } = defineProps<IAppDialogProps>();

const emit = defineEmits<IAppDialogEmits>();

const show = ref(false);

const sizes = { sm: 'max-w-[330px]', md: 'max-w-[600px]', lg: 'max-w-[960px]' };

const getClass = computed(() => sizes[size as keyof typeof sizes]);

const onClose = (e: Event) => {
  show.value = false;
  setTimeout(() => {
    emit('close', e);
  }, 300);
};

const onButton = (e: Event) => {
  if (callback) callback();
  onClose(e);
};

const onOpen = () => emit('open', show.value);

onMounted(() => {
  setTimeout(() => {
    show.value = true;
  }, 300);
});
</script>
