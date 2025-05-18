const {getDefaultConfig} = require('expo/metro-config');
const {mergeConfig} = require('@react-native/metro-config');
const {
  resolver: {sourceExts, assetExts},
} = getDefaultConfig(__dirname);

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    // https://github.com/arktypeio/arktype/issues/1027
    resolveRequest: (context, moduleImport, platform) => {
      if (moduleImport === 'arktype' || moduleImport.startsWith('@ark/')) {
        return context.resolveRequest(
          {
            ...context,
            unstable_enablePackageExports: true,
          },
          moduleImport,
          platform,
        );
      }

      return context.resolveRequest(context, moduleImport, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
