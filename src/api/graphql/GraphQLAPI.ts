import {
  AppMapObjectsTotalCountResponseDTO,
  AppMapObjectsResponseDTO,
  CategoriesAggregationsByObjectsResponseDTO,
  CategoriesResponseDTO,
  ListShortObjectsResponseDTO,
  ObjectsForCategoriesResponseDTO,
  SearchObjectsResponseDTO,
  SearchObjectsHistoryResponseDTO,
  RegionsListResponseDTO,
  FiltersParams,
  ObjectFiltersDataResponseDTO,
  FiltersCategoriesResponseDTO,
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
  SettlementsQueryParams,
} from 'api/graphql/types';
import {getObjectsTotalCountQuery} from './queries/common';
import {
  searchSpotsQuery,
  filterObjects,
  getFiltersCategoriesQuery,
} from './queries/filters';

class GraphQLAPI extends GraphQLAPIEngine {
  async getCategoriesList(
    params: CategoriesListQueryParams,
  ): Promise<CategoriesResponseDTO> {
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

  async getSettlements(
    params?: SettlementsQueryParams,
  ): Promise<RegionsListResponseDTO> {
    const response = await this.executeQuery({
      query: searchSpotsQuery,
      params: {
        ...params,
        filter: {
          type: {
            eq: 'MUNICIPALITY',
          },
        },
      },
    });

    return response.searchSpots;
  }

  async getRegions(): Promise<RegionsListResponseDTO> {
    const response = await this.executeQuery({
      query: searchSpotsQuery,
      params: {
        limit: 100,
        filter: {
          type: {
            eq: 'REGION',
          },
        },
      },
    });

    return response.searchSpots.items;
  }

  async getFilterObjects({
    filter = {},
  }: FiltersParams = {}): Promise<ObjectFiltersDataResponseDTO> {
    const response = await this.executeQuery({
      query: filterObjects,
      params: {
        filter: {
          statuses: ['published'],
          ...filter,
          googleRating: filter.googleRating || null,
          categories: filter.categories?.length ? filter.categories : null,
          regions: filter.regions?.length ? filter.regions : null,
          municipalities: filter.municipalities?.length
            ? filter.municipalities
            : null,
        },
      },
    });

    return response.filterLandingObjects;
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

  async getFiltersCategories(): Promise<FiltersCategoriesResponseDTO> {
    const response = await this.executeQuery({
      query: getFiltersCategoriesQuery,
    });

    return response.searchCategories;
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
