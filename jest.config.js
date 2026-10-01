/** @type {import('jest').Config} */
module.exports = {
  roots: ["<rootDir>"],
  testEnvironment: "jsdom",
  transform: {
    // tsconfig.json has isolatedModules, so ts-jest transpiles each file without
    // type-checking; `yarn typecheck` covers __tests__. That mode also accepts
    // verbatimModuleSyntax (full type-check mode rejects it with TS1295 because
    // ts-jest emits CommonJS).
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "@lib/(.*)": "<rootDir>/src/$1",
    "@mocks/(.*)": "<rootDir>/__mocks__/$1",
  },
  modulePathIgnorePatterns: ["<rootDir>/dist"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // Measure all of src, not just files some test happens to import.
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/index.ts"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
