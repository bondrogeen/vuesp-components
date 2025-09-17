<template>
  <VDropdown class="relative w-full" v-bind="$attrs" top="50px">
    <template #activator="{ on, show }">
      <VTextField :model-value="getValue" readonly :disabled="disabled" active :label="label" @click="on.click" @on-icon="on.click">
        <template #icon>
          <IconChevron class="transition" :class="getClass(show)"></IconChevron>
        </template>
      </VTextField>
    </template>

    <VList v-slot="{ item }" :list="list" @click="onChange">
      <slot :item="item">{{ item.name }}</slot>
    </VList>
  </VDropdown>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

import VTextField from '@/components/general/VTextField.vue';
import VDropdown from '@/components/general/VDropdown.vue';
import VList from '@/components/general/VList.vue';

import IconChevron from '@/assets/icons/IconChevron.svg';

interface Props {
  value?: number | string;
  valueName?: string;
  label: string;
  disabled?: boolean;
  list?: any[];
}

const { valueName = 'name', value = '', list = [], disabled = false } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Event): void;
  (e: 'change', item: any): void;
}>();

const getValue = computed(() => list.find((i: any) => i.value === value)?.[valueName] || '');

const getClass = (show: boolean) => ({ 'rotate-x-180': show });

const onChange = (item: any) => emit('change', item);
</script>
