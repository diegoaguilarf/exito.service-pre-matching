export default `
query ProductQuery($ProductId: ID!) {
  product(identifier: {field: id, value: $ProductId}) {
    productId,
    productName,
    brand,
    categoryId,
    categoryTree {
      slug,
      name,
      titleTag,
      hasChildren
    },
    description,
  }
}
`;