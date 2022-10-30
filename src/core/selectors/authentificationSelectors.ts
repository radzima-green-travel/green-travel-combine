import {IState} from 'core/store';
import {createSelector} from 'reselect';

export const selectUserAuthorizedData = (state: IState) =>
  state.authentication.userAttributes;

export const selectUserAuthorized = createSelector(
  selectUserAuthorizedData,
  data => Boolean(data),
);

export const selectUserEmail = createSelector(
  selectUserAuthorizedData,
  data => data?.email || '',
);
