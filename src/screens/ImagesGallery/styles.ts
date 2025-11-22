import { COLORS, FONTS_STYLES } from 'assets';
import { createThemeStyles } from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    flex: 1,
  },
  topBarContainer: {
    backgroundColor: COLORS.black,
    zIndex: 99999999,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingBottom: 16,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...FONTS_STYLES.text_16_24_400,
    color: COLORS.white,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.black,
    paddingTop: 16,
  },
  closeButtonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  closeIcon: {
    color: COLORS.white,
  },
  closeText: {
    ...FONTS_STYLES.text_16_20_600,
    color: COLORS.white,
    marginLeft: 8,
  },
});
