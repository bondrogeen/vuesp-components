<template>
  <ul>
    <li v-for="(item, key) of items" :key="key" :class="isObject(item) ? '' : `flex items-center ${getClass()}`">
      <div class="flex items-center cursor-pointer ps-2 h-8" :class="isObject(item) ? `${getClass()}` : ''" @click="onRowClick(key, item)">
        <div v-if="isObject(item)" class="me-1">
          <VIcon name="folder" class="size-5" />
        </div>

        <div class="dark:text-gray-light-10">{{ key }}</div>

        <VButton v-if="isSupported" :class="actionClass" variant="ghost" size="sm" @click.stop="copy(getPath(key))">
          <VIcon name="copy" class="size-5" />
        </VButton>

        <span v-if="text === getPath(key)" class="text-gray-dark-25 transition-all duration-1000 text-sm" :class="copied ? 'opacity-100' : 'opacity-0'">{{ $t('copied') }}</span>

        <template v-if="!onlyValue && isObject(item) && addable(key)">
          <div class="flex-auto"></div>

          <div class="flex items-center z-10">
            <VButton :class="actionClass" variant="ghost" size="sm" :title="$t('add')" @click.stop="onGetKey(key, isObject(item))">
              <VIcon name="add" class="size-5" />
            </VButton>
          </div>
        </template>
      </div>

      <div v-if="isObject(item)" class="flex ps-5">
        <VListObject v-show="show[key]" class="flex-auto" :path="getPath(key)" :items="item" :onlyValue="onlyValue" :canAdd="canAdd" @click="emit('click', $event)"></VListObject>
      </div>

      <template v-else>
        <div class="flex-auto gap-3"></div>

        <div class="font-medium dark:text-gray-light-10">
          {{ item }}
        </div>

        <VButton v-if="addable(key)" :class="actionClass" variant="ghost" size="sm" :title="$t('add')" @click.stop="onGetKey(key, isObject(item))">
          <VIcon name="add" class="size-5" />
        </VButton>
      </template>
    </li>
  </ul>
</template>

<script setup lang="ts">
import VIcon from '@/components/ui/icon/VIcon.vue';
import type { Ref } from 'vue';
import type { IVListObjectProps, IVListObjectEmits } from '@/components/ui/list/types';

import { useClipboard } from '@vueuse/core';

import { ref } from 'vue';

import VButton from '@/components/ui/button/VButton.vue';
import VListObject from '@/components/ui/list/VListObject.vue';

const { items = {}, path = '', onlyValue = false, canAdd } = defineProps<IVListObjectProps>();

const emit = defineEmits<IVListObjectEmits>();

const getClass = () => `relative before:pointer-events-none before:absolute before:w-full before:h-8 before:top-0 before:left-0 before:border-b before:border-gray-light-10 dark:before:border-gray-dark-30/50 hover:before:bg-gray-main/10`;

const show: Ref<{ [index: string]: boolean }> = ref({});

/** Единый вид кнопок-иконок: копирование и добавление. */
const actionClass = 'ms-2 opacity-20 transition-all hover:opacity-70';

const { text, copy, copied, isSupported } = useClipboard();

const onRowClick = (key: string, item: unknown) => {
  if (isObject(item)) {
    show.value[key] = !show.value[key];
    return;
  }
  if (addable(key)) emit('click', { key, path: getPath(key), isObject: false });
};
const isObject = (item: unknown) => typeof item === 'object' && item !== null;

const getPath = (key: string) => `${path ? path + '.' : ''}${key}`;
const addable = (key: string) => !canAdd || canAdd(getPath(key));

const onGetKey = (key: string, isObject: boolean) => {
  emit('click', { key, path: getPath(key), isObject });
};
</script>
