import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  useSearchActions,
  useSearchSelector,
  useSearchListViewMode,
  useObjectListMapView,
  useTranslation,
} from 'core/hooks';
import { selectSearchObjectsData } from 'core/selectors';
import { useRequestLoading } from 'react-redux-help-kit';
import { useOnRequestError } from 'core/hooks/useOnRequestError';
import { getAnalyticsNavigationScreenName } from 'core/helpers';
import type { MainNavigatorParamsList } from 'core/types';
import { ObjectListViewMode } from 'components/types';
import { useRouteById } from '../../../api';
import { useSnackbar } from 'atoms';

export function useRoute(id: string) {
  const { t } = useTranslation('routes');
  const snackbar = useSnackbar();
  const objectCountBeforeAddRef = useRef<number | null>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigatorParamsList>>();
  const dispatch = useDispatch();

  const { data: route } = useRouteById(id);
  const objectIds = route?.objectIds || [];

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

  useEffect(() => {
    searchObjects();
  }, [searchObjects]);

  const openObjectDetails = useCallback(
    (object: (typeof searchResults)[0]) => {
      Keyboard.dismiss();
      navigation.navigate('ObjectDetails', {
        objectId: object.id,
        objectCoverImageUrl: object.cover,
        objcetCoverBlurhash: object.blurhash,
        analytics: {
          fromScreenName: getAnalyticsNavigationScreenName(),
        },
      });
    },
    [navigation],
  );

  const objects = useMemo(() => {
    if (!objectIds.length) return [];
    return searchResults.filter(obj => objectIds.includes(obj.id));
  }, [searchResults, objectIds]);

  const objectsCount = objects.length;

  const handleAddObjectsPress = useCallback(() => {
    objectCountBeforeAddRef.current = objectsCount;
    navigation.navigate('TabNavigator', {
      screen: 'RoutesNavigator',
      params: {
        screen: 'AddObjectsToRoute',
        params: { routeId: id },
      },
    });
  }, [id, navigation, objectsCount]);

  useFocusEffect(
    useCallback(() => {
      const prevCount = objectCountBeforeAddRef.current;
      const routeName = route?.name ?? '';
      if (prevCount !== null && objectsCount > prevCount) {
        const addedCount = objectsCount - prevCount;
        const key =
          addedCount === 1
            ? 'routeDetails.snackbar.savedObjectTo_one'
            : 'routeDetails.snackbar.savedObjectTo_other';
        snackbar.show({
          title: t(key, { amount: addedCount, routeName }),
          timeoutMs: 1000,
        });
        objectCountBeforeAddRef.current = null;
      }
    }, [objectsCount, route?.name, snackbar, t]),
  );

  const handleObjectPress = useCallback(
    (object: (typeof objects)[0]) => {
      openObjectDetails(object);
    },
    [openObjectDetails],
  );

  const handleViewModeChange = useCallback(
    (mode: ObjectListViewMode) => {
      setViewMode(mode);
    },
    [setViewMode],
  );

  return {
    route,
    routeName: route?.name ?? '',
    objects,
    objectsCount,
    objectIds,
    loading,
    errorTexts,
    viewMode,
    searchObjects,
    handleAddObjectsPress,
    handleObjectPress,
    handleViewModeChange,
    snackbar,
    mapWithBottomSheetProps,
  };
}
