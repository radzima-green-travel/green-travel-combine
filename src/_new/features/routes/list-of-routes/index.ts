import {RouteList} from './components/route-list';
import {Feature} from '../../../core/model/feature';

export const listOfRoutesFeature: Feature = {
  name: 'routes',
  bootstrap: async () => {
    return {};
  },
  exports: {
    RouteList,
  },
};

const createFeature = ({}: {
  name: string;
  Context?: React.Context<any>;
  exports: Record<string, any>;
}) => {
  return {
    Provider: {}, // TODO: Add Provider
  };
};
