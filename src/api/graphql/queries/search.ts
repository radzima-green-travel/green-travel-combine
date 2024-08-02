export const searchObjectQueryParameters = `
    items {
          id
          name
          i18n {
            locale
            name
          }
          location {
            lat
            lon
          }
          category {
            name
            icon
            i18n {
              name
              locale
            }
          }
        }
`;

export const getSearchObjectsQuery = `query MyQuery($nextToken: String = null, $query: String = "") {
  filterLandingObjects(limit: 20, query: $query, filter: {statuses: "published"}, nextToken: $nextToken) {
    ${searchObjectQueryParameters}
    nextToken
    total
  }
}
`;

export const getSearchObjectsHistoryQuery = `query MyQuery($match: String = "") {
  searchObjects(limit: 15, filter: {id: {match: $match}}) {
    ${searchObjectQueryParameters}
  }
}
`;
