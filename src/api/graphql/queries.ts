/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listMobileObjects = /* GraphQL */ `
  query ListMobileObjects {
    listMobileObjects {
      id
      name
      icon
      createdAt
      updatedAt
      singularName
      owner
      createdBy
      updatedBy
      fields
      parent
      children {
        id
        name
        icon
        createdAt
        updatedAt
        singularName
        owner
        createdBy
        updatedBy
        fields
        parent
        children {
          id
          name
          icon
          createdAt
          updatedAt
          singularName
          owner
          createdBy
          updatedBy
          fields
          parent
          children {
            id
            name
            icon
            createdAt
            updatedAt
            singularName
            owner
            createdBy
            updatedBy
            fields
            parent
            children {
              id
              name
              icon
              createdAt
              updatedAt
              singularName
              owner
              createdBy
              updatedBy
              fields
              parent
              children {
                id
                name
                icon
                createdAt
                updatedAt
                singularName
                owner
                createdBy
                updatedBy
                fields
                parent
                cover
              }
              objects {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdAt
                updatedAt
                createdBy
                updatedBy
                author
                address
                length
                duration
                notes
                url
              }
              cover
            }
            objects {
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
              routes {
                type
                coordinates
              }
              cover
              categoryId
              owner
              createdAt
              updatedAt
              createdBy
              updatedBy
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
              include {
                id
                name
                icon
                singularName
                createdAt
                updatedAt
                fields
                parent
                objects
                owner
              }
              belongsTo {
                id
                name
                icon
                singularName
                createdAt
                updatedAt
                fields
                parent
                objects
                owner
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
              permissions {
                nextToken
              }
            }
            cover
          }
          objects {
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
            routes {
              type
              coordinates
            }
            cover
            categoryId
            owner
            createdAt
            updatedAt
            createdBy
            updatedBy
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
            include {
              id
              name
              icon
              singularName
              createdAt
              updatedAt
              fields
              parent
              children {
                id
                name
                icon
                createdAt
                updatedAt
                singularName
                owner
                createdBy
                updatedBy
                fields
                parent
                cover
              }
              objects
              owner
            }
            belongsTo {
              id
              name
              icon
              singularName
              createdAt
              updatedAt
              fields
              parent
              children {
                id
                name
                icon
                createdAt
                updatedAt
                singularName
                owner
                createdBy
                updatedBy
                fields
                parent
                cover
              }
              objects
              owner
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
          cover
        }
        objects {
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
          routes {
            type
            coordinates
          }
          cover
          categoryId
          owner
          createdAt
          updatedAt
          createdBy
          updatedBy
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
          include {
            id
            name
            icon
            singularName
            createdAt
            updatedAt
            fields
            parent
            children {
              id
              name
              icon
              createdAt
              updatedAt
              singularName
              owner
              createdBy
              updatedBy
              fields
              parent
              children {
                id
                name
                icon
                createdAt
                updatedAt
                singularName
                owner
                createdBy
                updatedBy
                fields
                parent
                cover
              }
              objects {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdAt
                updatedAt
                createdBy
                updatedBy
                author
                address
                length
                duration
                notes
                url
              }
              cover
            }
            objects
            owner
          }
          belongsTo {
            id
            name
            icon
            singularName
            createdAt
            updatedAt
            fields
            parent
            children {
              id
              name
              icon
              createdAt
              updatedAt
              singularName
              owner
              createdBy
              updatedBy
              fields
              parent
              children {
                id
                name
                icon
                createdAt
                updatedAt
                singularName
                owner
                createdBy
                updatedBy
                fields
                parent
                cover
              }
              objects {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdAt
                updatedAt
                createdBy
                updatedBy
                author
                address
                length
                duration
                notes
                url
              }
              cover
            }
            objects
            owner
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
              }
              object {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
              }
              owner
            }
            nextToken
          }
        }
        cover
      }
      objects {
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
        routes {
          type
          coordinates
        }
        cover
        categoryId
        owner
        createdAt
        updatedAt
        createdBy
        updatedBy
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
        include {
          id
          name
          icon
          singularName
          createdAt
          updatedAt
          fields
          parent
          children {
            id
            name
            icon
            createdAt
            updatedAt
            singularName
            owner
            createdBy
            updatedBy
            fields
            parent
            children {
              id
              name
              icon
              createdAt
              updatedAt
              singularName
              owner
              createdBy
              updatedBy
              fields
              parent
              children {
                id
                name
                icon
                createdAt
                updatedAt
                singularName
                owner
                createdBy
                updatedBy
                fields
                parent
                cover
              }
              objects {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdAt
                updatedAt
                createdBy
                updatedBy
                author
                address
                length
                duration
                notes
                url
              }
              cover
            }
            objects {
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
              routes {
                type
                coordinates
              }
              cover
              categoryId
              owner
              createdAt
              updatedAt
              createdBy
              updatedBy
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
              include {
                id
                name
                icon
                singularName
                createdAt
                updatedAt
                fields
                parent
                objects
                owner
              }
              belongsTo {
                id
                name
                icon
                singularName
                createdAt
                updatedAt
                fields
                parent
                objects
                owner
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
              permissions {
                nextToken
              }
            }
            cover
          }
          objects
          owner
        }
        belongsTo {
          id
          name
          icon
          singularName
          createdAt
          updatedAt
          fields
          parent
          children {
            id
            name
            icon
            createdAt
            updatedAt
            singularName
            owner
            createdBy
            updatedBy
            fields
            parent
            children {
              id
              name
              icon
              createdAt
              updatedAt
              singularName
              owner
              createdBy
              updatedBy
              fields
              parent
              children {
                id
                name
                icon
                createdAt
                updatedAt
                singularName
                owner
                createdBy
                updatedBy
                fields
                parent
                cover
              }
              objects {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdAt
                updatedAt
                createdBy
                updatedBy
                author
                address
                length
                duration
                notes
                url
              }
              cover
            }
            objects {
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
              routes {
                type
                coordinates
              }
              cover
              categoryId
              owner
              createdAt
              updatedAt
              createdBy
              updatedBy
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
              include {
                id
                name
                icon
                singularName
                createdAt
                updatedAt
                fields
                parent
                objects
                owner
              }
              belongsTo {
                id
                name
                icon
                singularName
                createdAt
                updatedAt
                fields
                parent
                objects
                owner
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
              permissions {
                nextToken
              }
            }
            cover
          }
          objects
          owner
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
      cover
    }
  }
`;
export const listObjectStatistics = /* GraphQL */ `
  query ListObjectStatistics {
    listObjectStatistics {
      id
      general {
        total
        pending
        draft
        published
        archived
      }
      daily {
        total
        pending
        draft
        published
        archived
      }
    }
  }
`;
export const generateObjectLinking = /* GraphQL */ `
  query GenerateObjectLinking(
    $lat: Float
    $lon: Float
    $linkingType: String!
    $routes: RouteInput
    $area: AreaInput
    $id: ID
    $filter: SearchableObjectFilterInput
  ) {
    generateObjectLinking(
      lat: $lat
      lon: $lon
      linkingType: $linkingType
      routes: $routes
      area: $area
      id: $id
      filter: $filter
    ) {
      id
      belongsTo {
        name
        id
      }
      include {
        name
        id
      }
    }
  }
`;
export const searchByDistance = /* GraphQL */ `
  query SearchByDistance(
    $location: LocationInput!
    $km: Int
    $limit: Int
    $nextToken: String
    $from: Int
    $filter: SearchableObjectFilterInput
  ) {
    searchByDistance(
      location: $location
      km: $km
      limit: $limit
      nextToken: $nextToken
      from: $from
      filter: $filter
    ) {
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
      total
      nextToken
      aggregations {
        status {
          doc_count
          facets {
            buckets {
              key
              doc_count
            }
          }
        }
        categoryId {
          doc_count
          facets {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const searchByBounds = /* GraphQL */ `
  query SearchByBounds(
    $bounds: BoundsInput!
    $limit: Int
    $nextToken: String
    $from: Int
    $filter: SearchableObjectFilterInput
  ) {
    searchByBounds(
      bounds: $bounds
      limit: $limit
      nextToken: $nextToken
      from: $from
      filter: $filter
    ) {
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
      total
      nextToken
      aggregations {
        status {
          doc_count
          facets {
            buckets {
              key
              doc_count
            }
          }
        }
        categoryId {
          doc_count
          facets {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const listMobileData = /* GraphQL */ `
  query ListMobileData(  
      $limit: Int
      $nextToken: String
    ) {
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
      objects(
        limit: $limit
        nextToken: $nextToken
      ) {
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
              }
              object {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
              }
              owner
            }
            nextToken
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
export const getBelongsToObjects = /* GraphQL */ `
  query GetBelongsToObjects(
    $shape: String!
    $limit: Int
    $nextToken: String
    $from: Int
    $filter: SearchableObjectFilterInput
  ) {
    getBelongsToObjects(
      shape: $shape
      limit: $limit
      nextToken: $nextToken
      from: $from
      filter: $filter
    ) {
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
      total
      nextToken
      aggregations {
        status {
          doc_count
          facets {
            buckets {
              key
              doc_count
            }
          }
        }
        categoryId {
          doc_count
          facets {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const translate = /* GraphQL */ `
  query Translate($text: String!, $to: String!, $from: String) {
    translate(text: $text, to: $to, from: $from)
  }
`;
export const getIncludeObjects = /* GraphQL */ `
  query GetIncludeObjects(
    $shape: String!
    $limit: Int
    $nextToken: String
    $from: Int
    $filter: SearchableObjectFilterInput
  ) {
    getIncludeObjects(
      shape: $shape
      limit: $limit
      nextToken: $nextToken
      from: $from
      filter: $filter
    ) {
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
      total
      nextToken
      aggregations {
        status {
          doc_count
          facets {
            buckets {
              key
              doc_count
            }
          }
        }
        categoryId {
          doc_count
          facets {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const filterObjects = /* GraphQL */ `
  query FilterObjects(
    $filter: FacetObjectFilterInput
    $query: String
    $sort: SearchableObjectSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    filterObjects(
      filter: $filter
      query: $query
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
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
      total
      nextToken
      aggregations {
        status {
          doc_count
          facets {
            buckets {
              key
              doc_count
            }
          }
        }
        categoryId {
          doc_count
          facets {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getObjectMetadata = /* GraphQL */ `
  query GetObjectMetadata($key: String!) {
    getObjectMetadata(key: $key) {
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
export const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
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
export const searchCategorys = /* GraphQL */ `
  query SearchCategorys(
    $filter: SearchableCategoryFilterInput
    $sort: SearchableCategorySortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchCategorys(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
      nextToken
      total
    }
  }
`;
export const getReference = /* GraphQL */ `
  query GetReference($id: ID!) {
    getReference(id: $id) {
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
export const listReferences = /* GraphQL */ `
  query ListReferences(
    $filter: ModelReferenceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReferences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        createdAt
        updatedAt
        owner
        createdBy
        updatedBy
      }
      nextToken
    }
  }
`;
export const searchReferences = /* GraphQL */ `
  query SearchReferences(
    $filter: SearchableReferenceFilterInput
    $sort: SearchableReferenceSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchReferences(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        name
        type
        createdAt
        updatedAt
        owner
        createdBy
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const listPermissions = /* GraphQL */ `
  query ListPermissions(
    $filter: ModelPermissionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPermissions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPermission = /* GraphQL */ `
  query GetPermission($id: ID!) {
    getPermission(id: $id) {
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
export const searchPermissions = /* GraphQL */ `
  query SearchPermissions(
    $filter: SearchablePermissionFilterInput
    $sort: SearchablePermissionSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchPermissions(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
      nextToken
      total
    }
  }
`;
export const listObjects = /* GraphQL */ `
  query ListObjects(
    $filter: ModelObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listObjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const getObject = /* GraphQL */ `
  query GetObject($id: ID!) {
    getObject(id: $id) {
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
export const objectsByCategoryId = /* GraphQL */ `
  query ObjectsByCategoryId(
    $categoryId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    objectsByCategoryId(
      categoryId: $categoryId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const searchObjects = /* GraphQL */ `
  query SearchObjects(
    $filter: SearchableObjectFilterInput
    $sort: SearchableObjectSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchObjects(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
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
      nextToken
      total
    }
  }
`;
export const getObjectsMetadata = /* GraphQL */ `
  query GetObjectsMetadata($id: ID!) {
    getObjectsMetadata(id: $id) {
      id
      value
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listObjectsMetadatas = /* GraphQL */ `
  query ListObjectsMetadatas(
    $filter: ModelObjectsMetadataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listObjectsMetadatas(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        value
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getLanguage = /* GraphQL */ `
  query GetLanguage($id: ID!) {
    getLanguage(id: $id) {
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
export const listLanguages = /* GraphQL */ `
  query ListLanguages(
    $filter: ModelLanguageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLanguages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getLanguagesSetting = /* GraphQL */ `
  query GetLanguagesSetting($id: ID!) {
    getLanguagesSetting(id: $id) {
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
export const listLanguagesSettings = /* GraphQL */ `
  query ListLanguagesSettings(
    $filter: ModelLanguagesSettingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLanguagesSettings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        value
        createdAt
        updatedAt
        createdBy
        updatedBy
        owner
      }
      nextToken
    }
  }
`;
export const getObjectsLinking = /* GraphQL */ `
  query GetObjectsLinking($id: ID!) {
    getObjectsLinking(id: $id) {
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
export const listObjectsLinkings = /* GraphQL */ `
  query ListObjectsLinkings(
    $filter: ModelObjectsLinkingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listObjectsLinkings(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
              belongsTo {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
              }
              include {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
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
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
              }
              include {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
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
              }
              object {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
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
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
              }
              include {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
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
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
              }
              include {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
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
              }
              object {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
              }
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
`;
export const getPermissionLinking = /* GraphQL */ `
  query GetPermissionLinking($id: ID!) {
    getPermissionLinking(id: $id) {
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
export const listPermissionLinkings = /* GraphQL */ `
  query ListPermissionLinkings(
    $filter: ModelPermissionLinkingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPermissionLinkings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
              belongsTo {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
              }
              include {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
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
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
              }
              include {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
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
              }
              object {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
              }
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
`;
export const permissionLinkingByPermissionId = /* GraphQL */ `
  query PermissionLinkingByPermissionId(
    $permissionId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelPermissionLinkingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    permissionLinkingByPermissionId(
      permissionId: $permissionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
              belongsTo {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
              }
              include {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
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
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
              }
              include {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
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
              }
              object {
                id
                name
                description
                images
                status
                cover
                categoryId
                owner
                createdBy
                updatedBy
                createdAt
                updatedAt
                statusUpdatedAt
                author
                address
                length
                duration
                notes
                url
              }
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
`;
