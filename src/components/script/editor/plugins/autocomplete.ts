import type { Plugin } from 'yace';
import { isKey } from 'yace/plugins/isKey';
import type { ISuggestion, IAutocompleteOptions } from './types';
import { DEFAULT_SUGGESTIONS } from './suggestions';

let suggestions: ISuggestion[] = [];
let menu: HTMLElement | null = null;
let selectedIndex = 0;
let currentSuggestions: ISuggestion[] = [];
let timeoutId: ReturnType<typeof setTimeout> | null = null;
let currentTextarea: HTMLTextAreaElement | null = null;

let renderMenuFn: (suggestions: ISuggestion[], selectedIndex: number, onSelect: (index: number) => void) => HTMLElement;
let renderTooltipFn: (suggestion: ISuggestion, position: { left: number; top: number }) => HTMLElement;

let tooltipElement: HTMLElement | null = null;
let tooltipTimeout: ReturnType<typeof setTimeout> | null = null;

export const autocomplete = (options: IAutocompleteOptions): Plugin => {
  const { customSuggestions = [], minPrefixLength = 1, maxSuggestions = 20, tabSize = 2, tooltip: tooltipOptions = { enabled: true }, i18n, renderMenu, renderTooltip } = options;

  if (!renderMenu || !renderTooltip) {
    throw new Error('renderMenu and renderTooltip are required');
  }

  suggestions = [...DEFAULT_SUGGESTIONS, ...customSuggestions].map((i) => i18n(i));
  renderMenuFn = renderMenu;
  renderTooltipFn = renderTooltip;

  return (props, event) => {
    if (!(event instanceof KeyboardEvent)) {
      return;
    }

    const { value, selectionStart } = props;
    const textarea = event.target as HTMLTextAreaElement;
    currentTextarea = textarea;

    if (tooltipOptions.enabled !== false && !textarea.dataset.tooltipInitialized) {
      textarea.dataset.tooltipInitialized = 'true';

      textarea.addEventListener('mouseup', () => {
        setTimeout(() => showTooltipForSelection(textarea), 100);
      });

      textarea.addEventListener('keyup', () => {
        setTimeout(() => showTooltipForSelection(textarea), 100);
      });
    }

    if (menu) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (selectedIndex < currentSuggestions.length - 1) {
            selectedIndex++;
            updateMenu();
          }
          return { ...props };

        case 'ArrowUp':
          event.preventDefault();
          if (selectedIndex > 0) {
            selectedIndex--;
            updateMenu();
          }
          return { ...props };

        case 'Enter':
          event.preventDefault();
          if (currentSuggestions[selectedIndex]) {
            const result = insertSuggestion(props, currentSuggestions[selectedIndex]);
            closeMenu();
            return result;
          }
          return;

        case 'Tab':
          event.preventDefault();
          if (currentSuggestions[selectedIndex]) {
            const result = insertSuggestion(props, currentSuggestions[selectedIndex]);
            closeMenu();
            return result;
          }
          return;

        case 'Escape':
          event.preventDefault();
          closeMenu();
          return { ...props };

        case 'Backspace':
          setTimeout(() => {
            if (currentTextarea) {
              const currentValue = currentTextarea.value;
              const currentSelectionStart = currentTextarea.selectionStart;
              const start = findWordStart(currentValue, currentSelectionStart);
              const prefix = currentValue.slice(start, currentSelectionStart);

              if (prefix.length < minPrefixLength) {
                closeMenu();
              } else {
                const matches = fuzzyFilter(prefix).slice(0, maxSuggestions);
                if (matches.length === 0) {
                  closeMenu();
                } else {
                  currentSuggestions = matches;
                  selectedIndex = 0;
                  updateMenu();
                }
              }
            }
          }, 0);
          return;
      }

      if (['ArrowDown', 'ArrowUp', 'Enter', 'Tab', 'Escape', 'Backspace'].includes(event.key)) {
        return { ...props };
      }
    }

    if (isKey('tab', event)) {
      event.preventDefault();

      const start = findWordStart(value, selectionStart);
      const prefix = value.slice(start, selectionStart);

      if (prefix.length > 0) {
        const matches = fuzzyFilter(prefix);
        if (matches.length > 0) {
          const result = insertSuggestion(props, matches[0]);
          return result;
        }
      }

      const spaces = ' '.repeat(tabSize);
      const newValue = value.slice(0, selectionStart) + spaces + value.slice(selectionStart);
      const newPosition = selectionStart + tabSize;

      return {
        value: newValue,
        selectionStart: newPosition,
        selectionEnd: newPosition,
      };
    }

    if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;

      const currentValue = textarea.value;
      const currentSelectionStart = textarea.selectionStart;
      const start = findWordStart(currentValue, currentSelectionStart);
      const prefix = currentValue.slice(start, currentSelectionStart);

      if (prefix.length < minPrefixLength) {
        closeMenu();
        return;
      }

      let matches = fuzzyFilter(prefix);
      matches = matches.slice(0, maxSuggestions);

      if (matches.length === 0) {
        closeMenu();
        return;
      }

      currentSuggestions = matches;
      selectedIndex = 0;

      if (menu) {
        updateMenu();
      } else {
        showMenu(textarea, matches);
      }
    }, 0);

    return { ...props };
  };
};

function fuzzyFilter(prefix: string): ISuggestion[] {
  const search = prefix.toLowerCase();

  return suggestions
    .filter((s) => {
      const label = s.label.toLowerCase();
      return (
        label.startsWith(search) ||
        label.includes(search) ||
        label
          .split('_')
          .map((w) => w[0])
          .join('')
          .startsWith(search)
      );
    })
    .sort((a, b) => {
      const aLabel = a.label.toLowerCase();
      const bLabel = b.label.toLowerCase();
      const aStarts = aLabel.startsWith(search);
      const bStarts = bLabel.startsWith(search);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      const aIndex = aLabel.indexOf(search);
      const bIndex = bLabel.indexOf(search);
      if (aIndex !== bIndex) return aIndex - bIndex;

      return aLabel.length !== bLabel.length ? aLabel.length - bLabel.length : aLabel.localeCompare(bLabel);
    });
}

function findWordStart(value: string, position: number): number {
  let start = position;
  while (start > 0 && /[a-zA-Z0-9_$]/.test(value[start - 1])) {
    start--;
  }
  return start;
}

function showMenu(textarea: HTMLTextAreaElement, suggestions: ISuggestion[]) {
  closeMenu();
  currentSuggestions = suggestions;
  selectedIndex = 0;

  const coords = getCaretCoordinates(textarea);
  menu = renderMenuFn(suggestions, selectedIndex, (index: number) => {
    selectedIndex = index;
    updateMenu();
  });

  Object.assign(menu.style, {
    position: 'fixed',
    left: `${coords.left}px`,
    top: `${coords.top + 24}px`,
    zIndex: '10000',
  });

  document.body.appendChild(menu);
}

function updateMenu() {
  if (!menu || !currentTextarea) return;

  const newMenu = renderMenuFn(currentSuggestions, selectedIndex, (index: number) => {
    selectedIndex = index;
    updateMenu();
  });

  const rect = menu.getBoundingClientRect();
  menu.replaceWith(newMenu);
  menu = newMenu;
  Object.assign(menu.style, {
    position: 'fixed',
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    zIndex: '10000',
  });
}

function insertSuggestion(props: { value: string; selectionStart: number; selectionEnd: number }, suggestion: ISuggestion) {
  const { value, selectionStart } = props;
  const start = findWordStart(value, selectionStart);

  const insert = suggestion.insert || suggestion.label;

  const placeholderRegex = /\$\{([^}]*)\}/g;
  let cleanText = insert;
  const placeholders: { index: number; text: string; length: number }[] = [];
  let match;

  while ((match = placeholderRegex.exec(insert)) !== null) {
    const text = match[1];
    const index = match.index;
    const length = match[0].length;
    placeholders.push({ index, text, length });
  }

  cleanText = insert.replace(/\$\{([^}]*)\}/g, '$1');

  const firstPlaceholder = placeholders[0];

  let cursorStart = start + cleanText.length;
  let cursorEnd = start + cleanText.length;

  if (firstPlaceholder) {
    let cleanIndex = 0;
    let insertIndex = 0;
    let found = false;

    while (insertIndex < insert.length && !found) {
      const placeholder = placeholders.find((p) => p.index === insertIndex);
      if (placeholder) {
        cleanIndex += placeholder.text.length;
        insertIndex += placeholder.length;
        if (placeholder === firstPlaceholder) {
          cursorStart = start + cleanIndex - placeholder.text.length;
          cursorEnd = start + cleanIndex;
          found = true;
        }
      } else {
        cleanIndex++;
        insertIndex++;
      }
    }
  }

  const newValue = value.slice(0, start) + cleanText + value.slice(selectionStart);

  return {
    value: newValue,
    selectionStart: cursorStart,
    selectionEnd: cursorEnd,
  };
}

function closeMenu() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  if (menu) {
    menu.remove();
    menu = null;
    currentSuggestions = [];
    selectedIndex = 0;
    currentTextarea = null;
  }
}

function getCaretCoordinates(textarea: HTMLTextAreaElement) {
  const rect = textarea.getBoundingClientRect();
  const { value, selectionStart } = textarea;
  const textBefore = value.substring(0, selectionStart);
  const lines = textBefore.split('\n');
  const currentLine = lines.length;
  const lastLine = lines[lines.length - 1] || '';

  const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;
  const charWidth = 8;

  return {
    left: rect.left + 10 + lastLine.length * charWidth,
    top: rect.top + (currentLine - 1) * lineHeight,
  };
}

function showTooltipForSelection(textarea: HTMLTextAreaElement) {
  if (tooltipTimeout) {
    clearTimeout(tooltipTimeout);
  }

  tooltipTimeout = setTimeout(() => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      hideTooltip();
      return;
    }

    const selectedText = textarea.value.substring(start, end).trim();
    if (!selectedText) {
      hideTooltip();
      return;
    }

    const suggestion = suggestions.find((s) => s.label === selectedText);
    if (!suggestion) {
      hideTooltip();
      return;
    }

    const coords = getCaretCoordinates(textarea);
    const tooltip = renderTooltipFn(suggestion, coords);
    tooltip.style.opacity = '0';

    if (tooltipElement) {
      tooltipElement.remove();
    }

    tooltipElement = tooltip;
    document.body.appendChild(tooltipElement);

    requestAnimationFrame(() => {
      if (tooltipElement) {
        tooltipElement.style.opacity = '1';
      }
    });

    setTimeout(() => hideTooltip(), 3000);
  }, 300);
}

function hideTooltip() {
  if (tooltipTimeout) {
    clearTimeout(tooltipTimeout);
    tooltipTimeout = null;
  }

  if (tooltipElement) {
    tooltipElement.style.opacity = '0';
    setTimeout(() => {
      if (tooltipElement) {
        tooltipElement.remove();
        tooltipElement = null;
      }
    }, 150);
  }
}

document.addEventListener('mousedown', (e) => {
  const target = e.target as Node;
  if (menu && !menu.contains(target)) {
    closeMenu();
  }
  if (tooltipElement && !tooltipElement.contains(target)) {
    hideTooltip();
  }
});

// document.addEventListener('scroll', hideTooltip, true);
