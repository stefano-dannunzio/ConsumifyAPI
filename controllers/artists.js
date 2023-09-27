const axios = require('axios');
const { request, response} = require('express');
const getAuthFromClientCredentials = require('../services/client_credentials_auth');

let topTracks= []
const url = 'https://api.spotify.com/v1';

const getArtistsTopTracks = async (req = request, res = response) => {
    try {
        const access_token = await getAuthFromClientCredentials();
        const { artist_name } = req.params;

        const search_url = `${url}/search?q=${encodeURIComponent(artist_name)}&type=artist&limit=1`;

        const search_response = await axios.get(search_url, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        });

        const artist_id = search_response.data.artists.items[0].id;

        const api_url = `https://api.spotify.com/v1/artists/${artist_id}/top-tracks`;

        const response = await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        });

        const tracks = response.data.tracks;

        const artistsTopTracks = tracks.map((track, index) => ({
            id: index + 1,
            track_name: track.name,
            album_name: track.album.name,
            artist_name: artist_name,
        }));

        res.status(200).json(artistsTopTracks);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: 'Error',
        });
    }
};


const getArtistsTopTracksByCountry = async (req = request, res = response) => {
    try {
        const access_token = await getAuthFromClientCredentials();
        const { artist_name } = req.params;
        const { country } = req.query;

        const search_url = `${url}/search?q=${encodeURIComponent(artist_name)}&type=artist&limit=1`;

        const search_response = await axios.get(search_url, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        });

        const artist_id = search_response.data.artists.items[0].id;

        const api_url = `https://api.spotify.com/v1/artists/${artist_id}/top-tracks?country=${country}`;

        const response = await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        });

        const tracks = response.data.tracks;

        const artistsTopTracks = tracks.map((track, index) => ({
            id: index + 1,
            track_name: track.name,
            album_name: track.album.name,
            artist_name: artist_name,
        }));

        res.status(200).json(artistsTopTracks);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: 'Error',
        });
    }
};

const getArtistsTopTracksByAlbum = async (req = request, res = response) => {
    try {
        const access_token = await getAuthFromClientCredentials();
        const { artist_name, album_name } = req.params;


        const search_url = `${url}/search?q=${encodeURIComponent(artist_name)}&type=artist&limit=1`;

        const search_response = await axios.get(search_url, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        });


        if (search_response.data.artists.items.length === 0) {
            res.status(404).json({
                status: 404,
                msg: 'Artista no encontrado',
            });
            return;
        }


        const artist_id = search_response.data.artists.items[0].id;

        const api_url = `https://api.spotify.com/v1/artists/${artist_id}/top-tracks`;

        const response = await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        });

        const tracks = response.data.tracks;


        const filteredTracks = tracks.filter((track) => track.album.name.toLowerCase() === album_name.toLowerCase());

        const artistsTopTracksByAlbum = filteredTracks.map((track, index) => ({
            id: index + 1,
            track_name: track.name,
            album_name: track.album.name,
            artist_name: artist_name,
        }));

        res.status(200).json(artistsTopTracksByAlbum);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: 'Error',
        });
    }
};

const getAnArtistsAlbums = async (req = request, res = response) => {

}

module.exports = {getArtistsTopTracks, getAnArtistsAlbums};