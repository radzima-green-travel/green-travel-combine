import {useEffect} from 'react';
import {BackHandler} from 'react-native';

export function useBackHandler(handler: () => boolean) {
  useEffect(() => {
    const {remove} = BackHandler.addEventListener('hardwareBackPress', handler);

    return () => remove();
  }, [handler]);
}
