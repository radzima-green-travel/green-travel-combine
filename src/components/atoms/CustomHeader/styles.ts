import {PADDING_HORIZONTAL, HEADER_BOTTOM_RADIUS} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingBottom: PADDING_HORIZONTAL,
    borderBottomLeftRadius: HEADER_BOTTOM_RADIUS,
    borderBottomRightRadius: HEADER_BOTTOM_RADIUS,
  },
  overlay: {
    marginBottom: -HEADER_BOTTOM_RADIUS,
  },
  mainContentContainer: {
    flexDirection: 'row',
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerRightContainer: {
    marginLeft: 8,
  },
});
