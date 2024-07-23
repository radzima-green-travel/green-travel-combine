export const shortCardQueryParameters = `
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
    }`;

export const getObjectsTotalCountQuery = `query MyQuery {
  searchObjects(filter: {status: {eq: "published"}}) {
    total
  }
}`;
