import { useInjection } from '@core/di';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RouteModel } from '../../model';
import { RoutesService } from '../../services/routesService';
import type { NetworkError } from '@core/model';

export const useCreateRoute = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: RouteModel.Route) => void;
  onError?: (error: NetworkError) => void;
}) => {
  const routesService = useInjection(RoutesService.Tag);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['routes'],
    mutationFn: (input: RouteModel.CreateRouteInput) =>
      routesService.create(input),
    onSuccess: data => {
      onSuccess?.(data);
      queryClient.setQueryData<RouteModel.Route[]>(['routes'], oldData => [
        data,
        ...(oldData || []),
      ]);
    },
    onError,
  });
};
