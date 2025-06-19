import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  {
    ignores: ["components/ui/**/*"],
  },
  ...compat.extends(
    "next/core-web-vitals",
    "next",
    "prettier"
  ),
  {
    rules: {
      "import/order": "off",
      "comma-dangle": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-undef": "off",
    },
  },
];

export default config;
