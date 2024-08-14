import {IState} from 'core/store';
import {createSelector} from 'reselect';
import {map} from 'lodash';

export const selectVisitedObjectsData = (state: IState) =>
  state.visitedObjects.data;

export const selectObjectShareExperienceData = (state: IState) =>
  state.visitedObjects.shareExperienceData;

export const selectVisitedObjectsIds = createSelector(
  selectVisitedObjectsData,
  visitedObjectsData => {
    return map(visitedObjectsData, ({id}) => id);
  },
);
