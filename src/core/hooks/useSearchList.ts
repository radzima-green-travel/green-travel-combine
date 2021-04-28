import {addObjectToSearchHistory, setSearchInputValue} from 'core/reducers';
import {
  selectSearchHistory,
  selectSearchInputValue,
  selectSearchResults,
  selectSearchResultsWithLocation,
  selectSearchHistoryWithLocation,
} from 'core/selectors';
import {IObject} from 'core/types';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useSearchList({
  withLocation = false,
}: {withLocation?: boolean} = {}) {
  const dispatch = useDispatch();
  const history = useSelector(
    withLocation ? selectSearchHistoryWithLocation : selectSearchHistory,
  );
  const searchResults = useSelector(
    withLocation ? selectSearchResultsWithLocation : selectSearchResults,
  );
  const inputValue = useSelector(selectSearchInputValue);

  const isHistoryVisible = !inputValue;
  const data = isHistoryVisible ? history : searchResults;

  const addToHistory = useCallback(
    (object: IObject) => {
      dispatch(addObjectToSearchHistory(object.id));
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
    inputValue,
  };
}
