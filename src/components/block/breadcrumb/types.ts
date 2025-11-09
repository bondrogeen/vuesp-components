export interface IBreadcrumb {
  name: string;
  path?: string;
}

export interface IBlockBreadcrumbProps {
  items?: IBreadcrumb[];
}
export interface IBlockBreadcrumbEmits {
  (e: 'click', value: IBreadcrumb): void;
}
