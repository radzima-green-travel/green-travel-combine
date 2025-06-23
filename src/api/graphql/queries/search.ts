import {createFilterObjectsQuery} from './common';

export const searchObjectQueryParameters = `
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
          googleRating
          calculatedProperties {
            averageRating
            totalRatings
          }
`;

export const getSearchObjectsQuery = (locale?: string) =>
  createFilterObjectsQuery(
    `
     items {
      ${searchObjectQueryParameters}
        addresses {
          items {
            region {
              value
              i18n {
                locale
                value
              }
            }
            municipality {
              value
              i18n {
                locale
                value
              }
            }
            subRegion {
              value
              i18n {
                locale
                value
              }
            }
            street
          }
       }
     }
     highlight {
      name {
        value
        id
      }
      description_plain {
        value
        id
      }
      spot_subRegion {
        value
        id
      }
      spot_street {
        value
        id
      }
      spot_region {
        value
        id
      }
      spot_municipality {
        value
        id
      }
    }
    nextToken`,
    locale,
  );

export const getSearchObjectsHistoryQuery = `query MyQuery($match: String = "") {
  searchObjects(limit: 15, filter: {id: {match: $match}, status: {eq: "published"}}) {
    items {
    ${searchObjectQueryParameters}
    }
  }
}
`;
