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

export const filterLandingObjects = ` query filterLandingObjects($filter: FacetLandingObjectFilterInput, $limit: Int, $query: String, $sort: SearchableObjectSortInput, $nextToken: String, $from: Int) {
				filterLandingObjects(
						filter: $filter
						limit: $limit
						query: $query
						sort: $sort
						nextToken: $nextToken
						from: $from
				) {
						aggregations {
								categories {
										facets {
												buckets {
														doc_count
														key
												}
										}
								}
								googleRatings {
										doc_count
										facets {
												buckets {
														doc_count
														from
														to
														key
												}
										}
								}
								municipalities {
										doc_count
										facets {
												buckets {
														doc_count
														key
												}
										}
								}
								regions {
										doc_count
										facets {
												buckets {
														doc_count
														key
												}
										}
								}
								statuses {
										doc_count
										facets {
												buckets {
														doc_count
														key
												}
										}
								}
								subRegions {
										doc_count
										facets {
												buckets {
														doc_count
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
