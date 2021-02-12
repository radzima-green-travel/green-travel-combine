import {COLORS} from 'assets';
import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from 'services/PlatformService';

const styles = StyleSheet.create({
  container: {
    height: 375,
  },

  emptyContatiner: {
    height: 375,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.alabaster,
    marginBottom: 24,
  },
  image: {
    width: SCREEN_WIDTH,
  },
  pagerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
});

export {styles};
