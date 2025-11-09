<template>
  <div @dragover.prevent @drop="handleContainerDrop">
    <TransitionGroup
      enter-active-class="transition-all duration-300 ease"
      enter-from-class="opacity-0 translate-x-8"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-300 ease absolute"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-8"
      move-class="transition-all duration-300 ease"
    >
      <div
        v-for="(item, index) in items"
        :key="`${item.id}_drug`"
        class="relative group"
        :class="getClass(item)"
        draggable="true"
        @dragstart="handleDragStart($event, item.id, index)"
        @dragenter="handleDragEnter(index)"
        @dragend="handleDragEnd"
        @dragover.prevent
      >
        <slot name="default" :item="item" :key="item.id" :index="index" :isDragging="draggingId === item.id"></slot>

        <div v-if="dragOverIndex === index && draggingId !== item.id" class="absolute inset-0 border border-dashed border-blue-600 rounded-lg" />
      </div>
    </TransitionGroup>
  </div>
</template>
<script setup lang="ts">
import { IVDragDropProps, IVDragDropEmits, IVDragDropItem } from '@/components/ui/drag-drop/types';
import { ref, defineEmits, defineProps } from 'vue';

const { items, itemKey = 'id' } = defineProps<IVDragDropProps>();

const emit = defineEmits<IVDragDropEmits>();

const draggingId = ref<string | number | null>(null);
const dragStartIndex = ref(0);
const dragOverIndex = ref(-1);

const getClass = ({ id }: IVDragDropItem) => ({
  'opacity-30 scale-105 z-10': draggingId.value === id,
  'transition-transform duration-200': draggingId.value !== id,
});

const handleDragStart = (event: DragEvent, id: string | number, index: number) => {
  draggingId.value = id;
  dragStartIndex.value = index;
  event.dataTransfer!.effectAllowed = 'move';
};

const handleDragEnter = (index: number) => {
  if (draggingId.value === null) return;
  dragOverIndex.value = index;
};

const handleDragEnd = () => {
  draggingId.value = null;
  dragOverIndex.value = -1;
};

const handleContainerDrop = (event: DragEvent) => {
  event.preventDefault();

  if (draggingId.value && dragOverIndex.value !== -1) {
    const fromIndex = items.findIndex((item: IVDragDropItem) => item[itemKey] === draggingId.value);
    const toIndex = dragOverIndex.value;

    if (fromIndex !== toIndex && toIndex !== -1) {
      const newItems = [...items];
      const [movedItem] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, movedItem);

      emit('update:items', newItems);
      emit('order-change', { fromIndex, toIndex, movedItem, newOrder: newItems });
    }
  }
  dragOverIndex.value = -1;
};
</script>
