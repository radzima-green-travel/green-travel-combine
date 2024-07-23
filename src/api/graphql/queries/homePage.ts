import {reduce} from 'lodash';
import {shortCardQueryParameters} from './common';
import {GRAPHQL_QUERY_CATEGORY_INDEX} from '../constants';

export const listCategoriesQuery = `query MyQuery($filter: ModelCategoryFilterInput = {}) {
    listCategories(limit: 200, filter: $filter) {
      items {
        name
        parent
        index
        id
        cover
        blurhash
        i18n {
          name
          locale
        }
      }
    }
  }
  `;

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
