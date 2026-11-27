import type { ISuggestion } from '../types';

export const DEFAULT_SUGGESTIONS: ISuggestion[] = [
  { label: 'if', type: 'word', insert: 'if:${$u0<10};\n\nelse;\n\nend;', detail: 'if:${$u0<10};else;end;' },
  { label: 'while', type: 'word', insert: '$u0=0;\nwhile:${$u0<10};\nlog($u0);\n$u0=$u0+1;\nwait(1s);\nend;', detail: 'while:${$u0<2}; end;' },

  {
    label: 'udp',
    type: 'func',
    insert: "udp(${0}, '${1}')",
    detail: 'udp(id:number, text:string) => ok:number',
    description: 'Send a text message to a device discovered by Vuesp Discovery. Discovery must be enabled.',
  },
  {
    label: 'fade',
    type: 'func',
    insert: 'fade(${0}, ${1}, ${2})',
    detail: 'fade(gpio:number, value:number, time:number) => boolean',
    description: 'Smoothly change a PWM or DAC port value over the given time in milliseconds.',
  },
  { label: 'http', type: 'func', insert: "http('${0}', '${1}')", detail: 'http(method:string, url:string, count?:number, num?:number, data?:number[]) => status:number' },
  { label: 'on', type: 'func', insert: "on('${event}');\n\nend;", detail: 'event(name: string)' },
  { label: 'wait', type: 'func', insert: 'wait(${1s});', detail: 'wait(10ms | 1s | 1m | 1h)' },
  { label: 'log', type: 'func', insert: "log(${});", detail: 'log(text: string | number)' },
  { label: 'len', type: 'func', insert: 'len(${$a0});', detail: 'len(arr: array)' },
  { label: 'set', type: 'func', insert: 'set(${$a0},${2},${10});', detail: 'set(arr: array, index: number, value: number)' },
  { label: 'get', type: 'func', insert: 'get(${$a0},${0});', detail: 'get(arr: array, index: number)' },
  { label: 'ord', type: 'func', insert: 'ord(${$s0});', detail: 'ord(char: string)' },
  { label: 'chr', type: 'func', insert: 'chr(${65});', detail: 'chr(v: number)' },

  { label: 'btn', type: 'event', detail: 'Change state ' },
  { label: 'btn_c', type: 'event', detail: 'Count click button <br>$e0=gpio:number<br>$e1=value:number<br>$e2=type?:number' },
  { label: 'btn_l', type: 'event', detail: 'Long press of the button <br>$e0=gpio:number<br>$e1=value:number' },
  { label: 'btn_r', type: 'event', detail: 'Repeat while holding the button <br>$e0=gpio:number<br>$e1=value:number' },

  { label: '$u', type: 'var', insert: '$u${0}', detail: 'var (uint) ' },
  { label: '$i', type: 'var', insert: '$i${0}', detail: 'var (int)' },
  { label: '$f', type: 'var', insert: '$f${0}', detail: 'var (float)' },
  { label: '$s', type: 'var', insert: '$s${0}', detail: 'var (string)' },
  { label: '$a', type: 'var', insert: '$a${0}', detail: 'var (array)' },
  { label: '$e', type: 'var', insert: '$e${0}', detail: 'var event' },
  { label: '$c', type: 'var', insert: '$c${0}', detail: 'var call' },
  { label: '$p', type: 'var', insert: '$p${0}', detail: 'gpio' },
];
