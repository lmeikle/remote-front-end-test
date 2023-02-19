module.exports = {
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '^.+\\.(css|less|scss)$': 'babel-jest',
    },
    setupFiles: ['<rootDir>/src/setupTestsBefore.js'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
};
