import {Platform} from 'react-native';

export const FONTS = {
  BASE: Platform.select({ios: 'System', android: 'Roboto'}),
};
