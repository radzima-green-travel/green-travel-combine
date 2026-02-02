import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useInjection } from '@core/di';
import { RoutesService } from '../../services/routesService';
import { RouteModel } from '../../model';

export const useCreateRoute = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: RouteModel.Route) => void;
  onError?: () => void;
}) => {
  const routesService = useInjection(RoutesService.Tag);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { name: string; objectIds?: string[] }) =>
      routesService.create(input),
    onMutate: async input => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({
        queryKey: ['routes'],
      });

      // Snapshot the previous value
      const previousRoutes = queryClient.getQueryData<RouteModel.Route[]>([
        'routes',
      ]);

      // Optimistically update the cache
      const optimisticRoute: RouteModel.Route =
        RouteModel.createOptimisticRoute(input);

      queryClient.setQueryData<RouteModel.Route[]>(['routes'], (old = []) => [
        ...old,
        optimisticRoute,
      ]);

      // Return context with the previous value for rollback
      return { previousRoutes };
    },
    onError: (_error, _input, context) => {
      // Rollback to the previous value on error
      if (context?.previousRoutes) {
        queryClient.setQueryData(['routes'], context.previousRoutes);
      }
      onError?.();
    },
    onSuccess,
    onSettled: () => {
      // Always refetch after error or success to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['routes'] });
    },
  });
};
