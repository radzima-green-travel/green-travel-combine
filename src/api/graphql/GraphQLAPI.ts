import {
  CategoriesAggregationsByObjectsResponseDTO,
  ListCategoriesResponseDTO,
  ObjectsForCategoriesResponseDTO,
  RegionsList,
} from 'core/types/api';
import {GraphQLAPIEngine} from './GraphQLAPIEngine';
import {SearchSpotsParams} from './types';
import {
  listCategoriesQuery,
  getCategoriesAggregationsByObjectsQuery,
} from './queries';
import {generateListObjectsShortQuery} from './queries/homePage';
import {searchSpotsQuery} from './queries/common';

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

  async getRegions(): Promise<RegionsList> {
    const response = await this.executeQuery({
      query: searchSpotsQuery(),
      params: {
        limit: 100,
        filter: {
          type: {
            eq: 'REGION',
          },
        },
      } as SearchSpotsParams,
    });

    return response.searchSpots.items;
  }
}

export const graphQLAPI = new GraphQLAPI();
