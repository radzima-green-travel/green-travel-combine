import {useCallback, useLayoutEffect, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import * as Clipboard from 'expo-clipboard';

import {useSnackbar} from 'atoms';
import {
  useDetailsPageAnalytics,
  useImageSlider,
  useUpdateEffect,
  useTranslation,
  useRequestLoading,
  useOnRequestError,
  useObjectIncompleteFields,
  useObjectDetailsActions,
  useObjectDetailsSelector,
} from 'core/hooks';
import {
  ObjectDetailsScreenNavigationProps,
  ObjectDetailsScreenRouteProps,
} from '../types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {shareService} from 'services/ShareService';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getAnalyticsNavigationScreenName} from 'core/helpers';
import {useObjectDetailsAnalytics} from './useObjectDetailsAnalytics';
import {IBelongsTo, IInclude} from 'core/types';
import {selectObjectDetails} from 'core/selectors';

export const useObjectDetails = () => {
  const navigation = useNavigation<ObjectDetailsScreenNavigationProps>();
  const {
    params: {objectId, objectCoverImageUrl, objcetCoverBlurhash},
  } = useRoute<ObjectDetailsScreenRouteProps>();

  const dispatch = useDispatch();
  const data = useObjectDetailsSelector(selectObjectDetails);
  const {getObjectDetailsRequest} = useObjectDetailsActions();

  const {top} = useSafeAreaInsets();

  const {t} = useTranslation();

  const {sendSwitchPhotosEvent, sendScrollEvent} =
    // TODO: legacy. Will be removed after migration to new analytics
    useDetailsPageAnalytics();

  const incompleteFields = useObjectIncompleteFields(
    data?.category.incompleteFieldsNames ?? [],
  );

  const {
    sendObjectScreenViewEvent,
    sendLocationLabelClickEvent,
    sendAddInfoButtonClickEvent,
    sendBelongsToNavigateEvent,
    sendActivitiesNavigateEvent,
    sendShowOnMapButtonClickEvent,
    sendObjectShareEvent,
  } = useObjectDetailsAnalytics();

  useEffect(() => {
    sendObjectScreenViewEvent();
  }, [sendObjectScreenViewEvent]);

  const snackBarProps = useSnackbar();
  const {show} = snackBarProps;
  const copyLocationToClipboard = useCallback(
    async (location: string) => {
      sendLocationLabelClickEvent();
      await Clipboard.setStringAsync(location);
      show({
        type: 'neutral',
        title: t('common:coppied'),
        timeoutMs: 1000,
      });
    },
    [sendLocationLabelClickEvent, show, t],
  );

  const navigateToBelongsToObject = useCallback(
    ({
      objectId: belongsToObjectId,
      blurhash,
      image,
      analyticsMetadata,
    }: IBelongsTo) => {
      sendBelongsToNavigateEvent({
        objectName: analyticsMetadata.name,
        categoryName: analyticsMetadata.categoryName,
      });
      navigation.push('ObjectDetails', {
        objectId: belongsToObjectId,
        objectCoverImageUrl: image,
        objcetCoverBlurhash: blurhash,
        analytics: {
          fromScreenName: getAnalyticsNavigationScreenName(),
        },
      });
    },
    [navigation, sendBelongsToNavigateEvent],
  );

  const navigateToIncludesObjectListOrPage = useCallback(
    ({objects, categoryId, name, analyticsMetadata}: IInclude) => {
      sendActivitiesNavigateEvent(analyticsMetadata.name);
      if (objects.length === 1) {
        const {id, cover, blurhash} = objects[0];
        navigation.push('ObjectDetails', {
          objectId: id,
          objcetCoverBlurhash: blurhash,
          objectCoverImageUrl: cover,
          analytics: {
            fromScreenName: getAnalyticsNavigationScreenName(),
          },
        });
      } else {
        navigation.push('ObjectsList', {
          appliedFilters: {
            categories: [categoryId],
            objectIds: objects.map(({id}) => id),
          },
          title: name,
        });
      }
    },
    [navigation, sendActivitiesNavigateEvent],
  );

  const navigateToObjectsMap = useCallback(() => {
    if (data) {
      navigation.navigate('ObjectDetailsMap', {
        object: data,
      });

      sendShowOnMapButtonClickEvent();
    }
  }, [data, navigation, sendShowOnMapButtonClickEvent]);

  const navigateToAddInfo = useCallback(() => {
    if (data) {
      sendAddInfoButtonClickEvent();
      navigation.navigate('ObjectDetailsAddInfo', {
        objectId: data.id,
        objectName: data.name,
        incompleteFields,
        analytics: {
          fromScreenName: 'ObjectScreen',
        },
      });
    }
  }, [data, incompleteFields, navigation, sendAddInfoButtonClickEvent]);

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

  useEffect(() => {
    dispatch(getObjectDetailsRequest({objectId}));
  }, [dispatch, getObjectDetailsRequest, objectId]);

  useUpdateEffect(() => {
    sendSwitchPhotosEvent();
  }, [page, sendSwitchPhotosEvent]);

  const shareObjectLink = useCallback(() => {
    if (data?.name) {
      sendObjectShareEvent();
      shareService.shareObject(objectId, data?.name);
    }
  }, [data?.name, objectId, sendObjectShareEvent]);

  const goToImageGallery = useCallback(() => {
    if (data?.images) {
      navigation.navigate('ImagesGallery', {
        images: data.images,
        initialIndex: page - 1,
      });
    }
  }, [data, navigation, page]);

  const {loading} = useRequestLoading(getObjectDetailsRequest);

  const {errorTexts} = useOnRequestError(getObjectDetailsRequest, '');

  const onTryAgainPress = useCallback(() => {
    dispatch(getObjectDetailsRequest({objectId}));
  }, [dispatch, getObjectDetailsRequest, objectId]);

  return {
    data,
    loading,
    errorTexts,
    onTryAgainPress,
    sendScrollEvent,
    copyLocationToClipboard,
    navigateToObjectsMap,
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
    navigateToBelongsToObject,
    navigateToIncludesObjectListOrPage,
    objectCoverImageUrl,
    objcetCoverBlurhash,
  };
};
