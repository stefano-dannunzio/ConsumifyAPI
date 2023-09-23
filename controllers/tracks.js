const axios = require('axios');
const { request, response} = require('express');
const getAuthFromClientCredentials = require('../services/client_credentials_auth');


const getTrack = async (req = request, res = response) => {    
    const access_token = await getAuthFromClientCredentials();    
    const { id } = req.params;

    const api_url = `https://api.spotify.com/v1/tracks/${id}`;    

    axios.get(api_url, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    })
    .then((data) => {
        console.log(data.data);
        res.status(200).json(data.data);
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

const getRecommendations = async (req = request, res = response) => {
    const access_token = await getAuthFromClientCredentials();
    const { limit } = req.params;
    const { seed_genres, seed_artists } = req.query;
    const api_url = `https://api.spotify.com/v1/recommendations?limit=${limit}&seed_genres=${seed_genres}&seed_artists=${seed_artists}`;

    axios.get(api_url, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    })
    .then((data) => {
        console.log(data.data);
        console.log('LO SIGUIENTE ES EL ALBUM')
        console.log(data.data.tracks[0].album);
        const { tracks } = data.data;
        tracks.forEach(track => {
            console.log(`Nombre: ${track.name}\n Album: ${track.album.name}\n Artista: ${track.artists[0].name}`);            
        });
        res.status(200).json(data.data);
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


module.exports = {getTrack, getRecommendations};