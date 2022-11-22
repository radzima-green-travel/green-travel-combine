import {IState} from 'core/store';

export const selectAppTheme = (state: IState) => state.theme.theme;
