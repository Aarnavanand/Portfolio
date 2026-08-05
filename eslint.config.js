import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextPlugin from 'eslint-config-next';

export default [
  {
    ignores: [
      '.next',
      'out',
      'build',
      'dist',
      'node_modules',
      '.git',
      '.eslintrc.json',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  nextPlugin,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];
