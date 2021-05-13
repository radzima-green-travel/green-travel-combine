import {IState} from 'core/store';
import {IBookmarksIds, ITransformedData} from 'core/types';
import {filter} from 'lodash';
import {createSelector} from 'reselect';
import {selectTransformedData} from './homeSelectors';

export const selectBookmarksIds = createSelector<
  IState,
  ITransformedData | null,
  IBookmarksIds,
  IBookmarksIds
>(
  selectTransformedData,
  state => state.bookmarks.bookmarksIds,
  (transformedData, ids) =>
    transformedData
      ? filter(ids, id => Boolean(transformedData.objectsMap[id]))
      : [],
);
