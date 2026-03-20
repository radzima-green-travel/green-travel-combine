import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useScreenParams } from '@core/hooks/useScreenParams';
import { type } from 'arktype';
import {
  useSearchActions,
  useSearchSelector,
  useTranslation,
  useBottomMenu,
} from 'core/hooks';
import { selectSearchObjectsData } from 'core/selectors';
import { useRequestLoading } from 'react-redux-help-kit';
import type { SearchObject } from 'core/types';
import { useRouteById, useUpdateRoute } from '../../../api';
import type { RoutesNavigatorParamsList } from '../../../navigation';

type EditRouteNavigationProps = NativeStackNavigationProp<
  RoutesNavigatorParamsList,
  'EditRoute'
>;

const EditRouteScreenParams = type({
  id: 'string',
});

type EditRouteScreenParams = typeof EditRouteScreenParams.infer;

export function useEditRoute() {
  const { id } = useScreenParams(EditRouteScreenParams);
  const { t } = useTranslation('routes');

  const navigation = useNavigation<EditRouteNavigationProps>();
  const dispatch = useDispatch();

  const { data: route } = useRouteById(id);
  const routeObjectIds = route?.objectIds;
  const objectIds = useMemo(() => routeObjectIds ?? [], [routeObjectIds]);

  const [orderedObjectIds, setOrderedObjectIds] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const isSelectionMode = selectedIds.size > 0;

  const renameMenuProps = useBottomMenu();

  const { searchObjectsRequest, setSearchInputValue } = useSearchActions();
  const searchResults = useSearchSelector(selectSearchObjectsData);
  const { loading } = useRequestLoading(searchObjectsRequest);

  const searchParameters = useMemo(
    () => ({
      query: '',
      filters: { objectIds },
      options: { byAddress: false, byDescription: false },
    }),
    [objectIds],
  );

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

  // Initialize ordered IDs from route data
  useLayoutEffect(() => {
    if (objectIds.length > 0 && orderedObjectIds.length === 0) {
      setOrderedObjectIds(objectIds);
    }
  }, [objectIds, orderedObjectIds.length]);

  const orderedObjects = useMemo((): SearchObject[] => {
    if (orderedObjectIds.length === 0) {
      return searchResults as SearchObject[];
    }
    return orderedObjectIds
      .map(oid => (searchResults as SearchObject[]).find(o => o.id === oid))
      .filter((o): o is SearchObject => Boolean(o));
  }, [orderedObjectIds, searchResults]);

  const { mutate: updateRoute, isPending: isSaving } = useUpdateRoute({});

  const handleDone = useCallback(() => {
    const hasReordered =
      JSON.stringify(orderedObjectIds) !== JSON.stringify(objectIds);
    if (hasReordered) {
      updateRoute(
        { id, objectIds: orderedObjectIds },
        { onSuccess: () => navigation.goBack() },
      );
    } else {
      navigation.goBack();
    }
  }, [id, navigation, objectIds, orderedObjectIds, updateRoute]);

  const handleSelectAll = () => {
    setSelectedIds(new Set(orderedObjectIds));
  };

  const handleCancelSelection = () => {
    setSelectedIds(new Set());
  };

  const handleToggleSelect = (objectId: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(objectId)) {
        next.delete(objectId);
      } else {
        next.add(objectId);
      }
      return next;
    });
  };

  const handleRemoveSelected = () => {
    const routeName = route?.name ?? '';
    const count = selectedIds.size;
    Alert.alert(
      t('editRoute.deleteObjectsConfirm.title', { count }),
      t('editRoute.deleteObjectsConfirm.message', { count, routeName }),
      [
        {
          text: t('editRoute.deleteObjectsConfirm.cancel'),
          style: 'cancel',
        },
        {
          text: t('editRoute.deleteObjectsConfirm.delete'),
          style: 'destructive',
          onPress: () => {
            const newObjectIds = orderedObjectIds.filter(
              oid => !selectedIds.has(oid),
            );
            setOrderedObjectIds(newObjectIds);
            setSelectedIds(new Set());
            updateRoute({ id, objectIds: newObjectIds });
          },
        },
      ],
    );
  };

  const handleReorder = (newOrder: string[]) => {
    setOrderedObjectIds(newOrder);
  };

  const handleRenamePress = () => {
    renameMenuProps.openMenuWithInputAutoFocus();
  };

  return {
    id,
    routeName: route?.name ?? '',
    orderedObjects,
    orderedObjectIds,
    selectedIds,
    isSelectionMode,
    loading,
    isSaving,
    renameMenuProps,
    t,
    handleDone,
    handleSelectAll,
    handleCancelSelection,
    handleToggleSelect,
    handleRemoveSelected,
    handleReorder,
    handleRenamePress,
  };
}
