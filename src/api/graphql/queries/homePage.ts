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

export function generateListObjectsShortQuery(categoriesIds: Array<string>) {
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

export const searchObjectsQuery = `query MyQuery(
  $filter: SearchableObjectFilterInput = {},
  $sort: [SearchableObjectSortInput],
  $limit: Int,
  $nextToken: String
) {
  searchObjects(limit: $limit, filter: $filter, sort: $sort, nextToken: $nextToken) {
    nextToken
    total
    ${shortCardQueryParameters}
  }
}
`;
