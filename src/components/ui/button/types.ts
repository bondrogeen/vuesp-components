export type TButtonColor =
  | 'cyan'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'amber'
  | 'green'
  | 'red'
  | 'slate'
  | 'gray'
  | 'transparent';

export type TButtonVariant = 'default' | 'soft' | 'outline' | 'white';

export interface IVButtonProps {
  color?: TButtonColor;
  variant?: TButtonVariant;
  invert?: boolean;
  size?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  type?: 'button' | 'icon' | 'submit' | 'reset';
  block?: boolean;
  disabled?: boolean;
  href?: string;
  to?: string;
  loading?: boolean;
}

export interface IVButtonEmits {
  (e: 'click', value: Event): void;
}
