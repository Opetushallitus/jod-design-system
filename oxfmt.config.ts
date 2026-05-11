import { defineConfig } from 'oxfmt';

export default defineConfig({
  printWidth: 120,
  singleQuote: true,
  sortTailwindcss: {
    functions: ['cx', 'tc'],
    stylesheet: 'lib/theme.css',
  },
  sortImports: {
    groups: ['builtin', 'external', 'ds', ['internal', 'subpath'], ['parent', 'sibling', 'index'], 'style', 'unknown'],
    customGroups: [
      {
        groupName: 'ds',
        elementNamePattern: ['@jod/design-system', '@jod/design-system/icons'],
      },
    ],
  },
});
