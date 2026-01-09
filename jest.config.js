module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.stories.tsx',
    '!app/**/*.d.ts',
    '!app/**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
  },
  testMatch: ['**/__tests__/**/*.{ts,tsx}', '**/?(*.)+(spec|test).{ts,tsx}'],
};
