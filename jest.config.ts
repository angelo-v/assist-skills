/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coveragePathIgnorePatterns: ["/src/output/say.ts", "node_modules"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  }
};

export default config;
