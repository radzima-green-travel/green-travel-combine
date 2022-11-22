import {useTranslation} from 'react-i18next';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from '../styles';
import {setTheme} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {selectAppTheme} from 'core/selectors/themeSelectors';
import {THEMES} from 'core/constants';
import {useCallback} from 'react';

export const useProfileSettingsTheme = () => {
  const {t} = useTranslation('profile');
  const styles = useThemeStyles(themeStyles);

  const dispatch = useDispatch();
  const currentTheme = useSelector(selectAppTheme);

  const changeTheme = useCallback(
    (theme: THEMES) => {
      dispatch(setTheme(theme));
    },
    [dispatch],
  );

  return {t, styles, currentTheme, changeTheme};
};
