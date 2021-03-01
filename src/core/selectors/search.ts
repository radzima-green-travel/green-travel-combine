import {selectFlattenObjects} from './common';
import {createSelector} from 'reselect';
import {IExtendedObjectWithCategoryData} from '../types';
import {IState} from 'core/store';
import {filter, orderBy} from 'lodash';

export const selectSearchInputValue = (state: IState) =>
  state.search.inputValue;

export const selectSearchHistory = (state: IState) =>
  orderBy(state.search.history, [({name}) => name.toLowerCase()], 'asc');

export const selectSearchResults = createSelector<
  IState,
  IExtendedObjectWithCategoryData[],
  string,
  IExtendedObjectWithCategoryData[]
>(selectFlattenObjects, selectSearchInputValue, (objects, inputValue) => {
  return orderBy(
    filter(objects, (object) =>
      object.name.toLowerCase().includes(inputValue.toLowerCase()),
    ),
    [({name}) => name.toLowerCase()],
    'asc',
  );
});
