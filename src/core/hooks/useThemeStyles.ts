import {useMemo} from 'react';
import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {mapValues} from 'lodash';
import {extractThemeStyles} from 'core/helpers';
import {useColorScheme} from './useColorScheme';

type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

export const useThemeStyles = function <T extends Object>(
  themeStyles: T,
): NamedStyles<T> {
  const theme = useColorScheme();

  const styles = useMemo(() => {
    return StyleSheet.create(
      mapValues(themeStyles, (selectorStyles) => {
        return extractThemeStyles(selectorStyles, theme);
      }),
    );
  }, [theme, themeStyles]);

  return styles;
};
