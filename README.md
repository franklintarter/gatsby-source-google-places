# gatsby-source-google-places

Source plugin for pulling data from the Google Places API.

## Pre-reqs

Get a [Google Places API Key](https://developers.google.com/places/web-service/get-api-key).

## Install

```shell
npm install --save gatsby-source-google-places
# or
yarn add gatsby-source-google-places
```

## Using

Setup the plugin

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-google-places`,
      options: {
        spaceId: `<your_space_id>`,
        apiKey: '<your_api_key>',
      },
    },
  ],
}
```

Use query in a page

```js
// pages/places.js
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const PlacesPage = ({ data }) => {
  const place = data.googlePlacesPlace
  const reviews = place.childrenGooglePlacesReview.map(r => (
    <div>
      <img height="50" width="50" src={r.profile_photo_url} />
      <strong>{r.author_name} - {r.rating}</strong>
      <p>{`${r.text.substring(0, 250)} ...`}</p>
    </div>
  ))
  return (
    <Layout>
      <h1>{place.name}</h1>
      <p>total ratings: {place.user_ratings_total}</p>
      <p>average: {place.rating}</p>
      <h3>Recent Reviews</h3>
      {reviews}
    </Layout>
  )
}

export const query = graphql`
query {
  googlePlacesPlace {
    name
    rating
    childrenGooglePlacesReview {
      author_name
      text
      rating
      profile_photo_url
    }
    user_ratings_total
  }
}
`

export default PlacesPage
```

## Contribute

Issues, suggestions and PRs welcome!
