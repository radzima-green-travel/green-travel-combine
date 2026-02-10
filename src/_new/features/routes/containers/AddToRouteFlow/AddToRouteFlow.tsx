import { useObservable } from '@legendapp/state/react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createContext, type PropsWithChildren, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'atoms';
import { useCreateRoute, useRouteById, useUpdateRoute } from '../../api';
import type { RoutesNavigatorParamsList } from '../../navigation';
import { ActionBar } from './ActionBar';
import { AddButton } from './AddButton';
import { DoneButton } from './DoneButton';

type AddToRouteState = {
  selectedIds: Set<string>;
  isPending: boolean;
};

type AddToRouteFlowContextValue = {
  state$: ReturnType<typeof useObservable<AddToRouteState>>;
  toggle: (objectId: string) => void;
  save: () => Promise<void>;
  snackbar: ReturnType<typeof useSnackbar>;
};

export const AddToRouteFlowContext = createContext<AddToRouteFlowContextValue>(
  null!,
);

const Provider = ({ children }: PropsWithChildren) => {
  const {
    params: { name, routeId },
  } = useRoute<RouteProp<RoutesNavigatorParamsList, 'AddObjectsToRoute'>>();

  const navigation = useNavigation();
  const snackbar = useSnackbar();
  const { t: tRoutes } = useTranslation('routes');

  const isCreateMode = !!name;

  const { data: route } = useRouteById(routeId ?? '');

  const state$ = useObservable<AddToRouteState>(() => ({
    selectedIds: new Set(isCreateMode ? [] : (route?.objectIds ?? [])),
    isPending: false,
  }));

  const showError = () => {
    snackbar.show({
      type: 'error',
      title: tRoutes('addToRouteFlow.error'),
    });
  };

  const { mutate: createRoute } = useCreateRoute({
    onSuccess: () => {
      state$.isPending.set(false);
      navigation.goBack();
    },
    onError: () => {
      state$.isPending.set(false);
      showError();
    },
  });

  const { mutate: updateRoute } = useUpdateRoute({
    onSuccess: () => {
      state$.isPending.set(false);
      navigation.goBack();
    },
    onError: () => {
      state$.isPending.set(false);
      showError();
    },
  });

  const value = useMemo(() => {
    const toggle = (objectId: string) => {
      if (state$.selectedIds.has(objectId)) {
        state$.selectedIds.delete(objectId);
      } else {
        state$.selectedIds.add(objectId);
      }
    };

    const save = async () => {
      state$.isPending.set(true);
      const objectIds = Array.from(state$.selectedIds.peek());
      if (isCreateMode && name) {
        createRoute({ name, objectIds });
      } else if (routeId) {
        updateRoute({ id: routeId, objectIds });
      }
    };

    return {
      state$,
      toggle,
      save,
      snackbar,
    };
  }, [isCreateMode, name, routeId, state$, createRoute, updateRoute, snackbar]);

  return (
    <AddToRouteFlowContext.Provider value={value}>
      {children}
    </AddToRouteFlowContext.Provider>
  );
};

export const AddToRouteFlow = {
  Provider,
  AddButton,
  ActionBar,
} as const;
