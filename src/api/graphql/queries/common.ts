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
) => `query MyQuery($filter: FacetLandingObjectFilterInput, $sort: SearchableObjectSortInput, $fieldsToSearch: LandingObjectFieldsToSearchInput, $km: Int, $location: LocationInput, $nextToken: String = null,  $query: String = ""${locale ? ', $locale: String = ""' : ''}) {
    filterLandingObjects(
      filter: $filter
      sort: $sort
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
