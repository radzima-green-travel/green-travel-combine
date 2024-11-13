import {PADDING_HORIZONTAL} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  listContainer: {
    flexGrow: 0,
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  itemContainer: {
    marginRight: 8,
  },
});
