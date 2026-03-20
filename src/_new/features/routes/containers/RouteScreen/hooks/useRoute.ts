import { useCallback, useLayoutEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  useNavigation,
  type CompositeNavigationProp,
} from '@react-navigation/native';
import { useScreenParams } from '@core/hooks/useScreenParams';
import { RouteScreenParams } from '../params';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  useSearchActions,
  useSearchSelector,
  useSearchListViewMode,
  useObjectListMapView,
  useTranslation,
  useBottomMenu,
} from 'core/hooks';
import { selectSearchObjectsData } from 'core/selectors';
import { useRequestLoading } from 'react-redux-help-kit';
import { useOnRequestError } from 'core/hooks/useOnRequestError';
import { getAnalyticsNavigationScreenName } from 'core/helpers';
import type { MainNavigatorParamsList, SearchObject } from 'core/types';
import { ObjectListViewMode } from 'components/types';
import { useRouteById, useDeleteRoute } from '../../../api';
import { useSnackbar } from 'atoms';
import type { RoutesNavigatorParamsList } from '../../../navigation';

type RouteScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RoutesNavigatorParamsList, 'Route'>,
  NativeStackNavigationProp<MainNavigatorParamsList>
>;

export function useRoute() {
  const { id } = useScreenParams(RouteScreenParams);
  const { t } = useTranslation('routes');
  const snackbar = useSnackbar();

  const navigation = useNavigation<RouteScreenNavigationProps>();
  const dispatch = useDispatch();
  const manageMenuProps = useBottomMenu();

  const { data: route } = useRouteById(id);
  const objectIds = route?.objectIds || [];

  const { mutate: deleteRoute } = useDeleteRoute({
    onSuccess: () => {
      navigation.goBack();
    },
  });

  const { searchObjectsRequest, setSearchInputValue } = useSearchActions();
  const searchResults = useSearchSelector(selectSearchObjectsData);
  const { loading } = useRequestLoading(searchObjectsRequest);
  const { errorTexts } = useOnRequestError(searchObjectsRequest, '');

  const searchParameters = useMemo(
    () => ({
      query: '',
      filters: { objectIds },
      options: { byAddress: false, byDescription: false },
    }),
    [objectIds],
  );

  const orderedObjects = useMemo(
    () =>
      objectIds
        .map(oid => (searchResults as SearchObject[]).find(o => o.id === oid))
        .filter((o): o is SearchObject => Boolean(o)),
    [objectIds, searchResults],
  );

  const { viewMode, setViewMode } = useSearchListViewMode(searchParameters);

  const mapWithBottomSheetProps = useObjectListMapView({
    searchParameters,
  });

  const searchObjects = useCallback(() => {
    if (objectIds.length > 0) {
      dispatch(setSearchInputValue(''));
      dispatch(searchObjectsRequest(searchParameters));
    }
  }, [
    dispatch,
    searchObjectsRequest,
    setSearchInputValue,
    searchParameters,
    objectIds.length,
  ]);

  useLayoutEffect(() => {
    searchObjects();
  }, [searchObjects]);

  const handleAddObjectsPress = () => {
    navigation.navigate('AddObjectsToRoute', {
      routeId: id,
      onDone: addedIds => {
        const addedCount = addedIds.length;
        if (!addedCount) {
          return;
        }
        const routeName = route?.name ?? '';
        requestIdleCallback(() => {
          snackbar.show({
            title: t('routeDetails.snackbar.savedObjectTo', {
              count: addedCount,
              routeName,
            }),
            timeoutMs: 2000,
          });
        });
      },
    });
  };

  const handleObjectPress = (object: SearchObject) => {
    navigation.navigate('ObjectDetails', {
      objectId: object.id,
      objectCoverImageUrl: object.cover,
      objcetCoverBlurhash: object.blurhash,
      analytics: {
        fromScreenName: getAnalyticsNavigationScreenName(),
      },
    });
  };

  const handleViewModeChange = (mode: ObjectListViewMode) => {
    setViewMode(mode);
  };

  const handleManageEdit = () => {
    navigation.navigate('EditRoute', { id });
  };

  const handleManageDelete = () => {
    Alert.alert(
      t('deleteRouteConfirm.title'),
      t('deleteRouteConfirm.message', { routeName: route?.name ?? '' }),
      [
        {
          text: t('deleteRouteConfirm.cancel'),
          style: 'cancel',
        },
        {
          text: t('deleteRouteConfirm.delete'),
          style: 'destructive',
          onPress: () => deleteRoute(id),
        },
      ],
    );
  };

  const handleManageMenuAction = {
    onEdit: handleManageEdit,
    onDelete: handleManageDelete,
  };

  return {
    routeName: route?.name ?? '',
    objects: orderedObjects,
    objectsCount: orderedObjects.length,
    loading,
    errorTexts,
    viewMode,
    searchObjects,
    onAddObjectsPress: handleAddObjectsPress,
    onObjectPress: handleObjectPress,
    onViewModeChange: handleViewModeChange,
    snackbar,
    mapWithBottomSheetProps,
    manageMenuProps,
    handleManageMenuAction,
  };
}
