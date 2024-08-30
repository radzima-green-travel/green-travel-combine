module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['@babel/preset-typescript', 'babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            containers: './src/components/containers',
            'containers/*': './src/components/containers/*',
            atoms: './src/components/atoms',
            'atoms/*': './src/components/atoms/*',
            assets: './src/assets',
            'assets/*': './src/assets/*',
            screens: './src/components/screens',
            'screens/*': './src/components/screens/*',
            core: './src/core',
            'core/*': './src/core/*',
            services: './src/services',
            'services/*': './src/services/*',
            molecules: './src/components/molecules',
            'molecules/*': './src/components/molecules/*',
            organisms: './src/components/organisms',
            'organisms/*': './src/components/organisms/*',
            mock: './src/mock',
            selectors: './src/core/selectors',
            navigation: './src/navigation',
            'navigation/*': './src/navigation/*',
            api: './src/api',
            'api/*': './src/api/*',
            storage: './src/storage',
            'storage/*': './src/storage/*',
            preview: './src/components/atoms/Preview/Preview',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
