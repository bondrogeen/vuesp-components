import outside from './outside';

import type { Directive } from 'vue';

export interface IItemDirective {
  name: string;
  directive: Directive;
}

const arr: IItemDirective[] = [{ name: 'outside', directive: outside }];

export default arr;
