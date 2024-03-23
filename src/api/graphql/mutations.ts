/* tslint:disable */
// this is an auto generated file. This will be overwritten

export const putObjectByLink = /* GraphQL */ `
  mutation PutObjectByLink($url: String, $key: String) {
    putObjectByLink(url: $url, key: $key)
  }
`;
export const updateMobileObjectsS3 = /* GraphQL */ `
  mutation UpdateMobileObjectsS3 {
    updateMobileObjectsS3
  }
`;
export const putObjectMetadata = /* GraphQL */ `
  mutation PutObjectMetadata($key: String!, $metadata: ObjectS3MetadataInput) {
    putObjectMetadata(key: $key, metadata: $metadata) {
      zoom
      croppedAreaPixels {
        x
        y
        width
        height
      }
      crop {
        x
        y
      }
    }
  }
`;
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
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
export const createReference = /* GraphQL */ `
  mutation CreateReference(
    $input: CreateReferenceInput!
    $condition: ModelReferenceConditionInput
  ) {
    createReference(input: $input, condition: $condition) {
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
export const updateReference = /* GraphQL */ `
  mutation UpdateReference(
    $input: UpdateReferenceInput!
    $condition: ModelReferenceConditionInput
  ) {
    updateReference(input: $input, condition: $condition) {
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
export const deleteReference = /* GraphQL */ `
  mutation DeleteReference(
    $input: DeleteReferenceInput!
    $condition: ModelReferenceConditionInput
  ) {
    deleteReference(input: $input, condition: $condition) {
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
export const createPermission = /* GraphQL */ `
  mutation CreatePermission(
    $input: CreatePermissionInput!
    $condition: ModelPermissionConditionInput
  ) {
    createPermission(input: $input, condition: $condition) {
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
export const updatePermission = /* GraphQL */ `
  mutation UpdatePermission(
    $input: UpdatePermissionInput!
    $condition: ModelPermissionConditionInput
  ) {
    updatePermission(input: $input, condition: $condition) {
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
export const deletePermission = /* GraphQL */ `
  mutation DeletePermission(
    $input: DeletePermissionInput!
    $condition: ModelPermissionConditionInput
  ) {
    deletePermission(input: $input, condition: $condition) {
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
export const createObject = /* GraphQL */ `
  mutation CreateObject(
    $input: CreateObjectInput!
    $condition: ModelObjectConditionInput
  ) {
    createObject(input: $input, condition: $condition) {
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
export const updateObject = /* GraphQL */ `
  mutation UpdateObject(
    $input: UpdateObjectInput!
    $condition: ModelObjectConditionInput
  ) {
    updateObject(input: $input, condition: $condition) {
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
export const deleteObject = /* GraphQL */ `
  mutation DeleteObject(
    $input: DeleteObjectInput!
    $condition: ModelObjectConditionInput
  ) {
    deleteObject(input: $input, condition: $condition) {
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
export const createObjectsMetadata = /* GraphQL */ `
  mutation CreateObjectsMetadata(
    $input: CreateObjectsMetadataInput!
    $condition: ModelObjectsMetadataConditionInput
  ) {
    createObjectsMetadata(input: $input, condition: $condition) {
      id
      value
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateObjectsMetadata = /* GraphQL */ `
  mutation UpdateObjectsMetadata(
    $input: UpdateObjectsMetadataInput!
    $condition: ModelObjectsMetadataConditionInput
  ) {
    updateObjectsMetadata(input: $input, condition: $condition) {
      id
      value
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteObjectsMetadata = /* GraphQL */ `
  mutation DeleteObjectsMetadata(
    $input: DeleteObjectsMetadataInput!
    $condition: ModelObjectsMetadataConditionInput
  ) {
    deleteObjectsMetadata(input: $input, condition: $condition) {
      id
      value
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createLanguage = /* GraphQL */ `
  mutation CreateLanguage(
    $input: CreateLanguageInput!
    $condition: ModelLanguageConditionInput
  ) {
    createLanguage(input: $input, condition: $condition) {
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
export const updateLanguage = /* GraphQL */ `
  mutation UpdateLanguage(
    $input: UpdateLanguageInput!
    $condition: ModelLanguageConditionInput
  ) {
    updateLanguage(input: $input, condition: $condition) {
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
export const deleteLanguage = /* GraphQL */ `
  mutation DeleteLanguage(
    $input: DeleteLanguageInput!
    $condition: ModelLanguageConditionInput
  ) {
    deleteLanguage(input: $input, condition: $condition) {
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
export const createLanguagesSetting = /* GraphQL */ `
  mutation CreateLanguagesSetting(
    $input: CreateLanguagesSettingInput!
    $condition: ModelLanguagesSettingConditionInput
  ) {
    createLanguagesSetting(input: $input, condition: $condition) {
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
export const updateLanguagesSetting = /* GraphQL */ `
  mutation UpdateLanguagesSetting(
    $input: UpdateLanguagesSettingInput!
    $condition: ModelLanguagesSettingConditionInput
  ) {
    updateLanguagesSetting(input: $input, condition: $condition) {
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
export const deleteLanguagesSetting = /* GraphQL */ `
  mutation DeleteLanguagesSetting(
    $input: DeleteLanguagesSettingInput!
    $condition: ModelLanguagesSettingConditionInput
  ) {
    deleteLanguagesSetting(input: $input, condition: $condition) {
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
export const createObjectsLinking = /* GraphQL */ `
  mutation CreateObjectsLinking(
    $input: CreateObjectsLinkingInput!
    $condition: ModelObjectsLinkingConditionInput
  ) {
    createObjectsLinking(input: $input, condition: $condition) {
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
export const updateObjectsLinking = /* GraphQL */ `
  mutation UpdateObjectsLinking(
    $input: UpdateObjectsLinkingInput!
    $condition: ModelObjectsLinkingConditionInput
  ) {
    updateObjectsLinking(input: $input, condition: $condition) {
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
export const deleteObjectsLinking = /* GraphQL */ `
  mutation DeleteObjectsLinking(
    $input: DeleteObjectsLinkingInput!
    $condition: ModelObjectsLinkingConditionInput
  ) {
    deleteObjectsLinking(input: $input, condition: $condition) {
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
export const createPermissionLinking = /* GraphQL */ `
  mutation CreatePermissionLinking(
    $input: CreatePermissionLinkingInput!
    $condition: ModelPermissionLinkingConditionInput
  ) {
    createPermissionLinking(input: $input, condition: $condition) {
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
export const updatePermissionLinking = /* GraphQL */ `
  mutation UpdatePermissionLinking(
    $input: UpdatePermissionLinkingInput!
    $condition: ModelPermissionLinkingConditionInput
  ) {
    updatePermissionLinking(input: $input, condition: $condition) {
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
export const deletePermissionLinking = /* GraphQL */ `
  mutation DeletePermissionLinking(
    $input: DeletePermissionLinkingInput!
    $condition: ModelPermissionLinkingConditionInput
  ) {
    deletePermissionLinking(input: $input, condition: $condition) {
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
