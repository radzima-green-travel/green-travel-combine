import {applyMiddleware, createStore, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {StateType} from 'typesafe-actions';
import {rootReducer} from './rootReducer';
import {rootSaga} from './rootSaga';
import {errorLabelMiddliware} from 'services/ErrorLabelService';
const sagaMiddleware = createSagaMiddleware();

export type IState = StateType<typeof rootReducer>;
export const store: Store<IState> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(errorLabelMiddliware, sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
