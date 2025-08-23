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

export const categoryQueryParameters = `
    items {
      name
      id
      parent
      index
      cover
      blurhash
      widgetType
      icon
      i18n {
        name
        locale
      }
   }`;

export const createFilterObjectsQuery = (
  queryParameters: string,
  locale?: string,
) => `query MyQuery($from: Int = 0, $limit: Int = 100, $sort: SearchableObjectSortInput, $filter: FacetLandingObjectFilterInput, $fieldsToSearch: LandingObjectFieldsToSearchInput, $km: Int, $location: LocationInput, $nextToken: String = null,  $query: String = ""${locale ? ', $locale: String = ""' : ''}) {
    filterLandingObjects(
      sort: $sort,
      limit: $limit,
      from: $from,
      filter: $filter,
      km: $km,
      location: $location,
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

export const getObjectsTotalCountQuery = `query MyQuery {
  searchObjects(filter: {status: {eq: "published"}}) {
    total
  }
}`;
