import {StyleSheet} from 'react-native';
import {COLORS} from 'assets';

export const styles = StyleSheet.create({
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.silver,
    borderRadius: 2,
    marginBottom: 12,
  },
  inputField: {
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: COLORS.silver,
  },
  icon: {
    marginLeft: 12,
    marginRight: 8,
  },
  button: {
    marginTop: -4,
  },
});
