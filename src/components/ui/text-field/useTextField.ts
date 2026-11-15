import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import type { IFieldStateProps } from './types.ts';

export const useTextField = (props: IFieldStateProps, mode: 'field' | 'wrapper' = 'field', autofilled?: Ref<boolean>) => {
  const isFocus = ref(false);

  const hasValue = computed(() => props.modelValue !== null && props.modelValue !== undefined && props.modelValue !== '');

  const isFloating = computed(() =>
    mode === 'wrapper' ? Boolean(props.active) : isFocus.value || hasValue.value || Boolean(props.active) || Boolean(autofilled?.value)
  );

  const labelClass = computed(() => {
    const position = props.icon && mode === 'field' ? 'left-11' : 'left-3.5';

    if (!isFloating.value) {
      return `${position} top-1/2 bg-transparent px-0 text-gray-main`;
    }

    return `${position} top-0 bg-white/80 px-1 text-xs text-gray-dark-25 dark:bg-night-light-10/80 dark:text-gray-main`;
  });

  const borderClass = computed(() => {
    if (props.disabled) return 'border-gray-light-10 opacity-40 dark:border-gray-dark-30';
    if (props.error) return '!border-red-400/70 ring-1 ring-red-400/25 hover:!border-red-400';
    return 'border-gray-light-10/80 hover:border-gray-main/80 dark:border-white/10 dark:hover:border-white/20';
  });

  const contentClass = computed(() => {
    if (mode === 'wrapper') return 'flex flex-auto flex-wrap gap-2 px-2 py-1';

    return props.component === 'textarea'
      ? 'h-full w-full flex-auto px-4 py-2 outline-none bg-transparent'
      : 'w-full h-full flex-auto overflow-ellipsis overflow-hidden px-4 outline-none bg-transparent placeholder:text-gray-main';
  });

  const slotClass = computed(() => (mode === 'wrapper' || props.component === 'textarea' ? 'min-h-10' : 'h-10'));

  return { isFocus, isFloating, labelClass, borderClass, contentClass, slotClass };
};
