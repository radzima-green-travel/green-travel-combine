import {createSelector} from 'reselect';
import {IState} from 'core/store';
import {ICategoryWithItems} from 'core/types';
import {filter, isEmpty} from 'lodash';

export const selectHomeData = createSelector<
  IState,
  ICategoryWithItems[] | null,
  ICategoryWithItems[] | null
>(
  (state) => state.home.data,
  (data) => filter(data, ({items}) => !isEmpty(items)),
);
