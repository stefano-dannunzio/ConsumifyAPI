const axios = require('axios');
const { request, response} = require('express');
const getAuthFromClientCredentials = require('../services/client_credentials_auth');
const url = 'https://api.spotify.com/v1/artists';

const getMultipleArtists = async (req = request, res = response) => {

}

const getAnArtistsAlbums = async (req = request, res = response) => {
    const tokenAcceso = await getAuthFromClientCredentials();
    const { id } = req.params;

    const respuesta = await axios.get(`${url}/${id}/albums`, {
            headers: {
                'Authorization': `Bearer ${tokenAcceso}`,
            },
        });

    if (respuesta.status === 200) {
        const albums = respuesta.data.items;

        res.json({albums});

        console.log(albums);
    }
}

module.exports = {getMultipleArtists, getAnArtistsAlbums};