const { Router } = require('express');
const { getAlbumTracks } = require('../controllers/albums');

const rutas = Router();
//RUTA DE REFERENCIA
rutas.get('/:id', getAlbumTracks);

module.exports = rutas;