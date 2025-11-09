export interface IVFunkProps {
  label: string;
  args: string[];
  value: string | undefined;
  disabled?: boolean;
  hideIcon?: boolean;
}
export interface IVFunkEmits {
  (e: 'change', value: string): void;
  (e: 'icon', event: Event): void;
  (e: 'hover', event: string, index: number): void;
}
