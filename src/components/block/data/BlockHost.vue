<script setup lang="ts">
import type { IBlockConfig, IBlockContext, IBlockDefinition } from './types';

import { computed, ref } from 'vue';

import BlockDataSettings from './BlockDataSettings.vue';

import { resolveBlockBindings } from './resolver';

const { definition, config, context, removable = false } = defineProps<{
  definition: IBlockDefinition;
  config: IBlockConfig;
  context: IBlockContext;
  removable?: boolean;
}>();

const emit = defineEmits<{
  'update:config': [config: IBlockConfig];
  remove: [];
}>();

const settings = ref(false);
const blockComponent = computed(() => definition.component);
const resolved = computed(() => resolveBlockBindings(definition, config, context));

const onSave = (next: IBlockConfig) => {
  emit('update:config', next);
};
</script>

<template>
  <component :is="blockComponent" v-bind="resolved" editable @settings="settings = true" />

  <BlockDataSettings
    v-if="settings"
    :definition="definition"
    :config="config"
    :context="context"
    :removable="removable"
    @close="settings = false"
    @remove="emit('remove')"
    @update:config="onSave"
  />
</template>
