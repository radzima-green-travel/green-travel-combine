import {COLORS, SHADOWS} from 'assets';

export const themeStyles = {
  container: {
    flexDirection: 'row',
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
    backgroundColor: {
      light: COLORS.light.other.search,
      dark: COLORS.dark.other.search,
    },
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
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
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
};
