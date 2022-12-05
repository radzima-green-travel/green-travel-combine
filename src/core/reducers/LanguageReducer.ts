import {SupportedLocales} from 'core/types';
import {createAction, createReducer, ActionType} from 'typesafe-actions';
import {ACTIONS} from '../constants';

interface IDefaultState {
  lang: SupportedLocales | null;
}

const defaultState = {
  lang: null,
};

export const setLang = createAction(ACTIONS.SET_LANGUAGE)<SupportedLocales>();

const actions = {
  setLang,
};

export const languageReducer = createReducer<
  IDefaultState,
  ActionType<typeof actions>
>(defaultState).handleAction(setLang, (state, {payload}) => {
  return {
    ...state,
    lang: payload,
  };
});
