<script setup lang="ts">
import type { IBlockConfig, IBlockContext, IBlockDefinition } from './types';

import { computed, ref } from 'vue';

import BlockDataSettings from './BlockDataSettings.vue';

defineOptions({ inheritAttrs: false });

const { definition, config, context, editable = true, removable = false } = defineProps<{
  definition: IBlockDefinition;
  config: IBlockConfig;
  context: IBlockContext;
  editable?: boolean;
  removable?: boolean;
}>();

const emit = defineEmits<{
  'update:config': [config: IBlockConfig];
}>();

const settings = ref(false);
const visual = computed(() => definition.component);
</script>

<template>
  <component :is="visual" v-bind="$attrs" :editable="editable" @settings="settings = true" />

  <BlockDataSettings
    v-if="settings"
    :definition="definition"
    :config="config"
    :context="context"
    :removable="removable"
    @close="settings = false"
    @update:config="emit('update:config', $event)"
  />
</template>
