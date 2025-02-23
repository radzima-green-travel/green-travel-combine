import {StyleSheet} from 'react-native';

export const widgetStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: `${(158 / 154) * 100}%`,
    maxWidth: 300,
    right: -11,
  },
  image: {
    width: '100%',
    aspectRatio: 158 / 86,
  },
});
