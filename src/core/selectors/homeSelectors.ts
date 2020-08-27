import {createSelector} from 'reselect';
import {IState} from 'core/store';
import {IHomeCategory} from 'core/types';
import {filter, isEmpty} from 'lodash';

export const selectHomeData = createSelector<
  IState,
  IHomeCategory[] | null,
  IHomeCategory[] | null
>(
  (state) => state.home.data,
  (data) => filter(data, ({objects}) => !isEmpty(objects)),
);
