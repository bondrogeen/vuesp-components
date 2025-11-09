export interface IVCheckboxProps {
  modelValue?: number | boolean;
  disabled?: boolean;
}

export interface IVCheckboxEmits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'click', value: Event): void;
}
