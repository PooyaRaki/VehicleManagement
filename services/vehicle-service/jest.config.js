module.exports = {
    moduleNameMapper: {
      '@utils/(.*)': '<rootDir>/src/utils/$1',
      '@components/(.*)': '<rootDir>/src/components/$1',
      '@app/(.*)': '<rootDir>/src/app/$1',
      '@jobs/(.*)': '<rootDir>/src/jobs/$1',
    },
    testPathIgnorePatterns : [
      "index.ts",
    ],
    coveragePathIgnorePatterns: [
      "index.ts"
    ],
  };
  