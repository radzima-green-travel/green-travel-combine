/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
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
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
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
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
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
  }
`;
export const onCreateReference = /* GraphQL */ `
  subscription OnCreateReference {
    onCreateReference {
      id
      name
      type
      createdAt
      updatedAt
      owner
      createdBy
      updatedBy
    }
  }
`;
export const onUpdateReference = /* GraphQL */ `
  subscription OnUpdateReference {
    onUpdateReference {
      id
      name
      type
      createdAt
      updatedAt
      owner
      createdBy
      updatedBy
    }
  }
`;
export const onDeleteReference = /* GraphQL */ `
  subscription OnDeleteReference {
    onDeleteReference {
      id
      name
      type
      createdAt
      updatedAt
      owner
      createdBy
      updatedBy
    }
  }
`;
export const onCreatePermission = /* GraphQL */ `
  subscription OnCreatePermission {
    onCreatePermission {
      id
      name
      key
      createdAt
      updatedAt
      owner
      createdBy
      updatedBy
      i18n {
        locale
        name
      }
    }
  }
`;
export const onUpdatePermission = /* GraphQL */ `
  subscription OnUpdatePermission {
    onUpdatePermission {
      id
      name
      key
      createdAt
      updatedAt
      owner
      createdBy
      updatedBy
      i18n {
        locale
        name
      }
    }
  }
`;
export const onDeletePermission = /* GraphQL */ `
  subscription OnDeletePermission {
    onDeletePermission {
      id
      name
      key
      createdAt
      updatedAt
      owner
      createdBy
      updatedBy
      i18n {
        locale
        name
      }
    }
  }
`;
export const onCreateObject = /* GraphQL */ `
  subscription OnCreateObject {
    onCreateObject {
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
      i18n {
        locale
        name
        description
        author
        address
        notes
      }
      category {
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
      include {
        items {
          id
          belongsToId
          includeId
          createdAt
          updatedAt
          belongsTo {
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
            i18n {
              locale
              name
              description
              author
              address
              notes
            }
            category {
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
            include {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            belongsTo {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            permissions {
              items {
                id
                objectId
                permissionId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
          }
          include {
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
            i18n {
              locale
              name
              description
              author
              address
              notes
            }
            category {
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
            include {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            belongsTo {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            permissions {
              items {
                id
                objectId
                permissionId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
          }
          owner
        }
        nextToken
      }
      belongsTo {
        items {
          id
          belongsToId
          includeId
          createdAt
          updatedAt
          belongsTo {
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
            i18n {
              locale
              name
              description
              author
              address
              notes
            }
            category {
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
            include {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            belongsTo {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            permissions {
              items {
                id
                objectId
                permissionId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
          }
          include {
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
            i18n {
              locale
              name
              description
              author
              address
              notes
            }
            category {
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
            include {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            belongsTo {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            permissions {
              items {
                id
                objectId
                permissionId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
          }
          owner
        }
        nextToken
      }
      permissions {
        items {
          id
          objectId
          permissionId
          createdAt
          updatedAt
          permission {
            id
            name
            key
            createdAt
            updatedAt
            owner
            createdBy
            updatedBy
            i18n {
              locale
              name
            }
          }
          object {
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
            i18n {
              locale
              name
              description
              author
              address
              notes
            }
            category {
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
            include {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            belongsTo {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            permissions {
              items {
                id
                objectId
                permissionId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
          }
          owner
        }
        nextToken
      }
    }
  }
`;
export const onUpdateObject = /* GraphQL */ `
  subscription OnUpdateObject {
    onUpdateObject {
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
      i18n {
        locale
        name
        description
        author
        address
        notes
      }
      category {
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
      include {
        items {
          id
          belongsToId
          includeId
          createdAt
          updatedAt
          belongsTo {
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
            i18n {
              locale
              name
              description
              author
              address
              notes
            }
            category {
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
            include {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            belongsTo {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            permissions {
              items {
                id
                objectId
                permissionId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
          }
          include {
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
            i18n {
              locale
              name
              description
              author
              address
              notes
            }
            category {
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
            include {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            belongsTo {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            permissions {
              items {
                id
                objectId
                permissionId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
          }
          owner
        }
        nextToken
      }
      belongsTo {
        items {
          id
          belongsToId
          includeId
          createdAt
          updatedAt
          belongsTo {
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
            i18n {
              locale
              name
              description
              author
              address
              notes
            }
            category {
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
            include {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            belongsTo {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            permissions {
              items {
                id
                objectId
                permissionId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
          }
          include {
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
            i18n {
              locale
              name
              description
              author
              address
              notes
            }
            category {
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
            include {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            belongsTo {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            permissions {
              items {
                id
                objectId
                permissionId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
          }
          owner
        }
        nextToken
      }
      permissions {
        items {
          id
          objectId
          permissionId
          createdAt
          updatedAt
          permission {
            id
            name
            key
            createdAt
            updatedAt
            owner
            createdBy
            updatedBy
            i18n {
              locale
              name
            }
          }
          object {
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
            i18n {
              locale
              name
              description
              author
              address
              notes
            }
            category {
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
            include {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            belongsTo {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            permissions {
              items {
                id
                objectId
                permissionId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
          }
          owner
        }
        nextToken
      }
    }
  }
`;
export const onDeleteObject = /* GraphQL */ `
  subscription OnDeleteObject {
    onDeleteObject {
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
      i18n {
        locale
        name
        description
        author
        address
        notes
      }
      category {
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
      include {
        items {
          id
          belongsToId
          includeId
          createdAt
          updatedAt
          belongsTo {
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
            i18n {
              locale
              name
              description
              author
              address
              notes
            }
            category {
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
            include {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            belongsTo {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            permissions {
              items {
                id
                objectId
                permissionId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
          }
          include {
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
            i18n {
              locale
              name
              description
              author
              address
              notes
            }
            category {
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
            include {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            belongsTo {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            permissions {
              items {
                id
                objectId
                permissionId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
          }
          owner
        }
        nextToken
      }
      belongsTo {
        items {
          id
          belongsToId
          includeId
          createdAt
          updatedAt
          belongsTo {
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
            i18n {
              locale
              name
              description
              author
              address
              notes
            }
            category {
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
            include {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            belongsTo {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            permissions {
              items {
                id
                objectId
                permissionId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
          }
          include {
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
            i18n {
              locale
              name
              description
              author
              address
              notes
            }
            category {
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
            include {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            belongsTo {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            permissions {
              items {
                id
                objectId
                permissionId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
          }
          owner
        }
        nextToken
      }
      permissions {
        items {
          id
          objectId
          permissionId
          createdAt
          updatedAt
          permission {
            id
            name
            key
            createdAt
            updatedAt
            owner
            createdBy
            updatedBy
            i18n {
              locale
              name
            }
          }
          object {
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
            i18n {
              locale
              name
              description
              author
              address
              notes
            }
            category {
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
            include {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            belongsTo {
              items {
                id
                belongsToId
                includeId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            permissions {
              items {
                id
                objectId
                permissionId
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
          }
          owner
        }
        nextToken
      }
    }
  }
`;
export const onCreateObjectsMetadata = /* GraphQL */ `
  subscription OnCreateObjectsMetadata {
    onCreateObjectsMetadata {
      id
      value
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateObjectsMetadata = /* GraphQL */ `
  subscription OnUpdateObjectsMetadata {
    onUpdateObjectsMetadata {
      id
      value
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteObjectsMetadata = /* GraphQL */ `
  subscription OnDeleteObjectsMetadata {
    onDeleteObjectsMetadata {
      id
      value
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateLanguage = /* GraphQL */ `
  subscription OnCreateLanguage {
    onCreateLanguage {
      id
      name
      code
      createdAt
      updatedAt
      createdBy
      updatedBy
      direction
      owner
    }
  }
`;
export const onUpdateLanguage = /* GraphQL */ `
  subscription OnUpdateLanguage {
    onUpdateLanguage {
      id
      name
      code
      createdAt
      updatedAt
      createdBy
      updatedBy
      direction
      owner
    }
  }
`;
export const onDeleteLanguage = /* GraphQL */ `
  subscription OnDeleteLanguage {
    onDeleteLanguage {
      id
      name
      code
      createdAt
      updatedAt
      createdBy
      updatedBy
      direction
      owner
    }
  }
`;
export const onCreateLanguagesSetting = /* GraphQL */ `
  subscription OnCreateLanguagesSetting {
    onCreateLanguagesSetting {
      id
      name
      value
      createdAt
      updatedAt
      createdBy
      updatedBy
      owner
    }
  }
`;
export const onUpdateLanguagesSetting = /* GraphQL */ `
  subscription OnUpdateLanguagesSetting {
    onUpdateLanguagesSetting {
      id
      name
      value
      createdAt
      updatedAt
      createdBy
      updatedBy
      owner
    }
  }
`;
export const onDeleteLanguagesSetting = /* GraphQL */ `
  subscription OnDeleteLanguagesSetting {
    onDeleteLanguagesSetting {
      id
      name
      value
      createdAt
      updatedAt
      createdBy
      updatedBy
      owner
    }
  }
`;
export const onCreateObjectsLinking = /* GraphQL */ `
  subscription OnCreateObjectsLinking {
    onCreateObjectsLinking {
      id
      belongsToId
      includeId
      createdAt
      updatedAt
      belongsTo {
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
        i18n {
          locale
          name
          description
          author
          address
          notes
        }
        category {
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
        include {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        belongsTo {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        permissions {
          items {
            id
            objectId
            permissionId
            createdAt
            updatedAt
            permission {
              id
              name
              key
              createdAt
              updatedAt
              owner
              createdBy
              updatedBy
              i18n {
                locale
                name
              }
            }
            object {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
      }
      include {
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
        i18n {
          locale
          name
          description
          author
          address
          notes
        }
        category {
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
        include {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        belongsTo {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        permissions {
          items {
            id
            objectId
            permissionId
            createdAt
            updatedAt
            permission {
              id
              name
              key
              createdAt
              updatedAt
              owner
              createdBy
              updatedBy
              i18n {
                locale
                name
              }
            }
            object {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
      }
      owner
    }
  }
`;
export const onUpdateObjectsLinking = /* GraphQL */ `
  subscription OnUpdateObjectsLinking {
    onUpdateObjectsLinking {
      id
      belongsToId
      includeId
      createdAt
      updatedAt
      belongsTo {
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
        i18n {
          locale
          name
          description
          author
          address
          notes
        }
        category {
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
        include {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        belongsTo {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        permissions {
          items {
            id
            objectId
            permissionId
            createdAt
            updatedAt
            permission {
              id
              name
              key
              createdAt
              updatedAt
              owner
              createdBy
              updatedBy
              i18n {
                locale
                name
              }
            }
            object {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
      }
      include {
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
        i18n {
          locale
          name
          description
          author
          address
          notes
        }
        category {
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
        include {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        belongsTo {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        permissions {
          items {
            id
            objectId
            permissionId
            createdAt
            updatedAt
            permission {
              id
              name
              key
              createdAt
              updatedAt
              owner
              createdBy
              updatedBy
              i18n {
                locale
                name
              }
            }
            object {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
      }
      owner
    }
  }
`;
export const onDeleteObjectsLinking = /* GraphQL */ `
  subscription OnDeleteObjectsLinking {
    onDeleteObjectsLinking {
      id
      belongsToId
      includeId
      createdAt
      updatedAt
      belongsTo {
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
        i18n {
          locale
          name
          description
          author
          address
          notes
        }
        category {
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
        include {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        belongsTo {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        permissions {
          items {
            id
            objectId
            permissionId
            createdAt
            updatedAt
            permission {
              id
              name
              key
              createdAt
              updatedAt
              owner
              createdBy
              updatedBy
              i18n {
                locale
                name
              }
            }
            object {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
      }
      include {
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
        i18n {
          locale
          name
          description
          author
          address
          notes
        }
        category {
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
        include {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        belongsTo {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        permissions {
          items {
            id
            objectId
            permissionId
            createdAt
            updatedAt
            permission {
              id
              name
              key
              createdAt
              updatedAt
              owner
              createdBy
              updatedBy
              i18n {
                locale
                name
              }
            }
            object {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
      }
      owner
    }
  }
`;
export const onCreatePermissionLinking = /* GraphQL */ `
  subscription OnCreatePermissionLinking {
    onCreatePermissionLinking {
      id
      objectId
      permissionId
      createdAt
      updatedAt
      permission {
        id
        name
        key
        createdAt
        updatedAt
        owner
        createdBy
        updatedBy
        i18n {
          locale
          name
        }
      }
      object {
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
        i18n {
          locale
          name
          description
          author
          address
          notes
        }
        category {
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
        include {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        belongsTo {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        permissions {
          items {
            id
            objectId
            permissionId
            createdAt
            updatedAt
            permission {
              id
              name
              key
              createdAt
              updatedAt
              owner
              createdBy
              updatedBy
              i18n {
                locale
                name
              }
            }
            object {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
      }
      owner
    }
  }
`;
export const onUpdatePermissionLinking = /* GraphQL */ `
  subscription OnUpdatePermissionLinking {
    onUpdatePermissionLinking {
      id
      objectId
      permissionId
      createdAt
      updatedAt
      permission {
        id
        name
        key
        createdAt
        updatedAt
        owner
        createdBy
        updatedBy
        i18n {
          locale
          name
        }
      }
      object {
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
        i18n {
          locale
          name
          description
          author
          address
          notes
        }
        category {
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
        include {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        belongsTo {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        permissions {
          items {
            id
            objectId
            permissionId
            createdAt
            updatedAt
            permission {
              id
              name
              key
              createdAt
              updatedAt
              owner
              createdBy
              updatedBy
              i18n {
                locale
                name
              }
            }
            object {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
      }
      owner
    }
  }
`;
export const onDeletePermissionLinking = /* GraphQL */ `
  subscription OnDeletePermissionLinking {
    onDeletePermissionLinking {
      id
      objectId
      permissionId
      createdAt
      updatedAt
      permission {
        id
        name
        key
        createdAt
        updatedAt
        owner
        createdBy
        updatedBy
        i18n {
          locale
          name
        }
      }
      object {
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
        i18n {
          locale
          name
          description
          author
          address
          notes
        }
        category {
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
        include {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        belongsTo {
          items {
            id
            belongsToId
            includeId
            createdAt
            updatedAt
            belongsTo {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            include {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
        permissions {
          items {
            id
            objectId
            permissionId
            createdAt
            updatedAt
            permission {
              id
              name
              key
              createdAt
              updatedAt
              owner
              createdBy
              updatedBy
              i18n {
                locale
                name
              }
            }
            object {
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
              i18n {
                locale
                name
                description
                author
                address
                notes
              }
              category {
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
              }
              include {
                nextToken
              }
              belongsTo {
                nextToken
              }
              permissions {
                nextToken
              }
            }
            owner
          }
          nextToken
        }
      }
      owner
    }
  }
`;
