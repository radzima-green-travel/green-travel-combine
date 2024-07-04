export const shortCardQueryParameters = `
    items {
      cover
      blurhash
      category {
        name
      }
      i18n {
        name
        locale
      }
      name
      categoryId
      id
    }`;

export function searchSpotsQuery() {
  return `
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
         type
         value
         parentId
         createdAt
         updatedAt
         i18n {
           locale
           value
           __typename
         }
         __typename
       }
       nextToken
       total
       aggregateItems {
         name
         result {
           ... on SearchableAggregateScalarResult {
             value
           }
           ... on SearchableAggregateBucketResult {
             buckets {
               key
               doc_count
               __typename
             }
           }
         }
         __typename
       }
       __typename
     }
   }
   `;
}
