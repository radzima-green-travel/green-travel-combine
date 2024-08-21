import {HeaderSearchbar} from 'atoms';
import {selectSearchInputValue} from 'core/selectors';
import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {IProps, ScreenOptions} from './types';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'atoms';
import {useSearchActions, useSearchSelector} from 'core/hooks';
import {composeTestID} from 'core/helpers';

const HeaderTitle = () => {
  const dispatch = useDispatch();
  const {setSearchInputValue} = useSearchActions();
  const inputValue = useSearchSelector(selectSearchInputValue);
  const styles = useThemeStyles(themeStyles);

  const setInputValue = useCallback(
    (text: string) => {
      dispatch(setSearchInputValue(text));
    },
    [dispatch, setSearchInputValue],
  );

  return (
    <HeaderSearchbar
      testID="headerSearchbar"
      containerStyle={styles.headerTitleContainer}
      value={inputValue}
      onChange={setInputValue}
    />
  );
};

const HeaderRight = ({navigation, testID}: IProps) => {
  const styles = useThemeStyles(themeStyles);

  return (
    <TouchableOpacity
      hitSlop={{top: 15, left: 15, right: 15, bottom: 10}}
      activeOpacity={0.8}
      testID={composeTestID(testID, 'filterButton')}
      onPress={() => navigation.navigate('Filter')}>
      <Icon
        name="tune"
        style={styles.icon}
        size={24}
        testID={composeTestID(testID, 'filterIcon')}
      />
    </TouchableOpacity>
  );
};

export const screenOptions: ScreenOptions = props => ({
  headerTitle: () => <HeaderTitle />,
  headerRight: () => <HeaderRight testID="headerRight" {...props} />,
});
