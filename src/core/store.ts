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
  appConfigurationReducer,
  visitedObjectsReducer,
  homePageReducer,
  filtersReducer,
  appMapReducer,
  objectsListReducer,
  categoriesListReducer,
  userReducer,
} from './reducers';
// @ts-ignore
import {reduxStorage} from 'core/reduxStorage';
// import logger from 'redux-logger';
import {settingsReducer} from './reducers/SettingsReducer';
import {objectDetailsReducer} from './reducers/objectDetails';
const AsyncStorage = reduxStorage;

const homePersistConfig = {
  key: 'home',
  storage: AsyncStorage,
  whitelist: ['currentData'],
};

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['historyIds'],
};

const bookmarksPersistConfig = {
  key: 'bookmarks',
  storage: AsyncStorage,
  whitelist: ['bookmarksIds', 'favorites'],
};

const settingsPeristConfig = {
  key: 'settings',
  storage: AsyncStorage,
  whitelist: ['theme', 'language', 'isSystemLanguage'],
};

const authenticationPersistConfig = {
  key: 'authentication',
  storage: AsyncStorage,
  whitelist: ['userAttributes'],
};

const appConfigurationPersistConfig = {
  key: 'appConfiguration',
  storage: AsyncStorage,
  whitelist: ['skipUpdate'],
};

const rootReducer = combineReducers({
  ...asyncReducers,
  bookmarks: persistReducer(bookmarksPersistConfig, bookmarksReducer),
  visitedObjects: visitedObjectsReducer,
  bootsrap: bootstrapReducer,
  home: persistReducer(homePersistConfig, homeReducer),
  objectDetailsMap: objectDetailsMapReducer,
  search: searchReducer,
  authentication: persistReducer(
    authenticationPersistConfig,
    authenticationReducer,
  ),
  settings: persistReducer(settingsPeristConfig, settingsReducer),
  configuration: persistReducer(
    appConfigurationPersistConfig,
    appConfigurationReducer,
  ),
  homePage: homePageReducer,
  filters: filtersReducer,
  appMap: appMapReducer,
  objectsList: objectsListReducer,
  categoriesList: categoriesListReducer,
  user: persistReducer(userPersistConfig, userReducer),
  objectDetails: objectDetailsReducer,
});

const sagaMiddleware = createSagaMiddleware();

export type IState = StateType<typeof rootReducer>;

const middlewares = [sagaMiddleware];

// if (__DEV__) {
//   middlewares.push(logger);
// }

export const store: Store<IState> = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
