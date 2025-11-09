<template>
  <ul>
    <li v-for="(item, key) of items" :key="key" :class="isObject(item) ? '' : `flex items-center ${getClass()}`">
      <div class="flex items-center cursor-pointer ps-2 h-8" :class="isObject(item) ? `${getClass()}` : ''" @click="onClick(key)">
        <div v-if="isObject(item)" class="me-1">
          <VIcon name="Folder" class="size-5" />
        </div>

        <div>{{ key }}</div>

        <template v-if="!onlyValue && isObject(item)">
          <div class="flex-auto"></div>

          <div class="flex items-center z-10">
            <button class="px-2 cursor-pointer text-gray-400 hover:text-gray-200" @click.stop="onGetKey(key, isObject(item))">
              <VIcon name="Save" class="size-5" />
            </button>
          </div>
        </template>
      </div>

      <div v-if="isObject(item)" class="flex ps-5">
        <VListObject v-show="show[key]" class="flex-auto" :path="getPath(key)" :items="item" :onlyValue="onlyValue" @click="emit('click', $event)"></VListObject>
      </div>

      <template v-else>
        <div class="flex-auto"></div>

        <div class="font-medium me-4">
          {{ item }}
        </div>

        <button class="px-2 cursor-pointer z-10" @click.stop="onGetKey(key, isObject(item))">
          <VIcon name="Save" class="size-5" />
        </button>
      </template>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import type { IVListObjectProps, IVListObjectEmits } from '@/components/ui/list/types';

import { ref, defineProps, defineEmits } from 'vue';

import VListObject from '@/components/ui/list/VListObject.vue';

import VIcon from '@/components/ui/icon/VIcon.vue';

const { items = {}, path = '', onlyValue = false } = defineProps<IVListObjectProps>();

const emit = defineEmits<IVListObjectEmits>();

const getClass = () => `before:absolute before:w-full before:h-8 before:t-0 before:left-0 before:border-b before:border-gray-200 dark:before:border-gray-800/50  hover:before:bg-gray-400/10`;

const show: Ref<{ [index: string]: boolean }> = ref({});

const onClick = (key: string) => {
  show.value[key] = !show.value[key];
};
const isObject = (item: unknown) => typeof item === 'object';

const getPath = (key: string) => `${path ? path + '.' : ''}${key}`;

const onGetKey = (key: string, isObject: boolean) => {
  emit('click', { key, path: getPath(key), isObject });
};
</script>
