export interface IVDragDropItem {
  id: number;
}

export interface IVDragDropProps {
  items: any[];
  itemKey?: 'id';
}
export interface IVDragDropEmits {
  (e: 'update:items', items: any[]): void;
  (e: 'order-change', payload: { fromIndex: number; toIndex: number; movedItem: unknown; newOrder: unknown[] }): void;
}
