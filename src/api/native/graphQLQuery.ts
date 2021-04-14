export default `query RadzimaMobile {
    listMobileObjects {
      id
      name
      fields
      icon
      objects {
        name
        images
        cover
        address
        author
        createdAt
        description
        duration
        governanceType
        id
        length
        location {
          lat
          lon
        }
        category {
          createdAt
          fields
          icon
          id
          name
          parent
          updatedAt
        }
        notes
        origin
        owner
        status
        url
        area {
          coordinates
          type
        }
        include {
          fields
          icon
          id
          name
          objects
        }
        permissions {
          items {
            permission {
              id
              key
              name
            }
          }
        }
      }
      children {
        name
        id
        createdAt
        fields
        icon
        objects {
          name
          category {
            createdAt
            fields
            icon
            id
            name
            parent
            updatedAt
          }
          images
          cover
          address
          author
          createdAt
          description
          duration
          governanceType
          id
          length
          location {
            lat
            lon
          }
          notes
          origin
          owner
          status
          url
          area {
            coordinates
            type
          }
          include {
            fields
            icon
            id
            name
            objects
          }
          permissions {
            items {
              permission {
                id
                key
                name
              }
            }
          }
        }
      }
    }
  }`;
