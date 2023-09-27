const axios = require('axios');
const {request, response} = require('express');
const getAuthFromClientCredentials = require('../services/client_credentials_auth')


const getPlaylist = async (req = request, res = response) => {
    try {
        const token = await getAuthFromClientCredentials();
        console.log('Token obtenido:', token);
        const { playlistId } = req.params;

        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });


        if (response.status === 200) {
            const responseData = { ...response.data };
            
            // Extraer información específica de la respuesta para personalizarla
            const playlistInfo = {
                name: responseData.name,
                createdBy: responseData.owner.display_name,
                createdAt: responseData.snapshot_id.split('T')[0], // Fecha de creación
                tracks: [],
            };

            // Recorrer las canciones y obtener el nombre de la canción y el nombre del artista
            responseData.tracks.items.forEach((item) => {
                const trackInfo = {
                    name: item.track.name,
                    artist: item.track.artists.map((artist) => artist.name).join(', '), // Obtener el nombre del artista
                };
                playlistInfo.tracks.push(trackInfo);
            });

            res.status(200).json(playlistInfo);
        } else if (response.status === 401) {
            res.status(401).json({ message: 'Solicitud no autorizada.' });
        } else if (response.status === 403) {
            res.status(403).json({ message: 'Solicitud prohibida.' });
        } else if (response.status === 404) {
            res.status(404).json({ message: 'Playlist no encontrada.' });
        } else {
            res.status(response.status).json({ message: 'Error en la solicitud.' });
        }
    } catch (error) {
        console.log('Error en getPlaylist:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


const getArtistById = async (req = request, res = response) => {
    try {
        const token = await getAuthFromClientCredentials();
        console.log('Token obtenido: ', token);
        const { playlistId } = req.params;
        const artistId = req.query.artistId; // Obtener el valor del query parameter 'artistId'

        console.log('Artista ID:', artistId);

        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });


        if (response.status === 200) {
            const responseData = { ...response.data };
            const filteredTracks = artistId
                ? response.data.tracks.items.filter(item => item.track.artists.some(a => a.id === artistId))
                : response.data.tracks.items;

            // Actualizar la propiedad 'tracks' en la respuesta con los tracks filtrados
            responseData.tracks.items = filteredTracks;

            // Devolver la respuesta actualizada
                const respuestaModificada = {
                name: responseData.name,
                creator: responseData.owner.display_name,
                created_at: responseData.snapshot_id, // Esto puede no ser la fecha de creación exacta, verifica si Spotify proporciona esta información
                tracks: filteredTracks.map(track => ({
                    name: track.track.name,
                    artist: track.track.artists.map(artist => artist.name).join(', '), // Para obtener todos los artistas de la canción
                })),
            };

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
        console.log('Error en getArtistById:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};




module.exports = { getPlaylist, getArtistById };

