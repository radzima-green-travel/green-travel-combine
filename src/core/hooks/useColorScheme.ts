import {useColorScheme as nativeUseColorScheme} from 'react-native';

export function useColorScheme() {
  let theme = nativeUseColorScheme();
  if (!theme) {
    theme = 'light';
  }

  return theme;
}
