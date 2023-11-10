import {setTheme} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {THEME_TYPE} from 'core/constants';
import {useCallback} from 'react';
import {selectAppTheme} from 'core/selectors';
import switchTheme from 'react-native-theme-switch-animation';
import {GestureResponderEvent} from 'react-native';
import {useColorScheme as useSystemColorScheme} from 'react-native';
import {useColorScheme} from 'core/hooks';

export const useProfileSettingsTheme = () => {
  const dispatch = useDispatch();
  const userTheme = useSelector(selectAppTheme);

  const currentTheme = useColorScheme();
  const systemTheme = useSystemColorScheme();

  const getIsThemeUpdated = useCallback(
    (theme: THEME_TYPE | null) => {
      const nextTheme = theme || systemTheme;

      return nextTheme !== currentTheme;
    },
    [currentTheme, systemTheme],
  );

  const changeTheme = useCallback(
    (theme: THEME_TYPE | null, event: GestureResponderEvent) => {
      if (getIsThemeUpdated(theme)) {
        const x = event.nativeEvent.locationX;
        const y = event.nativeEvent.locationY;
        // @ts-ignore
        event.currentTarget?.measure?.((_x1, _y1, _width, _height, px, py) => {
          switchTheme({
            switchThemeFunction: () => {
              dispatch(setTheme(theme));
            },
            animationConfig: {
              type: 'circular',
              duration: 500,
              startingPoint: {
                cy: py + y,
                cx: px + x,
              },
            },
          });
        });
      } else {
        dispatch(setTheme(theme));
      }
    },
    [dispatch, getIsThemeUpdated],
  );

  return {changeTheme, userTheme};
};
