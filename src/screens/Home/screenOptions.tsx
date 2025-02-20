import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IProps, ScreenOptions} from './types';
import {Icon} from 'atoms/Icon';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

const HeaderRight = ({navigation, testID}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  return (
    <>
      <TouchableOpacity
        hitSlop={{top: 15, left: 15, right: 15, bottom: 10}}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('Search');
        }}
        {...getPlatformsTestID(composeTestID(testID, 'searchButton'))}
        style={styles.searchContainer}>
        <Icon
          name="search"
          style={styles.icon}
          size={24}
          testID={composeTestID(testID, 'searchIcon')}
        />
      </TouchableOpacity>
    </>
  );
};

export const screenOptions: ScreenOptions = props => ({
  headerRight: () => <HeaderRight {...props} testID="headerRight" />,
});
