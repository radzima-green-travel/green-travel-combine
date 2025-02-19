module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|react-redux|@rnmapbox|@miblanchard|aws-amplify)',
  ],
  setupFilesAfterEnv: ['./tests/setup-tests.ts', '@rnmapbox/maps/setup-jest'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/tests/mocks/svgMocks.js',
  },
};
