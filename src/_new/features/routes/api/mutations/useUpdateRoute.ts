import { useInjection } from '@core/di';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RoutesService } from '../../services/routesService';
import { RouteModel } from '../../model';

export const useUpdateRoute = ({
  onSuccess,
  onMutate,
  onError,
}: {
  onSuccess?: (data: RouteModel.Route) => void;
  onMutate?: (input: RouteModel.UpdateRouteInput) => void;
  onError?: () => void;
}) => {
  const routesService = useInjection(RoutesService.Tag);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: RouteModel.UpdateRouteInput) =>
      routesService.update(input),
    onMutate,
    onSuccess: data => {
      queryClient.setQueryData<RouteModel.Route[]>(['routes'], oldData => {
        if (!oldData) return oldData;
        return oldData.map(route => (route.id === data.id ? data : route));
      });
      onSuccess?.(data);
    },
    onError,
  });
};
