import { useObservable } from '@legendapp/state/react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useSnackbar } from 'atoms';
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateRoute, useRouteById, useUpdateRoute } from '../../api';
import { RoutesDependencies } from '../../context';
import type { RoutesNavigatorParamsList } from '../../navigation';
import { ActionBar } from './ActionBar';
import { AddButton } from './AddButton';

type AddToRouteState = {
  selectedIds: Set<string>;
  isPending: boolean;
  addedIds: string[];
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
    params: { name, routeId, onDone },
  } = useRoute<RouteProp<RoutesNavigatorParamsList, 'AddObjectsToRoute'>>();

  const navigation = useNavigation();
  const snackbar = useSnackbar();
  const { t: tRoutes } = useTranslation('routes');
  const { isAuthenticated, redirectToSignIn } = useContext(RoutesDependencies);

  const isCreateMode = !!name;

  const { data: route } = useRouteById(routeId ?? '');

  const state$ = useObservable<AddToRouteState>(() => ({
    selectedIds: new Set(isCreateMode ? [] : (route?.objectIds ?? [])),
    isPending: false,
    addedIds: [],
  }));

  const showError = () => {
    // TODO: [Routes] Add error tag to translation mapping, update error label
    snackbar.show({
      type: 'error',
      title: tRoutes('addToRouteFlow.errors.default'),
    });
  };

  const handleSaveSuccess = () => {
    state$.isPending.set(false);

    if (onDone) {
      const addedIds = state$.addedIds.peek();
      onDone(addedIds);
    }

    navigation.goBack();
  };

  const handleSaveError = () => {
    state$.isPending.set(false);
    showError();
  };

  const { mutate: createRoute } = useCreateRoute({
    onSuccess: handleSaveSuccess,
    onError: handleSaveError,
  });

  const { mutate: updateRoute } = useUpdateRoute({
    onSuccess: handleSaveSuccess,
    onError: handleSaveError,
  });

  const value = useMemo(() => {
    const requestSignIn = (params: { onSuccess: () => void }) => {
      if (isAuthenticated) {
        params.onSuccess();

        return;
      }

      redirectToSignIn({
        onSuccess: params.onSuccess,
        authPromptMessage: tRoutes('addToRouteFlow.authPromptMessage'),
      });
    };

    const toggle = (objectId: string) => {
      if (state$.selectedIds.has(objectId)) {
        state$.selectedIds.delete(objectId);
      } else {
        state$.selectedIds.add(objectId);
      }
    };

    const save = async () => {
      const objectIds = Array.from(state$.selectedIds.peek());

      if (isCreateMode && name) {
        state$.addedIds.set(objectIds);
        requestSignIn({
          onSuccess: () => {
            state$.isPending.set(true);
            createRoute({ name, objectIds });
          },
        });
      } else if (routeId) {
        const initialIds = route?.objectIds ?? [];
        const initialIdsSet = new Set(initialIds);
        const addedIds = objectIds.filter(id => !initialIdsSet.has(id));

        state$.addedIds.set(addedIds);
        state$.isPending.set(true);
        updateRoute({ id: routeId, objectIds });
      }
    };

    return {
      state$,
      toggle,
      save,
      snackbar,
    };
  }, [
    state$,
    snackbar,
    isAuthenticated,
    redirectToSignIn,
    tRoutes,
    isCreateMode,
    name,
    routeId,
    createRoute,
    route?.objectIds,
    updateRoute,
  ]);

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
