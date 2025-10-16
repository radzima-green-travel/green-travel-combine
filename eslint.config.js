const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

const {defineConfig, globalIgnores} = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  globalIgnores(['dist/*']),
  {
    files: ['babel.config.js'],
    globals: {
      GeoJSON: true,
    },
  },
  {
    rules: {
      'react/display-name': 'off',
    },
  },
]);
