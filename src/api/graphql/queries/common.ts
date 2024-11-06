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

export const getObjectsTotalCountQuery = `query MyQuery {
  searchObjects(filter: {status: {eq: "published"}}) {
    total
  }
}`;

export const categoryQueryParameters = `
    items {
      name
      id
      parent
      index
      cover
      blurhash
      i18n {
        name
        locale
      }
   }`;

export const createFilterObjectsQuery = (
  queryParameters: string,
  locale?: string,
) => `query MyQuery($filter: FacetLandingObjectFilterInput, $fieldsToSearch: LandingObjectFieldsToSearchInput, $km: Int, $location: LocationInput, $nextToken: String = null,  $query: String = ""${locale ? ', $locale: String = ""' : ''}) {
    filterLandingObjects(
      filter: $filter
      km: $km
      location: $location,
      limit: 20,
      query: $query,
      nextToken: $nextToken,
      fieldsToSearch: $fieldsToSearch,
      ${locale ? ', locale: $locale' : ''}
    ) {
      ${queryParameters}
      total
    }
  }
  `;
