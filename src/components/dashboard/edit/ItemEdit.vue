<template>
  <div class="flex flex-col">
    <VTabs class="flex-auto" :value="0" :items="tabs">
      <template #tab-0>
        <div class="flex flex-col md:flex-row gap-6">
          <div class="flex-auto gap-x-2 order-1">
            <VTextField v-model="item.id" label="ID" :disabled="!isNew" @click="onCheckId"></VTextField>

            <VTextField v-model="item.name" label="Name"></VTextField>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <VSelect v-slot="{ item }" :value="item.icon" label="Icon" class="mb-6" :list="listIcons" @change="onIcon">
                <div class="flex gap-2 items-center">
                  <VIcons :name="`${item.value}`" class="size-5"></VIcons>

                  <div>{{ item.name }}</div>
                </div>
              </VSelect>

              <VSelect :value="item.type" label="Type" :list="listDashboard" @change="onType"></VSelect>
            </div>
          </div>

          <div class="flex justify-center order-0 md:order-1">
            <div class="flex-[0_0_130px] size-[130px]">
              <slot name="default" :item="item"></slot>
            </div>
          </div>
        </div>
      </template>

      <template #tab-1>
        <div class="flex flex-col gap-4">
          <VTextWrapper :active="Boolean(item.args.length)" :disabled="isParamsDisabled" label="Arguments" @icon="dialog = true">
            <div class="flex gap-2 flex-wrap flex-auto px-2 py-1">
              <div v-for="(item, i) of item.args" :key="item" class="flex items-center rounded-full bg-gray-900/50 px-2 py-[2px] text-xs">
                <div class="relative group">
                  <span class="select-none">{{ item }}</span>
                  <div
                    class="fixed left-1/2 top-1/2 p-4 bg-gray-950 rounded-lg rounded-bl-none group-hover:visible invisible opacity-0 group-hover:opacity-100 z-50 transition-all -translate-1/2"
                    :class="isHover(i) ? 'visible opacity-100' : ''"
                  >
                    <pre>{{ getDataValue(item, object) }}</pre>
                  </div>
                </div>
                <button v-if="i" class="cursor-pointer ms-1" @click="onRemoveParams(item)">
                  <IconClose class="size-5" />
                </button>
              </div>
            </div>
          </VTextWrapper>

          <VFunc :value="item['get']" :args="item.args" :disabled="!isParams" label="Get" hideIcon @icon="onFunc('get')" @hover="onHover" @change="onChange('get', $event)" />

          <VFunc :value="item.set" :args="item.args" :disabled="!isParams || isSet" label="Set" @icon="onFunc('set')" @hover="onHover" @change="onChange('set', $event)" />

          <VFunc :value="item.getTo" :args="item.args" :disabled="!isParams" label="GetTo" @icon="onFunc('getTo')" @hover="onHover" @change="onChange('getTo', $event)" />
        </div>
      </template>
      <template #tab-2>
        <ItemOptions v-bind="item.opts" :value="item.value" :type="item.type" @update="onOptions" />
      </template>
    </VTabs>

    <div class="flex gap-4 justify-end">
      <VButton class="px-4" color="red" outline @click="onButton('remove')">{{ 'Remove' }}</VButton>
      <VButton class="px-4" color="gray" outline @click="onButton('cancel')">{{ 'Cancel' }}</VButton>
      <VButton class="px-4" color="blue" :disabled="isDisabled" @click="onButton(isNew ? 'add' : 'save')">{{ isNew ? 'Add' : 'Save' }}</VButton>
    </div>

    <app-dialog v-if="dialog" size="md" title="Select" @close="dialog = false">
      <div class="relative min-h-[200px] max-h-100dvh overflow-auto scrollbar">
        <VListObject :items="object" :onlyValue="!isParams" @click="onAddParams" />
      </div>
    </app-dialog>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import type { IDashboardItem, IDashboardItemOptions, IListItem, VListObjectReturnData } from '@/types/types';

import { computed, onMounted, ref, defineProps, defineEmits } from 'vue';

import { listIcons, listDashboard } from '@/const/lists';
import { getDataValue } from 'vuesp-components/dashboard';
import { clone } from '@/helpers/general';

import VTextWrapper from '@/components/general/forms/VTextWrapper.vue';
import VIcons from '@/components/general/forms/VIcons.vue';
import VButton from '@/components/general/forms/VButton.vue';
import VSelect from '@/components/general/forms/VSelect.vue';
import VTextField from '@/components/general/forms/VTextField.vue';
import VListObject from '@/components/general/forms/VListObject.vue';
import AppDialog from '@/components/app/AppDialog.vue';
import VTabs from '@/components/general/forms/VTabs.vue';
import VFunc from '@/components/general/forms/VFunc.vue';

import ItemOptions from '@/components/dashboard/edit/ItemOptions.vue';

import IconClose from '@/assets/icons/Close.svg';

interface Props {
  item: IDashboardItem;
  object: object;
}

const { item: data, object } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'button', key: string, value: IDashboardItem): void;
}>();

const tabs = [{ title: 'Main' }, { title: 'Data' }, { title: 'Options' }];

const item: Ref<IDashboardItem> = ref({
  id: '',
  name: 'New',
  type: 'button',
  icon: 'Bulb',
  value: '',
  args: [],
  set: '({ ...a, value: v, command: 1 })',
  get: 'v',
  getTo: "v ? 'ON' : 'OFF'",
});

const dialog = ref(false);
const isNew = computed(() => Boolean(!data?.id));

const isSet = computed(() => item.value.type === 'info');
const isParams = computed(() => item.value.args?.length);
const isParamsDisabled = computed(() => item.value.args.length > 3);
const isDisabled = computed(() => {
  const { id, args, get } = item.value;
  return !id || !args.length || !get;
});

const onIcon = ({ value }: IListItem) => (item.value.icon = value as string);

const onType = ({ value }: IListItem) => {
  const type = value as string;
  item.value.type = type;
  delete item.value.opts;
  if (!['button', 'list', 'dimmer'].includes(type)) return;
  if (value === 'button') item.value.opts = { disabled: 0 };
  if (value === 'list') item.value.opts = { list: [] };
  if (value === 'dimmer') item.value.opts = { min: 0, max: 255, step: 1 };
};

const onFunc = (key: string) => {
  if (key === 'set') item.value.set ? delete item.value.set : (item.value.set = 'v');
  if (key === 'getTo') item.value.getTo ? delete item.value.getTo : (item.value.getTo = 'v');
};

const onButton = (key: string) => emit('button', key, item.value);
const onRemoveParams = (value: string) => (item.value.args = item.value.args.filter((i: string) => i !== value));

const onAddParams = ({ path }: VListObjectReturnData) => {
  if (!item.value.args.length) {
    item.value.id = path;
  }
  item.value.args.push(path);
  dialog.value = false;
};

const index = ref(-1);

const isHover = (i: number) => index.value === i;
const onHover = (event: string, i: number) => {
  if (event === 'enter') index.value = i;
  if (event === 'leave') index.value = -1;
};

const onChange = <K extends keyof IDashboardItem>(event: K, value: string) => {
  if (event === 'set') item.value.set = value;
  if (event === 'get') item.value.get = value;
  if (event === 'getTo') item.value.getTo = value;
  if (!value) delete item.value[event];
};

const onCheckId = () => {
  if (!item.value.args.length && !data?.id) {
    dialog.value = true;
  }
};

const onOptions = <K extends keyof IDashboardItemOptions>(key: K, value: IDashboardItemOptions[K]) => {
  if (!item.value.opts) item.value.opts = {};
  item.value.opts[key] = value;
  if (key === 'disabled') delete item.value.opts[key];
};

onMounted(() => {
  if (data?.id) item.value = clone(data);
});
</script>
