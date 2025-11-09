export interface IVTextWrapperProps {
  active: boolean;
  label?: string;
  disabled?: boolean;
  hideIcon?: boolean;
}
export interface IVTextWrapperEmits {
  (e: 'icon', event: Event): void;
}