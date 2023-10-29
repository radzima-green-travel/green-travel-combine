import {COLORS} from 'assets';

export const themeStyles = {
  container: {
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  searchBar: {
    marginBottom: 0,
    flex: 1,
    marginLeft: 10,
    shadowOpacity: 0,
    elevation: 0,
    backgroundColor: {
      light: COLORS.light.other.search,
      dark: COLORS.dark.other.search,
    },
    borderRadius: 8,
  },
  inputStyles: {
    color: {
      light: COLORS.boulder,
      dark: COLORS.altoForDark,
    },
    backgroundColor: {
      light: COLORS.light.other.search,
      dark: COLORS.dark.other.search,
    },
  },
  searchBarContatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  searchListConttainer: {
    flex: 1,
  },
  icon: {
    color: {light: COLORS.logCabin, dark: COLORS.altoForDark},
  },
};
