export interface IVDragDropItem {
  id: number;
}

export interface IVDragDropProps {
  items: IVDragDropItem[];
  itemKey?: 'id';
}
export interface IVDragDropEmits {
  (e: 'update:items', items: IVDragDropItem[]): void;
  (e: 'order-change', payload: { fromIndex: number; toIndex: number; movedItem: IVDragDropItem; newOrder: IVDragDropItem[] }): void;
}
