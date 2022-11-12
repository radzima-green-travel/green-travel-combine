import {useMemo, useCallback, useState} from 'react';
import {Animated} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

import {useToast} from 'atoms';
import {IMAGE_HEIGHT} from '../styles';
import {
  useTranslation,
  useObject,
  useImageSlider,
  useDetailsPageAnalytics,
} from 'core/hooks';
import {debounce} from 'lodash';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
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

  const [animatedValue] = useState(() => new Animated.Value(0));

  const {t} = useTranslation('objectDetails');
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

  const {top} = useSafeAreaInsets();

  const isJustOneImage = pagesAmount < 2;

  const opacity = animatedValue.interpolate({
    inputRange: [0, IMAGE_HEIGHT - 80, IMAGE_HEIGHT],
    outputRange: [0, 0, 1],
  });

  const buttonsOpacity = animatedValue.interpolate({
    inputRange: [0, IMAGE_HEIGHT - 80, IMAGE_HEIGHT],
    outputRange: [1, 1, 0],
  });

  const defaultPhoto = require('../img/objectDetailsDefaultPhoto.png');

  return {
    t,
    data,
    animatedValue,
    page,
    sendSwitchPhotosEvent,
    sendScrollEvent,
    isJustOneImage,
    pagesAmount,
    copyLocationToClipboard,
    navigateToObjectsMap,
    navigateToObjectsListDebounced,
    defaultPhoto,
    onScroll,
    top,
    toastProps,
    buttonsOpacity,
    opacity,
    objectId,
    navigation,
  };
};
