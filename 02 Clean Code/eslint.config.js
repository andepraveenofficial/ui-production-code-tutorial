import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser, // Specify the parser for TypeScript files
      globals: globals.browser, // Define global variables
    },
    settings: {
      react: {
        version: 'detect', // Detect React version
      },
    },

    plugins: {
      prettier, // Use Prettier as a plugin object
      '@typescript-eslint': tseslint, // Add TypeScript ESLint as a plugin object
      react: pluginReact, // Add React plugin,
    },
    rules: {},
  },

  {
    rules: {
      // Additional rules from TypeScript ESLint
      ...tseslint.configs.recommended.rules,
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    /* -----> Override the Rules <----- */
    // Write your own rules
    rules: {
      'react/react-in-jsx-scope': 'off',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          allowSeparatedGroups: true,
        },
      ], // Sorting imports order
      'no-unused-vars': 'error', // Unused variables
      indent: ['error', 2], // Indentation
      quotes: ['error', 'single'], // Strings must be in single quotes
      'no-console': 'warn', // Allow console statements but warn
      'no-debugger': 'error', // Throw an error if the debugger statement is used
      eqeqeq: ['error', 'always'], // Use === and !== instead of == and !=
      semi: ['error', 'always'], // Use semicolons at the end of statements
      curly: ['error', 'all'], // Require curly braces for all control statements
      camelcase: 'error', // Use camelCase for variable and function names
      'no-trailing-spaces': 'error', // Disallow trailing whitespace at the end of lines
    },
  },
];
