import {useBottomMenu} from 'core/hooks';
import {setSkipAppUpdate} from 'core/reducers';
import {useCallback} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {updateService} from 'services/UpdateService';

export const useOptionalUpdate = () => {
  const dispatch = useDispatch();
  const {closeMenu, ...menuProps} = useBottomMenu();

  const {bottom} = useSafeAreaInsets();

  const onUpdate = useCallback(() => {
    updateService.openApplicationMarketplace();
  }, []);

  const onRemindLater = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  const onSkipUpdate = useCallback(() => {
    dispatch(setSkipAppUpdate());
    closeMenu();
  }, [closeMenu, dispatch]);

  return {
    onUpdate,
    onRemindLater,
    onSkipUpdate,
    menuProps,
    bottom,
  };
};
