import eslint from '@eslint/js';
import singlestoreReactHooksDisableImport from '@singlestore/eslint-plugin-react-hooks-disable-import';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import sonarjs from 'eslint-plugin-sonarjs';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';
const __dirname = new URL('.', import.meta.url).pathname;

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
  },
  {
    ignores: [
      '**/dist',
      '**/eslint.config.js',
      '**/postcss.config.js',
      'storybook-static',
      '!.storybook',
      '**/**.stories.tsx',
    ],
  },

  eslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  ...storybook.configs['flat/recommended'],
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  sonarjs.configs.recommended,
  eslintConfigPrettier, // must be last, override other configs
  {
    plugins: {
      '@singlestore/react-hooks-disable-import': singlestoreReactHooksDisableImport,
      react: react,
      'react-hooks': hooksPlugin,
      'react-refresh': reactRefresh,
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],

      'no-useless-rename': 'error',
      'no-console': 'warn',
      'react/jsx-child-element-spacing': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@singlestore/react-hooks-disable-import/react-hooks-disable-import': 'error',
      'sonarjs/new-cap': 'off',
      'sonarjs/no-ignored-exceptions': 'off',
      'sonarjs/todo-tag': 'warn',
      'sonarjs/mouse-events-a11y': 'off', // this is also checked by the jsx-a11y
      'sonarjs/no-unstable-nested-components': 'warn',
      'sonarjs/slow-regex': 'error',
      'sonarjs/no-empty-function': 'off', // off for now as it causes "Cannot read properties of undefined (reading 'allow')" here and there
      'sonarjs/no-unused-expressions': 'off', // off for now as it causes "Cannot read properties of undefined (reading 'allowShortCircuit')"
      ...hooksPlugin.configs.recommended.rules,
    },
  },
];
