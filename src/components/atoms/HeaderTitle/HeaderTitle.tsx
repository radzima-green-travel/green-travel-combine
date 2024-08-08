import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {Text} from 'react-native';
import {themeStyles} from './styles';
import {TestIDs} from 'core/types';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

interface Props {
  title: string;
  tintColor?: string;
}

export const HeaderTitle = memo(({title, tintColor}: Props) => {
  const styles = useThemeStyles(themeStyles);
  const textColor = tintColor ? {color: tintColor} : {};

  return (
    <Text
      style={[styles.text, textColor]}
      {...getPlatformsTestID(composeTestID(TestIDs.HeaderScreenTitle, title))}>
      {title}
    </Text>
  );
});
