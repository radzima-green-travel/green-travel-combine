import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'atoms';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
import {composeTestID} from 'core/helpers';
import {Link} from 'expo-router';
import {ScreenOptions} from 'core/types';

const HeaderRight = () => {
  const styles = useThemeStyles(themeStyles);

  const testID = 'headerRight';

  return (
    <Link href="../" asChild>
      <TouchableOpacity
        hitSlop={{top: 15, left: 15, right: 15, bottom: 10}}
        activeOpacity={0.8}
        testID={composeTestID(testID, 'closeButton')}
        style={styles.closeButtonContainer}>
        <Icon
          name="close"
          style={styles.icon}
          size={24}
          testID={composeTestID(testID, 'closeIcon')}
        />
      </TouchableOpacity>
    </Link>
  );
};

export const screenOptions: ScreenOptions = {
  headerLeft: () => null,
  headerRight: () => <HeaderRight />,
  title: '',
};
