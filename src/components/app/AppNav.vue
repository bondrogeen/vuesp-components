<template>
  <nav class="flex flex-col">
    <template v-if="groups.length">
      <div v-for="(group, index) of groups" :key="group.key ?? group.title" :class="compact && index ? 'mt-2 border-t border-gray-light-10/60 pt-2 dark:border-white/10' : ''">
        <button
          v-if="!compact"
          type="button"
          class="mb-1 flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-main transition hover:text-gray-dark-25 dark:hover:text-gray-light-10"
          :aria-expanded="!isCollapsed(group)"
          @click="toggleGroup(group)"
        >
          <span>{{ group.title }}</span>
          <VIcon name="chevron-down" class="size-3.5 transition-transform" :class="isCollapsed(group) ? '-rotate-90' : ''" />
        </button>

        <div class="nav-collapse" :class="{ open: compact || !isCollapsed(group) }" :inert="!compact && isCollapsed(group)">
          <div>
            <ul class="space-y-1 pb-1">
              <AppNavItem
                v-for="item of group.items"
                :key="`${item.name}:${item.path ?? ''}`"
                :item="item"
                :level="0"
                :active-path="fullPath"
                :compact="compact"
                @select="onSelect"
              />
            </ul>
          </div>
        </div>
      </div>
    </template>

    <ul v-else class="mb-4 flex flex-col gap-2">
      <li v-for="item of menu" :key="item.name">
        <component
          :is="item.path ? 'router-link' : 'span'"
          :to="item.path"
          class="flex gap-2 items-center px-3 py-2 rounded"
          :class="isActive(item.path) ? 'bg-cyan-main/10 text-cyan-main' : 'hover:bg-white/5'"
          @click.prevent.stop="onSelectItem(item)"
        >
          <div class="size-5 flex-[0_0_20px] opacity-60">
            <slot name="icon" :item="item"></slot>
          </div>

          <span class="flex-1 first-letter:uppercase text-sm" :class="isSidebar ? 'lg:hidden' : ''">{{ item.name }}</span>

          <button class="cursor-pointer" :class="[isSidebar ? 'lg:hidden' : '']" @click.prevent.stop="onSelectItem(item)">
            <VIcon name="arrow-right" v-if="item.children" class="size-5" />
          </button>
        </component>

        <div v-if="item.children" class="translate transform overflow-hidden mt-2" :class="[isSidebar ? 'lg:hidden' : '', selected === item.name ? 'block' : 'hidden']">
          <ul class="flex flex-col gap-2">
            <li v-for="{ name, path, icon, children } of item.children" :key="name">
              <component :is="path ? 'router-link' : 'span'" :to="path" class="flex gap-2 items-center px-3 py-2 rounded" :class="isActive(path) ? 'bg-cyan-main/10 text-cyan-main' : 'hover:bg-white/5'">
                <div class="flex gap-2 ms-8">
                  <div class="size-5 flex-[0_0_20px]">
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
                        <div class="size-5 flex-[0_0_20px]">
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
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';

import VIcon from '@/components/ui/icon/VIcon.vue';
import AppNavItem from '@/components/app/AppNavItem.vue';
import type { IAppMenuGroup, IAppNavProps, IAppNavEmits } from '@/components/app/types';
import type { IMenuItem } from '@/types';

import { findMenuItem } from '@/helpers/app';

const { isSidebar = false, menu = [], groups = [], fullPath = '', storageKey = 'vuesp.nav.groups' } = defineProps<IAppNavProps>();

const emit = defineEmits<IAppNavEmits>();

const selected = ref('');
const isDesktop = ref(false);
const collapsed = reactive<Record<string, boolean>>({});

const compact = computed(() => isSidebar && isDesktop.value);

const groupKey = (group: IAppMenuGroup): string => group.key ?? group.title;

const isCollapsed = (group: IAppMenuGroup): boolean => Boolean(collapsed[groupKey(group)]);

const itemContainsPath = (item: IMenuItem, path: string): boolean => {
  if (!item.path) return false;
  if (item.path === '/') return path === '/';
  if (path === item.path || path.startsWith(item.path)) return true;
  return Boolean(item.children?.some(child => itemContainsPath(child, path)));
};

const syncActive = (): void => {
  for (const group of groups) {
    if (group.items.some(item => itemContainsPath(item, fullPath))) {
      collapsed[groupKey(group)] = false;
    }
  }
};

const persist = (): void => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(collapsed));
  } catch {
    return;
  }
};

const toggleGroup = (group: IAppMenuGroup): void => {
  const key = groupKey(group);
  collapsed[key] = !collapsed[key];
  persist();
};

const updateViewport = (): void => {
  if (typeof window === 'undefined') return;
  isDesktop.value = window.matchMedia('(min-width: 1024px)').matches;
};

const onSelect = (): void => {
  if (!isDesktop.value) emit('sidebar', false);
};

const onSelectItem = (item: IMenuItem): void => {
  onSelect();
  if (selected.value === item.name) return;
  selected.value = selected.value === item.name ? '' : item.name;
};

const loadCollapsed = (): void => {
  const defaults: Record<string, boolean> = { services: true, settings: true };
  try {
    const raw = localStorage.getItem(storageKey);
    Object.assign(collapsed, raw ? { ...defaults, ...(JSON.parse(raw) as Record<string, boolean>) } : defaults);
  } catch {
    Object.assign(collapsed, defaults);
  }
  syncActive();
};

const isActive = (path: string | undefined) => fullPath === path;

const isActiveBranch = (path: string | undefined) => {
  if (!path) return false;
  return fullPath === path || fullPath.startsWith(path);
};

watch(() => fullPath, syncActive);
watch(() => groups, syncActive, { deep: true });

onMounted(() => {
  updateViewport();
  loadCollapsed();
  window.addEventListener('resize', updateViewport, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('resize', updateViewport);
});

watch(
  () => menu,
  () => (selected.value = (findMenuItem(menu, fullPath))?.name || ''),
);
</script>

<style scoped>
/* Анимация раскрытия групп через grid-template-rows: Tailwind-утилитами
   её не выразить, поэтому оставлен минимальный scoped CSS. */
.nav-collapse {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.nav-collapse.open {
  grid-template-rows: 1fr;
}

.nav-collapse > * {
  min-height: 0;
  overflow: hidden;
}
</style>
