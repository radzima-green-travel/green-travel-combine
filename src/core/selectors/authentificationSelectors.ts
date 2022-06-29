import {IState} from 'core/store';

export const selectUserAuthorized = (state: IState) =>
  state.authentication.userAuthorized;
