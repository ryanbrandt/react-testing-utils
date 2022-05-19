module.exports = {
  roots: ["<rootDir>/"],
  testEnvironment: "jsdom",
  preset: "ts-jest",
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "@lib/(.*)": "<rootDir>/src/$1",
    "@mocks/(.*)": "<rootDir>/__mocks__/$1",
  },
  modulePathIgnorePatterns: ["lib"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
