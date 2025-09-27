<template>
  <header class="bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 left-0 w-full z-10 sticky top-0">
    <div class="px-4 py-4 sm:px-6 lg:px-8">
      <div class="container mx-auto flex flex-auto items-center">
        <VButton type="icon" color="gray" class="me-6" @click="onSidebar">
          <IconBurger class="h-5 w-5" />
        </VButton>

        <div class="lg:hidden flex-auto"></div>

        <div class="lg:hidden h-[30px] me-10">
          <router-link to="/">
            <IconLogo class="h-[30px] text-primary"></IconLogo>
          </router-link>
        </div>

        <div class="flex-auto"></div>

        <div class="gap-4 hidden lg:flex">
          <VButton type="icon" color="gray" @click="onChangeTheme">
            <IconTheme />
          </VButton>

          <VButton
            type="icon"
            color="gray"
            @click.prevent="
              dropdownOpen = !dropdownOpen;
              notifying = false;
            "
          >
            <span :class="!notifying ? 'hidden' : 'flex'" class="absolute right-0 top-0.5 z-1 h-2 w-2 rounded-full bg-orange-400 flex">
              <span class="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
            </span>
            <IconNoti class="h-5 w-5" />
          </VButton>

          <VButton type="icon" color="gray" @click.prevent="onLogout">
            <IconLogout class="h-5 w-5" />
          </VButton>
        </div>

        <div class="lg:hidden flex gap-4">
          <VDropdown left="unset" right="0" top="0">
            <template #activator="{ on }">
              <VButton type="icon" color="gray" class="flex" @click="on.click">
                <IconDots />
              </VButton>
            </template>

            <VList v-slot="{ item }" :list="listMenu" @click="onMenu">
              <component :is="item.icon"></component>
              <span class="ms-2">{{ item.name }}</span>
            </VList>
          </VDropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue';

import type { IListItem } from '@/types/types';

import VButton from '@/components/general/forms/VButton.vue';
import VDropdown from '@/components/general/forms/VDropdown.vue';
import VList from '@/components/general/forms/VList.vue';

import IconDots from '@/assets/icons/Dots.svg';
import IconBurger from '@/assets/icons/Burger.svg';
import IconNoti from '@/assets/icons/Noti.svg';
import IconLogout from '@/assets/icons/Logout.svg';
import IconLogo from '@/assets/icons/Logo.svg';
import IconTheme from '@/assets/icons/Theme.svg';

export interface Props {
  changeTheme?: (value?: string) => void;
}

const { changeTheme } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'sidebar', value: Event): void;
}>();

const dropdownOpen = ref(false);
const notifying = ref(false);

const listMenu: IListItem[] = [
  { id: 1, name: 'Theme', value: IconTheme },
  { id: 2, name: 'Logout', value: IconLogout },
];

const onSidebar = (e: Event) => emit('sidebar', e);

const onLogout = async () =>
  await fetch('/', {
    method: 'get',
    headers: { Authorization: 'Basic AAAAAAAAAAAAAAAAAAA=' },
  });

const onChangeTheme = () => {
  if (changeTheme) changeTheme();
};

const onMenu = ({ name }: any) => {
  if (name == 'Logout') onLogout();
  if (name == 'Theme') onChangeTheme();
};
</script>
