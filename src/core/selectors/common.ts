import {IState} from 'core/store';

export const selectBookmarksIds = (state: IState) =>
  state.bookmarks.bookmarksIds;
