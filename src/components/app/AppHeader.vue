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

          <slot></slot>

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
              <span class="ms-2">{{ item.name }}</span>
            </VList>
          </VDropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

import type { IListItem } from '@/types/types';

import VButton from '@/components/general/forms/VButton.vue';
import VDropdown from '@/components/general/forms/VDropdown.vue';
import VList from '@/components/general/forms/VList.vue';

import IconDots from '@/assets/icons/Dots.svg';
import IconBurger from '@/assets/icons/Burger.svg';
import IconLogout from '@/assets/icons/Logout.svg';
import IconLogo from '@/assets/icons/Logo.svg';
import IconTheme from '@/assets/icons/Theme.svg';

interface Props {
  changeTheme?: (value?: string) => void;
}

const { changeTheme } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'sidebar', value: Event): void;
}>();

const listMenu: IListItem[] = [
  { name: 'Theme', value: 1 },
  { name: 'Logout', value: 2 },
];

const onSidebar = (e: Event) => emit('sidebar', e);
const onLogout = async () => await fetch('/', { headers: { Authorization: 'Basic AAAAAAAAAAAAAAAAAAA=' } });

const onChangeTheme = () => {
  if (changeTheme) changeTheme();
};

const onMenu = ({ value }: IListItem) => {
  if (value == 1) onChangeTheme();
  if (value == 2) onLogout();
};
</script>
