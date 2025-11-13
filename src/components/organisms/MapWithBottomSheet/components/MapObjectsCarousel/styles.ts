import { PADDING_HORIZONTAL } from 'core/constants';
import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from 'services/PlatformService';

export const MAP_OBJECTS_CAROUSEL_HEIGHT = 168;

export const styles = StyleSheet.create({
  carousel: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    marginTop: PADDING_HORIZONTAL,
  },
  card: {
    height: MAP_OBJECTS_CAROUSEL_HEIGHT,
    width: 200,
  },
  singleCard: {
    width: SCREEN_WIDTH - 32,
    alignSelf: 'center',
    marginTop: PADDING_HORIZONTAL,
  },
});
