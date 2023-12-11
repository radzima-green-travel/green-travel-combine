import {IState} from 'core/store';
import {createSelector} from 'reselect';
import {selectTransformedData} from './homeSelectors';
import {reduce} from 'lodash';

export const selectVisitedData = (state: IState) =>
  state.visited.data;

export const selectVisitedIdsFromVisited = createSelector(
  selectVisitedData,
  selectTransformedData,
  (visited, transformedData) => {
    return reduce(
      visited,
      (acc, value) => {
        const {id} = value;

        if (transformedData?.objectsMap[id]) {
          acc.push(id);
        }

        return acc;
      },
      [] as string[],
    );
  },
);
