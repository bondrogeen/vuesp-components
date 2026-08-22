<template>
  <ul>
    <li v-for="(item, key) of items" :key="key" :class="isObject(item) ? '' : `flex items-center ${getClass()}`">
      <div class="flex items-center cursor-pointer ps-2 h-8" :class="isObject(item) ? `${getClass()}` : ''" @click="onClick(key)">
        <div v-if="isObject(item)" class="me-1">
          <icon-ri-folder-6-line class="size-5" />
        </div>

        <div class="dark:text-gray-300">{{ key }}</div>

        <VButton v-if="isSupported" class="opacity-20 hover:opacity-70 transition-all" color="transparent" size="sm" @click.stop="copy(getPath(key))">
          <icon-ri-file-copy-line class="size-5" />
        </VButton>

        <span v-if="text === getPath(key)" class="text-gray-500 transition-all duration-1000 text-sm" :class="copied ? 'opacity-100' : 'opacity-0'">{{ $t('copied') }}</span>

        <template v-if="!onlyValue && isObject(item)">
          <div class="flex-auto"></div>

          <div class="flex gap-3 items-center z-10">
            <VButton class="opacity-20 hover:opacity-70 transition-all" color="transparent" size="sm" :title="$t('add')" @click.stop="onGetKey(key, isObject(item))">
              <icon-ri-add-line class="size-5" />
            </VButton>
          </div>
        </template>
      </div>

      <div v-if="isObject(item)" class="flex ps-5">
        <VListObject v-show="show[key]" class="flex-auto" :path="getPath(key)" :items="item" :onlyValue="onlyValue" @click="emit('click', $event)"></VListObject>
      </div>

      <template v-else>
        <div class="flex-auto gap-3"></div>

        <div class="font-medium dark:text-gray-300">
          {{ item }}
        </div>

        <VButton class="opacity-20 hover:opacity-70 transition-all" color="gray" size="sm" :title="$t('add')" @click.stop="onGetKey(key, isObject(item))">
          <icon-ri-add-line class="size-5" />
        </VButton>
      </template>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import type { IVListObjectProps, IVListObjectEmits } from '@/components/ui/list/types';

import { useClipboard } from '@vueuse/core';

import { ref } from 'vue';

import VButton from '@/components/ui/button/VButton.vue';
import VListObject from '@/components/ui/list/VListObject.vue';

const { items = {}, path = '', onlyValue = false } = defineProps<IVListObjectProps>();

const emit = defineEmits<IVListObjectEmits>();

const getClass = () => `before:absolute before:w-full before:h-8 before:t-0 before:left-0 before:border-b before:border-gray-200 dark:before:border-gray-800/50  hover:before:bg-gray-400/10`;

const show: Ref<{ [index: string]: boolean }> = ref({});

const { text, copy, copied, isSupported } = useClipboard();

const onClick = (key: string) => {
  show.value[key] = !show.value[key];
};
const isObject = (item: unknown) => typeof item === 'object';

const getPath = (key: string) => `${path ? path + '.' : ''}${key}`;

const onGetKey = (key: string, isObject: boolean) => {
  emit('click', { key, path: getPath(key), isObject });
};
</script>
