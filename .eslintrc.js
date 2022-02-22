const path = require('path');

module.exports = {
  extends: [
    'plugin:@xcritical/eslint-plugin-xcritical/base',
    'plugin:@xcritical/eslint-plugin-xcritical/typescript',
    'prettier',
    'plugin:redux-saga/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['prettier', 'redux-saga'],
  rules: {
    'no-console': [
      'error',
      {
        allow: ['error', 'warn', 'info'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        bracketSpacing: true,
        jsxBracketSameLine: false,
        trailingComma: 'all',
      },
    ],
    'redux-saga/no-unhandled-errors': 'warn',
    'import/no-extraneous-dependencies': 'warn',
    'react-hooks/exhaustive-deps': 0,
    'react/no-array-index-key': 'warn',
    'import/no-unresolved': ['error'],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@xcritical/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@my-account/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@my-acc-forex/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@webapp/**',
            group: 'internal',
            position: 'after',
          },
        ],
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'if', next: '*' },
      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'no-underscore-dangle': 1, // temp,
    // Prettier conflicts
    'import/newline-after-import': 0,
    'react-hooks/rules-of-hooks': 1,
    'react/prop-types': 1, // temp
    'no-bitwise': 1, //temp
    '@typescript-eslint/no-floating-promises': 1, // temp
    '@typescript-eslint/no-shadow': 1, // temp
      '@typescript-eslint/no-unused-vars': 0,
  },
  globals: {
    APP_PATH: true,
    JSX: true,
    __DEV__: true,
  },
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    ecmaVersion: 6,
    sourceType: 'module',
    "allowJs": true,
    "checkJs": false,
    parser: 'typescript-eslint-parser',
    plugins: [
      "@typescript-eslint"
    ],
    ecmaFeatures: {
      jsx: true,
      ecmaVersion: 6,
    },
    tsconfigRootDir: __dirname,
  },
  "overrides": [{
    "files": ["*.js", "*.jsx"],
    "rules":
    {
      '@typescript-eslint/no-unsafe-argument': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/restrict-plus-operands': 1,
      '@typescript-eslint/no-var-requires': 1,
      '@typescript-eslint/unbound-method': 1,
    },
  }],
};
