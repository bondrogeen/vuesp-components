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
  | 'white';

export type TButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost' | 'muted' | 'none';

export interface IVButtonProps {
  color?: TButtonColor;
  variant?: TButtonVariant;
  size?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type?: 'button' | 'icon' | 'submit' | 'reset';
  block?: boolean;
  disabled?: boolean;
  href?: string;
  to?: string;
  loading?: boolean;
  title?: string;
  target?: string;
}

export interface IVButtonEmits {
  (e: 'click', value: Event): void;
}
