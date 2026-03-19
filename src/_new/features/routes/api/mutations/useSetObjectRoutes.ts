import { useInjection } from '@core/di';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RouteModel } from '../../model';
import { RoutesService } from '../../services/routesService';

export const useSetObjectRoutes = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: RouteModel.Route[]) => void;
  onError?: () => void;
}) => {
  const routesService = useInjection(RoutesService.Tag);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['routes'],
    mutationFn: (input: RouteModel.SetObjectRoutesInput) =>
      routesService.setObjectRoutes(input),
    onSuccess: data => {
      onSuccess?.(data);
      queryClient.setQueryData<RouteModel.Route[]>(['routes'], oldData => {
        if (!oldData) return oldData;

        const updatedRoutesById = new Map(data.map(route => [route.id, route]));

        return oldData.map(route => updatedRoutesById.get(route.id) ?? route);
      });
    },
    onError,
  });
};
