<template>
  <header class="glass-header relative sticky top-0 left-0 z-10 w-full border-b shadow-card">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"></div>
    <div class="py-4">
      <div class="container mx-auto flex flex-auto items-center">
        <VButton type="icon" @click="onSidebar">
          <VIcon name="menu" class="size-5" />
        </VButton>

        <div class="lg:hidden flex-auto"></div>

        <div class="lg:hidden h-7">
          <router-link to="/">
            <VIconLogo class="h-7 text-cyan-main"></VIconLogo>
          </router-link>
        </div>

        <div class="flex-auto"></div>

        <div class="gap-4 hidden lg:flex">
          <VButton type="icon" @click="onChangeTheme">
            <VIcon name="sun" class="size-5 dark:hidden" />
            <VIcon name="moon" class="hidden size-5 dark:flex" />
          </VButton>

          <VButton type="icon" @click="onNotif">
            <span :class="isNewNotif ? 'flex' : 'hidden'" class="absolute right-0 top-0.5 z-1 h-2 w-2 rounded-full bg-orange-400">
              <span class="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
            </span>

            <VIcon name="noti" class="size-5" />
          </VButton>

          <VButton type="icon" @click.prevent="onLogout">
            <VIcon name="logout" class="size-5" />
          </VButton>
        </div>

        <div class="lg:hidden flex gap-4">
          <VDropdown left="unset" right="0" top="0">
            <template #activator="{ on }">
              <VButton type="icon" class="flex" @click="on.click">
                <VIcon name="more" class="size-5" />
              </VButton>
            </template>

            <VList v-slot="{ item }" :items="listMenu" @click="onMenu">
              <span class="ms-2">{{ item.name }}</span>
            </VList>
          </VDropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import VIcon from '@/components/ui/icon/VIcon.vue';
import type { IAppHeaderProps, IAppHeaderEmits } from '@/components/app/types';
import type { IListItem, INotification } from '@/types';

import { computed } from 'vue';

import VButton from '@/components/ui/button/VButton.vue';
import VDropdown from '@/components/ui/dropdown/VDropdown.vue';
import VList from '@/components/ui/list/VList.vue';
import VIconLogo from '@/components/ui/icon/VIconLogo.vue';

const { changeTheme, notifications } = defineProps<IAppHeaderProps>();

const emit = defineEmits<IAppHeaderEmits>();

const listMenu: IListItem<number>[] = [
  { name: 'Theme', value: 1 },
  { name: 'Notification', value: 2 },
  { name: 'Logout', value: 3 },
];

const isNewNotif = computed(() => Boolean(notifications.find((i: INotification) => i.isNew)));

const onSidebar = (e: Event) => emit('sidebar', e);
const onNotif = (e: Event) => emit('notif', e);
const onLogout = async () => await fetch('/', { headers: { Authorization: 'Basic AAAAAAAAAAAAAAAAAAA=' } });

const onChangeTheme = () => {
  if (changeTheme) changeTheme();
};

const onMenu = ({ value }: IListItem<number>, e: Event) => {
  if (value == 1) onChangeTheme();
  if (value == 2) onNotif(e);
  if (value == 3) onLogout();
};
</script>
