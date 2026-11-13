<template>
  <nav>
    <ul class="mb-4 flex flex-col gap-2">
      <li v-for="item of menu" :key="item.name">
        <component
          :is="item.path ? 'router-link' : 'span'"
          :to="item.path"
          class="flex gap-2 items-center px-3 py-2 rounded"
          :class="isActive(item.path) ? 'bg-cyan-main/10 text-cyan-main' : 'hover:bg-white/5'"
          @click.prevent.stop="onSelect(item)"
        >
          <div class="size-6 flex-[0_0_24px] opacity-60">
            <slot name="icon" :item="item"></slot>
          </div>

          <span class="flex-1 first-letter:uppercase text-sm" :class="isSidebar ? 'lg:hidden' : ''">{{ item.name }}</span>

          <button class="cursor-pointer" :class="[isSidebar ? 'lg:hidden' : '']" @click.prevent.stop="onSelect(item)">
            <icon-ri-arrow-right-s-line v-if="item.children" />
          </button>
        </component>

        <div v-if="item.children" class="translate transform overflow-hidden mt-2" :class="[isSidebar ? 'lg:hidden' : '', selected === item.name ? 'block' : 'hidden']">
          <ul class="flex flex-col gap-2">
            <li v-for="{ name, path, icon, children } of item.children" :key="name">
              <component :is="path ? 'router-link' : 'span'" :to="path" class="flex gap-2 items-center px-3 py-2 rounded" :class="isActive(path) ? 'bg-cyan-main/10 text-cyan-main' : 'hover:bg-white/5'">
                <div class="flex gap-2 ms-8">
                  <div class="size-5 flex-[0_0_24px]">
                    <slot name="icon-children" :item="{ name, path, icon }"></slot>
                  </div>

                  <span class="flex-1 first-letter:uppercase text-sm">{{ name }}</span>
                </div>
              </component>

              <div v-if="children?.length && isActiveBranch(path)" class="mt-2">
                <ul class="flex flex-col gap-2">
                  <li v-for="child of children" :key="child.name">
                    <component
                      :is="child.path ? 'router-link' : 'span'"
                      :to="child.path"
                      class="flex gap-2 items-center px-3 py-2 rounded"
                      :class="isActive(child.path) ? 'bg-cyan-main/10 text-cyan-main' : 'hover:bg-white/5'"
                    >
                      <div class="flex gap-2 ms-14">
                        <div class="size-5 flex-[0_0_24px]">
                          <slot name="icon-children" :item="child"></slot>
                        </div>

                        <span class="flex-1 first-letter:uppercase text-sm">{{ child.name }}</span>
                      </div>
                    </component>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { IAppNavProps, IAppNavEmits } from '@/components/app/types';
import type { IMenuItem } from '@/types';

import { ref, watch } from 'vue';

import { findMenuItem } from '@/helpers/app';

const { isSidebar = false, menu = [], fullPath = '' } = defineProps<IAppNavProps>();

const emit = defineEmits<IAppNavEmits>();

const selected = ref('');

const onSelect = ({ name }: IMenuItem) => {
  if (isSidebar) emit('sidebar', !isSidebar);
  if (selected.value === name) return;
  selected.value = selected.value === name ? '' : name;
};

const isActive = (path: string | undefined) => fullPath === path;

const isActiveBranch = (path: string | undefined) => {
  if (!path) return false;
  return fullPath === path || fullPath.startsWith(path);
};

const isMatch = (item: IMenuItem, path: string) => {
  if (!item.path || path === '/' || item.path === '/') return false;
  return item.path === path || path.includes(item.path);
};

const findBranch = (items: IMenuItem[] | null, path: string): IMenuItem | null =>
  items?.find(
    (item) =>
      isMatch(item, path) ||
      item.children?.some(
        (child) => isMatch(child, path) || child.children?.some((grandchild) => isMatch(grandchild, path)),
      ),
  ) ?? null;

watch(
  () => menu,
  () => (selected.value = (findBranch(menu, fullPath) ?? findMenuItem(menu, fullPath))?.name || '')
);
</script>
