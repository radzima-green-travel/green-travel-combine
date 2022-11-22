import {useTranslation} from 'react-i18next';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from '../styles';
import {setTheme} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {selectAppTheme} from 'core/selectors/themeSelectors';
import {THEMES} from 'core/constants';

export const useProfileSettingsTheme = () => {
  const {t} = useTranslation('profile');
  const styles = useThemeStyles(themeStyles);

  const dispatch = useDispatch();
  const currentTheme = useSelector(selectAppTheme);

  const changeTheme = (theme: THEMES) => {
    dispatch(setTheme(theme));
  };

  return {t, styles, currentTheme, changeTheme};
};
