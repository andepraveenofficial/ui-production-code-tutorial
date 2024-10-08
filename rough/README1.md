### Clean Code Setup

### 1. Eslint

A linter for identifying and reporting problems in your code.

1. Install (if not already installed): `npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`
2. Install : `npm install -D eslint-plugin-react@latest`
3. modify eslint configure file

```cjs .eslintrc.cjs
/*
 * This is to configure the eslint and will provide the common errors while writing the code
 * and compile time
 */

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { ESLintConfig } from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: ["dist"], // Files to ignore
  },
  {
    extends: [
      js.configs.recommended, // Base ESLint recommended rules
      "plugin:@typescript-eslint/recommended", // TypeScript recommended rules
      "plugin:react/recommended", // React recommended rules
    ],
    files: ["**/*.{ts,tsx}"], // Applies to TypeScript and TSX files
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: "@typescript-eslint/parser", // Use the TypeScript parser
    },
    plugins: {
      "@typescript-eslint": ESLintConfig, // TypeScript ESLint plugin
      "react-hooks": reactHooks, // React hooks plugin
      "react-refresh": reactRefresh, // React refresh plugin
    },
    rules: {
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // React Refresh rules
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Custom rules
      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          allowSeparatedGroups: true,
        },
      ],
      "no-unused-vars": "error", // Error on unused variables
      indent: ["error", 2], // Enforce 2 spaces for indentation
      quotes: ["error", "single"], // Enforce single quotes
      "no-console": "warn", // Warn on console statements
      "no-debugger": "error", // Error on debugger statement
      eqeqeq: ["error", "always"], // Enforce strict equality checks
      semi: ["error", "always"], // Require semicolons
      curly: ["error", "all"], // Require curly braces for all blocks
      camelcase: "error", // Enforce camelCase naming
      "no-trailing-spaces": "error", // Disallow trailing spaces
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },
];
```

4.  Install `npm install -D eslint-config-prettier`

- `eslint-config-prettier` disables ESLint rules that conflict with Prettier.
- `plugin:prettier/recommended` enables the prettier/prettier rule.

```eslintrc.config.js
module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    // Add your custom ESLint rules here
  }
};
```

5. Install `npm install -D eslint-plugin-prettier`
   - Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.

````


### 3. Husky

A tool that allows you to run scripts before, after, and during Git operations.

1. Install Husky : `npm install -D husky`
2. Initialize the git : `git init`
3. Add to action script in `package.json`

```json
  "scripts": {
    "prepare": "husky install",
    "precommit": "npm run lint-fix && npm run format",
    "prepush": "npm run lint"
  },
````

4.  Add the git hooks Actions

- `npm run prepare` or `npx husky-init` to create `.husky` folder

- Add the `pre-commit` in `.husky` folder (If not).
- Add below script in `pre-commit file`

```
 #!/usr/bin/env sh
. "$(dirname -- "$0")/\_/husky.sh"

# Run formatter
npm run format

# Run linter
npm run lint

# Fix lint error
npm run lint-fix

```

- Add the `pre-push` in `.husky folder`.
- Add below script in `pre-push file`

```
 #!/usr/bin/env sh
. "$(dirname -- "$0")/\_/husky.sh"

# Run formatter
npm run format

# Run linter
npm run lint

# Fix lint error
npm run lint-fix

```

- `git commit -m "Test commit"`
- `git push origin master`

### Project Setup

- `npm install -g npm`
- `npx create-vite .`
- Select Typescript

### Clean Code

### Installation

- `npm install`

### Start the Application

- `npm run dev`
