export interface IVDragDropProps<T> {
  items: T[];
  itemKey?: 'id';
}
export interface IVDragDropEmits<T> {
  (e: 'update:items', items: T[]): void;
  (e: 'order-change', payload: { fromIndex: number; toIndex: number; movedItem: T; newOrder: T[] }): void;
}
