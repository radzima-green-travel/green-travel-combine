import {StackNavigationOptions} from '@react-navigation/stack';
import {HeaderSearchbar} from 'atoms';
import {setSearchInputValue} from 'core/reducers';
import {selectSearchInputValue} from 'core/selectors';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isIOS} from 'services/PlatformService';

const HeaderTitle = () => {
  const dispatch = useDispatch();
  const inputValue = useSelector(selectSearchInputValue);

  const setInputValue = useCallback(
    (text: string) => {
      dispatch(setSearchInputValue(text));
    },
    [dispatch],
  );

  return <HeaderSearchbar value={inputValue} onChange={setInputValue} />;
};

export const screenOptions: StackNavigationOptions = {
  headerTitle: () => <HeaderTitle />,
  headerTitleContainerStyle: {
    width: '100%',
    paddingLeft: isIOS ? 48 : 60,
    paddingRight: 16,
  },
  headerLeftContainerStyle: {paddingLeft: isIOS ? 10 : 0, marginBottom: 5},
};
