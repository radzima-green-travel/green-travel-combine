import { useObservable } from '@legendapp/state/react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createContext, type PropsWithChildren, useMemo } from 'react';
import { useRouteById, useUpdateRoute } from '../../api';
import type { RoutesNavigatorParamsList } from '../../navigation';
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
};

export const AddToRouteFlowContext = createContext<AddToRouteFlowContextValue>(
  null!,
);

const Provider = ({ children }: PropsWithChildren) => {
  const {
    params: { routeId },
  } = useRoute<RouteProp<RoutesNavigatorParamsList, 'AddObjectsToRoute'>>();

  const navigation = useNavigation();

  const { data: route } = useRouteById(routeId);

  const state$ = useObservable<AddToRouteState>(() => ({
    selectedIds: new Set(route?.objectIds),
    isPending: false,
  }));

  const { mutate: updateRoute } = useUpdateRoute({
    onSuccess: () => {
      state$.isPending.set(false);
      navigation.goBack();
    },
    onError: () => {
      state$.isPending.set(false);
    },
    onMutate: () => {
      state$.isPending.set(true);
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
      updateRoute({
        id: routeId,
        objectIds: Array.from(state$.selectedIds.peek()),
      });
    };

    return {
      state$,
      toggle,
      save,
    };
  }, [routeId, state$, updateRoute]);

  return (
    <AddToRouteFlowContext.Provider value={value}>
      {children}
    </AddToRouteFlowContext.Provider>
  );
};

export const AddToRouteFlow = {
  Provider,
  AddButton,
  DoneButton,
} as const;
