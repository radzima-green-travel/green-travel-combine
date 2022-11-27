import {setTheme} from 'core/reducers';
import {useDispatch} from 'react-redux';
import {THEME_TYPE} from 'core/constants';
import {useCallback} from 'react';

export const useProfileSettingsTheme = () => {
  const dispatch = useDispatch();

  const changeTheme = useCallback(
    (theme: THEME_TYPE | null) => {
      dispatch(setTheme(theme));
    },
    [dispatch],
  );

  return {changeTheme};
};
