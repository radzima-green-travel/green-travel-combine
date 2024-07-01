import {
  CategoriesAggregationsByObjectsResponseDTO,
  ListCategoriesResponseDTO,
  ObjectsForCategoriesResponseDTO,
} from 'core/types/api';
import {GraphQLAPIEngine} from './GraphQLAPIEngine';
import {
  listCategoriesQuery,
  getCategoriesAggregationsByObjectsQuery,
} from './queries';
import {generateListObjectsShortQuery} from './queries/homePage';

class GraphQLAPI extends GraphQLAPIEngine {
  async getListCategories(): Promise<ListCategoriesResponseDTO> {
    const response = await this.executeQuery({
      query: listCategoriesQuery,
    });
    return response.listCategories;
  }

  async getObjectsForCategories(
    categoryIds: string[],
  ): Promise<ObjectsForCategoriesResponseDTO> {
    return this.executeQuery({
      query: generateListObjectsShortQuery(categoryIds),
    });
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
