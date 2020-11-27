import {applyMiddleware, createStore, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {StateType} from 'typesafe-actions';
import {rootReducer} from './rootReducer';
import {rootSaga} from './rootSaga';
import {errorLabelMiddliware} from 'services/ErrorLabelService';

import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

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
