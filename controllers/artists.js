const axios = require('axios');
const { request, response } = require('express');
const getAuthFromClientCredentials = require('../services/client_credentials_auth');

const url = 'https://api.spotify.com/v1';

const getArtistsTopTracks = async (req = request, res = response) => {
    try {
        const access_token = await getAuthFromClientCredentials();
        const artist_id = req.params.id;

        const api_url = `${url}/artists/${artist_id}/top-tracks`;

        let topTracks = [];

        const response = await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        });

        const { tracks } = response.data;

        if (tracks.length > 0) {
            let song_id = 1;
            tracks.forEach(track => {
                topTracks.push({
                    id: song_id,
                    track_name: track.name,
                    album_name: track.album.name,
                    artist_name: track.artists[0].name,
                });
                song_id++;
            });
            res.status(200).json(topTracks);
        } else {
            res.status(404).json({ message: 'No se encontraron las canciones para este artista.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

module.exports = { getArtistsTopTracks };