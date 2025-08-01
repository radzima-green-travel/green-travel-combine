import createSagaMiddleware from 'redux-saga';
import {configureStore, Tuple} from '@reduxjs/toolkit';
import {rootSaga} from './rootSaga';
import {persistStore, persistReducer} from 'redux-persist';
import {asyncReducers} from 'react-redux-help-kit';
import {combineReducers} from 'redux';
import {
  bookmarksDetailsReducer,
  bootstrapReducer,
  objectDetailsMapReducer,
  searchReducer,
  authenticationReducer,
  appConfigurationReducer,
  visitedObjectsReducer,
  homePageReducer,
  filtersReducer,
  objectsListReducer,
  categoriesListReducer,
  userReducer,
  settlementsReducer,
  searchHistoryReducer,
  objectDetailsReducer,
  settingsReducer,
} from './reducers';
// @ts-ignore
import {reduxStorage} from 'core/reduxStorage';

const AsyncStorage = reduxStorage;

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['historyIds', 'bookmarks'],
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
  bookmarksDetails: bookmarksDetailsReducer,
  visitedObjects: visitedObjectsReducer,
  bootsrap: bootstrapReducer,
  objectDetailsMap: objectDetailsMapReducer,
  search: searchReducer,
  searchHistory: searchHistoryReducer,
  authentication: persistReducer(
    authenticationPersistConfig,
    authenticationReducer,
  ),
  settings: persistReducer(settingsPeristConfig, settingsReducer),
  appConfiguration: persistReducer(
    appConfigurationPersistConfig,
    appConfigurationReducer,
  ),
  homePage: homePageReducer,
  filters: filtersReducer,
  objectsList: objectsListReducer,
  categoriesList: categoriesListReducer,
  settlements: settlementsReducer,
  user: persistReducer(userPersistConfig, userReducer),
  objectDetails: objectDetailsReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// if (__DEV__) {
//   middlewares.push(logger);
// }

export const store = configureStore({
  reducer: rootReducer,
  middleware: () => new Tuple(...middlewares),
  devTools: false,
});

export type IState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
