export const getAppMapObjectsQuery = `query MyQuery($from: Int = 0, $limit: Int = 100) {
  searchObjects(limit: $limit, from: $from, filter: {status: {eq: "published"}}) {
    items {
      location {
        lat
        lon
      }
      name
      id
      i18n {
        name
        locale
      }
      length
      addresses {
        items {
          region {
            value
            i18n {
              locale
              value
            }
          }
          municipality {
            value
            i18n {
              locale
              value
            }
          }
          subRegion {
            value
            i18n {
              locale
              value
            }
          }
          street
        }
      }
      category {
        id
        icon
        name
        singularName
        i18n {
          name
          singularName
          locale
        }
      }
    }
  }
}
`;
