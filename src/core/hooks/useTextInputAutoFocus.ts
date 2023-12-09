import {useNavigation} from '@react-navigation/native';
import {RefObject, useEffect} from 'react';
import {TextInput} from 'react-native';
import {isIOS} from 'services/PlatformService';

export function useTextInputAutoFocus(
  ref: RefObject<TextInput>,
  autoFocus = false,
) {
  const navigation = useNavigation();

  useEffect(() => {
    if (autoFocus && isIOS) {
      // @ts-ignore
      const unsubscribe = navigation.addListener('transitionEnd', e => {
        // @ts-ignore
        if (e?.data?.closing === false) {
          setTimeout(() => ref?.current?.focus());
        }
      });

      return unsubscribe;
    }
  }, [autoFocus, navigation, ref]);

  return isIOS ? undefined : autoFocus;
}
