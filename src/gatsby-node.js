const getPlaceDetails = require('./getPlaceDetails');
const nodeFactory = require('./nodeFactory');

const resolvePlace = async ({ apiKey, placeId, language, createNode }) => {
  const response = (await getPlaceDetails(apiKey, placeId, language));

  if (response.data.status !== "OK") {
    throw Error("Request to Google API failed. " + response.data.error_message)
  }

  const place = response.data.result

  place.id = placeId;

  const placeNode = nodeFactory.placeNode(place);
  delete placeNode.reviews
  createNode(placeNode);
  if(place.reviews){
  place.reviews.forEach(review => {
    review.id = review.time;
    const placeReviewNode = nodeFactory.reviewNode(review, {
      parent: placeNode.id
    });
    createNode(placeReviewNode);
  })}

  return;
}

exports.sourceNodes = async ({ actions }, { apiKey, placeIds, placeId, language = 'en-US' }) => {
  try {

    // Backwards compatibility
    if (!placeIds) {
      console.warn('gatsby-source-google-places has deprecated placeId. Use placeIds instead.')
      placeIds = placeId
    }

    const { createNode } = actions;

    // Single Place Id
    if (typeof placeIds === "string") {
      placeIds = [placeIds]
    }

    await Promise.all(placeIds.map((pid) => resolvePlace({ apiKey, placeId: pid, language, createNode })))
    
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
