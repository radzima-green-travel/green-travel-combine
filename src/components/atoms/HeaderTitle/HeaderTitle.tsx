import { useThemeStyles } from 'core/hooks';
import React, { memo } from 'react';
import { Text } from 'react-native';
import { themeStyles } from './styles';
import { composeTestID, getPlatformsTestID } from 'core/helpers';

interface Props {
  title: string;
  tintColor?: string;
  testID: string;
}

/**
 * @deprecated HeaderTitle is deprecated and will be removed in a future release.
 * Use the new standardized Header component from containers/Header instead.
 */

export const HeaderTitle = memo(({ title, tintColor, testID }: Props) => {
  const styles = useThemeStyles(themeStyles);
  const textColor = tintColor ? { color: tintColor } : {};

  return (
    <Text
      style={[styles.text, textColor]}
      {...getPlatformsTestID(composeTestID(testID, title))}>
      {title}
    </Text>
  );
});
