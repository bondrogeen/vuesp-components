export interface IVTextFieldProps {
  modelValue?: number | string;
  label?: string;
  component?: string;
  type?: string;
  message?: string;
  readonly?: boolean;
  disabled?: boolean | number;
  active?: boolean;
  hideMessage?: boolean;
}
export interface IVTextFieldEmits {
  (e: 'update:modelValue', event: string): void;
  (e: 'click' | 'on-icon' | 'enter' | 'blur' | 'blur', event: Event): void;
}
