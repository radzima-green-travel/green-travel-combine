import { StyleSheet } from 'react-native';

export const widgetStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: `${(150 / 154) * 100}%`,
    maxWidth: 300,
    left: -8,
    bottom: -5,
  },
  image: {
    width: '100%',
    aspectRatio: 150 / 121,
  },
});
