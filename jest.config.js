module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/react-native/jest-setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
  ],
}
