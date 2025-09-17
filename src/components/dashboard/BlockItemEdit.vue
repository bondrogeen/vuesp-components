<template>
  <div class="pt-6">
    <div class="grid grid-cols-1 gap-x-4">
      <div class="grid grid-cols-2 gap-x-4">
        <VTextField v-model="item.id" label="ID" :disabled="!isNew" @click="emit('select', $event)"></VTextField>

        <VTextField v-model="item.keyValue" label="KeyValue"></VTextField>
      </div>

      <VTextField v-model="item.name" label="Name"></VTextField>

      <div class="grid grid-cols-2 gap-x-4">
        <VSelect v-slot="{ item }" :value="item.icon" class="" label="Icon" :list="listIcon" @change="onIcon">
          <div class="flex gap-2 items-center">
            <VIcons :name="item.icon" class="size-5"></VIcons>

            <div>{{ item.name }}</div>
          </div>
        </VSelect>

        <VSelect :value="item.type" class="" label="Type" :list="listType" @change="onType"></VSelect>
      </div>

      <div class="grid grid-cols-2 gap-x-4">
        <VTextField v-if="isMinMax" v-model="item.min" label="Min"></VTextField>

        <VTextField v-if="isMinMax" v-model="item.max" label="Max"></VTextField>
      </div>

      <VTextField v-if="item.set" v-model="item.set" component="textarea" label="Set"></VTextField>

      <VTextField v-model="item.get" component="textarea" label="Get"></VTextField>

      <VTextField v-model="item.modifyValue" component="textarea" label="ModifyValue"></VTextField>
    </div>

    <div class="flex gap-4 justify-end">
      <VButton class="px-4" color="red" outline @click="onRemove">Remove</VButton>
      <VButton class="px-4" color="blue" @click="onSave">Save</VButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import type { TypePropertyString } from '@/types/types';

import { computed, onMounted, ref, defineProps, defineEmits } from 'vue';

import type { TypeVList } from '@/types/types';

import VIcons from '@/components/general/VIcons.vue';
import VButton from '@/components/general/VButton.vue';
import VSelect from '@/components/general/VSelect.vue';
import VTextField from '@/components/general/VTextField.vue';

interface Props {
  item: TypePropertyString;
  isNew: boolean;
}

const { item: data, isNew } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'remove', value: TypePropertyString): void;
  (e: 'save', value: TypePropertyString): void;
  (e: 'select', event: Event): void;
}>();

const item: Ref<TypePropertyString> = ref({ id: '', name: '', keyValue: '' });

const listIcon: TypeVList[] = [
  { id: 1, name: 'Air', icon: 'IconAir' },
  { id: 2, name: 'Bulb', icon: 'IconBulb' },
  { id: 3, name: 'Cold', icon: 'IconCold' },
  { id: 4, name: 'Camera', icon: 'IconCamera' },
  { id: 5, name: 'Vent', icon: 'IconVent' },
  { id: 6, name: 'Garage', icon: 'IconGarage' },
  { id: 7, name: 'Video', icon: 'IconVideo' },
  { id: 8, name: 'Light', icon: 'IconLight' },
  { id: 9, name: 'Tv', icon: 'IconTv' },
  { id: 10, name: 'Therm', icon: 'IconTherm' },
  { id: 11, name: 'Store', icon: 'IconStore' },
  { id: 12, name: 'Socket', icon: 'IconSocket' },
  { id: 13, name: 'Search', icon: 'IconSearch' },
  { id: 14, name: 'Save', icon: 'IconSave' },
  { id: 15, name: 'Noti', icon: 'IconNoti' },
  { id: 16, name: 'Logout', icon: 'IconLogout' },
  { id: 17, name: 'Lock', icon: 'IconLock' },
  { id: 1, name: 'Folder', icon: 'IconFolder' },
];

const listType: TypeVList[] = [
  { id: 1, name: 'Button', type: 'button' },
  { id: 2, name: 'Info', type: 'info' },
  { id: 3, name: 'Dimmer', type: 'dimmer' },
  { id: 4, name: 'Switch', type: 'switch' },
  { id: 5, name: 'Date', type: 'date' },
  { id: 6, name: 'Input', type: 'input' },
];

const isMinMax = computed(() => item.value.type === 'dimmer');

const onIcon = ({ value }: any) => {
  item.value.icon = value;
};
const onType = ({ type }: any) => {
  item.value.type = type;
};

const onSave = () => {
  emit('save', item.value);
};
const onRemove = () => {
  emit('remove', item.value);
};

onMounted(() => {
  item.value = { ...data };
});
</script>
