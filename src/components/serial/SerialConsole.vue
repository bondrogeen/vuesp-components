<template>
  <VCard variant="glass" padding="none" :class="compact ? '' : 'relative'">
    <div class="flex flex-wrap items-center gap-3 border-b border-gray-light-10/70 px-3 py-2.5 dark:border-white/10">
      <div class="flex items-center gap-2">
        <span class="size-2.5 rounded-full" :class="statusDotClass" />
        <span class="text-sm font-medium">{{ statusText }}</span>
      </div>
      <span class="hidden h-4 w-px bg-gray-light-10/70 dark:bg-white/10 sm:block" />
      <span class="min-w-0 truncate font-mono text-xs text-gray-dark-25 dark:text-gray-main">
        {{ portLabel ? `${labels.usb} ${portLabel}` : labels.noPort }}
      </span>
      <div class="ml-auto flex flex-wrap items-center gap-2">
        <slot name="header-actions" />
        <VButton v-if="caps.connection !== false" :color="connected ? 'red' : 'blue'" :variant="connected ? 'outline' : 'solid'" @click="onConnect">
          {{ connected ? labels.disconnect : labels.connect }}
        </VButton>
        <VButton type="icon" variant="ghost" color="gray" :title="labels.settings" :aria-label="labels.settings" @click="settingsOpen = !settingsOpen">
          <VIcon name="settings" :size="17" />
        </VButton>
      </div>
    </div>

    <div v-if="settingsOpen" class="border-b border-gray-light-10/70 px-3 py-3 dark:border-white/10">
      <slot name="settings" />

      <div v-if="$slots['settings-actions'] || onApply || onReset" class="mt-3">
        <slot name="settings-actions">
          <div class="flex flex-wrap items-center gap-3">
            <VButton v-if="onApply" color="blue" @click="onApply">{{ labels.apply }}</VButton>
            <VButton v-if="onReset" variant="outline" color="gray" @click="onReset">{{ labels.reset }}</VButton>
            <span v-if="dirty" class="text-xs text-amber-600 dark:text-amber-400">{{ labels.unsaved }}</span>
          </div>
        </slot>
      </div>

      <div v-if="caps.encoding || caps.framing" class="mt-3 grid gap-3 sm:grid-cols-3">
        <VSelect
          v-if="caps.encoding"
          :model-value="selectName(encodingItems, view.encoding)"
          hide-message
          :items="encodingItems"
          :label="labels.encoding"
          @change="onEncoding"
        />
        <VSelect
          v-if="caps.framing"
          :model-value="selectName(framingItems, view.framing)"
          hide-message
          :items="framingItems"
          :label="labels.framing"
          @change="onFraming"
        />
        <VSelect
          v-if="caps.framing && view.framing === 'gap'"
          :model-value="selectName(gapItems, view.gapMs)"
          hide-message
          :items="gapItems"
          :label="labels.gap"
          @change="onGap"
        />
        <p class="text-[11px] text-gray-dark-25 dark:text-gray-main sm:col-span-3">{{ labels.framingHint }}</p>
      </div>

      <div v-if="caps.quickCommands" class="mt-3">
        <p class="text-[11px] text-gray-dark-25 dark:text-gray-main">{{ labels.quickCommands }}</p>
        <div class="mt-1 flex flex-wrap items-center gap-2">
          <span
            v-for="command of quickCommands"
            :key="command"
            class="inline-flex items-center gap-1 rounded-md border border-gray-light-10/70 py-1 pl-2 pr-1 text-xs dark:border-white/10"
          >
            <span class="font-mono text-gray-dark-40 dark:text-gray-light-10">{{ command }}</span>
            <button
              type="button"
              class="grid size-5 place-items-center rounded text-gray-main transition hover:bg-red-main/10 hover:text-red-main"
              :title="labels.quickRemove"
              :aria-label="labels.quickRemove"
              @click="removeQuick(command)"
            >
              <VIcon name="close" :size="12" />
            </button>
          </span>
          <span v-if="!quickCommands.length" class="text-[11px] text-gray-dark-25 dark:text-gray-main">{{ labels.quickEmpty }}</span>
        </div>
        <div class="mt-2 flex items-end gap-2">
          <VTextField
            class="max-w-xs"
            hide-message
            :model-value="quickInput"
            :label="labels.quickAdd"
            @update:model-value="quickInput = String($event)"
            @enter="addQuick"
          />
          <VButton size="sm" color="blue" variant="soft" :disabled="!quickInput.trim()" @click="addQuick">
            {{ labels.quickAddButton }}
          </VButton>
        </div>
      </div>

      <div v-if="$slots['settings-extra']" class="mt-3">
        <slot name="settings-extra" />
      </div>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-2 border-b border-gray-light-10/70 bg-gray-dark-40/[0.03] px-3 py-2 dark:border-white/10 dark:bg-black/20">
      <div class="flex flex-wrap items-center gap-2">
        <div class="flex items-center gap-1 rounded-md border border-gray-light-10/70 p-0.5 dark:border-white/10">
          <VButton size="xs" :variant="mode === 'text' ? 'soft' : 'ghost'" :color="mode === 'text' ? 'blue' : 'gray'" @click="mode = 'text'">{{ labels.textMode }}</VButton>
          <VButton size="xs" :variant="mode === 'hex' ? 'soft' : 'ghost'" :color="mode === 'hex' ? 'blue' : 'gray'" @click="mode = 'hex'">{{ labels.hexMode }}</VButton>
          <VButton v-if="caps.binary" size="xs" :variant="mode === 'bin' ? 'soft' : 'ghost'" :color="mode === 'bin' ? 'blue' : 'gray'" @click="mode = 'bin'">{{ labels.binMode }}</VButton>
        </div>
        <VCheckbox :model-value="showTime" @update:model-value="showTime = Boolean($event)">{{ labels.showTime }}</VCheckbox>
        <VCheckbox :model-value="wrapLines" @update:model-value="wrapLines = Boolean($event)">{{ labels.wrap }}</VCheckbox>
        <VCheckbox :model-value="autoScroll" @update:model-value="autoScroll = Boolean($event)">{{ labels.autoscroll }}</VCheckbox>
        <span class="hidden h-4 w-px bg-gray-light-10/70 dark:bg-white/10 sm:block" />
        <span class="text-[11px] text-gray-dark-25 dark:text-gray-main">
          {{ filter ? `${visibleLines.length}/${lines.length}` : lines.length }} {{ labels.lines }}
        </span>
      </div>

      <div class="flex items-center gap-1">
        <VButton
          v-if="caps.pause"
          type="icon"
          size="sm"
          :variant="view.paused ? 'soft' : 'ghost'"
          :color="view.paused ? 'amber' : 'gray'"
          :title="view.paused ? labels.resume : labels.pause"
          :aria-label="view.paused ? labels.resume : labels.pause"
          @click="view.paused = !view.paused"
        >
          <VIcon :name="view.paused ? 'play-circle' : 'stop-circle'" :size="16" />
        </VButton>
        <VButton
          v-if="caps.search"
          type="icon"
          size="sm"
          :variant="showSearch ? 'soft' : 'ghost'"
          color="gray"
          :title="labels.search"
          :aria-label="labels.search"
          @click="showSearch = !showSearch"
        >
          <VIcon name="search" :size="16" />
        </VButton>
        <VButton type="icon" size="sm" variant="ghost" color="gray" :title="labels.clear" :aria-label="labels.clear" @click="onClear">
          <VIcon name="eraser" :size="16" />
        </VButton>
        <VButton
          type="icon"
          size="sm"
          variant="ghost"
          color="gray"
          :disabled="!lines.length"
          :title="copied ? labels.copied : labels.copy"
          :aria-label="labels.copy"
          @click="copyLog"
        >
          <VIcon :name="copied ? 'check' : 'copy'" :size="16" :class="copied ? 'text-green-main' : ''" />
        </VButton>
        <VDropdown v-if="caps.export" right="0">
          <template #activator="{ on }">
            <VButton type="icon" size="sm" variant="ghost" color="gray" :disabled="!lines.length" :title="labels.export" :aria-label="labels.export" @click="on.click">
              <VIcon name="download" :size="16" />
            </VButton>
          </template>
          <template #default="{ on }">
            <VList :items="exportItems" @click="onExport($event, on)" />
          </template>
        </VDropdown>
        <VButton
          v-else-if="caps.download"
          type="icon"
          size="sm"
          variant="ghost"
          color="gray"
          :disabled="!lines.length"
          :title="labels.download"
          :aria-label="labels.download"
          @click="downloadLog"
        >
          <VIcon name="download" :size="16" />
        </VButton>
        <slot name="toolbar-extra" />
      </div>
    </div>

    <div v-if="showSearch" class="border-b border-gray-light-10/70 px-3 py-2 dark:border-white/10">
      <VTextField
        :model-value="filter"
        hide-message
        :label="labels.search"
        :placeholder="labels.searchPlaceholder"
        @update:model-value="filter = String($event)"
      />
    </div>

    <div class="relative">
      <div
        ref="logEl"
        class="h-[min(52vh,30rem)] min-h-[18rem] overflow-auto bg-gray-dark-40/[0.05] p-4 font-mono text-xs leading-6 scrollbar dark:bg-black/35"
        @scroll="onLogScroll"
      >
        <div v-if="!visibleLines.length" class="flex h-full flex-col items-center justify-center gap-3 text-center text-gray-dark-25 dark:text-gray-light-10">
          <span class="grid size-12 place-items-center rounded-full bg-gray-dark-40/5 text-gray-main dark:bg-white/5">
            <VIcon name="code" :size="24" />
          </span>
          <p>{{ filter ? labels.noMatches : connected ? labels.waiting : labels.empty }}</p>
        </div>
        <div
          v-for="line of visibleLines"
          :key="line.id"
          class="break-all"
          :class="[
            caps.inspector ? 'cursor-pointer rounded px-1 -mx-1 transition hover:bg-gray-dark-40/5 dark:hover:bg-white/5' : '',
            selectedLine?.id === line.id ? 'bg-blue-main/10 dark:bg-blue-main/15' : '',
          ]"
          @click="caps.inspector && selectLine(line)"
        >
          <span v-if="showTime" class="mr-2 text-gray-dark-25 dark:text-gray-main">{{ line.at }}</span>
          <span :class="line.dir === 'rx' ? 'text-emerald-600 dark:text-emerald-400' : 'text-sky-600 dark:text-sky-400'">{{ line.dir.toUpperCase() }}</span>
          <span class="ml-2 text-gray-dark-40 dark:text-gray-light-10" :class="wrapLines ? 'whitespace-pre-wrap break-all' : 'whitespace-pre'">
            <template v-for="(part, index) of lineSegments(lineContent(line))" :key="index">
              <mark v-if="part.match" class="rounded-sm bg-amber-main/40 text-gray-dark-40 dark:text-white">{{ part.text }}</mark>
              <span v-else>{{ part.text }}</span>
            </template>
          </span>
        </div>
      </div>
      <div v-if="!autoScroll && visibleLines.length" class="absolute bottom-3 right-3 z-10 flex">
        <VButton size="sm" color="blue" variant="soft" class="flex" @click="followOutput">
          <VIcon name="chevron-down" :size="14" />
          {{ labels.follow }}
        </VButton>
      </div>
    </div>

    <div v-if="caps.inspector && selectedLine" class="border-t border-gray-light-10/70 px-3 py-2 dark:border-white/10">
      <div class="flex items-center justify-between gap-2">
        <span class="text-[11px] font-medium text-gray-dark-40 dark:text-gray-light-10">
          {{ labels.inspector }} · {{ selectedLine.bytes }} {{ labels.bytes }}
        </span>
        <VButton type="icon" size="sm" variant="ghost" color="gray" :title="labels.clear" :aria-label="labels.clear" @click="selectedId = null">
          <VIcon name="close" :size="14" />
        </VButton>
      </div>
      <div class="mt-1 overflow-x-auto">
        <table class="w-full min-w-[40rem] border-collapse font-mono text-[11px] text-gray-dark-25 dark:text-gray-main">
          <thead>
            <tr class="text-left text-gray-main">
              <th class="px-1 py-1 font-normal">{{ labels.offset }}</th>
              <th class="px-1 py-1 font-normal">HEX</th>
              <th class="px-1 py-1 font-normal">u8</th>
              <th class="px-1 py-1 font-normal">i8</th>
              <th class="px-1 py-1 font-normal">u16 LE</th>
              <th class="px-1 py-1 font-normal">u16 BE</th>
              <th class="px-1 py-1 font-normal">u32 LE</th>
              <th class="px-1 py-1 font-normal">u32 BE</th>
              <th class="px-1 py-1 font-normal">f32 LE</th>
              <th class="px-1 py-1 font-normal">f32 BE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row of inspectorRows" :key="row.offset" class="border-t border-gray-light-10/40 dark:border-white/5">
              <td class="px-1 py-0.5 text-gray-main">{{ row.offset }}</td>
              <td class="px-1 py-0.5 text-gray-dark-40 dark:text-gray-light-10">{{ row.hex }}</td>
              <td class="px-1 py-0.5">{{ row.u8 }}</td>
              <td class="px-1 py-0.5">{{ row.i8 }}</td>
              <td class="px-1 py-0.5">{{ row.u16le }}</td>
              <td class="px-1 py-0.5">{{ row.u16be }}</td>
              <td class="px-1 py-0.5">{{ row.u32le }}</td>
              <td class="px-1 py-0.5">{{ row.u32be }}</td>
              <td class="px-1 py-0.5">{{ row.f32le }}</td>
              <td class="px-1 py-0.5">{{ row.f32be }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="caps.counters" class="flex flex-wrap items-center gap-3 border-t border-gray-light-10/70 px-3 py-1.5 text-[11px] text-gray-dark-25 dark:border-white/10 dark:text-gray-main">
      <span class="font-mono"><span class="text-emerald-600 dark:text-emerald-400">{{ labels.rx }}</span> {{ formatBytes(rxBytes) }} <span class="text-gray-main">{{ formatBytes(rxRate) + labels.perSecond }}</span></span>
      <span class="font-mono"><span class="text-sky-600 dark:text-sky-400">{{ labels.tx }}</span> {{ formatBytes(txBytes) }} <span class="text-gray-main">{{ formatBytes(txRate) + labels.perSecond }}</span></span>
      <span v-if="view.paused" class="font-medium text-amber-main">{{ labels.paused }}</span>
      <span v-if="sessionRestored" class="text-gray-main">{{ labels.sessionRestored }}</span>
    </div>

    <div class="rounded-b-xl border-t border-gray-light-10/70 bg-gray-dark-40/[0.02] p-3 dark:border-white/10 dark:bg-black/15">
      <div class="mb-4 flex items-end gap-2">
        <VTextField
          class="flex-1"
          hide-message
          :model-value="input"
          :error="hexError || undefined"
          :label="hexSend ? labels.hexLabel : labels.input"
          :placeholder="hexSend ? labels.hexPlaceholder : labels.placeholder"
          @update:model-value="input = String($event)"
          @enter="sendText"
          @keydown="onInputKeydown"
        />
        <VButton class="h-10 shrink-0" color="blue" :disabled="!canSend" @click="sendText">{{ labels.send }}</VButton>
      </div>

      <div v-if="caps.quickCommands" class="mt-1 flex flex-wrap items-center gap-2">
        <span class="mr-1 text-[11px] text-gray-dark-25 dark:text-gray-main">{{ labels.quickCommands }}</span>
        <VButton
          v-for="command of quickCommands"
          :key="command"
          size="xs"
          variant="outline"
          color="blue"
          :disabled="!connected || hexSend"
          @click="sendQuick(command)"
        >
          {{ command }}
        </VButton>
        <div class="ml-auto flex flex-wrap items-center gap-2">
          <VSelect
            class="w-28"
            hide-message
            :model-value="selectName(lineEndingItems, lineEnding)"
            :items="lineEndingItems"
            :label="labels.lineEnding"
            :disabled="hexSend"
            @change="onLineEnding"
          />
          <div class="flex items-center gap-1 rounded-md border border-gray-light-10/70 p-0.5 dark:border-white/10">
            <VButton size="xs" :variant="!hexSend ? 'soft' : 'ghost'" :color="!hexSend ? 'blue' : 'gray'" @click="hexSend = false">{{ labels.textMode }}</VButton>
            <VButton size="xs" :variant="hexSend ? 'soft' : 'ghost'" :color="hexSend ? 'blue' : 'gray'" @click="hexSend = true">{{ labels.hexMode }}</VButton>
          </div>
        </div>
      </div>

      <div v-if="showNoReply && noReplyHint" class="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
        <span class="text-amber-main">{{ noReplyHint.text }}</span>
        <VButton v-if="noReplyHint.actionLabel && noReplyHint.onAction" size="xs" variant="soft" color="gray" @click="applyHintAction">
          {{ noReplyHint.actionLabel }}
        </VButton>
      </div>

      <div v-if="caps.escape || caps.repeat || caps.file" class="mt-2 flex flex-wrap items-center gap-3">
        <VCheckbox v-if="caps.escape && !hexSend" :model-value="escape" @update:model-value="escape = Boolean($event)">{{ labels.escape }}</VCheckbox>
        <template v-if="caps.repeat">
          <VButton size="xs" variant="soft" :color="repeat ? 'red' : 'blue'" @click="toggleRepeat">
            {{ repeat ? labels.repeatStop : labels.repeat }}
          </VButton>
          <div class="w-36 shrink-0">
            <VSelect hide-message :model-value="selectName(repeatItems, repeatMs)" :items="repeatItems" :label="labels.repeatInterval" @change="onRepeatMs" />
          </div>
        </template>
        <VButton v-if="caps.file" size="xs" variant="ghost" color="gray" @click="fileInput?.click()">
          <VIcon name="upload" :size="14" />
          {{ labels.file }}
        </VButton>
        <input ref="fileInput" type="file" class="hidden" @change="onFileChange" />
      </div>

      <p v-if="hexSend" class="mt-1 text-[11px]" :class="hexError ? 'text-red-main' : 'text-gray-dark-25 dark:text-gray-main'">
        {{ hexError || `${hexBytes.length} ${labels.bytes} · ${labels.hexHint}` }}
      </p>

      <p v-if="!compact" class="mt-2 text-[11px] text-gray-dark-25 dark:text-gray-main">{{ labels.shortcuts }}</p>
      <p v-if="error" class="mt-1 text-xs text-red-main">{{ labels.error }}: {{ error }}</p>
    </div>

    <div v-if="$slots.footer" class="border-t border-gray-light-10/70 px-3 py-2 dark:border-white/10">
      <slot name="footer" />
    </div>
  </VCard>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import type {
  ISelectItem,
  ISerialConsoleLabels,
  ISerialConsoleProps,
  TSerialConsoleEncoding,
  TSerialConsoleFraming,
  TSerialConsoleLineEnding,
} from '@/components/serial/types';

import VButton from '@/components/ui/button/VButton.vue';
import VCard from '@/components/ui/card/VCard.vue';
import VCheckbox from '@/components/ui/checkbox/VCheckbox.vue';
import VDropdown from '@/components/ui/dropdown/VDropdown.vue';
import VIcon from '@/components/ui/icon/VIcon.vue';
import VList from '@/components/ui/list/VList.vue';
import VSelect from '@/components/ui/select/VSelect.vue';
import VTextField from '@/components/ui/text-field/VTextField.vue';

import { serialConsoleLabels } from '@/components/serial/labels';
import { useSerialConsole } from '@/composables/useSerialConsole';

const props = withDefaults(defineProps<ISerialConsoleProps>(), {
  status: 'disconnected',
  error: '',
  portLabel: '',
  locale: 'ru',
  maxLines: 500,
  compact: false,
  dirty: false,
});

const emit = defineEmits<{
  (e: 'connect'): void;
  (e: 'disconnect'): void;
  (e: 'clear'): void;
  (e: 'send', bytes: Uint8Array): void;
}>();

const settingsOpen = ref(false);
const showSearch = ref(false);
const logEl = ref<HTMLElement | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const labels = computed<ISerialConsoleLabels>(() => ({ ...serialConsoleLabels(props.locale), ...props.labels }));

const caps = computed(() => ({
  connection: true,
  pause: true,
  framing: true,
  encoding: true,
  search: true,
  counters: true,
  quickCommands: true,
  download: true,
  ...props.capabilities,
}));

const {
  lines,
  visibleLines,
  view,
  rxBytes,
  txBytes,
  rxRate,
  txRate,
  input,
  hexSend,
  escape,
  repeat,
  repeatMs,
  sendFile,
  toggleRepeat,
  stopRepeat,
  lineEnding,
  filter,
  mode,
  selectedId,
  selectedLine,
  selectLine,
  showTime,
  wrapLines,
  autoScroll,
  copied,
  showNoReply,
  quickCommands,
  quickInput,
  hexBytes,
  hexError,
  sendText,
  sendQuick,
  onInputKeydown,
  lineContent,
  lineSegments,
  copyLog,
  downloadLog,
  exportCsv,
  exportJson,
  exportRxBin,
  sessionRestored,
  clearLog,
  formatBytes,
  addQuick,
  removeQuick,
  applyHintAction,
} = useSerialConsole({
  transport: () => props.transport,
  locale: () => props.locale,
  labels: () => labels.value,
  maxLines: () => props.maxLines,
  storageKey: () => props.storageKey,
  initialQuickCommands: () => props.initialQuickCommands ?? [],
  initialLineEnding: () => props.initialLineEnding,
  noReplyHint: () => props.noReplyHint,
  session: () => props.capabilities?.session ?? false,
});

const connected = computed(() => props.status === 'connected');

const statusText = computed(() => {
  if (props.status === 'connected') return labels.value.connected;
  if (props.status === 'connecting') return labels.value.connecting;
  if (props.status === 'error') return labels.value.error;
  return labels.value.disconnected;
});

const statusDotClass = computed(() => {
  if (props.status === 'connected') return 'bg-green-main';
  if (props.status === 'connecting') return 'bg-amber-main';
  if (props.status === 'error') return 'bg-red-main';
  return 'bg-gray-main';
});

const canSend = computed(() => connected.value && Boolean(input.value.trim()) && !hexError.value);

const encodingItems: ISelectItem<TSerialConsoleEncoding>[] = [
  { name: labels.value.encodingUtf8, value: 'utf8' },
  { name: labels.value.encodingCp1251, value: 'cp1251' },
];
const framingItems: ISelectItem<TSerialConsoleFraming>[] = [
  { name: labels.value.framingLine, value: 'line' },
  { name: labels.value.framingGap, value: 'gap' },
];
const gapItems: ISelectItem<number>[] = [10, 25, 50, 100].map((value) => ({ name: `${value} ${labels.value.ms}`, value }));
const lineEndingItems: ISelectItem<TSerialConsoleLineEnding>[] = [
  { name: labels.value.lineNone, value: 'none' },
  { name: labels.value.lineCr, value: 'cr' },
  { name: labels.value.lineLf, value: 'lf' },
  { name: labels.value.lineCrlf, value: 'crlf' },
];

const selectName = <T,>(items: ISelectItem<T>[], value: T): string => items.find((item) => item.value === value)?.name ?? String(value);

const repeatItems = computed(() => [250, 500, 1000, 2000, 5000].map((value) => ({ name: `${value} ${labels.value.ms}`, value })));

const onRepeatMs = (item: ISelectItem<number>): void => {
  repeatMs.value = item.value;
};

const onFileChange = async (event: Event): Promise<void> => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  target.value = '';
  if (file) await sendFile(file);
};

watch(
  () => props.status,
  (value) => {
    if (value !== 'connected') stopRepeat();
  },
);

const onEncoding = (item: ISelectItem<TSerialConsoleEncoding>): void => {
  view.encoding = item.value;
};
const onFraming = (item: ISelectItem<TSerialConsoleFraming>): void => {
  view.framing = item.value;
};
const onGap = (item: ISelectItem<number>): void => {
  view.gapMs = item.value;
};
const onLineEnding = (item: ISelectItem<TSerialConsoleLineEnding>): void => {
  lineEnding.value = item.value;
};

const scrollToBottom = (): void => {
  if (!autoScroll.value) return;
  if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight;
};

watch([() => lines.value.length, () => filter.value], () => scrollToBottom());

const onLogScroll = (): void => {
  const el = logEl.value;
  if (!el) return;
  autoScroll.value = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
};

const followOutput = (): void => {
  autoScroll.value = true;
  scrollToBottom();
};

const inspectorRows = computed(() => {
  const data = selectedLine.value?.data ?? [];
  const bytesAt = (index: number, size: number): number[] | null => (index + size <= data.length ? data.slice(index, index + size) : null);
  const view = (bytes: number[] | null): DataView | null => (bytes ? new DataView(new Uint8Array(bytes).buffer) : null);
  const float = (value: number | undefined): number | string => (value === undefined ? '—' : Number(value.toFixed(4)));

  return Array.from({ length: Math.min(data.length, 16) }, (_, index) => {
    const u16le = view(bytesAt(index, 2))?.getUint16(0, true);
    const u16be = view(bytesAt(index, 2))?.getUint16(0, false);
    const u32le = view(bytesAt(index, 4))?.getUint32(0, true);
    const u32be = view(bytesAt(index, 4))?.getUint32(0, false);
    const f32le = view(bytesAt(index, 4))?.getFloat32(0, true);
    const f32be = view(bytesAt(index, 4))?.getFloat32(0, false);

    return {
      offset: index,
      hex: data[index].toString(16).padStart(2, '0'),
      u8: data[index],
      i8: (data[index] << 24) >> 24,
      u16le: u16le ?? '—',
      u16be: u16be ?? '—',
      u32le: u32le ?? '—',
      u32be: u32be ?? '—',
      f32le: float(f32le),
      f32be: float(f32be),
    };
  });
});

const exportItems = computed(() => [
  { name: labels.value.exportLog, value: 'log' },
  { name: labels.value.exportCsv, value: 'csv' },
  { name: labels.value.exportJson, value: 'json' },
  { name: labels.value.exportRxBin, value: 'bin' },
]);

const onExport = (item: { value: string }, on?: { set: (value: boolean) => void }): void => {
  if (item.value === 'log') downloadLog();
  else if (item.value === 'csv') exportCsv();
  else if (item.value === 'json') exportJson();
  else if (item.value === 'bin') exportRxBin();
  on?.set(false);
};

const onConnect = async (): Promise<void> => {
  try {
    if (connected.value) {
      emit('disconnect');
      await props.transport.stop();
      return;
    }

    emit('connect');
    await props.transport.start();
  } catch {
    // The host owns error reporting for transport failures.
  }
};

const onClear = (): void => {
  clearLog();
  emit('clear');
};
</script>
