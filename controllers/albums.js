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
        .then((data) => {

            let albumData = [];
            const album = data.data;

            console.log(`\n                                        > ALBUM < \n
            Nombre del Album: ${album.name}\n
            Cantidad de pistas: ${album.total_tracks}\n
            Fecha de salida: ${album.release_date}\n
            Popularidad: ${album.popularity}`);

            albumData.push({
                id: album.id,
                Album_name: album.name,
                Album_artist: album.artists[0].name,
                Album_total_tracks: album.total_tracks,
                Album_release_date: album.release_date,
                Album_popularity: album.popularity
            });

            res.status(200).json(albumData);
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

let albumTracks = [];

const getAlbumTracks = async (req = request, res = response) => {
    const access_token = await getAuthFromClientCredentials();
    const { id } = req.params;
    const api_url = `https://api.spotify.com/v1/albums/${id}`;

    if (albumTracks.length > 0) {
        albumTracks = [];
    }

    axios.get(api_url, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    })
        .then((data) => {

            const tracks = data.data.tracks.items;

            console.log(`\n       > Tracks del album: ${data.data.name} <  `);

            tracks.forEach(element => {
                console.log(`--------------------------------------------------------------------------------------\n
                Nombre de la pista: ${element.name}\n
                Album: ${data.data.name}\n
                Numero de pista en el album: ${element.track_number}\n
                Artista: ${element.artists[0].name}\n
                ID de la pista: ${element.id}`);

                albumTracks.push({
                    id: element.id,
                    track_name: element.name,
                    track_number: element.track_number,
                    album_name: data.data.name,
                    artist_name: element.artists[0].name
                });
            });

            res.status(200).json(albumTracks);
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

module.exports = { getAlbum, getAlbumTracks };