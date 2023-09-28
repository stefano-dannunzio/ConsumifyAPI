const { Router } = require('express');
const { getPlaylist, getPlaylistTracks, getPlaylistTracksByArtist } = require('../controllers/playlist');

const rutas = Router();

// RUTA DE REFERENCIA
rutas.get('/:id', getPlaylist)

// getPlaylist - MAXIMO
rutas.get('/playlistTracks/:id', getPlaylistTracks);
rutas.get('/:id/playlistTracks/artist', getPlaylistTracksByArtist);


module.exports = rutas;