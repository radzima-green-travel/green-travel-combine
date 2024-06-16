import {createSelector} from 'reselect';
import {IState} from 'core/store';

import {isEmpty, map, shuffle} from 'lodash';
import {transformQueryData} from 'core/helpers';
import {selectAppLanguage} from './settingsSelectors';

export const selectIsUpdatesAvailable = (state: IState) =>
  state.home.isUpdatesAvailable;

export const selectCurrentAppData = (state: IState) => state.home.currentData;
export const selectHomeUpdatedData = (state: IState) => state.home.updatedData;
export const selectIsHomeDataExists = (state: IState) =>
  Boolean(state.home.currentData);

export const selectTransformedData = createSelector(
  selectCurrentAppData,
  selectAppLanguage,
  (data, language) =>
    data && language ? transformQueryData(data, language) : null,
);

export const selectCategories = createSelector(
  selectTransformedData,
  transformedData => {
    if (!transformedData) {
      return null;
    }
    return map(transformedData.categories, category => {
      return {
        name: category.name,
        id: category.id,
      };
    });
  },
);

export const selectHomeData = createSelector(
  selectTransformedData,
  transformedData => {
    if (!transformedData) {
      return null;
    }
    return map(transformedData.categories, category => {
      return {
        ...category,
        objects: shuffle(category.objects).slice(0, 10),
        children: category.children.filter((id: string | number) => {
          return !isEmpty(transformedData.categoriesMap[id].objects);
        }),
      };
    });
  },
);

export const selectObjectsMap = createSelector(
  selectTransformedData,
  transformedData => {
    return transformedData ? transformedData.objectsMap : null;
  },
);

export const selectCategoriesMap = createSelector(
  selectTransformedData,
  transformedData => {
    return transformedData ? transformedData.categoriesMap : null;
  },
);
