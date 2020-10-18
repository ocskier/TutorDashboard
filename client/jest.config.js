module.exports = {
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20
    }
  },
  collectCoverageFrom: ['src/**/*.jsx'],
  coveragePathIgnorePatterns: ['/node_modules/', '**/index.js'],
  coverageReporters: ['html', 'text', 'text-summary', 'json', 'lcov', 'clover']
};
