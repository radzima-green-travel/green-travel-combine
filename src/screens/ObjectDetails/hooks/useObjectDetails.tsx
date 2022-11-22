import {useMemo, useCallback} from 'react';
import Clipboard from '@react-native-community/clipboard';

import {useToast} from 'atoms';
import {useObject, useDetailsPageAnalytics} from 'core/hooks';
import {debounce} from 'lodash';
import {
  ObjectDetailsScreenNavigationProps,
  ObjectDetailsScreenRouteProps,
} from '../types';
import {useNavigation, useRoute} from '@react-navigation/native';

export const useObjectDetails = () => {
  const navigation = useNavigation<ObjectDetailsScreenNavigationProps>();
  const {
    params: {objectId},
  } = useRoute<ObjectDetailsScreenRouteProps>();

  const data = useObject(objectId)!;

  const {sendOpenMapEvent, sendSwitchPhotosEvent, sendScrollEvent} =
    useDetailsPageAnalytics({
      name: data.name,
      category: data.category.name,
    });

  const {show: showToast, ...toastProps} = useToast();

  const copyLocationToClipboard = useCallback(
    (location: string) => {
      Clipboard.setString(location);
      showToast();
    },
    [showToast],
  );

  const navigateToObjectsList = useCallback(
    ({id, name, objects}: {id: string; name: string; objects: string[]}) => {
      if (objects.length === 1) {
        navigation.push('ObjectDetails', {
          objectId: objects[0],
        });
      } else {
        navigation.push('ObjectsList', {
          categoryId: id,
          title: name,
          objectsIds: objects,
        });
      }
    },
    [navigation],
  );

  const navigateToObjectsMap = useCallback(() => {
    if (data) {
      navigation.navigate('ObjectDetailsMap', {
        categoryId: data.category.id,
        objectId: data.id,
      });

      sendOpenMapEvent();
    }
  }, [data, navigation, sendOpenMapEvent]);

  const navigateToObjectsListDebounced = useMemo(
    () =>
      debounce(navigateToObjectsList, 300, {leading: true, trailing: false}),
    [navigateToObjectsList],
  );

  return {
    data,
    sendSwitchPhotosEvent,
    sendScrollEvent,
    copyLocationToClipboard,
    navigateToObjectsMap,
    navigateToObjectsListDebounced,
    toastProps,
    objectId,
    navigation,
  };
};
