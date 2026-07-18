<script setup lang="ts" generic="T extends { name: string; value: string | number }">
import type { IVSelectProps, IVSelectEmits } from './types';
import type { IVDropdownOn } from '@/components/ui/dropdown/types';

import VDropdown from '@/components/ui/dropdown/VDropdown.vue';
import VList from '@/components/ui/list/VList.vue';
import VTextField from '@/components/ui/text-field/VTextField.vue';

const { modelValue, label, items, disabled } = defineProps<IVSelectProps<T>>();

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
  <VDropdown :hide-on-click="false" class="relative">
    <template #activator="{ on, isShow }">
      <slot name="activator" v-bind="{ on, isShow }">
        <VTextField :model-value="modelValue" :disabled="disabled" readonly hideMessage active @click="on.click" @on-icon="on.click">
          <template #icon>
            <icon-ri-arrow-up-s-line class="transition duration-300" :class="isShow ? 'rotate-x-180' : ''" />
          </template>
        </VTextField>
      </slot>
    </template>

    <template #default="{ on }">
      <div class="bg-white dark:bg-gray-800 rounded min-w-50 shadow-nav pb-6 lg:pb-0 ">
        <h5 v-if="label" class="md:hidden text-title-md font-bold mb-2 uppercase px-4 sticky pb-2 top-0 bg-white dark:bg-gray-800">
          {{ label }}
        </h5>

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
