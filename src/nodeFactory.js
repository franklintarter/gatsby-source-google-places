const createNodeHelpers = require('gatsby-node-helpers').default;

const {
  createNodeFactory,
  generateNodeId,
} = createNodeHelpers({
  typePrefix: `GooglePlaces`,
})

const PLACE_TYPE = `Place`
const REVIEW_TYPE = `Review`

module.exports.placeNode = createNodeFactory(PLACE_TYPE, node => {
  if (node.reviews) {
    const reviews = node.reviews.map(review => review)
    node.children = reviews.map(review =>
      generateNodeId(REVIEW_TYPE, review.time),
    )
  }
  return node 
})

module.exports.reviewNode = createNodeFactory(REVIEW_TYPE, node => {
  return node
})