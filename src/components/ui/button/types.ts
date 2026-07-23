export interface IVButtonProps {
  outline?: boolean;
  color?: 'green' | 'red' | 'gray' | 'blue' | 'transparent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  type?: 'button' | 'icon';
  href?: string;
  to?: string;
  loading?: boolean;
}

export interface IVButtonEmits {
  (e: 'click', value: Event): void;
}
