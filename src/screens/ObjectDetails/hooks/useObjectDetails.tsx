import {useMemo, useCallback, useLayoutEffect} from 'react';
import Clipboard from '@react-native-community/clipboard';

import {useSnackbar} from 'atoms';
import {
  useObject,
  useDetailsPageAnalytics,
  useImageSlider,
  useUpdateEffect,
  useTranslation,
} from 'core/hooks';
import {debounce} from 'lodash';
import {
  ObjectDetailsScreenNavigationProps,
  ObjectDetailsScreenRouteProps,
} from '../types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {shareService} from 'services/ShareService';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useObjectDetails = () => {
  const navigation = useNavigation<ObjectDetailsScreenNavigationProps>();
  const {
    params: {objectId},
  } = useRoute<ObjectDetailsScreenRouteProps>();

  const {top} = useSafeAreaInsets();

  const data = useObject(objectId);
  const {t} = useTranslation();

  const {sendOpenMapEvent, sendSwitchPhotosEvent, sendScrollEvent} =
    useDetailsPageAnalytics(objectId);

  const snackBarProps = useSnackbar();
  const {show} = snackBarProps;
  const copyLocationToClipboard = useCallback(
    (location: string) => {
      Clipboard.setString(location);
      show({
        type: 'neutral',
        title: t('common:coppied'),
        timeoutMs: 1000,
      });
    },
    [show, t],
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

  const navigateToAddInfo = useCallback(() => {
    if (data) {
      navigation.navigate('ObjectDetailsAddInfo', {objectId: data.id});
    }
  }, [data, navigation]);

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

  const shareObjectLink = useCallback(() => {
    if (data?.name) {
      shareService.shareObject(objectId, data?.name);
    }
  }, [data?.name, objectId]);

  const goToImageGallery = useCallback(() => {
    if (data?.images) {
      navigation.navigate('ImagesGallery', {
        images: data.images,
        initialIndex: page - 1,
      });
    }
  }, [data, navigation, page]);

  return {
    data,
    sendScrollEvent,
    copyLocationToClipboard,
    navigateToObjectsMap,
    navigateToObjectsListDebounced,
    navigateToAddInfo,
    snackBarProps,
    objectId,
    isJustOneImage,
    defaultPhoto,
    onScroll,
    top,
    pagesAmount,
    page,
    shareObjectLink,
    goToImageGallery,
  };
};
