import {useBottomMenu} from 'core/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useForceUpdate = () => {
  const {...menuProps} = useBottomMenu();

  const {bottom} = useSafeAreaInsets();

  return {
    menuProps,
    bottom,
  };
};
