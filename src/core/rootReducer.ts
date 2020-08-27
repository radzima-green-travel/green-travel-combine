import {combineReducers} from 'redux';

import {
  errorReducer,
  loadingReducer,
  successReducer,
  bootstrapReducer,
  homeReducer,
} from './reducers';

export const rootReducer = combineReducers({
  error: errorReducer,
  loading: loadingReducer,
  success: successReducer,
  bootsrap: bootstrapReducer,
  home: homeReducer,
});
