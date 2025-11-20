import React from 'react';
import { TouchableOpacity } from 'react-native';
import { IProps, ScreenOptions } from './types';
import { Icon } from 'atoms';
import { useThemeStyles } from 'core/hooks';
import { themeStyles } from './styles';
import { composeTestID, getPlatformsTestID } from 'core/helpers';

const HeaderRight = ({ navigation, testID }: IProps) => {
  const styles = useThemeStyles(themeStyles);
  return (
    <TouchableOpacity
      hitSlop={{ top: 15, left: 15, right: 15, bottom: 10 }}
      activeOpacity={0.8}
      onPress={() => navigation.goBack()}
      {...getPlatformsTestID(composeTestID(testID, 'closeButton'))}
      style={styles.closeButtonContainer}>
      <Icon
        name="close"
        style={styles.icon}
        size={24}
        testID={composeTestID(testID, 'closeIcon')}
      />
    </TouchableOpacity>
  );
};

export const screenOptions: ScreenOptions = props => ({
  headerLeft: () => null,
  headerRight: () => <HeaderRight testID="headerRight" {...props} />,
  title: '',
});
