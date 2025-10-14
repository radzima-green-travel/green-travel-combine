const {getDefaultConfig} = require('expo/metro-config');
const {mergeConfig} = require('metro-config');
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
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
