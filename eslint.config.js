import google from "eslint-config-google";
delete google.rules["valid-jsdoc"];
delete google.rules["require-jsdoc"];
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    extends: [google],
    plugins: {
      typescriptPlugin
    },
    files: ["./src/**/*.ts"],
    languageOptions: {
      sourceType: "module", 
      parser: typescriptParser
    },
    rules: {
      "object-curly-spacing": ["error", "always"],
      "arrow-parens": ["error", "as-needed"],
      "comma-dangle": ["error", "never"],
      'max-len': ["error", { "code": 120 }]
    },
  }
]);
