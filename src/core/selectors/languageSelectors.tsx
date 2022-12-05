import {IState} from 'core/store';

export const selectAppLanguage = (state: IState) => state.lang.lang;
