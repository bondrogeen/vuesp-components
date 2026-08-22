// suggestions.ts
import type { ISuggestion } from './types';

export const DEFAULT_SUGGESTIONS: ISuggestion[] = [
  { label: 'if', type: 'keyword', insertText: 'if:${$v0<10};\n\nelse;\n\nend;', detail: 'if:${$v0<10};else;end;' },
  { label: 'while', type: 'keyword', insertText: '$v0=0;\nwhile:${$v0<10};\nlog($v0);\n$v0=$v0+1;\nwait(1s);\nend;', detail: 'while' },

  { label: 'on', type: 'function', insertText: "on('${event}')\nend;", detail: 'event' },
  { label: 'wait', type: 'function', insertText: 'wait(${1s})', detail: 'delay 1s' },
  { label: 'log', type: 'function', insertText: "log('${test}')", detail: 'log' },
  { label: 'len', type: 'function', insertText: 'len(${$a0})', detail: 'length' },
  { label: 'set', type: 'function', insertText: 'set(${$a0}, ${2}, ${10})', detail: 'array' },
  { label: 'get', type: 'function', insertText: 'get(${$a0}, ${0})', detail: 'array' },
  { label: 'ord', type: 'function', insertText: 'ord(${$s0})', detail: 'ord' },
  { label: 'chr', type: 'function', insertText: 'chr(${65})', detail: 'chr' },

  { label: 'btn_13', type: 'event', detail: 'btn' },
  { label: 'btn_13_1', type: 'event', detail: 'btn' },
  { label: 'btn_13_0', type: 'event', detail: 'btn' },

  { label: '$v${0}=', type: 'variable', detail: 'uint' },
  { label: '$i${0}=', type: 'variable', detail: 'int' },
  { label: '$f${0}=', type: 'variable', detail: 'float' },
  { label: '$s${0}=', type: 'variable', detail: 'string' },
  { label: '$p${13}=', type: 'variable', detail: 'gpio' },
];
