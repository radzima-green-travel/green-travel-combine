import { useCallback, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { ObjectListViewMode } from '../../components/types';
import { type SearchScreenRouteProps } from '../../screens/Search/types';
import type { SearchFilters } from '../types';
import { checkIfSearchParamsApplied } from '../transformators/search';

export const useSearchListViewMode = (searchParameters: {
  query: string;
  filters?: SearchFilters;
}) => {
  const { params } = useRoute<SearchScreenRouteProps>();
  const { defaultViewMode = 'list', appliedFilters } = params ?? {};

  const defaultSearchViewMode: ObjectListViewMode = 'list';
  const initialFilters = useRef(appliedFilters).current;

  const [viewMode, setViewMode] = useState<ObjectListViewMode>(defaultViewMode);

  const [searchViewMode, setSearchViewMode] = useState<ObjectListViewMode>(
    defaultSearchViewMode,
  );

  const prevSearchParameters = useRef(searchParameters);

  if (prevSearchParameters.current !== searchParameters) {
    prevSearchParameters.current = searchParameters;
    setSearchViewMode(defaultSearchViewMode);
  }

  const searchParamsApplied = checkIfSearchParamsApplied(
    searchParameters,
    initialFilters,
  );

  const currentViewMode = searchParamsApplied ? searchViewMode : viewMode;

  // View mode is set to "list" when search query or filters are applied
  // When search parameters are cleared, it reverts to the last selected view mode
  // User's manual selection is preserved:
  // if i switched to "card" during search, it will stay "card" when search is cleared
  return {
    viewMode: currentViewMode,
    setViewMode: useCallback(
      (mode: ObjectListViewMode) => {
        setViewMode(mode);
        setSearchViewMode(mode);
      },
      [setSearchViewMode],
    ),
  };
};
