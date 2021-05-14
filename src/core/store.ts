import {applyMiddleware, createStore, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {StateType} from 'typesafe-actions';
import {rootSaga} from './rootSaga';
import {errorLabelMiddliware} from 'services/ErrorLabelService';

import {persistStore, persistReducer} from 'redux-persist';
import {isIOS} from 'services/PlatformService';

import {combineReducers} from 'redux';

import {
  errorReducer,
  loadingReducer,
  successReducer,
  bootstrapReducer,
  homeReducer,
  bookmarksReducer,
  searchReducer,
  appMapReducer,
  objectDetailsMapReducer,
} from './reducers';

let AsyncStorage;

if (isIOS) {
  AsyncStorage = require('@react-native-community/async-storage').default;
} else {
  AsyncStorage = require('redux-persist-filesystem-storage').default;
}

const searchPersistConfig = {
  key: 'search',
  storage: AsyncStorage,
  whitelist: ['history'],
};

const homePersistConfig = {
  key: 'home',
  storage: AsyncStorage,
  whitelist: ['data', 'dataHash'],
};

const bookmarksPersistConfig = {
  key: 'bookmarks',
  storage: AsyncStorage,
  whitelist: ['bookmarksIds'],
};

const rootReducer = combineReducers({
  error: errorReducer,
  loading: loadingReducer,
  success: successReducer,
  bootsrap: bootstrapReducer,
  home: persistReducer(homePersistConfig, homeReducer),
  bookmarks: persistReducer(bookmarksPersistConfig, bookmarksReducer),
  appMap: appMapReducer,
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
