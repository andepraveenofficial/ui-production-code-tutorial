# Clean Code : Eslint && Prettier && Husky

## Techstack : React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

### Clean Code Setup

#### 1. Eslint

- Check Supported Typescript version for Eslint : `npm run lint`
- Install Typescript : `npm install -D typescript@5.5`
- Update Script File

```json
  "lint": "eslint .",
  "lint:fix": "eslint . --fix"
```

#### 2. Prettier

- Code Formatter

1. Install Prettier : `npm install -D prettier`

2. Create Prettier Configuration file : `.prettierrc` file in root directory

```.prettierrc
{
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "semi": true,
  "trailingComma": "es5",
  "endOfLine": "lf"
}

```

3.  Add the `.prettierignore` file.

```.prettierignore
# Ignore artifacts:
build
dist
coverage

# Ignore all HTML files:
*.html

.gitignore
.prettierignore

```

4. Change Script File

```json
   "scripts": {
     "format:check": "npx prettier --check .",
    "format": "npx prettier --write ."
   },
```

#### 3. Combine Eslint and Prettier

- Install : `npm install -D eslint-config-prettier eslint-plugin-prettier`

1.  `eslint-config-prettier` disables ESLint rules that conflict with Prettier.

2.  `eslint-plugin-prettier` : Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.

### Setup

- `npm install -g npm`
- `npx create-vite .`
- Select Typescript

### Installation

- `npm install`

### Start the Application

- `npm run dev`
