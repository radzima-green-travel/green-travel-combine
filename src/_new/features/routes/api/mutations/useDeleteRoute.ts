import { useInjection } from '@core/di';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RoutesService } from '../../services/routesService';
import { RouteModel } from '../../model';

export const useDeleteRoute = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const routesService = useInjection(RoutesService.Tag);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => routesService.delete(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<RouteModel.Route[]>(['routes'], oldData => {
        if (!oldData) return oldData;
        return oldData.filter(route => route.id !== id);
      });
      onSuccess?.();
    },
    onError,
  });
};
