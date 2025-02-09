import {createFilterObjectsQuery} from './common';

export const searchSpotsQuery = `
   query SearchSpots($filter: SearchableSpotFilterInput, $sort: [SearchableSpotSortInput], $limit: Int, $nextToken: String, $from: Int, $aggregates: [SearchableSpotAggregationInput]) {
     searchSpots(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
     ) {
       items {
         id
         value
         i18n {
           locale
           value
         }
       }
       nextToken
       total
     }
   }
   `;
export const getFilterObjectsQuery = (locale?: string) =>
  createFilterObjectsQuery(
    ` 
  aggregations {
      googleRatings {
        doc_count
        facets {
          buckets {
            doc_count
            from
            key
          }
        }
      }
      categories {
        facets {
          buckets {
            doc_count
            key
          }
        }
     }
     regions {
       facets {
         buckets {
           doc_count
           key
         }
       }
     }
     municipalities {
       facets {
         buckets {
           doc_count
           key
         }
       }
     }
    }`,
    locale,
  );

export const getFiltersCategoriesQuery = `query MyQuery(
  $filter: SearchableCategoryFilterInput = {},
) {
  searchCategories(limit: 200, filter: $filter) {
    items {
      name
      id
      index
      i18n {
        name
        locale
      }
   }
  }
}
`;
