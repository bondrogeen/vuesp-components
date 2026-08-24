<script setup lang="ts">
import type { IScriptEditorProps, IScriptEditorEmit } from './types';
import { onMounted, onUnmounted, watch } from 'vue';
import { Yace } from 'yace';
import { history, preserveIndent } from 'yace/plugins';
import { autoSemicolon, autocomplete } from './plugins';
import { fullHighlighter } from './highlighters';
import { renderMenu, renderTooltip } from './plugins/render';

const { modelValue, suggestions = [] } = defineProps<IScriptEditorProps>();
const emit = defineEmits<IScriptEditorEmit>();

let editor: Yace;

watch(
  () => modelValue,
  (v) => {
    editor.update({ value: v });
  }
);

onMounted(() => {
  editor = new Yace('#editor', {
    value: modelValue,
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

  editor.onUpdate((value: string) => {
    emit('update:modelValue', value);
  });
});

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
.tok--string {
  color: #924c1e;
}
.dark .tok--string {
  color: #c3865e;
}
.tok--number {
  color: #4c8513;
}
.dark .tok--number {
  color: #abc88e;
}
.tok--keyword {
  color: #ad24be;
}
.dark .tok--keyword {
  color: #b068b9;
}
.tok--variable {
  color: #279bd9;
}
.dark .tok--variable {
  color: #9cdcfe;
}
.tok--event {
  color: #924c1e;
}
.dark .tok--event {
  color: #dcdcaa;
}
.tok--operator {
  color: #99901a;
}
.dark .tok--operator {
  color: #dbcb04;
}
</style>
