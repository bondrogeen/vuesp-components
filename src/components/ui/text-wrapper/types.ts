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