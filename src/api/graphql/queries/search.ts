import {createFilterObjectsQuery} from './common';

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

export const getSearchObjectsQuery = (locale?: string) =>
  createFilterObjectsQuery(
    `
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
    nextToken`,
    locale,
  );

export const getSearchObjectsHistoryQuery = `query MyQuery($match: String = "") {
  searchObjects(limit: 15, filter: {id: {match: $match}}) {
    ${searchObjectQueryParameters}
  }
}
`;
