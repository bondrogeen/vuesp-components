export interface IHeaderTable {
  name: string;
  key: string;
  className: string;
}

export interface IVTableProps<T> {
  headers: IHeaderTable[];
  items: T[];
}
export interface IVTableEmits<T> {
  (e: 'click', item: T, event?: Event): void;
}
