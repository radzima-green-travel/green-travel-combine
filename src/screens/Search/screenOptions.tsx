import {HeaderSearchbar} from 'atoms';
import {setSearchInputValue} from 'core/actions';
import {selectSearchInputValue} from 'core/selectors';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {styles} from './styles';

const HeaderTitle = () => {
  const dispatch = useDispatch();
  const inputValue = useSelector(selectSearchInputValue);

  const setInputValue = useCallback(
    (text: string) => {
      dispatch(setSearchInputValue(text));
    },
    [dispatch],
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
