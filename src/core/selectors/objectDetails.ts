import {IState} from 'core/store';

export const selectObjectDetails = (state: IState) =>
  state.objectDetails.objectDetails;
