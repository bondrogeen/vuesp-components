export const normalizeScript = (code: string) => {
  let result = '';
  let inString = false;
  let quote = '';
  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    if ((ch === '"' || ch === "'") && (i === 0 || code[i - 1] !== '\\')) {
      if (!inString) {
        inString = true;
        quote = ch;
        result += ch;
      } else if (ch === quote) {
        inString = false;
        result += ch;
      } else {
        result += ch;
      }
      continue;
    }
    if (inString) {
      result += ch;
      continue;
    }
    if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') {
      continue;
    }
    result += ch;
  }
  return result;
};

interface Token {
  type: 'command' | 'block_start' | 'block_end' | 'else';
  value: string;
}

export function formatScript(codeString: string): string {
  const tokens: Token[] = [];
  let current = '';

  for (let i = 0; i < codeString.length; i++) {
    const char = codeString[i];

    if (char === ';') {
      if (current.trim()) {
        const value = current.trim();
        if (value.startsWith('while:') || value.startsWith('if:') || value.startsWith('on(')) {
          tokens.push({ type: 'block_start', value });
        } else if (value === 'else') {
          tokens.push({ type: 'else', value });
        } else if (value === 'end') {
          tokens.push({ type: 'block_end', value });
        } else {
          tokens.push({ type: 'command', value });
        }
        current = '';
      }
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    const value = current.trim();
    if (value.startsWith('while:') || value.startsWith('if:') || value.startsWith('on(')) {
      tokens.push({ type: 'block_start', value });
    } else if (value === 'else') {
      tokens.push({ type: 'else', value });
    } else if (value === 'end') {
      tokens.push({ type: 'block_end', value });
    } else {
      tokens.push({ type: 'command', value });
    }
  }

  const result: string[] = [];
  let indent = 0;
  const indentSize = 2;

  for (const token of tokens) {
    switch (token.type) {
      case 'block_start':
        result.push(' '.repeat(indent * indentSize) + token.value + ';');
        indent++;
        break;
      case 'else':
        indent--;
        result.push(' '.repeat(indent * indentSize) + token.value + ';');
        indent++;
        break;
      case 'block_end':
        indent--;
        result.push(' '.repeat(indent * indentSize) + token.value + ';');
        break;
      case 'command':
        result.push(' '.repeat(indent * indentSize) + token.value + ';');
        break;
    }
  }
  return result.join('\n');
}
