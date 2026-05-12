import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  prettierConfig,
  ...tseslint.configs.recommended,
  {
    ignores: ['build/**', 'dist/**', 'node_modules/**', 'coverage/**'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {jsx: true},
      },
    },
    settings: {
      react: {version: 'detect'},
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
);
