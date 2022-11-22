import {setTheme} from 'core/reducers';
import {useDispatch} from 'react-redux';
import {THEMES} from 'core/constants';
import {useCallback} from 'react';

export const useProfileSettingsTheme = () => {
  const dispatch = useDispatch();

  const changeTheme = useCallback(
    (theme: THEMES) => {
      dispatch(setTheme(theme));
    },
    [dispatch],
  );

  return {changeTheme};
};
