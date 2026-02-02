const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

const { defineConfig, globalIgnores } = require('eslint/config');
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
      'import/export': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^\\.\\./.*core',
              message:
                'Use absolute imports (core/*) instead of relative paths',
            },
            {
              regex: '^\\./core',
              message:
                'Use absolute imports (core/*) instead of relative paths',
            },
            {
              regex: '^\\.\\./.*features',
              message:
                'Use absolute imports (features/*) instead of relative paths',
            },
            {
              regex: '^\\./features',
              message:
                'Use absolute imports (features/*) instead of relative paths',
            },
          ],
        },
      ],
    },
  },
]);
