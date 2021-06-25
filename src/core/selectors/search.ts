import {createSelector} from 'reselect';
import {ITransformedData, IObject} from '../types';
import {IState} from 'core/store';
import {filter, orderBy, reduce} from 'lodash';
import {selectTransformedData} from './homeSelectors';
import {isLocationExist} from 'core/helpers';

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
          reduce(
            history,
            (acc, id) => {
              if (transformedData.objectsMap[id]) {
                return [...acc, transformedData.objectsMap[id]];
              }

              return acc;
            },
            [] as IObject[],
          ),
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
          filter(
            Object.values(transformedData.objectsMap),
            object =>
              object.name.toLowerCase().includes(inputValue.toLowerCase()) ||
              (Boolean(object.address) &&
                object.address
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())),
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
  IObject[],
  IObject[]
>(selectSearchResults, searchResults => filter(searchResults, isLocationExist));

export const selectSearchHistoryWithLocation = createSelector<
  IState,
  IObject[],
  IObject[]
>(selectSearchHistory, history => filter(history, isLocationExist));
