import { defineConfig } from 'oxlint';

export default defineConfig({
  options: {
    typeAware: true,
    typeCheck: true,
  },
  plugins: ['eslint', 'typescript', 'react', 'jsx-a11y', 'import', 'vitest'],
  ignorePatterns: ['scripts', 'extractor.ts'],
  jsPlugins: ['eslint-plugin-sonarjs', 'eslint-plugin-storybook'],
  rules: {
    'eslint/no-unused-vars': [
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
  },
});
