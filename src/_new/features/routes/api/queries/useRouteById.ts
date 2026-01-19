import { useQuery } from '@tanstack/react-query';
import { useInjection } from '@core/di';
import { RoutesService } from '../../services/routesService';
import { Route } from '../../model';

export const useRouteById = (id: string) => {
  const routesService = useInjection(RoutesService.Tag);

  return useQuery({
    queryKey: ['routes'],
    queryFn: () => routesService.getList(),
    select: (data: Route.Route[]) => data.find(route => route.id === id),
    enabled: !!id,
  });
};
