import {useMemo, useCallback, useLayoutEffect} from 'react';
import Clipboard from '@react-native-community/clipboard';

import {useToast} from 'atoms';
import {
  useObject,
  useDetailsPageAnalytics,
  useImageSlider,
  useUpdateEffect,
} from 'core/hooks';
import {debounce} from 'lodash';
import {
  ObjectDetailsScreenNavigationProps,
  ObjectDetailsScreenRouteProps,
} from '../types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useObjectDetailsStatusBar} from './useObjectDetailsStatusBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useObjectDetails = () => {
  const navigation = useNavigation<ObjectDetailsScreenNavigationProps>();
  const {
    params: {objectId},
  } = useRoute<ObjectDetailsScreenRouteProps>();

  const {top} = useSafeAreaInsets();

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

  const {onScroll, page, pagesAmount} = useImageSlider(
    data?.images?.length || 0,
  );

  const isJustOneImage = pagesAmount < 2;

  const defaultPhoto = require('../img/objectDetailsDefaultPhoto.png');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: data?.name,
    });
  }, [navigation, data]);

  useUpdateEffect(() => {
    sendSwitchPhotosEvent();
  }, [page, sendSwitchPhotosEvent]);

  return {
    data,
    sendScrollEvent,
    copyLocationToClipboard,
    navigateToObjectsMap,
    navigateToObjectsListDebounced,
    toastProps,
    objectId,
    isJustOneImage,
    defaultPhoto,
    onScroll,
    top,
    pagesAmount,
    page,
  };
};
