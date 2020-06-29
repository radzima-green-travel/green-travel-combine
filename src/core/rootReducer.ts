import {combineReducers} from 'redux';

import {errorReducer, loadingReducer, successReducer} from './reducers';

export const rootReducer = combineReducers({
  error: errorReducer,
  loading: loadingReducer,
  success: successReducer,
});
