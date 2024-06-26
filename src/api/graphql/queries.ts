export const listCategoriesQuery = `query MyQuery($filter: ModelCategoryFilterInput = {}) {
  listCategories(limit: 200, filter: $filter) {
    items {
      name
      parent
      index
      id
      cover
      i18n {
        name
        locale
      }
    }
  }
}
`;

export const listObjectsShortQuery = `query MyQuery($limit: Int = 10, $filter: SearchableObjectFilterInput = {}) {
  searchObjects(limit: $limit, filter: $filter) {
    items {
      cover
      blurhash
      category {
        name
      }
      i18n {
        name
        locale
      }
      name
      categoryId
      id
    }
  }
}
`;

export const getCategoriesAggregationsByObjectsQuery = `query MyQuery {
  filterLandingObjects(filter: {statuses: "published"}) {
    aggregations {
      categories {
        doc_count
        facets {
          buckets {
            doc_count
            key
          }
        }
      }
    }
  }
}
`;
