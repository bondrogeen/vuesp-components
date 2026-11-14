export type ButtonColor =
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

export type ButtonVariant = 'default' | 'soft' | 'outline' | 'white';

export interface IVButtonProps {
  color?: ButtonColor;
  variant?: ButtonVariant;
  invert?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
