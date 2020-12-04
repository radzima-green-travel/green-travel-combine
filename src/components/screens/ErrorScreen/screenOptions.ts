import {ScreenOptions} from './types';
import {Fade} from 'navigation/transitition';

export const screenOptions: ScreenOptions = () => {
  return {
    headerShown: false,
    ...Fade,
  };
};
