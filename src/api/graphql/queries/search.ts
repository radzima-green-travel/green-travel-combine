export const searchObjectQueryParameters = `
    items {
          id
          name
          cover
          blurhash
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
     highlight {
      name {
        value
        id
      }
      description {
        value
        id
      }
    }
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
