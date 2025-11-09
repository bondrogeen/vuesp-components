export interface IHeaderTable {
  name: string;
  key: string;
  className: string;
}

export interface IItemTable {
  name: string;
  key: string;
  className: string;
}

export interface IVTableProps {
  headers: IHeaderTable[];
  items: IItemTable[];
}
export interface IVTableEmits {
  (e: 'click', data: { item: IItemTable; event: Event }): void;
}
