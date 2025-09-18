<template>
  <ul class="">
    <li v-for="(item, key) of items" :key="key" class="" :class="isObject(item) ? '' : `flex items-center ${getClass()}`">
      <div class="flex items-center cursor-pointer ps-2 h-8" :class="isObject(item) ? `${getClass()}` : ''" @click="onClick(key)">
        <div v-if="isObject(item)" class="me-1">
          <IconFolder class="size-5 text-gray-400" />
        </div>

        <div class="text-gray-400">{{ key }}</div>

        <template v-if="isObject(item)">
          <div class="flex-auto"></div>

          <div class="flex items-center z-10">
            <button class="px-2 cursor-pointer text-gray-400 hover:text-gray-200" @click.stop="onGetKey(key)">
              <IconSave class="size-5" />
            </button>
          </div>
        </template>
      </div>

      <div v-if="isObject(item)" class="flex ps-5">
        <VListObject v-show="show[key]" class="flex-auto" :path="getPath(key)" :items="item" @click="emit('click', $event)"></VListObject>
      </div>

      <template v-else>
        <div class="flex-auto"></div>

        <div class="font-medium me-4">
          {{ item }}
        </div>

        <button class="px-2 cursor-pointer z-10" @click.stop="onGetKey(key)">
          <IconSave class="size-5" />
        </button>
      </template>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import type { Ref } from 'vue';

import VListObject from '@/components/general/VListObject.vue';

import IconFolder from '@/assets/icons/IconFolder.svg';
import IconSave from '@/assets/icons/IconSave.svg';

interface Props {
  items: object;
  path?: string;
}

const { items = {}, path = '' } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'click', value: string): void;
}>();

const getClass = () => `before:absolute before:w-full before:h-8 before:t-0 before:left-0 before:rounded-sm hover:before:bg-gray-400/10`;

const show: Ref<{ [index: string]: boolean }> = ref({});

const onClick = (key: string) => {
  show.value[key] = !show.value[key];
};
const isObject = (item: unknown) => typeof item === 'object';

const getPath = (key: string) => `${path ? path + '.' : ''}${key}`;

const onGetKey = (key: string) => {
  emit('click', getPath(key));
};
</script>
