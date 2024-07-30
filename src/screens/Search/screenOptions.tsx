import {HeaderSearchbar} from 'atoms';
import {selectSearchInputValue} from 'core/selectors';
import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {styles} from './styles';
import {useSearchActions, useSearchSelector} from 'core/hooks';

const HeaderTitle = () => {
  const dispatch = useDispatch();
  const inputValue = useSearchSelector(selectSearchInputValue);
  const {setSearchInputValue} = useSearchActions();

  const setInputValue = useCallback(
    (text: string) => {
      dispatch(setSearchInputValue(text));
    },
    [dispatch, setSearchInputValue],
  );

  return (
    <HeaderSearchbar
      containerStyle={styles.headerTitleContainer}
      value={inputValue}
      onChange={setInputValue}
    />
  );
};

export const screenOptions: NativeStackNavigationOptions = {
  headerTitle: () => <HeaderTitle />,
  headerRight: () => null,
};
