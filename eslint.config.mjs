import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  ...compat.extends(
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "prettier"
  ),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "import/order": "off",
      "comma-dangle": "off",
      "no-undef": "off",
    },
  },
];

export default config;
