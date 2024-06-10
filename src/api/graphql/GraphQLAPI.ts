import {GraphQLAPIEngine} from './GraphQLAPIEngine';
import {listMobileMetadata, searchObjects} from './customQueries';

class GraphQLAPI extends GraphQLAPIEngine {
  async searchObjects({limit = 10, nextToken = null} = {}) {
    return await this._executeQuery(searchObjects, {limit, nextToken});
  }

  async listMobileData() {
    return await this._executeQuery(listMobileMetadata);
  }
}

export const graphQLAPI = new GraphQLAPI();
