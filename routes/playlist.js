const { Router } = require('express');
const { getPlaylist, getArtistById } = require('../controllers/playlist');

const rutas = Router();

// Ruta para obtener la playlist por ID
rutas.get('/:playlistId', getPlaylist);

// Ruta para filtrar la playlist por artista
rutas.get('/:playlistId/artistId', getArtistById);

module.exports = rutas;
