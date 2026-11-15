<script setup lang="ts">
import type { IScriptEditorProps, IScriptEditorEmit } from './types';
import { onMounted, onUnmounted, watch } from 'vue';
import { Yace } from 'yace';
import { history, preserveIndent } from 'yace/plugins';
import { autoSemicolon, autocomplete } from './plugins';
import { fullHighlighter } from './highlighters';
import { renderMenu, renderTooltip } from './plugins/render';
import { DEFAULT_SUGGESTIONS } from './suggestions';

const { modelValue, suggestions = [] } = defineProps<IScriptEditorProps>();
const emit = defineEmits<IScriptEditorEmit>();

let editor: Yace;

const customSuggestions = [...DEFAULT_SUGGESTIONS, ...suggestions];

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
    highlighters: [fullHighlighter(customSuggestions)],
    plugins: [
      history(),
      preserveIndent(),
      autocomplete({
        customSuggestions,
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
    <div id="editor"></div>
  </div>
</template>

