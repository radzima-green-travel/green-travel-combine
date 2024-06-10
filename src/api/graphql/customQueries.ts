import {SupportedLocales} from 'core/types';

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

export function getListMobileData(locale: SupportedLocales) {
  return `
  query ListMobileData(
    $limit: Int
    $nextToken: String
    $filter: MobileDataFilter
  ) {
    listMobileData {
      categories(filter: $filter) {
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
          locale === 'ru'
            ? `
          name
          singularName
          `
            : `
          i18n {
            locale
            name
            singularName
          }
          `
        }
     
      }
      objects(limit: $limit, nextToken: $nextToken, filter: $filter) {
        items {
          ${
            locale === 'ru'
              ? `
              name
              description
              author
              address
              notes
            `
              : `
            i18n {
              locale
              name
              description
              author
              address
              notes
            }
            `
          }
          id
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
          length
          duration
          origins {
            name
            value
          }
          url
          routes {
            type
            coordinates
          }
          include
          belongsTo          
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
}

export const searchObjects = `
query SearchObjects($limit: Int, $nextToken: String) {
		searchObjects(limit: $limit, nextToken: $nextToken) {
				items {
						id
						name
						address
				}
				nextToken
		}
}
`;
