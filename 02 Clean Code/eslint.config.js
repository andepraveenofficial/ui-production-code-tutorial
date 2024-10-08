import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    // UPDATED: Added 'node_modules' to ignore
    ignores: ['dist', 'node_modules'],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      'plugin:prettier/recommended',
    ], // Integrating Prettier with ESLint
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,

      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      /* ---> You can add custom rules here <--- */

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
      quotes: ['error', 'single'], // strings must be in single quotes
      'no-console': 'warn', // Allow console statements but warn, useful for development and reminding to clean up before production
      'no-debugger': 'error', // Throw an error if the debugger statement is used
      eqeqeq: ['error', 'always'], // use === and !== instead of == and !=
      semi: ['error', 'always'], // use semicolons at the end of statements
      curly: ['error', 'all'], // Require curly braces for all control statements
      camelcase: 'error', // use camelCase for variable and function names
      'no-trailing-spaces': 'error', // Disallow trailing whitespace at the end of lines
    },
  }
);
