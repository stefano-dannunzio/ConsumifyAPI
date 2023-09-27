const { Router } = require('express');
const { getAlbum } = require('../controllers/albums');

const rutas = Router();
//RUTA DE REFERENCIA
rutas.get('/:id', getAlbum);

module.exports = rutas;