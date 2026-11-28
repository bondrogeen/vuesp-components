<script setup lang="ts">
import VButton from '@/components/ui/button/VButton.vue';
import VIcon from '@/components/ui/icon/VIcon.vue';

import { useI18n } from '@/composables/useI18n';
import type { IScriptStudioActionBarEmits, IScriptStudioActionBarProps } from './types';

const { $t } = useI18n();
const { lineCount, byteCount, stackMax } = defineProps<IScriptStudioActionBarProps>();
const emit = defineEmits<IScriptStudioActionBarEmits>();
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-2">
    <div class="flex flex-wrap items-center gap-2">
      <VButton size="sm" variant="soft" color="gray" @click="emit('details')">
        <VIcon name="list-check" :size="14" />
        {{ $t('scriptStudio.details') }}
      </VButton>
      <VButton
        size="sm"
        variant="soft"
        color="gray"
        href="https://docs.vuesp.ru/vuesp/scripts/"
        target="_blank"
        rel="noreferrer"
        :title="$t('scriptStudio.scriptDocs')"
        :aria-label="$t('scriptStudio.scriptDocs')"
      >
        <VIcon name="book" :size="14" />
      </VButton>
    </div>

    <span class="font-mono text-xs text-gray-dark-25 dark:text-gray-main">
      {{ lineCount }} {{ $t('scriptStudio.lines') }} · {{ byteCount }} {{ $t('scriptStudio.bytes') }} · {{ $t('scriptStudio.stack') }}
      {{ stackMax ?? '—' }}
    </span>
  </div>
</template>
