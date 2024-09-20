import {selectSearchInputValue} from 'core/selectors';
import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {IProps, ScreenOptions} from './types';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {Icon, CustomNavigationHeader, Button} from 'atoms';
import {useSearchActions, useSearchSelector} from 'core/hooks';
import {SearchField} from 'molecules';

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

  const onRightButtonPress = useCallback(
    (actionType: 'reset' | 'filter') => {
      if (actionType === 'reset') {
        setInputValue('');
      }
    },
    [setInputValue],
  );

  return (
    <SearchField
      testID="headerSearchbar"
      containerStyle={styles.headerTitleContainer}
      value={inputValue}
      onChange={setInputValue}
      filterActionTypeEnabled
      onRightButtonPress={onRightButtonPress}
    />
  );
};

const HeaderRight = ({navigation, testID}: IProps) => {
  return (
    <Button
      testID={testID}
      isIconOnlyButton
      // eslint-disable-next-line react/no-unstable-nested-components
      icon={textStyle => <Icon name="tune" size={24} style={textStyle} />}
      onPress={() => navigation.navigate('Filter')}
      theme="quarterlyGrey"
    />
  );
};

export const screenOptions: ScreenOptions = props => ({
  headerTitle: () => <HeaderTitle />,
  headerRight: () => <HeaderRight testID="headerRight" {...props} />,
  header: CustomNavigationHeader,
  headerTitleAlign: 'left',
  headerStyle: {
    // @ts-ignore
    height: 64,
  },
});
