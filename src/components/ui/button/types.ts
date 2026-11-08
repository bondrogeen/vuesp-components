export type ButtonColor =
  | 'green'
  | 'red'
  | 'gray'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'slate'
  | 'transparent';

export type ButtonVariant = 'primary' | 'cyan' | 'outline' | 'ghost' | 'dark' | 'danger' | 'success' | 'white';

export interface IVButtonProps {
  outline?: boolean;
  color?: ButtonColor;
  variant?: ButtonVariant;
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
