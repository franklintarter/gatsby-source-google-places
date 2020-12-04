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

**Setup the plugin**

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-google-places`,
      options: {
        placeIds: ["<your_place_id>", "<your_place_id2>"],
        apiKey: "<your_api_key>",
        language: "en-US", // optional, defaults to en-US
      },
    },
  ],
};
```

**Query and display a single place**

```js
// pages/places.js
import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const PlacesPage = ({ data }) => {
  const place = data.googlePlacesPlace;
  const reviews = place.childrenGooglePlacesReview.map((r) => (
    <div>
      <img height="50" width="50" src={r.profile_photo_url} />
      <strong>
        {r.author_name} - {r.rating}
      </strong>
      <p>{`${r.text.substring(0, 250)} ...`}</p>
    </div>
  ));
  return (
    <Layout>
      <h1>{place.name}</h1>
      <p>total ratings: {place.user_ratings_total}</p>
      <p>average: {place.rating}</p>
      <h3>Recent Reviews</h3>
      {reviews}
    </Layout>
  );
};

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
`;

export default PlacesPage;
```

**Query and display from multiple places in a page**

```js
// pages/multiple-places
import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const PlacesPage = ({ data }) => {
  const places = data.allGooglePlacesPlace.nodes.map((p) => (
    <div>
      <h2>
        Place: {p.name} – {p.user_ratings_total}
      </h2>
      <h2>Reviews:</h2>
      <br />
      <br />
      <ul>
        {p.childrenGooglePlacesReview.map((r) => (
          <li>
            <img height="50" width="50" src={r.profile_photo_url} />{" "}
            {r.author_name} – {r.rating}
            <p>{r.text}</p>
          </li>
        ))}
      </ul>
      <br />
      <br />
    </div>
  ));
  return <Layout>{places}</Layout>;
};

export const query = graphql`
  query {
    allGooglePlacesPlace {
      nodes {
        name
        user_ratings_total
        place_id
        childrenGooglePlacesReview {
          author_name
          rating
          profile_photo_url
          text
        }
      }
    }
  }
`;

export default PlacesPage;
```

## Contribute

Issues, suggestions and PRs welcome!
