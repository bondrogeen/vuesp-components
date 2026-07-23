export interface IVDialogProps {
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  popupSize?: 'auto' | 'full' | 'screen';
  color?: 'none' | 'white' | 'gray';
  type?: 'default' | 'popup';
  hiddenCloser?: boolean;
  isOnlyDialog?: boolean;
  timeout?: number;
}

export interface IVDialogEmits {
  (e: 'close' | 'click', value: Event): void;
  (e: 'open', value: boolean): void;
}

export interface IVPopupProps {
  hiddenCloser?: boolean;
  size?: 'auto' | 'full' | 'screen';
}
