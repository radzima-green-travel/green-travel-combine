import {StyleSheet} from 'react-native';
import {COLORS, SHADOWS} from 'assets';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  digitContainer: {
    width: 36,
    height: 48,
    justifyContent: 'center',
    marginHorizontal: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.alto,
    borderRadius: 4,
  },
  digitContainerFocused: {
    ...SHADOWS.boxShadow,
    borderColor: COLORS.cerulean,
  },
  digit: {
    textAlign: 'center',
    fontSize: 24,
  },
  placeholder: {
    borderTopWidth: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  hiddenCodeInput: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
});
