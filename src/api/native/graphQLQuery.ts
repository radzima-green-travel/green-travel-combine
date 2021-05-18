export default `query RadzimaMobile {
  getObjectsMetadata(id: "tag") { 
    value 
  }
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
      routes {
        coordinates
        type
      }
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
      belongsTo {
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
        routes {
          coordinates
          type
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
        belongsTo {
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
