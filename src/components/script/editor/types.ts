import { ISuggestion } from '@/components/script/editor/plugins/types';

export interface IScriptEditorProps {
  modelValue: string;
  suggestions?: ISuggestion[];
}

export interface IScriptEditorEmit {
  (e: 'update:modelValue', value: string): void;
  (e: 'update', value: string): void;
}
