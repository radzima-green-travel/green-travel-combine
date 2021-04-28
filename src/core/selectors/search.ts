import {createSelector} from 'reselect';
import {ITransformedData, IObject} from '../types';
import {IState} from 'core/store';
import {filter, orderBy, map} from 'lodash';
import {selectTransformedData} from './homeSelectors';

export const selectSearchInputValue = (state: IState) =>
  state.search.inputValue;

export const selectSearchHistory = createSelector<
  IState,
  string[],
  ITransformedData | null,
  IObject[]
>(
  (state: IState) => state.search.history,
  selectTransformedData,
  (history, transformedData) =>
    transformedData
      ? orderBy(
          map(history, id => transformedData.objectsMap[id]),
          [({name}) => name.toLowerCase()],
          'asc',
        )
      : [],
);

export const selectSearchResults = createSelector<
  IState,
  ITransformedData | null,
  string,
  IObject[]
>(
  selectTransformedData,
  selectSearchInputValue,
  (transformedData, inputValue) => {
    return transformedData
      ? orderBy(
          filter(Object.values(transformedData.objectsMap), object =>
            object.name.toLowerCase().includes(inputValue.toLowerCase()),
          ),
          [({name}) => name.toLowerCase()],
          'asc',
        )
      : [];
  },
);

export const selectSearchResultsWithLocation = createSelector<
  IState,
  ITransformedData | null,
  string,
  IObject[]
>(
  selectTransformedData,
  selectSearchInputValue,
  (transformedData, inputValue) => {
    return transformedData
      ? orderBy(
          filter(
            Object.values(transformedData.objectsMap),
            object =>
              object.name.toLowerCase().includes(inputValue.toLowerCase()) &&
              Boolean(object.location),
          ),
          [({name}) => name.toLowerCase()],
          'asc',
        )
      : [];
  },
);

export const selectSearchHistoryWithLocation = createSelector<
  IState,
  IObject[],
  IObject[]
>(selectSearchHistory, history =>
  filter(history, ({location}) => Boolean(location)),
);
