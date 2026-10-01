// `REACT_VERSION=18 jest` (yarn test:react18) runs the suite on React 18.3,
// installed as the react-18 / react-dom-18 aliases. The mapping also applies
// inside node_modules, so @testing-library/react gets React 18 too.
const react18Mapper = {
  "^react$": "react-18",
  "^react/(.*)$": "react-18/$1",
  "^react-dom$": "react-dom-18",
  "^react-dom/(.*)$": "react-dom-18/$1",
};

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
    ...(process.env.REACT_VERSION === "18" && react18Mapper),
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
