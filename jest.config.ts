const esModules = ['firebase/auth', 'firebase', 'firebase-auth','@firebase/auth', '@firebase', '@firebase-auth'].join('|');
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.ts'],
    "clearMocks": true,
    "globals": {
      "ts-jest": {
        "tsconfig": "tsconfig.json"
      }
    },
    "setupFilesAfterEnv": [
      "<rootDir>/jest.setup.ts"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest",
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
    
    
}