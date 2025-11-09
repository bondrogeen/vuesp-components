export interface IVDropdownProps {
  top?: string;
  left?: string;
  right?: string;
  height?: string;
  hideOnClick?: boolean;
}
export interface IVDropdownEmits {
  (e: 'click', value: boolean): void;
  (e: 'show' | 'close', value: Event): void;
}
