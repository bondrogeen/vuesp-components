export interface IVButtonProps {
  block?: boolean;
  outline?: boolean;
  color?: 'green' | 'red' | 'gray' | 'blue';
  size?: 'normal' | 'small';
  type?: 'button' | 'icon';
  href?: string;
  to?: string;
  loading?: boolean;
  disabled?: number | boolean;
}

export interface IVButtonEmits {
  (e: 'click', value: Event): void;
}
