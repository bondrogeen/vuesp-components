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
      <IconClose v-if="value" class="size-4" />
      <IconPlus v-else class="size-4" />
    </template>
  </VTextWrapper>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, watch } from 'vue';
import { useTextareaAutosize } from '@vueuse/core';

import VTextWrapper from '@/components/general/forms/VTextWrapper.vue';

import IconClose from '@/assets/icons/Close.svg';
import IconPlus from '@/assets/icons/Plus.svg';
import { debounce } from '@/helpers';

const { textarea, input } = useTextareaAutosize();

interface Props {
  label: string;
  args: string[];
  value: string | undefined;
  disabled?: boolean;
  hideIcon?: boolean;
}

const { args, value, disabled = false, hideIcon = false } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'change', value: string): void;
  (e: 'icon', event: Event): void;
  (e: 'hover', event: string, index: number): void;
}>();

const params = ['v', 'a', 'b', 'c'];
input.value = value || '';

const validateJS = (code: string) => {
  try {
    new Function(code);
    return true;
  } catch (error) {
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
