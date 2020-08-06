import {combineReducers} from 'redux';

import {
  errorReducer,
  loadingReducer,
  successReducer,
  bootstrapReducer,
} from './reducers';

export const rootReducer = combineReducers({
  error: errorReducer,
  loading: loadingReducer,
  success: successReducer,
  bootsrap: bootstrapReducer,
});
