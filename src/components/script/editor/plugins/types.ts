// types.ts
export interface ISuggestion {
  label: string;
  type: 'word' | 'func' | 'var' | 'event';
  description?: string;
  insert?: string;
  detail?: string;
  cursorOffset?: number;
}

export interface IAutocompleteOptions {
  customSuggestions?: ISuggestion[];
  minPrefixLength?: number;
  maxSuggestions?: number;
  tabSize?: number;
  tooltip?: { enabled?: boolean };
  i18n: (item: ISuggestion) => ISuggestion;
  renderMenu: (suggestions: ISuggestion[], selectedIndex: number, onSelect: (index: number) => void) => HTMLElement;
  renderTooltip: (suggestion: ISuggestion, position: { left: number; top: number }) => HTMLElement;
}
