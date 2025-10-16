import {reduce} from 'lodash';
import {shortCardQueryParameters, categoryQueryParameters} from './common';
import {GRAPHQL_QUERY_CATEGORY_INDEX} from '../constants';

export const getCategoriesAggregationsByObjectsQuery = `query MyQuery {
    filterLandingObjects(filter: {statuses: "published"}) {
      aggregations {
        categories {
          doc_count
          facets {
            buckets {
              doc_count
              key
            }
          }
        }
      }
    }
  }
  `;

export function generateListObjectsShortQuery(categoriesIds: string[]) {
  return `query MyQuery {     
        ${reduce(
          categoriesIds,
          (acc, id, index) => {
            return (
              acc +
              `${GRAPHQL_QUERY_CATEGORY_INDEX}${index}: searchObjects(limit: 10, filter: {status: {eq: "published"}, categoryId: {eq: "${id}"}}) {
                ${shortCardQueryParameters}
            }`
            );
          },
          '',
        )}

    }`;
}

export const searchCategoriesQuery = `query MyQuery(
  $filter: SearchableCategoryFilterInput = {},
  $limit: Int,
  $nextToken: String
) {
  searchCategories(limit: $limit, filter: $filter, nextToken: $nextToken) {
    nextToken
    total
    ${categoryQueryParameters}
  }
}
`;

export const objectListQuery = `query MyQuery(
  $filter: FacetLandingObjectFilterInput,
  $sort: SearchableObjectSortInput,
  $limit: Int,
  $nextToken: String = null,
) {
  filterLandingObjects(filter: $filter, sort: $sort, limit: $limit, nextToken: $nextToken) {
    ${shortCardQueryParameters}
    nextToken
    total
  }
}`;

export const getRandomObjectThumbnailsQuery = `query MyQuery(
  $filter: FacetLandingObjectFilterInput,
  $limit: Int
) {
  filterLandingObjects(filter: $filter, randomized: true, limit: $limit) {
    items {
      category {
        name
        i18n {
          locale
          name
        }
      }
      id
      cover
      blurhash
      name
      i18n {
        locale
        name
      }
    }
  }
}`;

export const getPlaceOfTheWeekQuery = `query MyQuery {
  listPlaceOfTheWeeks {
    items {
      object {
        category {
          name
          i18n {
            locale
            name
          }
        }
        cover
        blurhash
        googleRating
        id
        name
        i18n {
          locale
          name
        }
        calculatedProperties {
          averageRating
          totalRatings
        }
      }
    }
  }
}`;
