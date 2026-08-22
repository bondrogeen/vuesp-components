// renderers/tailwind.ts
import type { ISuggestion } from '../types';

const TOKEN_COLORS: Record<string, string> = {
  keyword: 'text-blue-600 dark:text-blue-400',
  function: 'text-yellow-600 dark:text-yellow-400',
  variable: 'text-cyan-600 dark:text-cyan-400',
  event: 'text-purple-600 dark:text-purple-400',
};

export const renderMenu = (suggestions: ISuggestion[], selectedIndex: number, onSelect: (index: number) => void): HTMLElement => {
  const container = document.createElement('div');
  container.className = `
    fixed z-[10000] min-w-[250px] max-w-[400px] max-h-[250px] 
    overflow-y-auto p-1 rounded-lg shadow-lg border 
    border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 
    text-sm font-mono scrollbar
  `;

  suggestions.forEach((suggestion, index) => {
    const isSelected = index === selectedIndex;
    const item = document.createElement('div');
    item.className = `
      flex items-center justify-between gap-2 px-3 py-1.5 cursor-pointer 
      rounded transition-colors duration-100 border-l-2 
      ${isSelected ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'}
    `;

    const colorClass = TOKEN_COLORS[suggestion.type] || 'text-gray-700 dark:text-gray-300';
    item.innerHTML = `
      <div class="flex items-center gap-2 flex-1">
        <span class="${colorClass} font-medium">${suggestion.label}</span>
        ${suggestion.detail ? `<span class="text-xs text-gray-500 dark:text-gray-400 ml-2">${suggestion.detail}</span>` : ''}
      </div>
      ${suggestion.description ? `<span class="text-xs text-gray-400 dark:text-gray-500">${suggestion.description}</span>` : ''}
    `;
    item.addEventListener('click', () => onSelect(index));
    container.appendChild(item);
  });

  return container;
};

export const renderTooltip = (suggestion: ISuggestion, position: { left: number; top: number }): HTMLElement => {
  const tooltip = document.createElement('div');
  tooltip.className = `
    fixed z-[10001] px-3 py-2 font-mono text-sm max-w-[300px] 
    min-w-[50px] min-h-[20px] rounded-lg shadow-lg border 
    pointer-events-none transition-opacity duration-150
    bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 
    text-gray-700 dark:text-gray-300
  `;
  tooltip.style.cssText = `
    left: ${position.left + 40}px; top: ${position.top - 10}px;
    transform: translateX(-50%) translateY(-100%); opacity: 0;
  `;

  const colorClass = TOKEN_COLORS[suggestion.type] || 'text-gray-700 dark:text-gray-300';
  let content = `<div class="font-medium ${colorClass}">${suggestion.label}</div>`;

  if (suggestion.detail) {
    content += `<div class="text-gray-500 dark:text-gray-400 mt-0.5 text-xs">${suggestion.detail}</div>`;
  }
  if (suggestion.description) {
    content += `<div class="text-gray-400 dark:text-gray-500 text-xs mt-1 pt-1 border-t border-gray-200 dark:border-gray-700">${suggestion.description}</div>`;
  }
  tooltip.innerHTML = content;

  const arrow = document.createElement('div');
  arrow.className = `
    absolute bottom-[-6px] left-1/2 w-2.5 h-2.5 -translate-x-1/2 rotate-45
    bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700
  `;
  tooltip.appendChild(arrow);

  return tooltip;
};
