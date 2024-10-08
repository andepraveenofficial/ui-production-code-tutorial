# Clean Code

## Basic Setup : React + TypeScript + Vite

#### 1. Initialize git

- Run `git init`
- Create a `.gitignore` file (ensure to include `node_modules/`, `.env`, and `dist/` in it).

### 2. husky

- Install husky : `npm install -D husky`
- Initialize husky : `npx husky init`
- Add a `pre-commit` hook:
  - Inside the **husky** folder, create a pre-commit file and add below code (These run before commit):

```bash
npm run format
npm run lint
npm run lint:fix
git status
```

#### 3. Eslint

- Install eslint : `npm install -D eslint`
- ESLint to understand TypeScript syntax : `npm install -D @typescript-eslint/parser`
- linting rules specific to TypeScript : `npm install -D @typescript-eslint/eslint-plugin`
- Initialize eslint : `npx eslint --init`

```bash
1. How would you like to use ESLint?
Select: To check syntax and find problems

2. What type of modules does your project use?
Choose : JavaScript modules (import/export).

3. Which framework does your project use?
Choose : React

4. Does your project use TypeScript?
Choose : Yes.

5. Where does your code run?
Choose :  Browser.

6. Would you like to install them now?
Choose : Yes

7.  Which package manager do you want to use? ...
Choose : npm
```

- After initialization, eslint creates `eslint.config.mjs` file.

```js eslint.config.js
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
```

- Run lint : Add these in script file

```json
  "lint": "eslint src/**/*.{js,jsx,ts,tsx}",
  "lint:fix": "eslint src/**/*.{js,jsx,ts,tsx} --fix",
```

### 4. prettier

- Install prettier : `npm install -D prettier`
- Create `.prettierrc` :

```js
{
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "semi": true,
  "trailingComma": "es5",
  "endOfLine": "lf"
}

```

- Run prettier

```json
  "format:check": "npx prettier --check .",
  "format": "prettier --write 'src/**/*.{js,jsx,ts,tsx,css,json}' --config ./.prettierrc"
```

- Add `.prettierignore`

```prettierignore
rest-client

# Build output
dist/
build/
out/

# Node modules
node_modules/

# TypeScript declaration files
*.d.ts

# Environment files
.env
.env.*

# Lock files
package-lock.json
pnpm-lock.yaml
yarn.lock

# Compiled JavaScript files
src/**/*.js

# Ignore specific config files
.eslintrc.js
tsconfig.json

```

#### 5. combine eslint and prettier

- `npm install -D eslint-config-prettier eslint-plugin-prettier`

### 6. Other Useful Packages

1. rollup visualizer : `npm install -D rollup-plugin-visualizer`

```ts vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // Automatically opens the visualizer in your default browser
      filename: 'stats.html', // Output file name
      template: 'treemap', // Options: 'sunburst', 'treemap', etc.
      brotliSize: true, // Show the size of the bundle using Brotli compression
    }),
  ],
});
```

- See the Report : `npm run build`

### Setup

- `npm install -g npm`
- `npx create-vite .`
- Select Typescript

### Installation

- `npm install`

### Start the Application

- `npm run dev`
