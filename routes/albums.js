const { Router } = require('express');
const { getAlbum, getAlbumTracks, getAlbumTrackByNumber, getAlbumTrackByMinutes } = require('../controllers/albums');
const { getAdapter } = require('axios');

const rutas = Router();

//RUTA DE REFERENCIA
rutas.get('/:id', getAlbum);

//GetAlbums - MAURO

rutas.get('/albumTracks/:id', getAlbumTracks);
rutas.get('/albumTracks/trackNumber/:number', getAlbumTrackByNumber);
rutas.get('/albumTracks/duration/:minutes', getAlbumTrackByMinutes);

module.exports = rutas;