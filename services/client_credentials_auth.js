const axios = require('axios').default

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const url = 'https://accounts.spotify.com/api/token';

var authOptions = {
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

const getAuthFromClientCredentials = async () => {

  try {
    const { data } = await axios.post(url, {
      grant_type: 'client_credentials'
    }, {
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
    )
    return data.access_token || '';
  } catch (error) {
    return false;
  }


}

module.exports = getAuthFromClientCredentials;