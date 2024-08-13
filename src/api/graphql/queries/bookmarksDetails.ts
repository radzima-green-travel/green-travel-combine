export const getBookmarksInitialObjectsDataQuery = `query MyQuery ($filter: SearchableObjectFilterInput = {}) {
  searchObjects(filter: $filter) {
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
}`;
