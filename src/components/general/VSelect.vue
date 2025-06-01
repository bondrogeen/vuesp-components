<template>
  <VDropdown class="relative w-full" v-bind="$attrs" top="50px">
    <template #activator="{ on, show }">
      <VTextField :model-value="value" readonly active :label="label" @click="on.click" @on-icon="on.click">
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

<script setup>
import { defineProps, defineEmits } from 'vue';

import IconChevron from '@/components/icons/IconChevron.vue';
import VTextField from '@/components/general/VTextField.vue';
import VDropdown from '@/components/general/VDropdown.vue';
import VList from '@/components/general/VList.vue';

defineProps({
  value: { type: String, default: '' },
  valueName: { type: String, default: 'name' },
  label: { type: String, default: '' },
  list: { type: Array, default: () => [] },
});

const emit = defineEmits(['change']);

const onChange = (e) => emit('change', e);

const getClass = (show) => ({ 'rotate-x-180': show });
</script>
