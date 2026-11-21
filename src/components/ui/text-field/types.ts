export interface IFieldStateProps {
  modelValue?: number | string | null;
  label?: string;
  placeholder?: string;
  component?: 'input' | 'textarea';
  type?: string;
  message?: string;
  error?: string;
  icon?: string;
  readonly?: boolean;
  disabled?: boolean | number;
  active?: boolean;
  hideMessage?: boolean;
  hideIcon?: boolean;
  iconDisabled?: boolean;
  iconLabel?: string;
}

export interface IVTextFieldProps {
  id?: string;
  name?: string;
  modelValue?: number | string | null;
  label?: string;
  placeholder?: string;
  component?: 'input' | 'textarea';
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

export interface IVTextWrapperProps {
  active: boolean;
  label?: string;
  disabled?: boolean;
  iconDisabled?: boolean;
  hideIcon?: boolean;
  iconLabel?: string;
}
export interface IVTextWrapperEmits {
  (e: 'icon', event: Event): void;
}
