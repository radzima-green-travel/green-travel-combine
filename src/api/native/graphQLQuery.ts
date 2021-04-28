export default `query RadzimaMobile {
  listMobileObjects {
    id
    name
    fields
    icon
    cover
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
        cover
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
      cover
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
          cover
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
