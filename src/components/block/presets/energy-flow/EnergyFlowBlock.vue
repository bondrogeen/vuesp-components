<script setup lang="ts">
import type { IBlockConfig, IBlockContext } from '@/components/block/data/types';

import BlockShell from '@/components/block/data/BlockShell.vue';

import { energyFlowDefinition } from './definition';

defineOptions({ inheritAttrs: false });

const { config, context, editable = true, removable = false } = defineProps<{
  config: IBlockConfig;
  context: IBlockContext;
  editable?: boolean;
  removable?: boolean;
}>();

const emit = defineEmits<{
  'update:config': [config: IBlockConfig];
}>();
</script>

<template>
  <BlockShell
    :definition="energyFlowDefinition"
    :config="config"
    :context="context"
    :editable="editable"
    :removable="removable"
    v-bind="$attrs"
    @update:config="emit('update:config', $event)"
  />
</template>
