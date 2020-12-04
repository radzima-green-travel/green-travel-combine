import {createSelector} from 'reselect';
import {IState} from 'core/store';
import {ICategoryWithExtendedObjects} from 'core/types';
import {filter, isEmpty} from 'lodash';

import {selectAllCategoriesWithObjects} from './common';

export const selectHomeData = createSelector<
  IState,
  ICategoryWithExtendedObjects[] | null,
  ICategoryWithExtendedObjects[] | null
>(selectAllCategoriesWithObjects, (data) =>
  data
    ? filter(
        data,
        ({objects, children}) => !isEmpty(objects) || !isEmpty(children),
      )
    : null,
);
