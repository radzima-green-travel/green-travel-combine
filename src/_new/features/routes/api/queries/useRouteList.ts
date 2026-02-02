import { useQuery } from '@tanstack/react-query';
import { useInjection } from '@core/di';
import { RoutesService } from '../../services/routesService';

export const useRouteList = () => {
  const routesService = useInjection(RoutesService.Tag);

  return useQuery({
    queryKey: ['routes'],
    queryFn: () => routesService.getList(),
  });
};
