import {setTheme} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {THEME_TYPE} from 'core/constants';
import {useCallback} from 'react';
import {selectAppTheme} from 'core/selectors';

export const useProfileSettingsTheme = () => {
  const dispatch = useDispatch();
  const userTheme = useSelector(selectAppTheme);

  const changeTheme = useCallback(
    (theme: THEME_TYPE | null) => {
      dispatch(setTheme(theme));
    },
    [dispatch],
  );

  return {changeTheme, userTheme};
};
