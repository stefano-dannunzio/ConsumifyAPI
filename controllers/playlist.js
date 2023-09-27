const axios = require('axios');
const {request, response} = require('express');
const getAuthFromClientCredentials = require('../services/client_credentials_auth')


const getPlaylist = async (req = request, res = response) => {
    try {
        const token = await getAuthFromClientCredentials();
        console.log('Token obtenido:', token);
        const { id } = req.params; // Aquí obtenemos el ID de la playlist

        const responseFromSpotify = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (responseFromSpotify.status === 200) {
            res.status(200).json(responseFromSpotify.data);
        } else if (responseFromSpotify.status === 401) {
            res.status(401).json({ message: 'Solicitud no autorizada.' });
        } else if (responseFromSpotify.status === 403) {
            res.status(403).json({ message: 'Solicitud prohibida.' });
        } else if (responseFromSpotify.status === 404) {
            res.status(404).json({ message: 'Playlist no encontrada.' });
        } else {
            res.status(responseFromSpotify.status).json({ message: 'Error en la solicitud.' });
        }
    } catch (error) {
        console.log('Error en getPlaylist:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getPlaylistTracks = async (req = request, res = response) => {
    try {
        const token = await getAuthFromClientCredentials();
        console.log('Token obtenido:', token);
        const { id } = req.params;

        const responseFromSpotify = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (responseFromSpotify.status === 200) {
            const responseData = responseFromSpotify.data;

            // Extraer información específica de la respuesta para personalizarla
            const playlistInfo = {
                nombrePlaylist: responseData.name,
                creador: responseData.owner.display_name,
                totalCanciones: responseData.tracks.total,
                tracks: responseData.tracks.items.map((item) => ({
                    nombreCancion: item.track.name,
                    artistas: item.track.artists.map((artist) => artist.name).join(', '),
                    Album: item.track.album.name
                })),
            };

            res.status(200).json(playlistInfo);
        } else if (responseFromSpotify.status === 401) {
            res.status(401).json({ message: 'Solicitud no autorizada.' });
        } else if (responseFromSpotify.status === 403) {
            res.status(403).json({ message: 'Solicitud prohibida.' });
        } else if (responseFromSpotify.status === 404) {
            res.status(404).json({ message: 'Playlist no encontrada.' });
        } else {
            res.status(responseFromSpotify.status).json({ message: 'Error en la solicitud.' });
        }
    } catch (error) {
        console.log('Error en getPlaylistTracks:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getPlaylistTracksByArtist = async (req = request, res = response) => {
    try {
        const token = await getAuthFromClientCredentials();
        console.log('Token obtenido: ', token);
        const { id } = req.params;
        const artistId = req.query.artistId; // Obtener el valor del query parameter 'artistId'

        console.log('Artista ID:', artistId);

        const response = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            const responseData = { ...response.data };

            const filteredTracks = responseData.tracks.items.filter(item => {
                const artists = item.track.artists.map(artist => artist.id.trim()); // Eliminar espacios en blanco de los IDs de artistas
                const artistFound = artists.includes(artistId.trim()); // Realizar la comparación después de quitar espacios en blanco
                return artistFound;
            });
            

        // Devolver la respuesta actualizada
            const respuestaModificada = {
                nombrePlaylist: responseData.name,
                creadaPor: responseData.owner.display_name,
                totalCancionesArtista: filteredTracks.length,
                canciones: filteredTracks.map(track => ({
                    nombreCancion: track.track.name,
                    Artista: track.track.artists.map(artist => artist.name).join(', '), // Para obtener todos los artistas de la canción
                    Album: track.track.album.name,
                })),
            };

            console.log(respuestaModificada)

            res.status(200).json(respuestaModificada);
        } else if (response.status === 401) {
            res.status(401).json({ message: 'Solicitud no autorizada.' });
        } else if (response.status === 403) {
            res.status(403).json({ message: "Solicitud prohibida." });
        } else if (response.status === 404) {
            res.status(404).json({ message: 'Playlist no encontrada.' });
        } else {
            res.status(response.status).json({ message: 'Error en la solicitud.' });
        }
    } catch (error) {
        console.log('Error en getPlaylistTracksByArtist:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


module.exports = { getPlaylist, getPlaylistTracks, getPlaylistTracksByArtist };
