// Shared ESLint flat config for bloom-built products.
//
// Consumption: products extend this in their own eslint.config.js:
//
//   import bloomConfig from '.bloom/stack/configs/eslint/eslint.config.js';
//   export default [...bloomConfig, { /* project overrides */ }];
//
// Keep this file minimal. Project-specific rules belong in the consuming
// product, not here.

import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Strict but pragmatic
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', '.next/**', 'build/**', 'coverage/**'],
  },
];
