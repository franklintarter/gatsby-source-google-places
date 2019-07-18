const getPlaceDetails = require('./src/getPlaceDetails');
const nodeFactory = require('./src/nodeFactory');

exports.sourceNodes = async ({ actions }, { apiKey, placeId }) => {
  try {
    const { createNode } = actions;
    const place = (await getPlaceDetails(apiKey, placeId)).data.result;
    place.id = placeId;

    const placeNode = nodeFactory.placeNode(place);
    delete placeNode.reviews
    createNode(placeNode);

    place.reviews.forEach(review => {
      review.id = review.time;
      const placeReviewNode = nodeFactory.reviewNode(review, {
        parent: placeNode.id
      });
      createNode(placeReviewNode);
    })
    
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}