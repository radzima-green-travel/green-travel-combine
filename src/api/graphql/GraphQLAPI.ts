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
  ObjectThumbnailDTO,
  PlaceOfTheWeekObjectDTO,
} from 'core/types/api';
import {GraphQLAPIEngine} from './GraphQLAPIEngine';
import {
  getCategoriesAggregationsByObjectsQuery,
  getAppMapObjectsQuery,
  searchCategoriesQuery,
  getSearchObjectsHistoryQuery,
  getSearchObjectsQuery,
  geObjectDetailsByIdQuery,
} from './queries';
import {
  generateListObjectsShortQuery,
  getPlaceOfTheWeekQuery,
  getRandomObjectThumbnailsQuery,
  objectListQuery,
} from './queries/homePage';

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
  async getObjectsForCategories(params: {
    categoryIds: string[];
  }): Promise<ObjectsForCategoriesResponseDTO> {
    return this.executeQuery({
      query: generateListObjectsShortQuery(params.categoryIds),
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
        filter: {...this.defaultFilters, ...filter},
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
      query: objectListQuery,
      params: {...params, filter: {...this.defaultFilters, ...params.filter}},
    });

    return response.filterLandingObjects;
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
      params: {filter: {...this.defaultFilters, ...filter}, ...otherParams},
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

  async getRandomObjectThumbnails(
    limit: number,
  ): Promise<Array<ObjectThumbnailDTO>> {
    const response = await this.executeQuery({
      query: getRandomObjectThumbnailsQuery,
      params: {
        limit,
      },
    });

    return response.filterLandingObjects.items;
  }

  async getPlaceOfTheWeekObject(): Promise<PlaceOfTheWeekObjectDTO> {
    const response = await this.executeQuery({
      query: getPlaceOfTheWeekQuery,
    });

    return response.listPlaceOfTheWeeks.items[0]?.object;
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

    return response.filterLandingObjects.items;
  }

  private readonly defaultFilters = {statuses: ['published']};
}

export const graphQLAPI = new GraphQLAPI();
