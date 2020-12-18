import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from 'services/PlatformService';

const styles = StyleSheet.create({
  container: {
    height: 375,
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
