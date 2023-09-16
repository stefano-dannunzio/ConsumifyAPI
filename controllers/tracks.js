const axios = require('axios');
const { request, response} = require('express');
const getAuthFromClientCredentials = require('../services/client_credentials_auth');


const getTrack = (req = request, res = response) => {
    const access_token = getAuthFromClientCredentials();
    const { id } = req.params;

    const api_url = `https://api.spotify.com/v1/tracks/${id}`;
    console.log(api_url);

    axios.get(api_url, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    })
    .then((data) => {
        console.log(data);
        res.status(200).json({
            data
        });
    })
    .catch((error) => {
        // handle error
        console.log(error);
        res.status(400).json({
            status:400,
            msg: 'Error inesperado'
        });
    })

    


}


module.exports = {getTrack};