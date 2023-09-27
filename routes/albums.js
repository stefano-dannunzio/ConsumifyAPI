const { Router } = require('express');
const { getAlbum, getAlbumTracks } = require('../controllers/albums');

const rutas = Router();

//RUTA DE REFERENCIA
rutas.get('/:id', getAlbum);

//GetAlbums - MAURO

rutas.get('/albumTracks/:id', getAlbumTracks);

module.exports = rutas;