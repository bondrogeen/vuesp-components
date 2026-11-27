export interface ISuggestion {
  label: string;
  type: 'word' | 'func' | 'var' | 'event';
  description?: string;
  insert?: string;
  detail?: string;
  cursorOffset?: number;
}
