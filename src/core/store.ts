import {applyMiddleware, createStore, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {StateType} from 'typesafe-actions';
import {rootSaga} from './rootSaga';
import {errorLabelMiddliware} from 'services/ErrorLabelService';
import {persistStore, persistReducer} from 'redux-persist';
import {asyncReducers} from 'react-redux-help-kit';
import {combineReducers} from 'redux';
import {
  bootstrapReducer,
  homeReducer,
  bookmarksReducer,
  searchReducer,
  objectDetailsMapReducer,
} from './reducers';
// @ts-ignore
import {reduxStorage} from 'core/reduxStorage';

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
