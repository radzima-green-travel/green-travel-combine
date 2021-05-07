import {useMemo} from 'react';
import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {mapValues} from 'lodash';
import {extractThemeStyles} from 'core/helpers';
import {useColorScheme} from './useColorScheme';

type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

export const useThemeStyles = function <T extends Object>(
  themeStyles: T,
  {disableStyleSheet = false} = {},
): NamedStyles<T> {
  const theme = useColorScheme();

  const styles = useMemo(() => {
    const processedStyles = mapValues(themeStyles, selectorStyles => {
      return extractThemeStyles(selectorStyles, theme);
    });
    if (disableStyleSheet) {
      return processedStyles;
    }

    return StyleSheet.create(processedStyles);
  }, [disableStyleSheet, theme, themeStyles]);

  return styles;
};
