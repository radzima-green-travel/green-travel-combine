import {THEMES} from 'core/constants';
import {selectAppTheme} from 'core/selectors/themeSelectors';
import {useColorScheme as nativeUseColorScheme} from 'react-native';
import {useSelector} from 'react-redux';

export function useColorScheme() {
  let theme: THEMES;
  let currentTheme = useSelector(selectAppTheme);
  const userTheme = nativeUseColorScheme();

  if (currentTheme === THEMES.SYSTEM) {
    theme = userTheme as THEMES;
  } else {
    theme = currentTheme;
  }

  return theme;
}
