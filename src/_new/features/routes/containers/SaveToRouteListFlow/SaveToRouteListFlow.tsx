import { useObservable } from '@legendapp/state/react';
import { useSnackbar } from 'atoms';
import { useBottomMenu } from 'core/hooks';
import { type PropsWithChildren, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteList, useUpdateRoute } from '../../api';
import { Menus, SaveToRouteListButton } from './components';
import { SaveToRouteListFlowContext, SaveToRouteListState } from './context';

const Provider = ({
  children,
  objectId,
}: PropsWithChildren<{ objectId: string }>) => {
  const snackbar = useSnackbar();
  const menuProps = useBottomMenu();
  const { t } = useTranslation('routes');
  const routes = useRouteList();
  const hasInitialized = useRef(false);

  const state$ = useObservable<SaveToRouteListState>(() => ({
    selectedRouteIds: new Set(),
    initialRouteIds: new Set(),
    isPending: false,
  }));

  useEffect(() => {
    if (!routes.data) return;

    if (!hasInitialized.current) {
      hasInitialized.current = true;
      const ids = new Set(
        routes.data.filter(r => r.objectIds.includes(objectId)).map(r => r.id),
      );
      state$.selectedRouteIds.set(new Set(ids));
      state$.initialRouteIds.set(new Set(ids));
      return;
    }

    // Auto-select routes newly created with this objectId included
    const allKnownIds = new Set([
      ...state$.selectedRouteIds.peek(),
      ...state$.initialRouteIds.peek(),
    ]);
    routes.data.forEach(route => {
      if (route.objectIds.includes(objectId) && !allKnownIds.has(route.id)) {
        state$.selectedRouteIds.add(route.id);
        state$.initialRouteIds.add(route.id);
      }
    });
  }, [routes.data, objectId, state$]);

  const { mutateAsync: updateRouteAsync } = useUpdateRoute({});

  // Stable ref to latest routes data avoids recreating context value on every query update
  const routesDataRef = useRef(routes.data);
  routesDataRef.current = routes.data;

  const value = useMemo(
    () => {
      const toggle = (routeId: string) => {
        if (state$.selectedRouteIds.peek().has(routeId)) {
          state$.selectedRouteIds.delete(routeId);
        } else {
          state$.selectedRouteIds.add(routeId);
        }
      };

      const save = async () => {
        const current = state$.selectedRouteIds.peek();
        const initial = state$.initialRouteIds.peek();
        const added = [...current].filter(id => !initial.has(id));
        const removed = [...initial].filter(id => !current.has(id));

        if (added.length === 0 && removed.length === 0) {
          menuProps.closeMenu();
          return;
        }

        state$.isPending.set(true);

        try {
          const routeMap = new Map(
            routesDataRef.current?.map(r => [r.id, r]) ?? [],
          );

          await Promise.all([
            ...added.map(routeId => {
              const route = routeMap.get(routeId);
              if (!route) return Promise.resolve();

              return updateRouteAsync({
                id: routeId,
                objectIds: [...route.objectIds, objectId],
              });
            }),
            ...removed.map(routeId => {
              const route = routeMap.get(routeId);
              if (!route) return Promise.resolve();

              return updateRouteAsync({
                id: routeId,
                objectIds: route.objectIds.filter(id => id !== objectId),
              });
            }),
          ]);

          const getRouteName = (id: string) => routeMap.get(id)?.name ?? '';

          if (added.length > 0 && removed.length === 0) {
            snackbar.show({
              type: 'success',
              title:
                added.length === 1
                  ? t('saveToRouteList.savedToRoute', {
                      routeName: getRouteName(added[0]),
                    })
                  : t('saveToRouteList.savedToRoutes', {
                      count: added.length,
                    }),
            });
          } else if (removed.length > 0 && added.length === 0) {
            snackbar.show({
              type: 'success',
              title:
                removed.length === 1
                  ? t('saveToRouteList.removedFromRoute', {
                      routeName: getRouteName(removed[0]),
                    })
                  : t('saveToRouteList.removedFromRoutes', {
                      count: removed.length,
                    }),
            });
          } else {
            snackbar.show({
              type: 'success',
              title: t('saveToRouteList.changesSaved'),
            });
          }

          state$.initialRouteIds.set(new Set(current));
          state$.isPending.set(false);
          menuProps.closeMenu();
        } catch {
          state$.isPending.set(false);
          snackbar.show({
            type: 'error',
            title: t('saveToRouteList.saveError'),
          });
        }
      };

      return { state$, toggle, save, menuProps, snackbar, objectId };
    },
    // Stable deps only — routes data accessed via ref inside save()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state$, menuProps, snackbar, objectId, t, updateRouteAsync],
  );

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
