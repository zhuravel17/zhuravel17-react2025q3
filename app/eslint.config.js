// eslint.config.js
import react from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': true,
        },
      ],
      'no-warning-comments': [
        'warn',
        {
          terms: ['todo', 'fixme', 'commented'],
          location: 'anywhere',
        },
      ],
      'no-fallthrough': 'warn',
      'no-redeclare': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
  },
];
