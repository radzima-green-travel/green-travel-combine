import {Platform, StyleSheet} from 'react-native';
import {COLORS} from './colors';

const boxShadow =
  Platform.OS === 'ios'
    ? {
        shadowColor: COLORS.deepBlue,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
      }
    : {
        elevation: 4,
        shadowColor: COLORS.deepBlue,
      };

export const SHADOWS = StyleSheet.create({
  boxShadow,
});
