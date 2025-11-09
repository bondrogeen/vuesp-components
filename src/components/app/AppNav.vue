<template>
  <nav>
    <ul class="mb-4 flex flex-col gap-4">
      <li v-for="item of menu" :key="item.name">
        <component
          :is="item.path ? 'router-link' : 'span'"
          :to="item.path"
          class="flex gap-2 items-center px-3 py-2 rounded-lg"
          :class="isActive(item.path) ? 'bg-blue-500/10' : 'hover:bg-gray-500/10'"
          @click.prevent.stop="onSelect(item)"
        >
          <v-icon :name="item.icon" class="size-5 flex-[0_0_24px]" />

          <span class="flex-1 first-letter:uppercase text-sm" :class="isSidebar ? 'lg:hidden' : ''">{{ item.name }}</span>

          <button class="cursor-pointer" :class="[isSidebar ? 'lg:hidden' : '']" @click.prevent.stop="onSelect(item)">
            <VIcon v-if="item.children" name="Chevron" />
          </button>
        </component>

        <div v-if="item.children" class="translate transform overflow-hidden mt-2" :class="[isSidebar ? 'lg:hidden' : '', selected === item.name ? 'block' : 'hidden']">
          <ul class="flex flex-col gap-2">
            <li v-for="{ name, path, icon } of item.children" :key="name">
              <component :is="path ? 'router-link' : 'span'" :to="path" class="flex gap-2 items-center px-3 py-2 rounded-lg" :class="isActive(path) ? 'bg-blue-500/10' : 'hover:bg-gray-500/10'">
                <div class="flex gap-2 ms-8">
                  <v-icon v-if="icon" :name="icon" class="size-5 flex-[0_0_24px]" />

                  <span class="flex-1 first-letter:uppercase text-sm">{{ name }}</span>
                </div>
              </component>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { IAppNavProps, IAppNavEmits } from '@/components/app/types';
import type { IMenuItem } from '@/types/types';

import { ref, defineProps, defineEmits, watch } from 'vue';

import { findMenuItem } from '@/helpers/app';

import VIcon from '@/components/ui/icon/VIcon.vue';

const { isSidebar = false, menu = [], fullPath = '' } = defineProps<IAppNavProps>();

const emit = defineEmits<IAppNavEmits>();

const selected = ref('');

const onSelect = ({ name }: IMenuItem) => {
  if (isSidebar) emit('sidebar', !isSidebar);
  if (selected.value === name) return;
  selected.value = selected.value === name ? '' : name;
};

const isActive = (path: string | undefined) => fullPath === path;

watch(
  () => menu,
  () => (selected.value = findMenuItem(menu, fullPath)?.name || '')
);
</script>
