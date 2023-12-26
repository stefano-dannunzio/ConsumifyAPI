const axios = require('axios');
const { request, response } = require('express');
const getAuthFromClientCredentials = require('../services/client_credentials_auth');

const getArtistsTopTracks = async (req = request, res = response) => {

}

let artistsAlbum = [];
let artist = [];

const GetArtist = async (req = request, res = response) => {
    const tokenAcceso = await getAuthFromClientCredentials();
    const { id } = req.params;
    const url = `https://api.spotify.com/v1/artists/${id}`;

    const respuesta = axios.get(url, {
        headers: {
            'Authorization': `Bearer ${tokenAcceso}`,
        },
    })

    .then(({ data }) => {
        const artistas = data.items;

        artistas.forEach(element => {
            artist.push ({
                nombreArtista: element.name,
                imagenArtista: element.images[0].url
            })
        })

        res.status(200).json(artist);
    })

    .catch((error) => {
        if (res.status === 400) {
            res.status(400).json({
                status: 400,
                msg: 'Error inesperado'
            });
        }

        if (res.status === 401) {
            res.status(401).json({
                status: 401,
                msg: 'Token incorrecto o expirado'
            })
        }
    })
}

const getAnArtistsAlbums = async (req = request, res = response) => {
    const tokenAcceso = await getAuthFromClientCredentials();
    const { id } = req.params;
    const url = `https://api.spotify.com/v1/artists/${id}/albums`;

    const respuesta = axios.get(url, {
        headers: {
            'Authorization': `Bearer ${tokenAcceso}`,
        },
    })

        .then(({ data }) => {
            const albums = data.items;

            albums.forEach(element => {
                artistsAlbum.push({
                    nombreAlbum: element.name,
                    idAlbum: element.id,
                    nombreArtista: element.artists[0].name,
                    fechaLanzamiento: element.release_date,
                    cantidadCanciones: element.total_tracks,
                    precisionFecha: element.release_date_precision,
                    imagenAlbum: element.images[0].url

                });
            });

            res.status(200).json(artistsAlbum);
        })

        .catch((error) => {
            if (res.status === 400) {
                res.status(400).json({
                    status: 400,
                    msg: 'Error inesperado'
                });
            }

            if (res.status === 401) {
                res.status(401).json({
                    status: 401,
                    msg: 'Token incorrecto o expirado'
                })
            }
        })
}

getAnArtistsAlbumBySongs = async (req = request, res = response) => {
    const { cantCanciones } = req.params;
    let albumsBySongs = [];

    artistsAlbum.forEach(element => {
        if (cantCanciones <= element.cantidadCanciones) {
            albumsBySongs.push(element);
        }
    })
    if (albumsBySongs.length == 0) {
        return res.status(400).json({
            status: 400,
            msg: `No hay albumes con mas de ${cantCanciones} canciones`
        })
    }
    try {
        res.status(200).json(albumsBySongs);
    } catch (error) {

        if (res.status === 401) {
            res.status(401).json({
                status: 401,
                msg: 'Token incorrecto o expirado'
            })
        }
    }
}

getAnArtistAlbumByDate = async (req = request, res = response) => {
    const { date } = req.params;
    console.log(date);
    let albumsByDate = [];

    artistsAlbum.forEach(element => {
        if (date == element.precisionFecha) {
            albumsByDate.push(element);
        }
    })
    if (albumsByDate.length == 0) {
        return res.status(400).json({
            status: 400,
            msg: 'Error con el parametro'
        })
    }
    try {
        res.status(200).json(albumsByDate);
    } catch (error) {

        if (res.status === 401) {
            res.status(401).json({
                status: 401,
                msg: 'Token incorrecto o expirado'
            })
        }
    }
}





module.exports = { getAnArtistsAlbums, getAnArtistsAlbumBySongs, getAnArtistAlbumByDate };