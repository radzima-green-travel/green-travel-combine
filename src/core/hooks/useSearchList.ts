import {addObjectToSearchHistory, setSearchInputValue} from 'core/reducers';
import {
  selectSearchHistory,
  selectSearchInputValue,
  selectSearchResults,
} from 'core/selectors';
import {ISearchItem} from 'core/types';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useSearchList() {
  const dispatch = useDispatch();
  const history = useSelector(selectSearchHistory);
  const searchResults = useSelector(selectSearchResults);
  const inputValue = useSelector(selectSearchInputValue);

  const isHistoryVisible = !inputValue;
  const data = isHistoryVisible ? history : searchResults;

  const addToHistory = useCallback(
    (object: ISearchItem) => {
      dispatch(addObjectToSearchHistory(object));
    },
    [dispatch],
  );

  const clearInput = useCallback(() => {
    dispatch(setSearchInputValue(''));
  }, [dispatch]);

  const onTextChange = useCallback(
    (value: string) => {
      dispatch(setSearchInputValue(value));
    },
    [dispatch],
  );

  return {
    isHistoryVisible,
    data,
    addToHistory,
    clearInput,
    onTextChange,
  };
}
