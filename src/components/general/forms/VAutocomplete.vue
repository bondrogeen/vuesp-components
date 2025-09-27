<template>
  <VDropdown v-bind="$attrs" top="50px">
    <template #activator="{ show, on }">
      <VTextField :value="show ? search : currentUser" :placeholder="show ? 'Search' : placeholder" @click="on.click" @input="onInput" @on-icon="on.click" @focus="search = ''">
        <template #icon>
          <IconChevron class="transition" :class="getClass(show)"></IconChevron>
        </template>
      </VTextField>
    </template>

    <div>
      <VList v-slot="{ item }" :list="getList" @click="$emit('change', $event)">
        <slot :item="item">{{ item[valueName] }}</slot>
      </VList>
    </div>

    <div v-if="isEmpty" class="p-4 py-2">Not found</div>
  </VDropdown>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

import VTextField from '@/components/general/forms/VTextField.vue';
import VDropdown from '@/components/general/forms/VDropdown.vue';
import VList from '@/components/general/forms/VList.vue';
import IconChevron from '@/assets/icons/Chevron.svg';

const props = defineProps({
  value: { type: String, default: '' },
  valueName: { type: String, default: 'name' },
  placeholder: { type: String, default: '' },
  list: { type: Array, default: () => [] },
});

defineEmits(['change']);
const search = ref('');

const currentUser = computed(() => props.value);

const getList = computed(() => {
  const list = props?.list || [];
  return list.filter((i) => (search.value ? i[props.valueName].toLowerCase().includes(search.value.toLowerCase()) : true));
});

const placeholder = computed(() => props.placeholder);

const isEmpty = computed(() => Boolean(!getList?.value?.length));

const onInput = (e) => (search.value = e.target.value);

const getClass = (show) => ({ 'rotate-x-180': show });
</script>
