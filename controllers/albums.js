const axios = require('axios');
const { request, response } = require('express');
const getAuthFromClientCredentials = require('../services/client_credentials_auth');


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
            //console.log(data.data.tracks.items); //PARA VER LAS CANCIONES DEL ALBUM

            const tracks = data.data.tracks.items;

            tracks.forEach(element => {
                console.log(`------------------------------------------\n
                Nombre de la pista: ${element.name}\n
                Album: ${data.data.album_name}\n
                Numero de pista en el album: ${element.track_number}\n
                Artista: ${element.artists[0].name}\n
                ID de la pista: ${element.id}`);

                albumTracks.push({
                    id: element.id,
                    track_name: element.name,
                    track_number: element.track_number,
                    album_name: data.data.album_name,
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

module.exports = { getAlbumTracks };