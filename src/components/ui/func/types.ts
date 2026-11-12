export interface IVFunkProps {
  label: string;
  args: string[];
  value: string | undefined;
  params?: string[];
  prefix?: string[];
  prefixTitles?: string[];
  argumentTitle?: string;
  disabled?: boolean;
  hideIcon?: boolean;
}
export interface IVFunkEmits {
  (e: 'change', value: string): void;
  (e: 'icon', event: Event): void;
}
