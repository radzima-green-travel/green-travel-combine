import {IState} from 'core/store';
import {createSelector} from 'reselect';
import {selectTransformedData} from './homeSelectors';
import {reduce} from 'lodash';

export const selectVisitedObjectsData = (state: IState) =>
  state.visitedObjects.data;

export const selectVisitedObjectsIds = createSelector(
  selectVisitedObjectsData,
  selectTransformedData,
  (visitedObjectsData, transformedData) => {
    return reduce(
      visitedObjectsData,
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
