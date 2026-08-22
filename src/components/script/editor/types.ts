import { ISuggestion } from '@/components/script/editor/plugins/types';

export interface IScriptEditorProps {
  value: string;
  suggestions?: ISuggestion[];
}

export interface IScriptEditorEmit {
  (e: 'update', value: string): void;
}
