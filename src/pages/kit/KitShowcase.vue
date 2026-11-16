<script setup lang="ts">
import { reactive, ref } from 'vue';

import KitRow from './KitRow.vue';
import KitSection from './KitSection.vue';

import type { TButtonColor, TButtonVariant } from '@/components/ui/button/types';
import type { IDashboardItem, IListItem, INotification, IPackage } from '@/types';

import VAccordion from '@/components/ui/accordion/VAccordion.vue';
import VAccordionItem from '@/components/ui/accordion/VAccordionItem.vue';
import { VAutocomplete, VButton, VCard, VCheckbox, VDialog, VDragDrop, VDropdown, VExpansion, VFile, VFunc, VIcon, VIconLogo, VIconLogoMini, VList, VListObject, VLoader, VPopup, VSelect, VTable, VTabs, VTextField, VTooltip, VWifiIcon, VisionSearch, VisionThemeToggle } from '@/components/ui';
import { ICON_NAMES } from '@/components/ui/icon/icons';
import { CardNotification } from '@/components/card';
import { ScriptEditor } from '@/components/script';
import { CardButton, CardDate, CardDimmer, CardInfo, CardInput, CardList } from '@/components/dashboard';
import { BlockBreadcrumb, BlockInfo, BlockScan, BlockService, BlockStatus, BlockUpdate } from '@/components/block';

/* Buttons */
const buttonColors: TButtonColor[] = ['cyan', 'blue', 'indigo', 'violet', 'purple', 'amber', 'green', 'red', 'slate', 'gray', 'transparent'];
const buttonVariants: TButtonVariant[] = ['default', 'soft', 'outline', 'white'];
const buttonSizes = ['sm', 'md', 'lg', 'xl'] as const;

const cardVariants = ['glass', 'solid', 'outline', 'ghost'] as const;
const cardPaddings = ['none', 'lg'] as const;
const cardTones = ['info', 'success', 'warning', 'danger', 'accent'] as const;

/* Icons */
const iconSizes = [16, 20, 24, 32];
const iconCount = ICON_NAMES.length;

/* Forms */
const textValue = ref('Living room');
const searchValue = ref('');
const passwordValue = ref('');
const textareaValue = ref('Short description of the device and its location.');

const check1 = ref(true);
const check2 = ref(false);
const check3 = ref(true);

const selectItems: IListItem<string>[] = [
  { name: 'Low', value: 'low' },
  { name: 'Medium', value: 'medium' },
  { name: 'High', value: 'high' },
];
const selectValue = ref<string | number>('medium');

const autoValue = ref('');
const autoItems = [{ name: 'Living room' }, { name: 'Kitchen' }, { name: 'Bedroom' }, { name: 'Garage' }];

const dropdownItems = [{ name: 'Edit' }, { name: 'Duplicate' }, { name: 'Delete' }];
const listItems = [{ name: 'Temperature' }, { name: 'Humidity' }, { name: 'Pressure' }];
const objectItems = {
  wifi: { ssid: 'Home', rssi: -45 },
  mqtt: { host: 'broker.local', port: 1883 },
  uptime: 12873,
};

/* Table */
const tableHeaders = [
  { name: 'Name', key: 'name', className: '' },
  { name: 'Type', key: 'type', className: '' },
  { name: 'Value', key: 'value', className: 'text-right' },
];
const tableItems = [
  { name: 'Temperature', type: 'sensor', value: '23.4 °C' },
  { name: 'Humidity', type: 'sensor', value: '48 %' },
  { name: 'Relay', type: 'switch', value: 'On' },
];

/* Tabs */
const tabItems = [{ title: 'Overview' }, { title: 'Settings' }, { title: 'Logs' }];

/* Accordion */
const accordionValue = ref<(string | number)[]>([1]);
const accordionItems = [
  { value: 1, title: 'Network', text: 'Wi-Fi SSID, password and DHCP settings.' },
  { value: 2, title: 'MQTT', text: 'Broker host, port and credentials.' },
];

/* Dialogs */
const dialogOpen = ref(false);
const dialogSize = ref<'sm' | 'md' | 'lg' | 'full'>('md');
const dialogColor = ref<'none' | 'white' | 'gray'>('white');
const popupOpen = ref(false);

const openDialog = (size: 'sm' | 'md' | 'lg' | 'full', color: 'none' | 'white' | 'gray' = 'white') => {
  dialogSize.value = size;
  dialogColor.value = color;
  dialogOpen.value = true;
};

/* File */
const fileName = ref('');
const onFile = (files: FileList) => {
  fileName.value = Array.from(files)
    .map((file) => file.name)
    .join(', ');
};

/* Function */
const funcValue = ref('return a + b;');

/* Script editor */
const scriptValue = ref(`// Script editor
const temperature = 21.5;
log(temperature);`);

/* Drag & drop */
const dragItems = ref([
  { id: 'a', name: 'Temperature' },
  { id: 'b', name: 'Humidity' },
  { id: 'c', name: 'Pressure' },
  { id: 'd', name: 'Relay' },
]);

/* Wifi */
const wifiItems = [
  { rssi: -45, channel: 6 },
  { rssi: -68, channel: 11 },
  { rssi: -88, channel: 1 },
];

/* Search */
const searchItems = [
  { title: 'Dashboard', to: '#kit', description: 'Карточки и графики', group: 'Страницы' },
  { title: 'GPIO', to: '#kit', description: 'Порты и режимы', group: 'Страницы' },
  { title: 'Script', to: '#kit', description: 'Редактор скриптов', group: 'Страницы' },
];

/* Notifications */
const notifications: INotification[] = [
  { isNew: 1, color: 1, timeout: 0, date: Date.now(), text: 'Device connected' },
  { isNew: 0, color: 2, timeout: 0, date: Date.now() - 60000, text: 'Firmware update failed' },
  { isNew: 0, color: 4, timeout: 0, date: Date.now() - 120000, text: 'New firmware available' },
];

/* Dashboard cards */
const dashButton = reactive<IDashboardItem>({ id: 'dash.button', name: 'Socket', type: 'button', args: [], icon: 'socket', value: 1, valueTo: 'On' });
const dashDimmer = reactive<IDashboardItem>({ id: 'dash.dimmer', name: 'Dimmer', type: 'dimmer', args: [], icon: 'bulb', value: 128, opts: { min: 0, max: 255, step: 1 } });
const dashInput = reactive<IDashboardItem>({ id: 'dash.input', name: 'Name', type: 'input', args: [], icon: 'plant', value: 'Kitchen' });
const dashList = reactive<IDashboardItem>({
  id: 'dash.list',
  name: 'Mode',
  type: 'list',
  args: [],
  icon: 'settings',
  value: '1',
  opts: { items: [{ name: 'Low', value: '0' }, { name: 'High', value: '1' }] },
});
const dashInfo = reactive<IDashboardItem>({ id: 'dash.info', name: 'Temperature', type: 'info', args: [], icon: 'therm', value: 23.4, valueTo: '23.4 °C' });
const dashDate = reactive<IDashboardItem>({ id: 'dash.date', name: 'Updated', type: 'date', args: [], icon: 'timer', value: Math.floor(Date.now() / 1000) });

const setDashValue = (item: IDashboardItem, value: string | number | boolean) => {
  item.value = typeof value === 'boolean' ? Number(value) : value;
};

/* Blocks */
const device = { id: 0x1a2b, firmware: [4, 0, 2], totalBytes: 4 * 1024 * 1024, usedBytes: 1_640_000, uptime: 97205, name: 'ESP32', board: 1 };
const pkg: IPackage = {
  name: 'vuesp',
  version: '2.5.2',
  author: 'bondrogeen',
  description: 'Firmware web interface for ESP devices.',
  homepage: 'https://vuesp.ru',
  repository: { type: 'git', url: 'https://github.com/bondrogeen/vuesp' },
  bugs: { url: 'https://github.com/bondrogeen/vuesp/issues' },
  license: 'MIT',
};
const locales: IListItem<string>[] = [
  { name: 'English', value: 'en' },
  { name: 'Русский', value: 'ru' },
];
const locale = ref('en');
const scanItems = [
  { name: 'Home', ssid: 'Home', channel: 6, rssi: -45, encryptionType: 3, isHidden: 0, id: 1 },
  { name: 'Office', ssid: 'Office', channel: 11, rssi: -68, encryptionType: 4, isHidden: 0, id: 2 },
  { name: 'Guest', ssid: 'Guest', channel: 1, rssi: -82, encryptionType: 0, isHidden: 0, id: 3 },
] as Array<{ name: string; ssid: string; channel: number; rssi: number; encryptionType: number; isHidden: number; id: number }>;
const breadcrumbs = [{ name: 'Home', path: '#kit' }, { name: 'Devices', path: '#kit' }, { name: 'Kitchen' }];
</script>

<template>
  <div class="space-y-10">
    <KitSection :title="`Единый набор иконок — ${iconCount}`" description="Наш набор: сетка 24×24, live area 22.5×22.5, stroke 2.1, square caps, miter joins.">
      <div class="space-y-8">
        <div class="flex flex-wrap items-end gap-8">
          <div v-for="size in iconSizes" :key="size" class="flex flex-col items-center gap-1">
            <VIcon name="home" :size="size" />
            <span class="text-xs text-gray-main">{{ size }}</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-6">
          <VIconLogo class="h-8 text-cyan-main" />
          <VIconLogoMini class="size-8 text-cyan-main" />
        </div>

        <div class="grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-2">
          <div v-for="name in ICON_NAMES" :key="name" class="glass-inset flex flex-col items-center gap-1 rounded-md p-2">
            <VIcon :name="name" :size="24" />
            <span class="w-full truncate text-center text-xs text-gray-dark-25 dark:text-gray-main" :title="name">{{ name }}</span>
          </div>
        </div>
      </div>
    </KitSection>

    <KitSection title="VButton" description="Все цвета и варианты.">
      <div class="space-y-4">
        <KitRow v-for="color in buttonColors" :key="color" :label="color">
          <div class="flex flex-wrap gap-2">
            <VButton v-for="variant in buttonVariants" :key="variant" :color="color" :variant="variant">{{ variant }}</VButton>
          </div>
        </KitRow>
      </div>
    </KitSection>

    <KitSection title="VButton — размеры и состояния" description="Размеры, иконки, invert, disabled, loading и block.">
      <div class="space-y-4">
        <KitRow label="sizes">
          <div class="flex flex-wrap items-center gap-2">
            <VButton v-for="size in buttonSizes" :key="size" color="blue" :size="size">{{ size }}</VButton>
          </div>
        </KitRow>

        <KitRow label="icon">
          <div class="flex flex-wrap items-center gap-2">
            <VButton v-for="size in buttonSizes" :key="size" type="icon" :size="size" :aria-label="`Icon ${size}`" :title="`Icon ${size}`">
              <VIcon name="settings" :size="size === 'sm' ? 16 : size === 'md' ? 20 : size === 'lg' ? 24 : 28" />
            </VButton>
          </div>
        </KitRow>

        <KitRow label="invert">
          <div class="flex flex-wrap items-center gap-2">
            <VButton color="slate" variant="outline" invert>outline invert</VButton>
            <VButton color="slate" variant="soft" invert>soft invert</VButton>
          </div>
        </KitRow>

        <KitRow label="nested">
          <VCard variant="glass" title="Parent glass" subtitle="Карточка внутри карточки">
            <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <VCard v-for="variant in cardVariants" :key="variant" :variant="variant" :title="variant">
                <p class="text-sm text-gray-dark-25 dark:text-gray-main">Nested content</p>
              </VCard>
            </div>
          </VCard>
        </KitRow>

        <KitRow label="states">
          <div class="flex flex-wrap items-center gap-2">
            <VButton color="blue" disabled>disabled</VButton>
            <VButton color="blue" loading>loading</VButton>
            <VButton color="blue" href="#kit">link</VButton>
          </div>
        </KitRow>

        <KitRow label="block">
          <VButton color="cyan" block>block button</VButton>
        </KitRow>
      </div>
    </KitSection>

    <KitSection title="VLoader" description="Три размера спиннера.">
      <div class="flex flex-wrap items-center gap-6">
        <VLoader size="sm" class="text-cyan-main" />
        <VLoader size="md" class="text-blue-main" />
        <VLoader size="lg" class="text-violet-main" />
      </div>
    </KitSection>

    <KitSection title="VTextField" description="Input, textarea, иконка, сообщение, ошибка и disabled.">
      <div class="grid gap-4 md:grid-cols-2">
        <VTextField v-model="textValue" label="Name" placeholder="Room name" />
        <VTextField v-model="searchValue" label="Search" icon="search" placeholder="Type to search">
          <template #icon>
            <VIcon name="search" :size="18" />
          </template>
        </VTextField>
        <VTextField v-model="passwordValue" label="Password" type="password" message="At least 8 characters" />
        <VTextField v-model="textValue" label="Disabled" disabled />
        <VTextField v-model="textValue" label="Error" error="This field is required" />
        <VTextField v-model="textareaValue" label="Description" component="textarea" />
      </div>
    </KitSection>

    <KitSection title="VCheckbox" description="Отмеченный, пустой и disabled.">
      <div class="flex flex-wrap items-center gap-6">
        <VCheckbox v-model="check1">Checked</VCheckbox>
        <VCheckbox v-model="check2">Unchecked</VCheckbox>
        <VCheckbox v-model="check3" disabled>Disabled</VCheckbox>
      </div>
    </KitSection>

    <KitSection title="VSelect / VAutocomplete / VDropdown" description="Выпадающие списки и меню.">
      <div class="grid gap-6 md:grid-cols-2">
        <VSelect :model-value="selectValue" label="Mode" :items="selectItems" @change="selectValue = $event.value" />
        <VSelect :model-value="selectValue" label="Disabled" :items="selectItems" disabled />

        <VAutocomplete v-model="autoValue" label="Room" :items="autoItems" @select="autoValue = $event.name" />

        <VDropdown>
          <template #activator="{ on }">
            <VButton color="blue" variant="outline" @click="on.click">Actions</VButton>
          </template>

          <template #default="{ on }">
            <VList :items="dropdownItems" @click="on.set(false)" />
          </template>
        </VDropdown>
      </div>
    </KitSection>

    <KitSection title="VList / VListObject" description="Простой список и дерево объекта.">
      <div class="grid gap-6 md:grid-cols-2">
        <VList :items="listItems" />
        <VListObject :items="objectItems" />
      </div>
    </KitSection>

    <KitSection title="VTable" description="Таблица с заголовками и пустым состоянием.">
      <VTable :headers="tableHeaders" :items="tableItems" />
    </KitSection>

    <KitSection title="VTabs" description="Размеры md и sm.">
      <div class="space-y-8">
        <VTabs :items="tabItems" :value="0">
          <template #tab-0>Overview content</template>
          <template #tab-1>Settings content</template>
          <template #tab-2>Logs content</template>
        </VTabs>

        <VTabs :items="tabItems" :value="0" size="sm">
          <template #tab-0>Overview content</template>
          <template #tab-1>Settings content</template>
          <template #tab-2>Logs content</template>
        </VTabs>
      </div>
    </KitSection>

    <KitSection title="VTooltip" description="Подсказка при наведении.">
      <VTooltip>
        <template #activator>
          <span class="text-sm">Hover me</span>
        </template>

        <template #default="{ show }">
          <div v-if="show" class="glass-popover absolute left-0 top-full z-20 mt-2 rounded-md px-3 py-2 text-xs">Tooltip content</div>
        </template>
      </VTooltip>
    </KitSection>

    <KitSection title="VExpansion / VAccordion" description="Раскрывающиеся блоки.">
      <div class="grid gap-6 md:grid-cols-2">
        <VExpansion label="Expansion">Expansion content</VExpansion>

        <VAccordion v-model="accordionValue">
          <template #default="{ onClick, isOpen }">
            <div class="space-y-2">
              <VAccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value" :is-open="isOpen(item.value)" @click="onClick">
                <template #activator>
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-sm font-medium">{{ item.title }}</span>
                    <VIcon name="chevron-down" :size="18" class="text-gray-main" />
                  </div>
                </template>

                <p class="text-sm text-gray-dark-25 dark:text-gray-main">{{ item.text }}</p>
              </VAccordionItem>
            </div>
          </template>
        </VAccordion>
      </div>
    </KitSection>

    <KitSection title="VDialog / VPopup" description="Модальные окна всех размеров и нижняя панель.">
      <div class="flex flex-wrap gap-2">
        <VButton color="blue" variant="outline" @click="openDialog('sm')">Dialog sm</VButton>
        <VButton color="blue" variant="outline" @click="openDialog('md')">Dialog md</VButton>
        <VButton color="blue" variant="outline" @click="openDialog('lg')">Dialog lg</VButton>
        <VButton color="blue" variant="outline" @click="openDialog('full', 'none')">Dialog full</VButton>
        <VButton color="violet" @click="popupOpen = true">Popup</VButton>
      </div>

      <VDialog v-if="dialogOpen" :title="`Dialog ${dialogSize}`" :size="dialogSize" :color="dialogColor" @close="dialogOpen = false">
        <p class="text-sm text-gray-dark-25 dark:text-gray-main">Dialog content. Size: {{ dialogSize }}.</p>

        <div class="mt-4 flex justify-end">
          <VButton color="blue" @click="dialogOpen = false">Close</VButton>
        </div>
      </VDialog>

      <VPopup v-if="popupOpen" aria-label="Popup" @close="popupOpen = false">
        <div class="p-4">
          <p class="text-sm">Popup content</p>

          <VButton class="mt-4" color="blue" @click="popupOpen = false">Close</VButton>
        </div>
      </VPopup>
    </KitSection>

    <KitSection title="VFile" description="Выбор файла.">
      <div class="flex flex-wrap items-center gap-4">
        <VFile @change="onFile">
          <VButton color="blue" variant="outline">Choose file</VButton>
        </VFile>

        <span class="text-sm text-gray-dark-25 dark:text-gray-main">{{ fileName || 'No file selected' }}</span>
      </div>
    </KitSection>

    <KitSection title="VWifiIcon" description="Индикатор уровня сигнала.">
      <div class="flex flex-wrap items-end gap-8">
        <VWifiIcon v-for="wifi in wifiItems" :key="wifi.channel" :rssi="wifi.rssi" :channel="wifi.channel" />
      </div>
    </KitSection>

    <KitSection title="VFunc" description="Редактор JS-функции.">
      <VFunc label="Function" :args="['a', 'b']" :value="funcValue" :params="['a', 'b']" @change="funcValue = $event" />
    </KitSection>

    <KitSection title="ScriptEditor" description="Редактор скриптов с подсветкой и автодополнением.">
      <div class="glass-inset h-50 overflow-auto scrollbar rounded-md">
        <ScriptEditor v-model="scriptValue" />
      </div>
    </KitSection>

    <KitSection title="VDragDrop" description="Сортировка перетаскиванием.">
      <VDragDrop v-model:items="dragItems" class="grid gap-2 sm:grid-cols-2">
        <template #default="{ item }">
          <div class="glass-inset flex items-center gap-2 rounded-md px-4 py-3">
            <VIcon name="grip" :size="16" class="text-gray-main" />
            <span class="text-sm">{{ item.name }}</span>
          </div>
        </template>
      </VDragDrop>
    </KitSection>

    <KitSection title="VisionSearch / VisionThemeToggle" description="Поиск с ⌘K и переключатель темы.">
      <div class="flex flex-wrap items-center gap-4">
        <VisionSearch :items="searchItems" />
        <VisionThemeToggle />
      </div>
    </KitSection>

    <KitSection title="VCard" description="Единая карточка: поверхность, отступы, тона и состояния.">
      <div class="space-y-6">
        <KitRow label="variant">
          <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <VCard v-for="variant in cardVariants" :key="variant" :variant="variant" :title="variant" subtitle="Variant" hover>
              <p class="text-sm text-gray-dark-25 dark:text-gray-main">Content</p>

              <template #footer>
                <span class="text-xs text-gray-main">Footer</span>
              </template>
            </VCard>
          </div>
        </KitRow>

        <KitRow label="padding">
          <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <VCard v-for="padding in cardPaddings" :key="padding" :padding="padding" title="Padding" :subtitle="padding">
              <p class="text-sm text-gray-dark-25 dark:text-gray-main">Content</p>
            </VCard>
          </div>
        </KitRow>

        <KitRow label="tone">
          <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <VCard v-for="tone in cardTones" :key="tone" :tone="tone" :title="tone" subtitle="Tone">
              <p class="text-sm">{{ tone }} content</p>
            </VCard>
          </div>
        </KitRow>

        <KitRow label="states">
          <div class="grid gap-3 md:grid-cols-3">
            <VCard title="Hover" hover>Hover me</VCard>
            <VCard title="Disabled" disabled>Disabled content</VCard>
          </div>
        </KitRow>

        <KitRow label="header / footer">
          <VCard title="With actions" subtitle="Header, content and footer">
            <template #header>
              <VButton size="sm" color="cyan" variant="outline">Action</VButton>
            </template>

            <p class="text-sm text-gray-dark-25 dark:text-gray-main">Card content</p>

            <template #footer>
              <span class="text-xs text-gray-main">Footer content</span>
            </template>
          </VCard>
        </KitRow>
      </div>
    </KitSection>

    <KitSection title="CardNotification" description="Уведомление с цветовой полосой.">
      <div class="space-y-2">
        <CardNotification
          v-for="notification in notifications"
          :key="notification.date"
          :is-new="notification.isNew"
          :color="notification.color"
          :timeout="notification.timeout"
          :date="notification.date"
          :text="notification.text"
          class="glass-inset rounded-md"
        />
      </div>
    </KitSection>

    <KitSection title="Dashboard cards" description="Плитки dashboard: button, dimmer, input, list, info, date.">
      <div class="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-3">
        <CardButton v-bind="dashButton" @set-state="dashButton.value = $event ? 1 : 0">
          <template #icon="{ icon }">
            <VIcon :name="icon" />
          </template>
        </CardButton>

        <CardDimmer v-bind="dashDimmer" @set-state="setDashValue(dashDimmer, $event)">
          <template #icon="{ icon }">
            <VIcon :name="icon" />
          </template>
        </CardDimmer>

        <CardInput v-bind="dashInput" @set-state="setDashValue(dashInput, $event)">
          <template #icon="{ icon }">
            <VIcon :name="icon" />
          </template>
        </CardInput>

        <CardList v-bind="dashList" @set-state="setDashValue(dashList, $event)">
          <template #icon="{ icon }">
            <VIcon :name="icon" />
          </template>
        </CardList>

        <CardInfo v-bind="dashInfo">
          <template #icon="{ icon }">
            <VIcon :name="icon" />
          </template>
        </CardInfo>

        <CardDate v-bind="dashDate" @set-state="setDashValue(dashDate, $event)">
          <template #icon="{ icon }">
            <VIcon :name="icon" />
          </template>
        </CardDate>
      </div>
    </KitSection>

    <KitSection title="BlockBreadcrumb" description="Хлебные крошки.">
      <BlockBreadcrumb :items="breadcrumbs" />
    </KitSection>

    <KitSection title="BlockInfo" description="Информация об устройстве.">
      <BlockInfo v-bind="device" :pkg="pkg">
        <template #links="{ links }">
          <a v-for="link in links" :key="link.name" :href="link.href" class="text-sm text-blue-main hover:underline">{{ link.name }}</a>
        </template>
      </BlockInfo>
    </KitSection>

    <KitSection title="BlockStatus" description="Занятость памяти и аптайм.">
      <BlockStatus v-bind="device" :pkg="pkg">
        <template #name="{ item }">
          <span>{{ item.name }}</span>
        </template>
      </BlockStatus>
    </KitSection>

    <KitSection title="BlockService" description="Язык, перезагрузка и сброс настроек.">
      <BlockService :locale="locale" :locales="locales" @locale="locale = $event.value" />
    </KitSection>

    <KitSection title="BlockUpdate" description="Загрузка прошивки и файловой системы.">
      <BlockUpdate>
        <template #default="{ file }">
          <span class="text-sm text-gray-dark-25 dark:text-gray-main">{{ file || 'No file selected' }}</span>
        </template>
      </BlockUpdate>
    </KitSection>

    <KitSection title="BlockScan" description="Список Wi-Fi сетей.">
      <BlockScan :items="scanItems" />
    </KitSection>
  </div>
</template>
