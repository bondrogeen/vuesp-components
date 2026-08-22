<script setup lang="ts" generic="T extends { name: string }">
import type { IVSelectProps, IVSelectEmits } from './types';
import type { IVDropdownOn } from '@/components/ui/dropdown/types';

import VDropdown from '@/components/ui/dropdown/VDropdown.vue';
import VList from '@/components/ui/list/VList.vue';
import VTextField from '@/components/ui/text-field/VTextField.vue';

const { modelValue, label, items, disabled, ...attrs } = defineProps<IVSelectProps<T>>();

const emit = defineEmits<IVSelectEmits<T>>();

defineOptions({
  inheritAttrs: false,
});

function onSelect(item: T, on: IVDropdownOn) {
  emit('change', item);
  on?.set(false);
}
</script>

<template>
  <VDropdown v-bind="attrs" :hide-on-click="false" class="relative">
    <template #activator="{ on, isShow }">
      <slot name="activator" v-bind="{ on, isShow }">
        <VTextField :model-value="modelValue" :disabled="disabled" :label="label" readonly hideMessage active @click="on.click" @on-icon="on.click">
          <template #icon>
            <icon-ri-arrow-up-s-line class="transition duration-300" :class="isShow ? 'rotate-x-180' : ''" />
          </template>
        </VTextField>
      </slot>
    </template>

    <template #default="{ on }">
      <div class="bg-white dark:bg-gray-900 rounded min-w-50 shadow-nav transition-all duration-400 dark:shadow-lg dark:shadow-primary/20 pb-6 lg:pb-0">
        <h4 v-if="label" class="lg:hidden text-title-md font-bold mb-4 uppercase px-4 sticky top-0">
          {{ label }}
        </h4>

        <div class="h-full h-hull lg:max-h-44 lg:overflow-auto scrollbar lg:overscroll-contain">
          <VList v-slot="{ item }" :items="items" @click="onSelect($event, on)">
            <slot name="item" :item="item">
              {{ item.name }}
            </slot>
          </VList>
        </div>
      </div>
    </template>
  </VDropdown>
</template>
