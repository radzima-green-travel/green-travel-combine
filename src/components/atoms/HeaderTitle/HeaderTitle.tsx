import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {Text} from 'react-native';
import {themeStyles} from './styles';
import {TestIDs} from 'core/types';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

interface Props {
  title: string;
}

export const HeaderTitle = memo(({title}: Props) => {
  const styles = useThemeStyles(themeStyles);

  return (
    <Text
      style={styles.text}
      {...getPlatformsTestID(composeTestID(TestIDs.HeaderScreenTitle, title))}>
      {title}
    </Text>
  );
});
