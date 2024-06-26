import {
  CategoriesAggregationsByObjectsResponseDTO,
  ListCategoriesResponseDTO,
  ListShortObjectsResponseDTO,
} from 'core/types/api';
import {GraphQLAPIEngine} from './GraphQLAPIEngine';
import {
  listCategoriesQuery,
  listObjectsShortQuery,
  getCategoriesAggregationsByObjectsQuery,
} from './queries';

class GraphQLAPI extends GraphQLAPIEngine {
  async getListCategories(): Promise<ListCategoriesResponseDTO> {
    const response = await this.executeQuery({
      query: listCategoriesQuery,
    });
    return response.listCategories;
  }

  async getShortObjectList({
    categoryId,
  }: {
    categoryId: string;
  }): Promise<ListShortObjectsResponseDTO> {
    const response = await this.executeQuery({
      query: listObjectsShortQuery,
      params: {
        limit: 10,
        filter: {
          status: {eq: 'published'},
          categoryId: {
            eq: categoryId,
          },
        },
      },
    });
    return response.searchObjects;
  }

  async getCategoriesAggregationsByObjects(): Promise<CategoriesAggregationsByObjectsResponseDTO> {
    const response = await this.executeQuery({
      query: getCategoriesAggregationsByObjectsQuery,
    });
    return response.filterLandingObjects?.aggregations?.categories?.facets
      ?.buckets;
  }
}

export const graphQLAPI = new GraphQLAPI();
