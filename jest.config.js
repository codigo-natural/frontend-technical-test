module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/default',
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}', '!src/main.js'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/main.js',
    '<rootDir>/src/App.vue',
    '<rootDir>/src/services/userService.js',
    '<rootDir>/src/views/NotFoundView.vue',
    '<rootDir>/src/router/index.js',
  ],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json', 'vue'],
  transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
}
