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

export const searchSpotsQuery = `
   query SearchSpots($filter: SearchableSpotFilterInput, $limit: Int) {
     searchSpots(
       filter: $filter
       limit: $limit
     ) {
       items {
         id
         type
         value
         i18n {
           locale
           value
         }
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
             }
           }
         }
       }
     }
   }
   `;

export const filterObjects = `query filterLandingObjects($filter: FacetLandingObjectFilterInput) {
  filterLandingObjects(
    filter: $filter
  ) {
    aggregations {
      googleRatings {
        doc_count
        facets {
          buckets {
            from
            key
          }
        }
      }
    }
    items {
      id
      cover
      images
      categoryId
      calculatedProperties {
        averageRating
        totalRatings
      }
      googleRating
      googleRatingsTotal
      addresses {
        items {
          municipalityId
          id
          regionId
          subRegionId
        }
      }
      category {
        name
        i18n {
          locale
          name
          singularName
        }
      }
      name
      i18n {
        address
        author
        description
        locale
        name
        notes
        workingHours
      }
    }
    nextToken
    total
  }
}
`;
