# Clean Code

## Basic Setup : React + TypeScript + Vite

#### 1. Initialize git

- Run `git init`
- Create a `.gitignore` file 

```.gitignore
node_modules
.env
dist/
```

### 2. husky

- Install husky : `npm install -D husky`
- Initialize husky : `npx husky init` (`npx husky-init` to create `.husky` folder)
- Add the `pre-commit` in `.husky` folder (If not) and add below code (These run before commit) in `pre-commit` file.

```
echo 'Husky is working!'
```

-  Add the `pre-push` in `.husky` folder (If not) and add below code (These run before commit) in `pre-push` file.

```bash
echo 'Husky is working!'
npm run format
npm run lint
npm run lint:fix
git status
```

- Add to action script in `package.json`

```json
  "scripts": {
    "prepare": "husky install",
    "precommit": "npm run lint-fix && npm run format",
    "prepush": "npm run lint"
  },
```

- Checking After All Setup
- `git commit -m "Test commit"`
- `git push origin master`

#### 3. Eslint

A linter for identifying and reporting problems in your code.

- Install eslint : `npm install -D eslint`
- ESLint to understand TypeScript syntax : `npm install -D @typescript-eslint/parser`
- linting rules specific to TypeScript : `npm install -D @typescript-eslint/eslint-plugin`
-  Install react-plugin : `npm install -D eslint-plugin-react@latest`
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

Code Formatter

- Install prettier : `npm install -D prettier`
- Create Prettier Configuration file `.prettierrc` :

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

- Add the `.prettierignore` file.

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

- Run prettier in Scripts

```json
  "format:check": "npx prettier --check .",
  "format": "prettier --write 'src/**/*.{js,jsx,ts,tsx,css,json}' --config ./.prettierrc"
```

#### 5. combine eslint and prettier

- Install `npm install -D eslint-config-prettier eslint-plugin-prettier`
- `eslint-config-prettier` : disables ESLint rules that conflict with Prettier.
- `eslint-plugin-prettier` : Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.

### 6. Some Useful Eslint Packages

1. Sonar : `npm install -D eslint-plugin-sonarjs`

```js
import sonarjs from 'eslint-plugin-sonarjs'; // Add this import

 plugins: {
      prettier: prettier, // Use Prettier as a plugin object
      '@typescript-eslint': tseslint, // Add TypeScript ESLint as a plugin object
      react: pluginReact, // Add React plugin as an object
      sonarjs: sonarjs, // Add SonarJS plugin as an object
    },

    "rules": {
    // You can customize SonarJS rules here
   'sonarjs/cognitive-complexity': ['error', 15], // SonarJS rule
   'sonarjs/no-duplicate-string': ['error', { threshold: 5 }], // Corrected SonarJS rule with object
  }
```

2. imports : `npm install -D eslint-plugin-import`

```js
import importPlugin from 'eslint-plugin-import'; // Import ESLint Plugin Import

plugins: {
      prettier: prettier, // Use Prettier as a plugin object
      '@typescript-eslint': tseslint, // Add TypeScript ESLint as a plugin object
      react: pluginReact, // Add React plugin as an object
      sonarjs: sonarjs, // Add SonarJS plugin as an object
      import: importPlugin, // Add ESLint Plugin Import as an object
    },
```

### 7. Other Useful Packages

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

#### Checking After All Setup

- `git commit -m "Test commit"`
- `git push origin master`

### Setup

- `npm install -g npm`
- `npx create-vite .`
- Select Typescript

### Installation

- `npm install`

### Start the Application

- `git init`
- `npm run dev`
