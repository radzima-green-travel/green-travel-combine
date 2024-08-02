import {IState} from 'core/store';

export const selectSearchHistoryObjectsIds = (state: IState) =>
  state.user.historyIds;
