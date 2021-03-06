import {
  addObjectToSearchHistory,
  deleteObjectFromSearchHistory,
  deleteAllFromSearchHistory,
  setSearchInputValue,
} from 'core/reducers';
import {
  selectSearchHistory,
  selectSearchInputValue,
  selectIsHistoryVisible,
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

  const isHistoryVisible = useSelector(selectIsHistoryVisible);
  const data = isHistoryVisible ? history : searchResults;

  const addToHistory = useCallback(
    (object: IObject) => {
      dispatch(addObjectToSearchHistory(object.id));
    },
    [dispatch],
  );

  const deleteFromHistory = useCallback(
    (object: IObject) => {
      dispatch(deleteObjectFromSearchHistory(object.id));
    },
    [dispatch],
  );

  const deleteAllFromHistory = useCallback(() => {
    dispatch(deleteAllFromSearchHistory());
  }, [dispatch]);

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
    deleteFromHistory,
    deleteAllFromHistory,
    clearInput,
    onTextChange,
    inputValue,
  };
}
