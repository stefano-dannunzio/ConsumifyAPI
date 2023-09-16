var request = require('request'); // "Request" library

var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

const getAuthFromClientCredentials = async () => {
    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          var token = body.access_token;
        }
        console.log(token);
        return token;
      });

}

module.exports = getAuthFromClientCredentials;