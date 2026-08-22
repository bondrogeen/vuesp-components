<script setup lang="ts">
import type { IScriptEditorProps, IScriptEditorEmit } from './types';
import { onMounted, onUnmounted, watch } from 'vue';
import { Yace } from 'yace';
import { history, preserveIndent } from 'yace/plugins';
import { autoSemicolon, autocomplete } from './plugins';
import { fullHighlighter } from './highlighters';
import { renderMenu, renderTooltip } from './plugins/render';

import { formatScript, removeLBScript } from './format';

const { value = '', suggestions = [] } = defineProps<IScriptEditorProps>();
const emit = defineEmits<IScriptEditorEmit>();

let editor: Yace;

watch(
  () => value,
  (v) => {
    editor.update({ value: formatScript(v) });
  }
);

onMounted(() => {
  editor = new Yace('#editor', {
    value,
    lineNumbers: true,
    highlighters: [fullHighlighter],
    plugins: [
      history(),
      preserveIndent(),
      autocomplete({
        customSuggestions: suggestions,
        minPrefixLength: 1,
        maxSuggestions: 20,
        i18n: (item) => item,
        tooltip: {
          enabled: true,
        },
        renderMenu,
        renderTooltip,
      }),
      autoSemicolon(),
    ],
    styles: { fontSize: '14px' },
  });
});

import { useMagicKeys, whenever } from '@vueuse/core';

const { ctrl_s, ctrl_f } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 's' && e.type === 'keydown') e.preventDefault();
    if (e.ctrlKey && e.key === 'f' && e.type === 'keydown') e.preventDefault();
  },
});

whenever(ctrl_s, () => {
  emit('update', removeLBScript(editor.value))
});
whenever(ctrl_f, () => editor.update({ value: formatScript(editor.value) }));

onUnmounted(() => {
  editor.destroy();
});
</script>

<template>
  <div>
    <div class="" id="editor"></div>
  </div>
</template>

<style>
.tok--comment {
  color: #6a9955;
  font-style: italic;
} /* Зеленый, курсив */
.tok--string {
  color: #c3865e;
} /* Оранжевый */
.tok--number {
  color: #abc88e;
} /* Светло-зеленый */
.tok--keyword {
  color: #b068b9;
  font-weight: bold;
} /* Синий, жирный */
.tok--variable {
  color: #428cc4;
} /* Голубой */
.tok--event {
  color: #dcdcaa;
} /* Фиолетовый */

/* Дополнительно: операторы можно подсветить отдельно */
.tok--operator {
  color: #dbcb04;
}

/* Строка с номером строки (если используете) */
.yace-line-number {
  color: #858585;
  user-select: none;
}

.yace-autocomplete {
  background: #252526;
  border: 1px solid #454545;
  border-radius: 6px;
  max-height: 250px;
  overflow-y: auto;
  min-width: 250px;
  max-width: 400px;
  z-index: 10000;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  padding: 4px 0;
}

.yace-autocomplete::-webkit-scrollbar {
  width: 8px;
}

.yace-autocomplete::-webkit-scrollbar-track {
  background: #252526;
}

.yace-autocomplete::-webkit-scrollbar-thumb {
  background: #454545;
  border-radius: 4px;
}

.yace-autocomplete::-webkit-scrollbar-thumb:hover {
  background: #555555;
}

.yace-autocomplete-item {
  padding: 6px 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.1s;
  border-left: 2px solid transparent;
}

.yace-autocomplete-item:hover {
  background: #2a2d2e;
}

.yace-autocomplete-item.selected {
  background: #094771;
  border-left-color: #0078d4;
}
</style>
