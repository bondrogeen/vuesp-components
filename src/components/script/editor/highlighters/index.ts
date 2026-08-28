import { ISuggestion } from '../plugins/types';

const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

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
    html += `<span class="tok--${type}">${escapeHtml(fullMatch)}</span>`;
    last = match.index + fullMatch.length;
  }

  html += escapeHtml(value.slice(last));
  return html;
};
