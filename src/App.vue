<template>
  <div class="h-[100dvh] min-h-full flex flex-col">
    <app-overlay v-if="false">
      <div class="text-2xl font-bold mb-4">{{ 'disconn' }}</div>

      <div class="flex justify-center">
        <v-loader class="text-primary"></v-loader>
      </div>
    </app-overlay>

    <div class="flex h-screen overflow-hidden">
      <app-aside v-if="!isIframe" :isSidebar="isSidebar" @sidebar="onSidebar">
        <h3 class="mb-4 text-xs h-5 uppercase flex items-center gap-2 justify-between" :class="isSidebar ? 'lg:hidden' : ''">
          <span v-if="false" class="text-gray-400 text-nowrap">{{ 12 }}</span>
        </h3>

        <app-nav :menu="[]" :isSidebar="isSidebar" :fullPath="'/'" @sidebar="onSidebar" />

        <div class="flex-auto"></div>
      </app-aside>

      <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden scrollbar">
        <app-header v-if="!isIframe" :change-theme="false" :notifications="[]" @sidebar="isSidebar = !isSidebar" @notif="isSidebarRight = !isSidebarRight"></app-header>

        <main :class="isIframe ? 'no-scrollbar' : 'px-4 py-6 sm:px-6 lg:px-8 flex-auto'">
          <div :class="isIframe ? '' : 'container mx-auto h-full'">
            <router-view />
            <VSelect
              :model-value="select"
              label="List"
              :items="[
                { name: 'test', value: 'test' },
                { name: 'test', value: 'test' },
                { name: 'test', value: 'test' },
                { name: 'test', value: 'test' },
              ]"
              @select="select = $event.name"
            ></VSelect>
          </div>
        </main>

        <app-notification :value="isSidebarRight" :notifications="[]" @close="isSidebarRight = false">
          <template #header="{ isNew }">
            <div class="flex items-center justify-between py-4 sticky top-0 z-20 bg-gray-50 dark:bg-gray-900 px-2">
              <h5>{{ 'List' }}</h5>

              <VButton size="small" color="gray" class="text-sm" :disabled="!isNew">{{ 'All' }}</VButton>
            </div>
          </template>
          <template #empty>
            <p class="text-center text-gray-200/50 py-10">{{ 'All' }}</p>
          </template>
        </app-notification>
      </div>
    </div>
    <VDialog title="Dialog">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores sint voluptas aliquam voluptate ipsa excepturi beatae porro, nesciunt debitis vero, enim molestias quia autem architecto, fugiat
      accusantium inventore provident quam! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores sint voluptas aliquam voluptate ipsa excepturi beatae porro, nesciunt debitis vero, enim
      molestias quia autem architecto, fugiat accusantium inventore provident quam! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores sint voluptas aliquam voluptate ipsa excepturi
      beatae porro, nesciunt debitis vero, enim molestias quia autem architecto, fugiat accusantium inventore provident quam!
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// import { useWebSocketStore } from '@/stores/WebSocketStore';

// import { useFrame } from '@/composables/useFrame';
// import { useSocket } from '@/composables/useSocket';
// import { useStore } from '@/composables/useStore';
// import { useLocale } from '@/composables/useLocale';

import VSelect from '@/components/ui/select/VSelect.vue';
import VDialog from '@/components/ui/dialog/VDialog.vue';

const select = ref('none');
// const { $t, setLocale } = useLocale();

// setLocale(localGet('locale') || navigator?.language);

const isIframe = false;
// const { isConnect } = useSocket();
// const { pkg, menu, dialog, dialogInfo, main, notifications, progress, changeTheme } = useStore();

// const webSocketStore = useWebSocketStore();

const isSidebar = ref(false);
const isSidebarRight = ref(false);

// const getMenu = computed(() => menu.value.map((i) => ({ ...i, name: $t(i.name) })));
// const info = computed(() => main.value.info);
// const nameDevice = computed(() => info.value?.name || '');

const onSidebar = (value: boolean) => (isSidebar.value = value);
</script>
