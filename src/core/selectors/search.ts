import {createSelector} from 'reselect';
import {ISearchItem, ITransformedData} from '../types';
import {IState} from 'core/store';
import {orderBy, reduce} from 'lodash';

export const selectSearchInputValue = (state: IState) =>
  state.search.inputValue;

export const selectSearchHistory = (state: IState) =>
  orderBy(
    state.search.history,
    [({objectName}) => objectName.toLowerCase()],
    'asc',
  );

export const selectSearchResults = createSelector<
  IState,
  ITransformedData | null,
  string,
  ISearchItem[]
>(
  state => state.home.transformedData,
  selectSearchInputValue,
  (transformedData, inputValue) => {
    return transformedData
      ? orderBy(
          reduce(
            Object.values(transformedData.objectsMap),
            (acc, object) => {
              const category = transformedData.categoriesMap[object.category];
              if (
                object.name.toLowerCase().includes(inputValue.toLowerCase()) &&
                category
              ) {
                return [
                  ...acc,
                  {
                    objectId: object._id,
                    objectName: object.name,
                    categoryName: category.name,
                    icon: category.icon,
                  },
                ];
              }
              return acc;
            },
            [] as ISearchItem[],
          ),
          [({objectName}) => objectName.toLowerCase()],
          'asc',
        )
      : [];
  },
);
