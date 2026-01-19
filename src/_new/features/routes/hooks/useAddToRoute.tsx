import { useObservable } from '@legendapp/state/react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useMemo } from 'react';
import { useRouteById } from '../api';
import { AddToRouteButton } from '../containers/AddToRouteButton';
import type { RoutesNavigatorParamsList } from '../navigation';

export const useAddToRoute = () => {
  const {
    params: { routeId },
  } = useRoute<RouteProp<RoutesNavigatorParamsList, 'AddObjectsToRoute'>>();

  const { data: route } = useRouteById(routeId);

  const routeObjectIds = useObservable(route?.objectIds ?? []);

  return useMemo(() => {
    return {
      AddToRouteButton: ({ objectId }: { objectId: string }) => (
        <AddToRouteButton
          objectId={objectId}
          $routeObjectIds={routeObjectIds}
        />
      ),
    };
  }, [routeObjectIds]);
};
