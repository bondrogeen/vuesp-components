export interface IScriptDialogProps {
  idScript: number;
}

export interface IScriptDialogEmits {
  (e: 'add', v: string): void;
  (e: 'close', v: Event): void;
}
