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
  const { isAuthenticated, redirectToSignIn } = useContext(RoutesDependencies);

  const isCreateMode = !!name;

  const { data: route } = useRouteById(routeId ?? '');

  const state$ = useObservable<AddToRouteState>(() => ({
    selectedIds: new Set(isCreateMode ? [] : (route?.objectIds ?? [])),
    isPending: false,
  }));

  const showError = () => {
    // TODO: [Routes] Add error tag to translation mapping, update error label
    snackbar.show({
      type: 'error',
      title: tRoutes('addToRouteFlow.errors.default'),
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
        requestSignIn({
          onSuccess: () => {
            state$.isPending.set(true);
            createRoute({ name, objectIds });
          },
        });
      } else if (routeId) {
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
    isAuthenticated,
    redirectToSignIn,
    isCreateMode,
    name,
    routeId,
    state$,
    createRoute,
    updateRoute,
    snackbar,
    tRoutes,
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
