import {createSelector} from 'reselect';
import {IState} from 'core/store';
import {ICategory} from 'core/types';
import {filter, isEmpty} from 'lodash';

export const selectHomeData = createSelector<
  IState,
  ICategory[] | null,
  ICategory[] | null
>(
  (state) => state.home.data,
  (data) => filter(data, ({items}) => !isEmpty(items)),
);
