import {MMKV} from 'react-native-mmkv';
import {applyMiddleware, createStore, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {StateType} from 'typesafe-actions';
import {rootSaga} from './rootSaga';
import {errorLabelMiddliware} from 'services/ErrorLabelService';

import {Storage, persistStore, persistReducer} from 'redux-persist';
import {isIOS} from 'services/PlatformService';
import {asyncReducers} from 'react-redux-help-kit';

import {combineReducers} from 'redux';

import {
  bootstrapReducer,
  homeReducer,
  bookmarksReducer,
  searchReducer,
  objectDetailsMapReducer,
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

let AsyncStorage;

if (isIOS) {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} else {
  AsyncStorage = reduxStorage;
}

const searchPersistConfig = {
  key: 'search',
  storage: AsyncStorage,
  whitelist: ['history'],
};

const homePersistConfig = {
  key: 'home',
  storage: AsyncStorage,
  whitelist: ['currentData'],
};

const bookmarksPersistConfig = {
  key: 'bookmarks',
  storage: AsyncStorage,
  whitelist: ['bookmarksIds'],
};

const rootReducer = combineReducers({
  ...asyncReducers,
  bootsrap: bootstrapReducer,
  home: persistReducer(homePersistConfig, homeReducer),
  bookmarks: persistReducer(bookmarksPersistConfig, bookmarksReducer),
  search: persistReducer(searchPersistConfig, searchReducer),
  objectDetailsMap: objectDetailsMapReducer,
});

const sagaMiddleware = createSagaMiddleware();

export type IState = StateType<typeof rootReducer>;

export const store: Store<IState> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(errorLabelMiddliware, sagaMiddleware)),
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
