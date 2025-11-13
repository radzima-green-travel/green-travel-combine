import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'services/PlatformService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useHeaderHeight() {
  const { top } = useSafeAreaInsets();

  const height = getDefaultHeaderHeight(
    {
      height: SCREEN_HEIGHT,
      width: SCREEN_WIDTH,
    },
    false,
    top,
  );

  return height;
}
