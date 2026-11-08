export interface IVTextFieldProps {
  modelValue?: number | string;
  label?: string;
  placeholder?: string;
  component?: string;
  type?: string;
  message?: string;
  error?: string;
  icon?: string;
  readonly?: boolean;
  disabled?: boolean | number;
  active?: boolean;
  hideMessage?: boolean;
}
export interface IVTextFieldEmits {
  (e: 'update:modelValue', event: string): void;
  (e: 'click' | 'on-icon' | 'enter' | 'blur' | 'focus', event: Event): void;
}
