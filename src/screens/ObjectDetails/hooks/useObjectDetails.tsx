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
  useObjectDetailsActions,
} from 'core/hooks';
import {shareService} from 'services/ShareService';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getAnalyticsNavigationScreenName} from 'core/helpers';
import {useObjectDetailsAnalytics} from './useObjectDetailsAnalytics';
import {IBelongsTo, IInclude, RouteQueryParams} from 'core/types';
import {selectObjectDetails} from 'core/selectors';
import {useObjectDetailsSelector} from 'core/hooks';
import {useLocalSearchParams, useNavigation, useRouter} from 'expo-router';
import {serializeRouteParams} from 'core/helpers/routerUtils';
import {map} from 'lodash';

export const useObjectDetails = () => {
  const router = useRouter();
  const {objectId, objectCoverImageUrl, objcetCoverBlurhash} =
    useLocalSearchParams<RouteQueryParams.ObjectDetails>();

  const dispatch = useDispatch();
  const data = useObjectDetailsSelector(selectObjectDetails);
  const {getObjectDetailsRequest} = useObjectDetailsActions();

  const {top} = useSafeAreaInsets();

  const {t} = useTranslation();

  const {sendSwitchPhotosEvent, sendScrollEvent} =
    // TODO: legacy. Will be removed after migration to new analytics
    useDetailsPageAnalytics();

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

      router.push({
        pathname: '/object/[objectId]',
        params: {
          objectId: belongsToObjectId,
          objectCoverImageUrl: image,
          objcetCoverBlurhash: blurhash,
          fromScreenName: getAnalyticsNavigationScreenName(),
        },
      });
    },
    [router, sendBelongsToNavigateEvent],
  );

  const navigateToIncludesObjectListOrPage = useCallback(
    ({objects, categoryId, name, analyticsMetadata}: IInclude) => {
      sendActivitiesNavigateEvent(analyticsMetadata.name);
      if (objects.length === 1) {
        const {id, cover, blurhash} = objects[0];
        router.push({
          pathname: '/object/[objectId]',
          params: {
            objectId: id,
            objectCoverImageUrl: cover,
            objcetCoverBlurhash: blurhash,
            fromScreenName: getAnalyticsNavigationScreenName(),
          },
        });
      } else {
        router.push({
          pathname: '/object-list',
          params: serializeRouteParams({
            categoryId,
            title: name,
            objectsIds: map(objects, 'id'),
          }),
        });
      }
    },
    [router, sendActivitiesNavigateEvent],
  );

  const navigateToObjectsMap = useCallback(() => {
    router.navigate(`/object-details-map/${objectId}`);

    sendShowOnMapButtonClickEvent();
  }, [objectId, router, sendShowOnMapButtonClickEvent]);

  const navigateToAddInfo = useCallback(() => {
    if (data) {
      sendAddInfoButtonClickEvent();

      router.navigate({
        pathname: '/add-object-info/[objectId]',
        params: {
          objectId: data.id,
          fromScreenName: 'ObjectScreen',
        },
      });
    }
  }, [data, router, sendAddInfoButtonClickEvent]);

  const {onScroll, page, pagesAmount} = useImageSlider(
    data?.images?.length || 0,
  );

  const isJustOneImage = pagesAmount < 2;

  const defaultPhoto = require('../img/objectDetailsDefaultPhoto.png');

  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      title: data?.name,
    });
  }, [setOptions, data]);

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
    if (data) {
      router.navigate({
        pathname: '/image-gallery',
        params: {
          objectId: data.id,
          initialIndex: page - 1,
        },
      });
    }
  }, [data, router, page]);

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
