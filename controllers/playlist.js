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

        console.log('Respuesta de Axios:', response.data);
        
        if (response.status === 200) {
            res.status(200).json(response.data);
        } else if (response.status === 401) {
            res.status(401).json({ message: 'Solicitud no autorizada.' })
        } else if (response.status === 403) {
            res.status(403).json ({ message: "Solicitud prohibida." })
        } else if (response.status === 404) {
            res.status(404).json ({ message: 'Playlist no encontrada.' })
        } else {
            res.status(response.status).json({ message: 'Error en la solicitud.' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { getPlaylist };

