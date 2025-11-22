import { THEME_TYPE } from 'core/constants';
import { selectAppTheme } from 'core/selectors/settingsSelectors';
import { useColorScheme as nativeUseColorScheme } from 'react-native';
import { useSelector } from 'react-redux';

export function useColorScheme() {
  const theme = useSelector(selectAppTheme);
  const systemTheme = (nativeUseColorScheme() || 'light') as THEME_TYPE;

  if (!theme) {
    return systemTheme;
  }

  return theme;
}
