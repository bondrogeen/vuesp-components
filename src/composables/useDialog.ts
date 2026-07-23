import type { IVDialogEmits } from '@/components/ui/dialog/types';

import { onMounted, ref, watch } from 'vue';
import { useMagicKeys } from '@vueuse/core';

export const useDialog = (emit: IVDialogEmits, timeout?: number) => {
  const show = ref(false);
  const overlay = ref(false);
  const timerClose = ref<ReturnType<typeof setTimeout> | null>(null);

  const keys = useMagicKeys();

  if (keys?.escape) {
    watch(keys.escape, () => {
      onClose(new Event('close'));
    });
  }

  const onClose = (e?: Event) => {
    overlay.value = false;
    setTimeout(() => {
      show.value = false;
    }, 50);
    setTimeout(() => {
      emit('close', e || new Event('close'));
    }, 300);

    if (timerClose.value) {
      clearTimeout(timerClose.value);
    }
  };

  const onOpen = () => emit('open', show.value);

  onMounted(() => {
    setTimeout(() => {
      show.value = true;
    }, 300);
    setTimeout(() => {
      overlay.value = true;
    }, 500);

    if (timeout) {
      timerClose.value = setTimeout(() => {
        onClose();
      }, timeout * 1000);
    }
  });

  return {
    show,
    overlay,
    onClose,
    onOpen,
  };
};
