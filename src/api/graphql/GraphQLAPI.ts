import {GraphQLResult} from '@aws-amplify/api-graphql';
import {graphqlOperation, API} from 'aws-amplify';
import {listMobileMetadata} from './customQueries';

class GraphQLAPI {
  async _executeQuery(query: string, variables?: any) {
    try {
      const response = (await API.graphql(
        graphqlOperation(query, variables),
      )) as GraphQLResult<any>;
      return response.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  async searchObjects({limit = 10, nextToken = null} = {}) {
    const query = `
      query SearchObjects($limit: Int, $nextToken: String) {
        searchObjects(limit: $limit, nextToken: $nextToken) {
          items {
            id
            name
            address
          }
          nextToken
        }
      }
    `;

    return await this._executeQuery(query, {limit, nextToken});
  }

  async listMobileData() {
    return await this._executeQuery(listMobileMetadata);
  }
}

export const graphqlAPI = new GraphQLAPI();
