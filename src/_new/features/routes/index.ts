import {Feature} from '../../core/model/feature';
import {listOfRoutesFeature} from './list-of-routes';

export const routesFeature: Feature = {
  name: 'routes',
  bootstrap: async () => {
    await listOfRoutesFeature.bootstrap();
    return {};
  },
  exports: {
    ...listOfRoutesFeature.exports,
  },
};
