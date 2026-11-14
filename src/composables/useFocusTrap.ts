import { nextTick, onBeforeUnmount, toValue, watch, type MaybeRefOrGetter, type Ref } from 'vue';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(container: Ref<HTMLElement | null>, active: MaybeRefOrGetter<boolean>) {
  let previouslyFocused: HTMLElement | null = null;

  const getFocusable = (): HTMLElement[] => {
    const root = container.value;
    if (!root) return [];
    return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((element) => {
      if (element.hasAttribute('disabled')) return false;
      return element.offsetParent !== null || element === document.activeElement;
    });
  };

  const onKeydown = (event: KeyboardEvent): void => {
    if (event.key !== 'Tab') return;

    const root = container.value;
    if (!root) return;

    const items = getFocusable();
    if (!items.length) {
      event.preventDefault();
      root.focus();
      return;
    }

    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && (document.activeElement === first || document.activeElement === root)) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  watch(
    () => toValue(active),
    async (isActive) => {
      if (isActive) {
        previouslyFocused = document.activeElement as HTMLElement | null;
        document.addEventListener('keydown', onKeydown);
        await nextTick();
        container.value?.focus();
      } else {
        document.removeEventListener('keydown', onKeydown);
        previouslyFocused?.focus();
        previouslyFocused = null;
      }
    },
    { immediate: true }
  );

  onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));
}
