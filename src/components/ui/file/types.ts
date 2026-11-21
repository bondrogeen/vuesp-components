export interface IVFileProps {
  multiple?: boolean | string;
  accept?: string;
}

export interface IVFileEmits {
  (e: 'change', value: FileList): void;
}
