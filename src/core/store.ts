import {MMKV} from 'react-native-mmkv';
import {applyMiddleware, createStore, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {StateType} from 'typesafe-actions';
import {rootSaga} from './rootSaga';
import {errorLabelMiddliware} from 'services/ErrorLabelService';

import {Storage, persistStore, persistReducer} from 'redux-persist';
import {asyncReducers} from 'react-redux-help-kit';

import {combineReducers} from 'redux';

import {
  bookmarksReducer,
  bootstrapReducer,
  homeReducer,
  objectDetailsMapReducer,
  searchReducer,
  signInReducer,
} from './reducers';

const storage = new MMKV();

const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const searchPersistConfig = {
  key: 'search',
  storage: reduxStorage,
  whitelist: ['history'],
};

const homePersistConfig = {
  key: 'home',
  storage: reduxStorage,
  whitelist: ['currentData'],
};

const bookmarksPersistConfig = {
  key: 'bookmarks',
  storage: reduxStorage,
  whitelist: ['bookmarksIds'],
};

const rootReducer = combineReducers({
  ...asyncReducers,
  bookmarks: persistReducer(bookmarksPersistConfig, bookmarksReducer),
  bootsrap: bootstrapReducer,
  home: persistReducer(homePersistConfig, homeReducer),
  objectDetailsMap: objectDetailsMapReducer,
  search: persistReducer(searchPersistConfig, searchReducer),
  signIn: signInReducer,
});

const sagaMiddleware = createSagaMiddleware();

export type IState = StateType<typeof rootReducer>;

export const store: Store<IState> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(errorLabelMiddliware, sagaMiddleware)),
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
