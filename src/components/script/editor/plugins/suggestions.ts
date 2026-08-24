import type { ISuggestion } from './types';

export const DEFAULT_SUGGESTIONS: ISuggestion[] = [
  { label: 'if', type: 'word', insert: 'if:${$v0<10};\n\nelse;\n\nend;', detail: 'if:${$v0<10};else;end;' },
  { label: 'while', type: 'word', insert: '$v0=0;\nwhile:${$v0<10};\nlog($v0);\n$v0=$v0+1;\nwait(1s);\nend;', detail: 'while:${$v0<2}; end;' },

  { label: 'udp', type: 'func', insert: "udp(${},'call(1)')", detail: 'udp(id:number, text:string)' },
  { label: 'on', type: 'func', insert: "on('${event}');\n\nend;", detail: 'event(name: string)' },
  { label: 'wait', type: 'func', insert: 'wait(${1s});', detail: 'wait(10ms | 1s | 1m | 1h)' },
  { label: 'log', type: 'func', insert: "log(${});", detail: 'log(text: string | number)' },
  { label: 'len', type: 'func', insert: 'len(${$a0});', detail: 'len(arr: array)' },
  { label: 'set', type: 'func', insert: 'set(${$a0},${2},${10});', detail: 'set(arr: array, index: number, value: number)' },
  { label: 'get', type: 'func', insert: 'get(${$a0},${0});', detail: 'get(arr: array, index: number)' },
  { label: 'ord', type: 'func', insert: 'ord(${$s0});', detail: 'ord(char: string)' },
  { label: 'chr', type: 'func', insert: 'chr(${65});', detail: 'chr(v: number)' },

  // { label: 'btn_13', type: 'event', detail: 'event name' },
  // { label: 'btn_13_1', type: 'event', detail: 'event name' },
  // { label: 'btn_13_0', type: 'event', detail: 'event name' },

  { label: '$v', type: 'var', insert: '$v${0}', detail: 'var (uint) ' },
  { label: '$i', type: 'var', insert: '$i${0}', detail: 'var (int)' },
  { label: '$f', type: 'var', insert: '$f${0}', detail: 'var (float)' },
  { label: '$s', type: 'var', insert: '$s${0}', detail: 'var (string)' },
  { label: '$a', type: 'var', insert: '$a${0}', detail: 'var (array)' },
  { label: '$p', type: 'var', insert: '$p${0}', detail: 'gpio' },
];
