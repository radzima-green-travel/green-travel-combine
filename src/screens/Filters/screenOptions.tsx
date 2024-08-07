import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IProps, ScreenOptions} from './types';
import {Icon} from 'atoms';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
import {TestIDs} from 'core/types';

const HeaderRight = ({navigation}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  return (
    <TouchableOpacity
      hitSlop={{top: 15, left: 15, right: 15, bottom: 10}}
      activeOpacity={0.8}
      onPress={() => navigation.goBack()}
      style={styles.closeButtonContainer}>
      <Icon
        name="close"
        style={styles.icon}
        size={24}
        testID={TestIDs.HeaderCloseButton}
      />
    </TouchableOpacity>
  );
};

export const screenOptions: ScreenOptions = props => ({
  headerLeft: () => null,
  headerRight: () => <HeaderRight {...props} />,
  title: '',
});
