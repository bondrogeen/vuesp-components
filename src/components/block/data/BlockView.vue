<script setup lang="ts">
import type { IBlockProvider } from './provider';
import type { IBlockConfig, IBlockDefinition } from './types';

import { computed } from 'vue';

import BlockHost from './BlockHost.vue';

const { definition, config, provider, source, removable = false } = defineProps<{
  definition: IBlockDefinition;
  config: IBlockConfig;
  provider: IBlockProvider;
  source: unknown;
  removable?: boolean;
}>();

const emit = defineEmits<{
  'update:config': [config: IBlockConfig];
  remove: [];
}>();

const context = computed(() => provider.createContext(source));
</script>

<template>
  <BlockHost
    :definition="definition"
    :config="config"
    :context="context"
    :removable="removable"
    @update:config="emit('update:config', $event)"
    @remove="emit('remove')"
  />
</template>
