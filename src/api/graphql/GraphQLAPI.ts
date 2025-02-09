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
  ObjectDetailsResponseDTO,
  BookmarksInitialObjectsDTO,
  BookmarksInitialObjectsParams,
  AppMapObjectsQueryParams,
  CategoriesListQueryParams,
  ObjectsListQueryParams,
  SettlementsQueryParams,
} from 'core/types/api';
import {GraphQLAPIEngine} from './GraphQLAPIEngine';
import {
  getCategoriesAggregationsByObjectsQuery,
  getAppMapObjectsQuery,
  searchCategoriesQuery,
  searchObjectsQuery,
  getSearchObjectsHistoryQuery,
  getSearchObjectsQuery,
  geObjectDetailsByIdQuery,
} from './queries';
import {generateListObjectsShortQuery} from './queries/homePage';

import {getObjectsTotalCountQuery} from './queries/common';
import {
  searchSpotsQuery,
  getFilterObjectsQuery,
  getFiltersCategoriesQuery,
} from './queries/filters';
import {getBookmarksInitialObjectsDataQuery} from './queries/bookmarksDetails';

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

  async getFilterObjects(
    params: FiltersParams = {},
  ): Promise<ObjectFiltersDataResponseDTO> {
    const {filter, ...otherParams} = params;
    const response = await this.executeQuery({
      query: getFilterObjectsQuery(otherParams.locale),
      params: {
        filter: {statuses: ['published'], ...filter},
        ...otherParams,
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

  async getSearchObjects(
    params: FiltersParams,
  ): Promise<SearchObjectsResponseDTO> {
    const {filter, ...otherParams} = params;

    const response = await this.executeQuery({
      query: getSearchObjectsQuery(otherParams.locale),
      params: {filter: {statuses: ['published'], ...filter}, ...otherParams},
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

  async getObjectDetailsById(
    objectId: string,
  ): Promise<ObjectDetailsResponseDTO> {
    const response = await this.executeQuery({
      query: geObjectDetailsByIdQuery(objectId),
    });
    return response.getObject;
  }

  async getBookmarksInitialObjectsData(
    params: BookmarksInitialObjectsParams,
  ): Promise<BookmarksInitialObjectsDTO> {
    const response = await this.executeQuery({
      query: getBookmarksInitialObjectsDataQuery,
      params,
    });

    return response.searchObjects.items;
  }
}

export const graphQLAPI = new GraphQLAPI();
