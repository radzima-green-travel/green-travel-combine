export const getBookmarksInitialObjectsDataQuery = `
  query MyQuery($filter: FacetLandingObjectFilterInput) {
    filterLandingObjects(filter: $filter) {
      items {
        id
        category {
          id
          name
          i18n {
            name
            locale
          }
        }
      }
    }
  }
`;
