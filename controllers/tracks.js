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
        const recommendations = [];
        let song_id = 1;
        tracks.forEach(track => {
            console.log(`------------------------------------------\nNombre de la pista: ${track.name}\nAlbum: ${track.album.name}\nArtista: ${track.artists[0].name}`);
            recommendations.push({
                id: song_id,
                track_name: track.name,
                album_name: track.album.name,
                artist_name: track.artists[0].name
            });
            song_id++;
        });
        //res.status(200).json(data.data);
        res.status(200).json(recommendations);
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