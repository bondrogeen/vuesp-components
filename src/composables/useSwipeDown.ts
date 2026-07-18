import { computed, shallowRef, type ShallowRef } from 'vue';

import { useSwipe } from '@vueuse/core';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

export const useSwipeDown = (target: ShallowRef<HTMLElement | null>, container: ShallowRef<HTMLElement | null>, onClose: (e: Event) => void) => {
  const clientHeight = computed(() => container.value?.clientHeight);
  const transform = shallowRef('translateY(0)');
  const opacity = shallowRef(1);
  const isSwiping = shallowRef(false);

  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isLgOrLarger = breakpoints.greaterOrEqual('lg');

  if (isLgOrLarger) {
    const { lengthY } = useSwipe(target, {
      passive: false,
      onSwipeStart() {
        isSwiping.value = true;
      },
      onSwipe() {
        if (clientHeight.value) {
          if (lengthY.value < 0) {
            const length = Math.abs(lengthY.value);
            transform.value = `translateY(${length}px)`;
            opacity.value = 1.1 - length / clientHeight.value;
            if (opacity.value < 0.3) {
              opacity.value = 0;
            }
          } else {
            transform.value = 'translateY(0)';
            opacity.value = 1;
          }
        }
      },
      onSwipeEnd(e: TouchEvent) {
        isSwiping.value = false;
        if (lengthY.value < 0 && clientHeight.value && Math.abs(lengthY.value) / clientHeight.value >= 0.5) {
          opacity.value = 0;

          setTimeout(() => {
            onClose(e);
          }, 100);
        } else {
          transform.value = 'translateY(0)';
          opacity.value = 1;
        }
      },
    });
  }

  return {
    isSwiping,
    transform,
    opacity,
  };
};
