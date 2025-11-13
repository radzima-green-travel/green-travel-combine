import { COLORS } from '../../../assets';
import { createThemeStyles } from '../../../core/helpers/styles';

export const objectListModeSwitchStyles = createThemeStyles({
  container: {
    width: 76,
    height: 32,
    paddingVertical: 3,
    paddingHorizontal: 2,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: {
      light: COLORS.light.background.quarterly,
      dark: COLORS.dark.background.quarterly,
    },
    borderRadius: 8,
  },
  indicator: {
    width: '50%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: {
      light: COLORS.light.background.accent,
      dark: COLORS.dark.background.accent,
    },
    position: 'absolute',
    left: 2,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInactive: {
    color: {
      light: COLORS.light.icon.accent,
      dark: COLORS.dark.icon.accent,
    },
  },
  iconActive: {
    color: {
      light: COLORS.light.icon.constant,
      dark: COLORS.dark.icon.constant,
    },
  },
});
