import {applyMiddleware, createStore, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {StateType} from 'typesafe-actions';
import {rootSaga} from './rootSaga';
import {errorLabelMiddliware} from 'services/ErrorLabelService';

import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import {combineReducers} from 'redux';

import {
  errorReducer,
  loadingReducer,
  successReducer,
  bootstrapReducer,
  homeReducer,
  bookmarksReducer,
  searchReducer,
} from './reducers';

const searchPersistConfig = {
  key: 'search',
  storage: AsyncStorage,
  whitelist: ['history'],
};

const rootReducer = combineReducers({
  error: errorReducer,
  loading: loadingReducer,
  success: successReducer,
  bootsrap: bootstrapReducer,
  home: homeReducer,
  bookmarks: bookmarksReducer,
  search: persistReducer(searchPersistConfig, searchReducer),
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['bookmarks', 'home'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export type IState = StateType<typeof rootReducer>;

export const store: Store<IState> = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(errorLabelMiddliware, sagaMiddleware)),
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
