import {
  AppMapObjectsTotalCountResponseDTO,
  AppMapObjectsResponseDTO,
  CategoriesAggregationsByObjectsResponseDTO,
  ListCategoriesResponseDTO,
  ListShortObjectsResponseDTO,
  ObjectsForCategoriesResponseDTO,
  SearchObjectsResponseDTO,
  SearchObjectsHistoryResponseDTO,
} from 'core/types/api';
import {GraphQLAPIEngine} from './GraphQLAPIEngine';
import {
  getCategoriesAggregationsByObjectsQuery,
  getAppMapObjectsQuery,
  searchCategoriesQuery,
  searchObjectsQuery,
  getSearchObjectsHistoryQuery,
  getSearchObjectsQuery,
} from './queries';
import {generateListObjectsShortQuery} from './queries/homePage';
import {
  AppMapObjectsQueryParams,
  CategoriesListQueryParams,
  ObjectsListQueryParams,
} from 'api/graphql/types';
import {getObjectsTotalCountQuery} from './queries/common';

class GraphQLAPI extends GraphQLAPIEngine {
  async getCategoriesList(
    params: CategoriesListQueryParams,
  ): Promise<ListCategoriesResponseDTO> {
    const response = await this.executeQuery({
      query: searchCategoriesQuery,
      params,
    });

    return response.searchCategories;
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

  async getObjectsTotalCount(): Promise<AppMapObjectsTotalCountResponseDTO> {
    const response = await this.executeQuery({
      query: getObjectsTotalCountQuery,
    });

    return response.searchObjects;
  }

  async getAppMapObjects(
    params: AppMapObjectsQueryParams,
  ): Promise<AppMapObjectsResponseDTO> {
    const response = await this.executeQuery({
      query: getAppMapObjectsQuery,
      params,
    });

    return response.searchObjects;
  }

  async getObjectsList(
    params: ObjectsListQueryParams,
  ): Promise<ListShortObjectsResponseDTO> {
    const response = await this.executeQuery({
      query: searchObjectsQuery,
      params,
    });

    return response.searchObjects;
  }

  async getSearchObjects({
    query,
    nextToken,
  }: {
    query: string;
    nextToken: string | null;
  }): Promise<SearchObjectsResponseDTO> {
    const response = await this.executeQuery({
      query: getSearchObjectsQuery,
      params: {
        query,
        nextToken,
      },
    });

    return response.filterLandingObjects;
  }

  async getSearchObjectsHistory({
    objectsIds,
  }: {
    objectsIds: string[];
  }): Promise<SearchObjectsHistoryResponseDTO> {
    const response = await this.executeQuery({
      query: getSearchObjectsHistoryQuery,
      params: {
        match: objectsIds.join(' '),
      },
    });

    return response.searchObjects;
  }
}

export const graphQLAPI = new GraphQLAPI();
