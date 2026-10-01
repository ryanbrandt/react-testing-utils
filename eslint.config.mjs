// @ts-check
// `.mjs` because the package is CommonJS (no "type": "module"): jest.config.js
// relies on `module.exports`, like rollup.config.mjs does.
import js from "@eslint/js";
import prettier from "eslint-config-prettier/flat";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import { importX } from "eslint-plugin-import-x";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores(["dist/", "coverage/", ".yarn/"]),

  // Base rule sets for every linted file.
  js.configs.recommended,
  tseslint.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    settings: {
      "import-x/resolver-next": [createTypeScriptImportResolver()],
    },
    rules: {
      // TypeScript already checks default imports.
      "import-x/default": "off",
      "import-x/no-named-as-default": "off",
      "import-x/no-named-as-default-member": "off",
      "import-x/no-extraneous-dependencies": [
        "error",
        { devDependencies: true },
      ],
      // Packages first, then the @lib/@mocks aliases.
      "import-x/order": [
        "error",
        {
          pathGroups: ["@lib", "@mocks"].map((alias) => ({
            pattern: `${alias}/**`,
            group: "external",
            position: "after",
          })),
        },
      ],
      "func-names": ["error", "never"],
      "prefer-const": "error",
      "no-ternary": "error",
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
      ],
    },
  },

  // Tooling files (jest, rollup, eslint configs) run in Node.
  {
    files: ["*.config.{js,mjs}"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["*.config.js"],
    languageOptions: { sourceType: "commonjs" },
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },

  // Library source, mocks and tests: browser + jest globals. Of the
  // type-aware rules, only the promise checks: every userEvent/waitFor call
  // must be awaited. (recommendedTypeChecked mostly flags the `any` that
  // Jest's asymmetric matchers return.)
  {
    files: ["{src,__tests__,__mocks__}/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.jest },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Turns off rules that conflict with Prettier; keep it after the rule sets.
  prettier,

  // eslint-config-prettier disables `curly`, but "all" is compatible with
  // Prettier, so re-enable it.
  { rules: { curly: ["error", "all"] } },
);
