import {languageService} from 'services/LanguageService';

export const listMobileMetadata = /* GraphQL */ `
  query ListMobileData {
    listMobileData {
      metadata {
        id
        value
      }
    }
  }
`;

export const getListMobileData = () => {
  const isRussianLocale =
    languageService.getPreferredLanguage() === 'ru' || false;

  return /* GraphQL */ `
    query ListMobileData($limit: Int, $nextToken: String) {
      listMobileData {
        categories {
          id
          icon
          createdAt
          updatedAt
          owner
          createdBy
          updatedBy
          fields
          parent
          cover
          index
          ${
            isRussianLocale
              ? /* GraphQL */ `
              name
              singularName
            `
              : /* GraphQL */ `
            i18n {
              locale
              name
              singularName
            }
          `
          }
        }
        objects(limit: $limit, nextToken: $nextToken) {
          items {
            id
            name
            description
            images
            status
            location {
              lat
              lon
            }
            area {
              type
              coordinates
            }
            cover
            categoryId
            owner
            createdBy
            updatedBy
            createdAt
            updatedAt
            statusUpdatedAt
            point {
              type
              coordinates
            }
            author
            address
            length
            duration
            origins {
              name
              value
            }
            notes
            url
            routes {
              type
              coordinates
            }
            include
            belongsTo
            i18n {
              locale
              name
              description
              author
              address
              notes
            }
          }
          nextToken
          total
        }
        metadata {
          id
          value
          createdAt
          updatedAt
          owner
        }
      }
    }
  `;
};

export const listMobileData = getListMobileData();
