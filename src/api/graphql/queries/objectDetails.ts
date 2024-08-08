export function geObjectDetailsByIdQuery(objectId: string) {
  return `query MyQuery {
  getObject(id: "${objectId}") {
    accommodationPlace {
      items {
        name
        i18n {
          locale
          name
        }
        messengerLink
        googleMapLink
      }
    }
    addresses {
      items {
        region {
          i18n {
            locale
            value
          }
          value
        }
        municipality {
          i18n {
            value
            locale
          }
          value
        }
        subRegion {
          i18n {
            locale
            value
          }
          value
        }
      }
    }
    area {
      coordinates
      type
    }
    attendanceTime
    belongsTo {
      items {
        belongsTo {
          i18n {
            name
            locale
          }
          name
          category {
            name
            i18n {
              name
              locale
            }
          }
          id
        }
      }
    }
    calculatedProperties {
      averageSpentTime
      averageRating
      totalRatings
    }
    category {
      name
      parent
      id
      icon
      singularName
      completenessFields
    }
    childServices {
      items {
        childService {
          i18n {
            locale
            name
          }
          name
        }
      }
    }
    description
    dinnerPlaces {
      items {
        i18n {
          locale
          name
        }
        name
        googleMapLink
        messengerLink
      }
    }
    name
    id
    phoneNumber
    workingHours
    googleRating
    googleRatingsTotal
    images
    i18n {
      name
      locale
      description
      workingHours
      notes
    }
    renting {
      items {
        renting {
          i18n {
            locale
            name
          }
          name
        }
      }
    }
    length
    location {
      lat
      lon
    }
    origins {
      name
      value
      }
    routes {
      coordinates
      type
    }
    include {
      items {
        include {
          category {
            id
            cover
            name
            i18n {
              name
              locale
            }
          }
          id
        }
      }
    }
    upcomingEvents {
      items {
        name
        i18n {
          locale
          name
        }
        link
      }
    }
    url
  }
}
`;
}
