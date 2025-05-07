import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'atoms';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
import {composeTestID} from 'core/helpers';
import {Link} from 'expo-router';
import {ScreenOptions} from 'core/types';

const HeaderLeft = () => {
  const styles = useThemeStyles(themeStyles);

  const testID = 'headerLeft';

  return (
    <Link href="./" asChild>
      <TouchableOpacity
        hitSlop={{top: 15, left: 15, right: 15, bottom: 10}}
        activeOpacity={0.8}
        testID={composeTestID(testID, 'backButton')}
        style={styles.backButtonContainer}>
        <Icon
          name="chevronMediumLeft"
          style={styles.icon}
          size={24}
          testID={composeTestID(testID, 'backIcon')}
        />
      </TouchableOpacity>
    </Link>
  );
};

export const screenOptions: ScreenOptions = {
  headerLeft: () => <HeaderLeft />,
  headerRight: () => null,
};
