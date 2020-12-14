const { forbidElementsConfig } = require("./forbidden-elements");

module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  plugins: ["@typescript-eslint", "react", "import", "prettier", "react-hooks"],
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    // TODO: why doesn't this work
    // "react-app",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/react",
    "plugin:import/typescript",
    "plugin:unicorn/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. '@typescript-eslint/explicit-function-return-type': 'off',
    indent: "off",
    "no-console": "warn",
    "prettier/prettier": "warn",
    // Typescript
    "@typescript-eslint/naming-convention": [
      "warn",
      { selector: "variableLike", format: ["camelCase", "PascalCase", "UPPER_CASE"], leadingUnderscore: "allow" },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/indent": "off", // conflicts with prettier
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/ban-ts-ignore": "off",
    // React
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/forbid-elements": ["warn", forbidElementsConfig],
    // Import
    "import/no-default-export": "error",
    "import/no-extraneous-dependencies": "warn",
    "import/no-cycle": "error",
    "import/no-self-import": "warn",
    "import/first": "warn",
    // "import/order": [
    //   "error",
    //   { "newlines-between": "always-and-inside-groups" },
    // ],
    "import/order": "error",
    // Unicorn
    "unicorn/prevent-abbreviations": "off",
    "unicorn/no-null": "off",
    "unicorn/explicit-length-check": "off",
  },
  // TODO: this was causing NodeJS out of memory --  https://github.com/typescript-eslint/typescript-eslint/issues/1192
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      // parserOptions: {
      //   project: ["./tsconfig.json", "./packages/*/tsconfig.json"],
      // },
      extends: [
        // "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        // // TODO: enable these rules preventing unsafe/untyped things
        // "@typescript-eslint/no-unsafe-assignment": "off",
        // "@typescript-eslint/no-unsafe-call": "off",
        // "@typescript-eslint/no-unsafe-member-access": "off",
        // "@typescript-eslint/no-unsafe-return": "off",
        // "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
      },
    },
  ],
  settings: {
    react: {
      version: "16.13.1",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      "eslint-import-resolver-typescript": true,
    },
  },
};
