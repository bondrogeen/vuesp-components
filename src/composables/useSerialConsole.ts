import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';

import type {
  ISerialConsoleLabels,
  ISerialConsoleNoReplyHint,
  ISerialConsoleLine,
  ISerialConsoleTransport,
  ISerialConsoleView,
  TSerialConsoleDirection,
  TSerialConsoleEncoding,
  TSerialConsoleLineEnding,
  TSerialConsoleLocale,
} from '@/components/serial/types';

const LINE_IDLE_MS = 150;
const RX_MAX_BUFFER = 4096;
const PAUSE_MAX_BUFFER = 256 * 1024;
const MAX_QUICK_COMMANDS = 12;
const COPIED_TIMEOUT_MS = 1200;

const DECODERS: Record<TSerialConsoleEncoding, string> = { utf8: 'utf-8', cp1251: 'windows-1251' };

const DEFAULT_VIEW: ISerialConsoleView = {
  encoding: 'utf8',
  framing: 'line',
  gapMs: 25,
  paused: false,
};

const decodeText = (bytes: Uint8Array, encoding: TSerialConsoleEncoding): string =>
  // eslint-disable-next-line no-control-regex
  new TextDecoder(DECODERS[encoding]).decode(bytes).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '.');

const toHex = (bytes: Uint8Array): string => Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join(' ');

export interface ISerialConsoleSegment {
  text: string;
  match: boolean;
}

export interface IUseSerialConsoleOptions {
  transport: () => ISerialConsoleTransport;
  locale: () => TSerialConsoleLocale;
  labels: () => ISerialConsoleLabels;
  maxLines: () => number;
  storageKey?: () => string | undefined;
  initialQuickCommands?: () => string[];
  initialLineEnding?: () => TSerialConsoleLineEnding | undefined;
  noReplyHint?: () => ISerialConsoleNoReplyHint | undefined;
}

export function useSerialConsole(options: IUseSerialConsoleOptions) {
  const lines = ref<ISerialConsoleLine[]>([]);
  const view = reactive<ISerialConsoleView>({ ...DEFAULT_VIEW });

  const rxBytes = ref(0);
  const txBytes = ref(0);
  const rxRate = ref(0);
  const txRate = ref(0);

  const input = ref('');
  const hexSend = ref(false);
  const lineEnding = ref<TSerialConsoleLineEnding>(options.initialLineEnding?.() ?? 'crlf');
  const history = ref<string[]>([]);
  const historyIndex = ref(-1);

  const filter = ref('');
  const hexMode = ref(false);
  const showTime = ref(true);
  const wrapLines = ref(true);
  const autoScroll = ref(true);
  const copied = ref(false);
  const showNoReply = ref(false);

  const quickCommands = ref<string[]>([]);
  const quickInput = ref('');

  let lineId = 0;
  let rxBuffer: number[] = [];
  let pausedBuffer: number[] = [];
  let rxFlushTimer: ReturnType<typeof setTimeout> | null = null;
  let rateTimer: ReturnType<typeof setInterval> | null = null;
  let hintTimer: ReturnType<typeof setTimeout> | null = null;
  let lastQuick = '';
  let copiedTimer: ReturnType<typeof setTimeout> | null = null;
  let rateRx = 0;
  let rateTx = 0;
  let rateAt = 0;
  let unsubscribe: (() => void) | null = null;

  const storage = (suffix: string): string | null => {
    const key = options.storageKey?.();
    return key ? `${key}:${suffix}` : null;
  };

  const readStorage = <T>(suffix: string): T | null => {
    const key = storage(suffix);
    if (!key || typeof localStorage === 'undefined') return null;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  };

  const writeStorage = (suffix: string, value: unknown): void => {
    const key = storage(suffix);
    if (!key || typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage may be unavailable in private mode.
    }
  };

  const savedView = readStorage<Partial<ISerialConsoleView>>('view');
  if (savedView) Object.assign(view, savedView, { paused: false });
  view.paused = false;

  const savedQuick = readStorage<string[]>('quick');
  const defaultQuick = options.initialQuickCommands?.() ?? [];
  quickCommands.value = (savedQuick ?? defaultQuick).filter((item) => typeof item === 'string').slice(0, MAX_QUICK_COMMANDS);

  watch(view, () => writeStorage('view', { ...view, paused: false }), { deep: true });

  const pushLine = (dir: TSerialConsoleDirection, bytes: Uint8Array): void => {
    const decoded = decodeText(bytes, view.encoding);
    lines.value.push({
      id: ++lineId,
      dir,
      at: new Date().toLocaleTimeString(options.locale() === 'ru' ? 'ru-RU' : 'en-GB', { hour12: false }),
      text: view.framing === 'gap' ? decoded.replace(/[\r\n]+/g, ' ') : decoded,
      hex: toHex(bytes),
      bytes: bytes.length,
    });
    const max = options.maxLines();
    if (lines.value.length > max) lines.value.splice(0, lines.value.length - max);
  };

  const clearRxTimer = (): void => {
    if (!rxFlushTimer) return;
    clearTimeout(rxFlushTimer);
    rxFlushTimer = null;
  };

  const flushRx = (): void => {
    clearRxTimer();
    if (!rxBuffer.length) return;
    const bytes = new Uint8Array(rxBuffer);
    rxBuffer = [];
    pushLine('rx', bytes);
  };

  const scheduleRxFlush = (): void => {
    clearRxTimer();
    const idle = view.framing === 'gap' ? Math.max(5, view.gapMs) : LINE_IDLE_MS;
    rxFlushTimer = setTimeout(flushRx, idle);
  };

  const ingestRx = (value: Uint8Array): void => {
    for (const byte of value) rxBuffer.push(byte);

    if (view.framing === 'line') {
      let start = 0;
      for (let i = 0; i < rxBuffer.length; i++) {
        const byte = rxBuffer[i];
        if (byte !== 10 && byte !== 13) continue;

        const line = rxBuffer.slice(start, i);
        if (line.length) pushLine('rx', new Uint8Array(line));
        if (byte === 13 && rxBuffer[i + 1] === 10) i++;
        start = i + 1;
      }
      if (start) rxBuffer = rxBuffer.slice(start);
    }

    if (rxBuffer.length >= RX_MAX_BUFFER) flushRx();
    else scheduleRxFlush();
  };

  const clearHint = (): void => {
    if (hintTimer) clearTimeout(hintTimer);
    hintTimer = null;
    showNoReply.value = false;
  };

  const armHint = (before: number): void => {
    const hint = options.noReplyHint?.();
    if (!hint) return;
    clearHint();
    hintTimer = setTimeout(() => {
      if (rxBytes.value === before) showNoReply.value = true;
    }, hint.delay ?? 1500);
  };

  const handleData = (value: Uint8Array): void => {
    if (!value?.length) return;
    if (showNoReply.value) clearHint();
    rxBytes.value += value.length;

    if (view.paused) {
      for (const byte of value) pausedBuffer.push(byte);
      if (pausedBuffer.length > PAUSE_MAX_BUFFER) pausedBuffer.splice(0, pausedBuffer.length - PAUSE_MAX_BUFFER);
      return;
    }

    ingestRx(value);
  };

  const bindTransport = (): void => {
    unsubscribe?.();
    unsubscribe = options.transport().subscribe(handleData);
  };

  watch(
    () => view.paused,
    (paused) => {
      if (paused || !pausedBuffer.length) return;
      const bytes = new Uint8Array(pausedBuffer);
      pausedBuffer = [];
      ingestRx(bytes);
    },
  );

  const sendPayload = async (bytes: Uint8Array): Promise<boolean> => {
    const ok = await options.transport().send(bytes);
    if (ok) {
      txBytes.value += bytes.length;
      pushLine('tx', bytes);
    }
    return ok;
  };

  const hexNormalized = computed(() => input.value.replace(/^0x/i, '').replace(/0x/gi, '').replace(/[^0-9a-fA-F]/g, ''));

  const hexInvalid = computed(() => {
    const cleaned = input.value.replace(/0x/gi, '').replace(/[\s,;:]/g, '');
    return cleaned.length > 0 && /[^0-9a-fA-F]/.test(cleaned);
  });

  const hexBytes = computed(() => {
    const clean = hexNormalized.value;
    const result: number[] = [];
    for (let i = 0; i + 1 < clean.length; i += 2) result.push(parseInt(clean.slice(i, i + 2), 16));
    return result;
  });

  const hexError = computed(() => {
    if (!hexSend.value) return '';
    if (hexInvalid.value) return options.labels().hexInvalid;
    if (hexNormalized.value && hexNormalized.value.length % 2) return options.labels().hexOdd;
    return '';
  });

  const payloadFor = (command: string, hex: boolean): number[] => {
    if (hex) {
      const clean = command.replace(/0x/gi, '').replace(/[^0-9a-fA-F]/g, '');
      if (!clean.length || clean.length % 2) return [];
      const bytes: number[] = [];
      for (let i = 0; i + 1 < clean.length; i += 2) bytes.push(parseInt(clean.slice(i, i + 2), 16));
      return bytes;
    }

    const bytes = Array.from(new TextEncoder().encode(command));
    if (lineEnding.value === 'cr' || lineEnding.value === 'crlf') bytes.push(13);
    if (lineEnding.value === 'lf' || lineEnding.value === 'crlf') bytes.push(10);
    return bytes;
  };

  const sendText = async (): Promise<void> => {
    if (hexSend.value && (hexError.value || !hexBytes.value.length)) return;

    const command = input.value;
    const payload = payloadFor(command, hexSend.value);
    if (!payload.length) return;

    const ok = await sendPayload(new Uint8Array(payload.slice(0, 4096)));
    if (!ok) return;

    if (command.trim()) {
      history.value = [command, ...history.value.filter((item) => item !== command)].slice(0, 50);
      historyIndex.value = -1;
    }
    input.value = '';
  };

  const sendQuick = async (command: string): Promise<void> => {
    const payload = payloadFor(command, false);
    if (!payload.length) return;
    const before = rxBytes.value;
    const ok = await sendPayload(new Uint8Array(payload.slice(0, 4096)));
    if (!ok) return;
    history.value = [command, ...history.value.filter((item) => item !== command)].slice(0, 50);
    historyIndex.value = -1;
    lastQuick = command;
    armHint(before);
  };

  const applyHintAction = async (): Promise<void> => {
    const hint = options.noReplyHint?.();
    if (!hint?.onAction) return;
    clearHint();
    await hint.onAction();
    if ((hint.resend ?? true) && lastQuick) await sendQuick(lastQuick);
  };

  const onInputKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'ArrowUp') {
      if (!history.value.length) return;
      event.preventDefault();
      historyIndex.value = historyIndex.value === -1 ? history.value.length - 1 : Math.max(0, historyIndex.value - 1);
      input.value = history.value[historyIndex.value] ?? '';
      return;
    }

    if (event.key === 'ArrowDown') {
      if (historyIndex.value === -1) return;
      event.preventDefault();
      historyIndex.value++;
      if (historyIndex.value >= history.value.length) {
        historyIndex.value = -1;
        input.value = '';
      } else {
        input.value = history.value[historyIndex.value] ?? '';
      }
      return;
    }

    if (event.key === 'Escape') {
      input.value = '';
      historyIndex.value = -1;
    }
  };

  const visibleLines = computed(() => {
    const query = filter.value.trim().toLowerCase();
    if (!query) return lines.value;
    return lines.value.filter((line) => line.text.toLowerCase().includes(query) || line.hex.toLowerCase().includes(query));
  });

  const lineContent = (line: ISerialConsoleLine): string => (hexMode.value ? line.hex : line.text || line.hex);

  const lineSegments = (value: string): ISerialConsoleSegment[] => {
    const query = filter.value.trim().toLowerCase();
    if (!query) return [{ text: value, match: false }];
    const haystack = value.toLowerCase();
    const parts: ISerialConsoleSegment[] = [];
    let index = 0;
    while (index < value.length) {
      const found = haystack.indexOf(query, index);
      if (found === -1) break;
      if (found > index) parts.push({ text: value.slice(index, found), match: false });
      parts.push({ text: value.slice(found, found + query.length), match: true });
      index = found + query.length;
    }
    if (index < value.length) parts.push({ text: value.slice(index), match: false });
    return parts.length ? parts : [{ text: value, match: false }];
  };

  const logText = (): string => lines.value.map((line) => `${line.at} ${line.dir.toUpperCase()} ${line.text || line.hex}`).join('\n');

  const copyLog = async (): Promise<boolean> => {
    if (!lines.value.length) return false;
    try {
      await navigator.clipboard.writeText(logText());
      copied.value = true;
      if (copiedTimer) clearTimeout(copiedTimer);
      copiedTimer = setTimeout(() => {
        copied.value = false;
      }, COPIED_TIMEOUT_MS);
      return true;
    } catch {
      return false;
    }
  };

  const downloadLog = (): boolean => {
    if (!lines.value.length) return false;
    const blob = new Blob([logText()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.href = url;
    link.download = `serial-${stamp}.log`;
    link.click();
    URL.revokeObjectURL(url);
    return true;
  };

  const clearLog = (): void => {
    clearHint();
    clearRxTimer();
    rxBuffer = [];
    pausedBuffer = [];
    lines.value = [];
    rxBytes.value = 0;
    txBytes.value = 0;
    rxRate.value = 0;
    txRate.value = 0;
    rateRx = 0;
    rateTx = 0;
    rateAt = performance.now();
  };

  const formatBytes = (value: number): string => {
    const labels = options.labels();
    if (value < 1024) return `${value} ${labels.byteShort}`;
    if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} ${labels.kiloShort}`;
    return `${(value / (1024 * 1024)).toFixed(2)} ${labels.megaShort}`;
  };

  const sampleRates = (): void => {
    const now = performance.now();
    const seconds = (now - rateAt) / 1000;
    if (seconds <= 0) return;
    rxRate.value = Math.max(0, Math.round((rxBytes.value - rateRx) / seconds));
    txRate.value = Math.max(0, Math.round((txBytes.value - rateTx) / seconds));
    rateRx = rxBytes.value;
    rateTx = txBytes.value;
    rateAt = now;
  };

  const addQuick = (): void => {
    const value = quickInput.value.trim();
    if (!value) return;
    if (!quickCommands.value.includes(value)) quickCommands.value = [...quickCommands.value, value].slice(0, MAX_QUICK_COMMANDS);
    quickInput.value = '';
    writeStorage('quick', quickCommands.value);
  };

  const removeQuick = (command: string): void => {
    quickCommands.value = quickCommands.value.filter((item) => item !== command);
    writeStorage('quick', quickCommands.value);
  };

  const onGlobalKeydown = (event: KeyboardEvent): void => {
    if (!event.ctrlKey) return;
    if (event.key.toLowerCase() === 'l') {
      event.preventDefault();
      clearLog();
    }
    if (event.shiftKey && event.key.toLowerCase() === 'c') {
      event.preventDefault();
      void copyLog();
    }
  };

  onMounted(() => {
    bindTransport();
    rateAt = performance.now();
    rateTimer = setInterval(sampleRates, 1000);
    window.addEventListener('keydown', onGlobalKeydown);
  });

  onBeforeUnmount(() => {
    unsubscribe?.();
    unsubscribe = null;
    clearHint();
    clearRxTimer();
    if (rateTimer) clearInterval(rateTimer);
    if (copiedTimer) clearTimeout(copiedTimer);
    window.removeEventListener('keydown', onGlobalKeydown);
  });

  return {
    lines,
    visibleLines,
    view,
    rxBytes,
    txBytes,
    rxRate,
    txRate,
    input,
    hexSend,
    lineEnding,
    history,
    filter,
    hexMode,
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
    clearLog,
    formatBytes,
    addQuick,
    removeQuick,
    applyHintAction,
  };
}
