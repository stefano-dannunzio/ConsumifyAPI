const axios = require('axios');
const { request, response } = require('express');
const getAuthFromClientCredentials = require('../services/client_credentials_auth');

const getAlbum = async (req = request, res = response) => {
    const access_token = await getAuthFromClientCredentials();
    const { id } = req.params;

    const api_url = `https://api.spotify.com/v1/albums/${id}`;

    axios.get(api_url, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    })
        .then((response) => {
            const albumData = response.data; // Store the entire API response
            const albumName = albumData.name; // Extract the Album Name
            const albumArtists = albumData.artists.map(artist => artist.name); // Extract Album Artists

            console.log('Album Name:', albumName);
            console.log('Album Artists:', albumArtists);
        })
        .catch((error) => {
            // handle error
            console.log(error);
            res.status(400).json({
                status: 400,
                msg: 'Error inesperado'
            });
        })
}

module.exports = { getAlbum };