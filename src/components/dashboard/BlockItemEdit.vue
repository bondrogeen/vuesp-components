<template>
  <div class="pt-6">
    <div class="flex flex-col md:flex-row gap-6 mb-6">
      <div class="flex-auto gap-x-2 order-1">
        <div class="grid grid-cols-2 gap-4">
          <VTextField v-model="item.id" label="ID" :disabled="!isNew" @click="emit('select', $event)"></VTextField>

          <VTextField v-model="item.name" label="Name"></VTextField>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <VSelect v-slot="{ item }" :value="item.icon" label="Icon" :list="listIcons" @change="onIcon">
            <div class="flex gap-2 items-center">
              <VIcons :name="`${item.value}`" class="size-5"></VIcons>

              <div>{{ item.name }}</div>
            </div>
          </VSelect>

          <VSelect :value="item.type" label="Type" :list="listDashboard" @change="onType"></VSelect>
        </div>

        <div class="mt-6">
          <VTextChips :items="item.parameters" label="Parameters" @add="onAdd" />
        </div>
      </div>

      <div class="flex justify-center order-0 md:order-1">
        <div class="flex-[0_0_130px] size-[130px]">
          <slot :item="item"></slot>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-x-4">
      <div class="grid grid-cols-2 gap-x-4">
        <VTextField v-if="isMinMax" label="Min"></VTextField>

        <VTextField v-if="isMinMax" label="Max"></VTextField>
      </div>

      <VTextField v-model="setFunc" component="textarea" label="Set"></VTextField>

      <VTextField v-model="getFunc" component="textarea" label="Get"></VTextField>

      <VTextField v-model="modifyFunc" component="textarea" label="ModifyValue"></VTextField>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <VButton class="px-4" color="red" outline @click="onRemove">Remove</VButton>
      <VButton class="px-4" color="blue" @click="onSave">Save</VButton>
    </div>

    <app-dialog v-if="dialogObject" size="md" title="Edit item" @close="dialogObject = false">
      <div class="relative min-h-[300px] max-h-100dvh overflow-auto scrollbar">
        <VListObject :items="object" @click="onSelectId" />
      </div>
    </app-dialog>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import type { IDashboardItem } from '@/types/types';

import { computed, onMounted, ref, defineProps, defineEmits } from 'vue';

import type { IListItem } from '@/types/types';
import { listIcons, listDashboard } from '@/const/lists';

import VTextChips from '@/components/general/forms/VTextChips.vue';
import VIcons from '@/components/general/forms/VIcons.vue';
import VButton from '@/components/general/forms/VButton.vue';
import VSelect from '@/components/general/forms/VSelect.vue';
import VTextField from '@/components/general/forms/VTextField.vue';
import VListObject from '@/components/general/forms/VListObject.vue';
import AppDialog from '@/components/app/AppDialog.vue';

interface Props {
  item: IDashboardItem;
  isNew: boolean;
  object: object;
}

const { item: data, isNew, object } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'remove', value: IDashboardItem): void;
  (e: 'save', value: IDashboardItem): void;
  (e: 'select', event: Event): void;
}>();

const item: Ref<Omit<IDashboardItem, 'value' | 'convert'>> = ref({
  id: 'ports.144',
  name: 'ports.145',
  type: 'button',
  icon: 'IconBulb',
  options: { min: 0, max: 255, step: 1 },
  list: [],
  parameters: ['ports.14.value', 'ports.14'],
  set: ['val', 'obj', '({ ...obj, value: val, command: 1 })'],
  get: ['val', 'val ? 1 : 0'],
  modify: ['val', "val ? 'ON' : 'OFF'"],
});

const dialogObject = ref(false);

const setFunc = ref('({ ...obj, value: val, command: 1 })');
const getFunc = ref('val ? 1 : 0');
const modifyFunc = ref("val ? 'ON' : 'OFF'");

const isMinMax = computed(() => item.value.type === 'dimmer');

const onIcon = ({ value }: IListItem) => {
  item.value.icon = value as string;
};
const onType = ({ value }: IListItem) => {
  item.value.type = value as string;
};

const onSave = () => {
  emit('save', item.value);
};
const onRemove = () => {
  emit('remove', item.value);
};

const onAdd = () => {
  dialogObject.value = true;
};

const onSelectId = (id: string) => {
  console.log(id);

  dialogObject.value = false;
};

onMounted(() => {
  item.value = { ...data };
  // setFunc.value = item.value.set.pop() || '';
});
</script>
