import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useInjection } from '@core/di';
import { RoutesService } from '../../services/routesService';
import { Route } from '../../model';

export const useCreateRoute = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: Route.Route) => void;
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
      const previousRoutes = queryClient.getQueryData<Route.Route[]>([
        'routes',
      ]);

      // Optimistically update the cache
      const optimisticRoute: Route.Route = Route.createOptimisticRoute(input);

      queryClient.setQueryData<Route.Route[]>(['routes'], (old = []) => [
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
