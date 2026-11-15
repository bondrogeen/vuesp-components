import { ISuggestion } from '../plugins/types';

const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Цвета подсветки — утилиты UI-кита, без собственных классов. */
const TOKEN_CLASSES: Record<string, string> = {
  comment: 'text-gray-dark-25 dark:text-gray-main',
  str: 'text-amber-dark-75 dark:text-amber-dark-35',
  num: 'text-green-dark-55 dark:text-green-light-25',
  word: 'text-purple-main dark:text-purple-light-30',
  var: 'text-cyan-dark-30 dark:text-cyan-light-40',
  event: 'text-amber-dark-75 dark:text-amber-light-45',
  operator: 'text-amber-dark-40',
};

const STATIC_KEYWORDS = ['else', 'end', 'call', 'fade'];
const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildFullTokens = (suggestions: ISuggestion[]) => {
  const dynamicLabels = suggestions.filter((s) => s.type !== 'var').map((s) => s.label);

  const allKeywords = Array.from(new Set([...STATIC_KEYWORDS, ...dynamicLabels]));
  const keywordsPattern = allKeywords.map(escapeRegex).join('|');
  const variablePattern = '\\$[a-zA-Z_][a-zA-Z0-9_]*';
  const eventPattern = 'btn_\\d+(?:_\\d+)?';

  const pattern = `(\\/\\/[^\\n]*)|` + `('[^'\\n]*')|` + `(\\b\\d+(?:\\.\\d+)?\\b)|` + `(\\b(?:${keywordsPattern})\\b)|` + `(${variablePattern})|` + `(\\b(?:${eventPattern})\\b)|` + `([;:(){}])`;

  return new RegExp(pattern, 'g');
};

export const fullHighlighter = (suggestions: ISuggestion[]) => (value: string) => {
  const FULL_TOKENS = buildFullTokens(suggestions);
  let html = '';
  let last = 0;

  for (const match of value.matchAll(FULL_TOKENS)) {
    const [fullMatch, comment, string, number, keyword, variable, event, operator] = match;

    let type = '';
    if (comment) type = 'comment';
    else if (string) type = 'str';
    else if (number) type = 'num';
    else if (keyword) type = 'word';
    else if (variable) type = 'var';
    else if (event) type = 'event';
    else if (operator) type = 'operator';

    html += escapeHtml(value.slice(last, match.index));
    html += `<span class="${TOKEN_CLASSES[type] ?? ''}">${escapeHtml(fullMatch)}</span>`;
    last = match.index + fullMatch.length;
  }

  html += escapeHtml(value.slice(last));
  return html;
};
