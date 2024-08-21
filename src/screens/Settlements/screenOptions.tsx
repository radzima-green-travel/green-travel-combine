import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IProps, ScreenOptions} from './types';
import {Icon} from 'atoms';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
import {composeTestID} from 'core/helpers';

const HeaderLeft = ({navigation, testID}: IProps) => {
  const styles = useThemeStyles(themeStyles);

  return (
    <TouchableOpacity
      hitSlop={{top: 15, left: 15, right: 15, bottom: 10}}
      activeOpacity={0.8}
      onPress={() => navigation.goBack()}
      testID={composeTestID(testID, 'backButton')}
      style={styles.backButtonContainer}>
      <Icon
        name="chevronMediumLeft"
        style={styles.icon}
        size={24}
        testID={composeTestID(testID, 'backIcon')}
      />
    </TouchableOpacity>
  );
};

export const screenOptions: ScreenOptions = props => ({
  headerLeft: () => <HeaderLeft testID="headerLeft" {...props} />,
  headerRight: () => null,
});
