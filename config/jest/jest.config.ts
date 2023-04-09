export default {
  clearMocks: true,
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleDirectories: ['node_modules'],
  testMatch: ['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'],
  rootDir: '../../',
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.svg$': '<rootDir>config/jest/jestEmptyComponent.tsx',
    '\\.(css|scss)$': 'identity-obj-proxy',
    '@/(.*)': '<rootDir>src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>config/jest/setupTests.ts'],
}
