import {createSelector} from 'reselect';
import {IObject} from '../types';
import {IState} from 'core/store';
import {filter, orderBy, reduce} from 'lodash';
import {selectTransformedData} from './homeSelectors';
import {isLocationExist, removePunctuation} from 'core/helpers';

export const selectSearchInputValue = (state: IState) =>
  state.search.inputValue;

export const selectSearchInputForSearch = createSelector(
  selectSearchInputValue,
  inputValue => inputValue.trim(),
);

export const selectIsHistoryVisible = createSelector(
  selectSearchInputForSearch,
  inputValue => !inputValue,
);

const orderByName = (objects: IObject[]) => {
  return orderBy(objects, [({name}) => name.toLowerCase()], 'asc');
};

export const selectSearchHistory = createSelector(
  (state: IState) => state.search.history,
  selectTransformedData,
  (history, transformedData) => {
    if (!transformedData) {
      return [];
    }

    const objects = reduce(
      history,
      (acc, id) => {
        if (id in transformedData.objectsMap) {
          acc.push(transformedData.objectsMap[id]);
        }

        return acc;
      },
      [] as IObject[],
    );

    return orderByName(objects);
  },
);

export const selectSearchResults = createSelector(
  selectTransformedData,
  selectSearchInputForSearch,
  (transformedData, inputValue) => {
    if (!transformedData) {
      return [];
    }

    const objects = filter(
      Object.values(transformedData.objectsMap),
      object => {
        const {name, address} = object;
        const lowerInput = removePunctuation(inputValue.toLowerCase());
        return (
          removePunctuation(name.toLowerCase()).includes(lowerInput) ||
          (!!address &&
            removePunctuation(address.toLowerCase()).includes(lowerInput))
        );
      },
    );

    return orderByName(objects);
  },
);

export const selectSearchResultsWithLocation = createSelector(
  selectSearchResults,
  searchResults => filter(searchResults, isLocationExist),
);

export const selectSearchHistoryWithLocation = createSelector(
  selectSearchHistory,
  history => filter(history, isLocationExist),
);
