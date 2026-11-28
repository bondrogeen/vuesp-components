import { computed, nextTick, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';
import type { Ref } from 'vue';

import { copyText, downloadBlob, formatLogLine, getLogText, scrollIntoView } from '@/components/script/helpers';
import type { IScriptLog, TLogMode } from '@/components/script/types';

const COPY_FEEDBACK_MS = 1200;
const AUTO_SCROLL_THRESHOLD_PX = 24;

export const useScriptStudioLogs = (
  getScriptName: () => string,
  logs: Ref<readonly IScriptLog[]>,
  onClear: () => void,
) => {
  const isOpen = ref(false);
  const hasUnread = ref(false);
  const pulseSeq = ref(0);
  const isPaused = ref(false);
  const isSearchOpen = ref(false);
  const isAutoScroll = ref(true);
  const isCopied = ref(false);
  const mode = ref<TLogMode>('text');
  const search = ref('');
  const pausedLogs = ref<IScriptLog[]>([]);
  const logsPanel = useTemplateRef<HTMLDivElement>('logsPanel');
  const logEl = useTemplateRef<HTMLDivElement>('logEl');
  let copyTimer: ReturnType<typeof setTimeout> | null = null;

  const liveLogs = computed(() => (isPaused.value ? pausedLogs.value : logs.value));

  const visibleLogs = computed(() => {
    const query = search.value.trim().toLowerCase();
    if (!query) return liveLogs.value;
    return liveLogs.value.filter((entry) => entry.text.toLowerCase().includes(query));
  });

  const count = computed(() => logs.value.length);

  const scrollToEnd = () => {
    if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight;
  };

  const openLogs = () => {
    isOpen.value = true;
    hasUnread.value = false;
    void nextTick(() => scrollIntoView(logsPanel.value));
  };

  const onOpen = () => {
    openLogs();
  };

  const onToggleOpen = () => {
    if (isOpen.value) {
      isOpen.value = false;
      return;
    }
    openLogs();
  };

  const onTogglePause = () => {
    if (isPaused.value) {
      isPaused.value = false;
      pausedLogs.value = [];
      return;
    }
    pausedLogs.value = logs.value.map((entry) => ({ ...entry }));
    isPaused.value = true;
  };

  const onToggleSearch = () => {
    isSearchOpen.value = !isSearchOpen.value;
  };

  const onClearLogs = () => {
    pausedLogs.value = [];
    hasUnread.value = false;
    onClear();
  };

  const onFollow = () => {
    isAutoScroll.value = true;
    void nextTick(scrollToEnd);
  };

  const onScroll = () => {
    const element = logEl.value;
    if (!element) return;
    isAutoScroll.value =
      element.scrollHeight - element.scrollTop - element.clientHeight < AUTO_SCROLL_THRESHOLD_PX;
  };

  const onCopy = async (): Promise<boolean> => {
    if (visibleLogs.value.length === 0) return false;
    const text = visibleLogs.value.map((entry) => formatLogLine(entry, mode.value)).join('\n');
    if (!(await copyText(text))) return false;
    isCopied.value = true;
    if (copyTimer) clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      isCopied.value = false;
    }, COPY_FEEDBACK_MS);
    return true;
  };

  const onDownload = () => {
    if (visibleLogs.value.length === 0) return;
    const text = visibleLogs.value.map((entry) => formatLogLine(entry, mode.value)).join('\n');
    downloadBlob(text, `script-${getScriptName() || 'script'}.log`, 'text/plain');
  };

  watch(count, (value, previous) => {
    if (!isOpen.value && value > previous) {
      hasUnread.value = true;
      pulseSeq.value += 1;
    }
  });

  watch(
    [() => visibleLogs.value.length, mode, search],
    () => {
      if (!isAutoScroll.value) return;
      void nextTick(scrollToEnd);
    },
  );

  onBeforeUnmount(() => {
    if (copyTimer) clearTimeout(copyTimer);
  });

  return {
    logs,
    liveLogs,
    visibleLogs,
    count,
    isOpen,
    hasUnread,
    pulseSeq,
    isPaused,
    isSearchOpen,
    isAutoScroll,
    isCopied,
    mode,
    search,
    logsPanel,
    logEl,
    onOpen,
    onToggleOpen,
    onTogglePause,
    onToggleSearch,
    onClear: onClearLogs,
    onFollow,
    onScroll,
    onCopy,
    onDownload,
    getLogText,
  };
};
