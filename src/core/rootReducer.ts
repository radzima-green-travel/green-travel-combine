import {combineReducers} from 'redux';

import {
  errorReducer,
  loadingReducer,
  successReducer,
  bootstrapReducer,
  homeReducer,
  bookmarksReducer,
} from './reducers';

export const rootReducer = combineReducers({
  error: errorReducer,
  loading: loadingReducer,
  success: successReducer,
  bootsrap: bootstrapReducer,
  home: homeReducer,
  bookmarks: bookmarksReducer,
});
