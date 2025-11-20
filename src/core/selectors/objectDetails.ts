import { createSelector } from 'reselect';
import { IState } from 'core/store';
import { selectAppLanguage } from './settingsSelectors';
import { prepareObjectDetails } from 'core/transformators/objectDetails';

const selectObjectDetailsState = createSelector(
  (state: IState) => state.objectDetails,
  (_: IState, reducerId: string) => reducerId,
  (objectDetailsState, reducerId) => objectDetailsState[reducerId],
);

export const selectObjectRawDetails = createSelector(
  selectObjectDetailsState,
  state => state.objectDetails,
);

export const selectObjectDetails = createSelector(
  selectObjectRawDetails,
  selectAppLanguage,
  (objectDetails, appLanguage) => {
    return prepareObjectDetails(objectDetails, appLanguage);
  },
);
