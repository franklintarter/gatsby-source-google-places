const axios = require('axios')
const baseUri = 'https://maps.googleapis.com/maps/api/place/details/json'
const querystring = require('querystring');

module.exports = (key, placeid) => {

  const parameters = {
    key,
    placeid,
    fields: 'name,rating,formatted_phone_number,reviews,opening_hours'
  }

  return axios.get(`${baseUri}?${querystring.stringify(parameters)}`)
}