<template>
  <VTextWrapper :active="Boolean(value)" :disabled="disabled" :label="label" :hideIcon="hideIcon" @icon="onClickIcon">
    <template v-if="value">
      <div class="flex gap-1 text-amber-500 self-start text-nowrap select-none">
        (
        <template v-for="(param, i) of args" :key="param">
          <span class="text-blue-400/80" :title="param" @mouseenter="emit('hover', 'enter', i)" @mouseleave="emit('hover', 'leave', i)">{{ params[i] }}</span>
          <span class="last:hidden">,</span>
        </template>
        ) =>
      </div>

      <div class="flex flex-auto">
        <textarea ref="textarea" v-model="input" class="outline-0 w-full resize-none" type="text" :disabled="disabled" @input="onChange"></textarea>
      </div>
    </template>

    <template #icon>
      <VIcon v-if="value" name="Close" class="size-4" />
      <VIcon v-else name="Plus" class="size-4" />
    </template>
  </VTextWrapper>
</template>

<script setup lang="ts">
import type { IVFunkProps, IVFunkEmits } from '@/components/ui/func/types';

import { defineEmits, defineProps, watch } from 'vue';
import { useTextareaAutosize } from '@vueuse/core';
import { debounce } from '@/helpers';

import VTextWrapper from '@/components/ui/text-wrapper/VTextWrapper.vue';

import VIcon from '@/components/ui/icon/VIcon.vue';

const { textarea, input } = useTextareaAutosize();

const { args, value, disabled = false, hideIcon = false } = defineProps<IVFunkProps>();

const emit = defineEmits<IVFunkEmits>();

const params = ['v', 'a', 'b', 'c'];
input.value = value || '';

const validateJS = (code: string) => {
  try {
    new Function(code);
    return true;
  } catch (error) {
    console.warn(error);
    return false;
  }
};

const onChange = debounce((e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!validateJS(target.value)) return;
  emit('change', target.value);
}, 500);
const onClickIcon = (e: Event) => emit('icon', e);

watch(
  () => value,
  () => {
    if (value) input.value = value;
  }
);
</script>
