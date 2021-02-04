import {StackNavigationOptions} from '@react-navigation/stack';
import {HeaderSearchbar} from 'atoms';
import {setSearchInputValue} from 'core/reducers';
import React, {useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {debounce} from 'lodash';

const HeaderTitle = () => {
  const dispatch = useDispatch();

  const setInputValue = useCallback(
    (text: string) => {
      dispatch(setSearchInputValue(text));
    },
    [dispatch],
  );

  const debounceSetInputValue = useMemo(
    () => debounce(setInputValue, 200, {leading: false, trailing: true}),
    [setInputValue],
  );

  return <HeaderSearchbar onChange={debounceSetInputValue} />;
};

export const screenOptions: StackNavigationOptions = {
  headerTitle: () => <HeaderTitle />,
  headerTitleContainerStyle: {
    width: '100%',
    paddingLeft: 48,
    paddingRight: 16,
  },
  headerLeftContainerStyle: {paddingLeft: 16, marginBottom: 14},
};
