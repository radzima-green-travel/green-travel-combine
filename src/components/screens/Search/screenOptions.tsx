import {StackNavigationOptions} from '@react-navigation/stack';
import {HeaderSearchbar} from 'atoms';
import {setSearchInputValue} from 'core/reducers';
import {selectSearchInputValue} from 'core/selectors';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isAndroid} from 'services/PlatformService';

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
    flexGrow: isAndroid ? 0.82 : 0.85,
    marginRight: 10,
    marginLeft: 0,
    maxWidth: undefined,
  },
  headerLeftContainerStyle: {
    flexGrow: isAndroid ? 0.18 : 0.15,
    marginBottom: 3,
    paddingLeft: 16,
  },
  headerRightContainerStyle: {
    flexGrow: 0,
  },
};
