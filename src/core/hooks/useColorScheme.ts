import {THEME_TYPE} from 'core/constants';
import {selectAppTheme} from 'core/selectors/themeSelectors';
import {useColorScheme as nativeUseColorScheme} from 'react-native';
import {useSelector} from 'react-redux';

export function useColorScheme() {
  let theme: THEME_TYPE;
  let userTheme = useSelector(selectAppTheme);
  const systemTheme = nativeUseColorScheme() as THEME_TYPE;

  if (userTheme) {
    return (theme = userTheme);
  }

  theme = systemTheme;
  return theme;
}
