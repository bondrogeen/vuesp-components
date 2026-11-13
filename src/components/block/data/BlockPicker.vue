<script setup lang="ts">
import type { IBlockDefinition } from './types';

import VDialog from '@/components/ui/dialog/VDialog.vue';
import VisionIcon from '@/components/ui/vision/VisionIcon.vue';

const { definitions } = defineProps<{
  definitions: IBlockDefinition[];
}>();

const emit = defineEmits<{
  close: [];
  select: [type: string];
}>();
</script>

<template>
  <VDialog title="Добавить блок" size="md" @close="emit('close')">
    <div class="grid gap-3 sm:grid-cols-2">
      <button
        v-for="definition of definitions"
        :key="definition.type"
        type="button"
        class="glass-inset flex flex-col items-start rounded-xl p-4 text-left transition hover:border-cyan-main/30 hover:bg-cyan-main/5"
        @click="emit('select', definition.type)"
      >
        <span class="grid size-10 place-items-center rounded-lg border border-cyan-main/20 bg-cyan-main/10 text-cyan-main">
          <VisionIcon :name="definition.icon ?? 'box'" :size="20" />
        </span>

        <span class="mt-3 block text-base font-semibold">{{ definition.name }}</span>
        <span v-if="definition.description" class="mt-1 block text-sm text-gray-dark-25 dark:text-gray-main">
          {{ definition.description }}
        </span>
      </button>
    </div>

    <p v-if="!definitions.length" class="py-8 text-center text-sm text-gray-dark-25 dark:text-gray-main">
      Пока нет доступных блоков.
    </p>
  </VDialog>
</template>
