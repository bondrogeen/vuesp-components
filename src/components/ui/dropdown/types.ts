export interface IVDropdownProps {
  title?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  height?: string;
  hideOnClick?: boolean;
  disabled?: boolean;
  isPopup?: boolean;
}

export interface IVDropdownEmits {
  (e: 'click', value: boolean): void;
  (e: 'show' | 'close', value: Event): void;
}

export interface IVDropdownOn {
  click: (e: Event) => void;
  open: (e: Event) => void;
  set: (value: boolean) => void;
}
