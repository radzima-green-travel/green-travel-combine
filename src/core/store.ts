import {applyMiddleware, createStore, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {StateType} from 'typesafe-actions';
import {rootSaga} from './rootSaga';
import {persistStore, persistReducer} from 'redux-persist';
import {asyncReducers} from 'react-redux-help-kit';
import {combineReducers} from 'redux';
import {
  bookmarksReducer,
  bootstrapReducer,
  homeReducer,
  objectDetailsMapReducer,
  searchReducer,
  authenticationReducer,
} from './reducers';
// @ts-ignore
import {reduxStorage} from 'core/reduxStorage';
import logger from 'redux-logger';
import {settingsReducer} from './reducers/SettingsReducer';
const AsyncStorage = reduxStorage;

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

const settingsPeristConfig = {
  key: 'settings',
  storage: AsyncStorage,
  whitelist: ['theme', 'language', 'isSystemLanguage'],
};

const rootReducer = combineReducers({
  ...asyncReducers,
  bookmarks: persistReducer(bookmarksPersistConfig, bookmarksReducer),
  bootsrap: bootstrapReducer,
  home: persistReducer(homePersistConfig, homeReducer),
  objectDetailsMap: objectDetailsMapReducer,
  search: persistReducer(searchPersistConfig, searchReducer),
  authentication: authenticationReducer,
  settings: persistReducer(settingsPeristConfig, settingsReducer),
});

const sagaMiddleware = createSagaMiddleware();

export type IState = StateType<typeof rootReducer>;

export const store: Store<IState> = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger),
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
