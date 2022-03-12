// import {NativeModules} from 'react-native';

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

export const listMobileData = /* GraphQL */ `
  query ListMobileData($limit: Int, $nextToken: String) {
    listMobileData {
      categories {
        id
        name
        singularName
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
        i18n {
          locale
          name
          singularName
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

export const getListMobileData = () => {
  return /* GraphQL */ `
    query ListMobileData($limit: Int, $nextToken: String) {
      listMobileData {
        categories {
          id
          name
          singularName
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
          i18n {
            locale
            name
            singularName
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
