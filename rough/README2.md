### Clean Code

#### Eslint

- Install Eslint : `npm install -D eslint eslint-plugin-react eslint-plugin-react-refresh eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin`
- Script

```json
 "lint": "eslint . --ext .ts,.tsx",
```

#### Prettier

1. Install Prettier : `npm install -D prettier eslint-config-prettier eslint-plugin-prettier`

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

3. Update ESLint Configuration to Include Prettier

```js
{
    extends: [
      'plugin:react/recommended',
      'plugin:prettier/recommended', // Add this line
    ],

    rules: {
      'prettier/prettier': 'error', // Enforce Prettier rules as ESLint errors
    },
}
```

4. Script

```json
  "format": "prettier --write .",
```

### Setup

- `npm install -g npm`
- `npx create-vite .`
- Select Typescript

### Installation

- `npm install`

### Start the Application

- `npm run dev`
