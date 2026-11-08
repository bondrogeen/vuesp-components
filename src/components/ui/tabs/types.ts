export interface IVTabsProps {
  value: number;
  items: { title: string }[];
  size?: 'sm' | 'md';
}
export interface IVTabsEmit {
  (e: 'click', index: number): void;
}
