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
    <div class="" id="editor"></div>
  </div>
</template>

<style>
.tok--str {
  color: var(--color-amber-dark-75);
}
.dark .tok--str {
  color: var(--color-amber-dark-35);
}
.tok--num {
  color: var(--color-green-dark-55);
}
.dark .tok--num {
  color: var(--color-green-light-25);
}
.tok--word {
  color: var(--color-purple-main);
}
.dark .tok--word {
  color: var(--color-purple-light-30);
}
.tok--var {
  color: var(--color-cyan-dark-30);
}
.dark .tok--var {
  color: var(--color-cyan-light-40);
}
.tok--event {
  color: var(--color-amber-dark-75);
}
.dark .tok--event {
  color: var(--color-amber-light-45);
}
.tok--operator {
  color: var(--color-amber-dark-40);
}
.dark .tok--operator {
  color: var(--color-amber-dark-40);
}
</style>
