import { AppError } from '@core/model';
import { resolveErrorMessage } from '@core/utils/resolveErrorMessage';
import { useObservable } from '@legendapp/state/react';
import { useSnackbar } from 'atoms';
import { useBottomMenu } from 'core/hooks';
import { type PropsWithChildren, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteList, useSetObjectRoutes } from '../../api';
import { Menus, SaveToRouteListButton } from './components';
import { SaveToRouteListFlowContext, SaveToRouteListState } from './context';

const getRouteSelectionChanges = ({
  selectedRouteIds,
  initialRouteIds,
}: {
  selectedRouteIds: Set<string>;
  initialRouteIds: Set<string>;
}) => {
  const addedRouteIds = [...selectedRouteIds].filter(
    routeId => !initialRouteIds.has(routeId),
  );
  const removedRouteIds = [...initialRouteIds].filter(
    routeId => !selectedRouteIds.has(routeId),
  );

  return { addedRouteIds, removedRouteIds };
};

const Provider = ({
  children,
  objectId,
}: PropsWithChildren<{ objectId: string }>) => {
  const snackbar = useSnackbar();
  const menuProps = useBottomMenu();
  const { t } = useTranslation('routes');
  const routes = useRouteList();

  const state$ = useObservable<SaveToRouteListState>(
    () => ({
      selectedRouteIds: new Set(),
      initialRouteIds: new Set(),
      isPending: false,
    }),
    [objectId],
  );

  const currentRouteIdsWithThisObject = useRef<Set<string> | null>(null);

  // This effect is used to keep the selected and initial route ids in sync with the routes data
  useEffect(() => {
    if (!routes.data) return;

    const routeIdsWithThisObject = new Set(
      routes.data.filter(r => r.objectIds.includes(objectId)).map(r => r.id),
    );

    const currentRouteIdsSnapshot = currentRouteIdsWithThisObject.current;

    currentRouteIdsWithThisObject.current = routeIdsWithThisObject;

    if (!currentRouteIdsSnapshot) {
      state$.selectedRouteIds.set(new Set(routeIdsWithThisObject));
      state$.initialRouteIds.set(new Set(routeIdsWithThisObject));
      return;
    }

    routeIdsWithThisObject.forEach(routeId => {
      if (!currentRouteIdsSnapshot.has(routeId)) {
        state$.selectedRouteIds.add(routeId);
        state$.initialRouteIds.add(routeId);
      }
    });
  }, [routes.data, objectId, state$]);

  const { mutateAsync: setObjectRoutesAsync } = useSetObjectRoutes({});

  // Stable ref to latest routes data avoids recreating context value on every query update
  const routesDataRef = useRef(routes.data);
  routesDataRef.current = routes.data;

  const value = useMemo(() => {
    const toggle = (routeId: string) => {
      if (state$.selectedRouteIds.peek().has(routeId)) {
        state$.selectedRouteIds.delete(routeId);
      } else {
        state$.selectedRouteIds.add(routeId);
      }
    };

    const showSuccessNotification = ({
      addedRouteNames = [],
      removedRouteNames = [],
    }: {
      addedRouteNames?: string[];
      removedRouteNames?: string[];
    }) => {
      const snackbarTitle =
        addedRouteNames.length > 0 && removedRouteNames.length === 0
          ? addedRouteNames.length === 1
            ? t('saveToRouteList.notifications.objectAddedToRoute', {
                routeName: addedRouteNames[0],
              })
            : t('saveToRouteList.notifications.objectAddedToRoutes', {
                count: addedRouteNames.length,
              })
          : removedRouteNames.length > 0 && addedRouteNames.length === 0
            ? removedRouteNames.length === 1
              ? t('saveToRouteList.notifications.objectRemovedFromRoute', {
                  routeName: removedRouteNames[0],
                })
              : t('saveToRouteList.notifications.objectRemovedFromRoutes', {
                  count: removedRouteNames.length,
                })
            : t('saveToRouteList.notifications.selectionUpdated');

      snackbar.show({
        type: 'notification',
        leadIcon: 'addRoute',
        title: snackbarTitle,
      });
    };

    const save = async () => {
      const selectedRouteIdsSnapshot = new Set(state$.selectedRouteIds.peek());

      const { addedRouteIds, removedRouteIds } = getRouteSelectionChanges({
        selectedRouteIds: selectedRouteIdsSnapshot,
        initialRouteIds: state$.initialRouteIds.peek(),
      });

      if (addedRouteIds.length === 0 && removedRouteIds.length === 0) {
        menuProps.closeMenu();
        return;
      }

      state$.isPending.set(true);

      try {
        const routeNamesById = new Map(
          routesDataRef.current?.map(route => [route.id, route.name]) ?? [],
        );

        await setObjectRoutesAsync({
          objectId,
          routeIds: Array.from(selectedRouteIdsSnapshot),
        });

        showSuccessNotification({
          addedRouteNames: addedRouteIds.map(
            routeId => routeNamesById.get(routeId) ?? '',
          ),
          removedRouteNames: removedRouteIds.map(
            routeId => routeNamesById.get(routeId) ?? '',
          ),
        });

        state$.initialRouteIds.set(selectedRouteIdsSnapshot);
        menuProps.closeMenu();
      } catch (error) {
        snackbar.show({
          type: 'error',
          ...resolveErrorMessage(AppError.fromUnknown(error), t),
        });
      } finally {
        state$.isPending.set(false);
      }
    };

    return {
      state$,
      toggle,
      save,
      showSuccessNotification,
      menuProps,
      snackbar,
      objectId,
    };
  }, [state$, menuProps, snackbar, objectId, t, setObjectRoutesAsync]);

  return (
    <SaveToRouteListFlowContext.Provider value={value}>
      {children}
    </SaveToRouteListFlowContext.Provider>
  );
};

export const SaveToRouteListFlow = {
  Provider,
  SaveButton: SaveToRouteListButton,
  Menus,
} as const;
