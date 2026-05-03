module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    // Mock the external firebase URL imports
    "^https://www.gstatic.com/firebasejs/(.*)$": "<rootDir>/__mocks__/firebaseMock.js"
  }
};
