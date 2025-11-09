export interface IVTabsProps {
  value: number;
  items: { title: string }[];
}
export interface IVTabsEmit {
  (e: 'click', index: number): void;
}
