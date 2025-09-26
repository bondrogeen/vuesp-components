// import type { IDashboardItem, IDashboardItemString, IDashboard } from '@/types/types';

// import { stringToFunction, saveObjectWithFunctions, createObjectFromPaths } from './utils.js';

// export * from './utils.js';
export * from '@/types/types';

// export class Dashboard implements IDashboard {
//   items: Map<string, IDashboardItem>;
//   data: any;

//   constructor(list: IDashboardItem[]) {
//     this.items = new Map();
//     this.init(list);
//   }

//   init(list: IDashboardItem[]) {
//     for (let i = 0; i < list.length; i++) {
//       const item: IDashboardItem = list[i];
//       this.items.set(item.id, new DashboardItem(item));
//     }
//   }

//   setDataValue({ keyValue }: IDashboardItem, value: any) {
//     const keys = keyValue.split('.');
//     let current = this.data;
//     for (let i = 0; i < keys.length - 1; i++) {
//       current = current[keys[i]];
//     }
//     current[keys[keys.length - 1]] = value;
//   }

//   getDataValue({ keyValue }: IDashboardItem) {
//     const keys = keyValue.split('.');

//     let current: any = this.data;
//     for (const key of keys) {
//       if (current !== null && typeof current === 'object' && key in current) current = current[key];
//       else return undefined;
//     }
//     return current;
//   }

//   setData(data: any) {
//     this.data = { ...data };
//     return this;
//   }

//   getData() {
//     return this.data;
//   }

//   get(id: string) {
//     const item = this.items.get(id);
//     if (!item) return false;
//     const data = this.getDataValue(item);
//     return item?.getItem ? item.getItem(data) : null;
//   }

//   set(id: string, value: any) {
//     const item = this.items.get(id);
//     if (!item) return false;
//     const data = this.getDataValue(item);
//     const update = item?.setItem ? item.setItem(data, value) : null;
//     if (update !== null) {
//       this.setDataValue(item, update);
//     }
//     return update;
//   }

//   editItem(id: string, item: IDashboardItemString) {
//     if (item) {
//       this.items.set(id, stringToFunction(item));
//     }
//   }

//   removeItem(id: string) {
//     this.items.delete(id);
//   }

//   saveList() {
//     const list = Array.from(this.items, ([_, item]) => ({ ...item }));
//     let content = saveObjectWithFunctions(list);
//     return `export default ${content};`;
//   }

//   getList() {
//     return Array.from(this.items, ([_, item]) => item);
//   }

//   getObjectList() {
//     const paths = Array.from(this.items, ([_, item]) => item.id);
//     return createObjectFromPaths(paths);
//   }
// }
