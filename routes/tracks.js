const { Router } = require('express');
const { getTrack } = require('../controllers/tracks');

const rutas = Router();
//RUTA DE REFERENCIA
rutas.get('/:id', getTrack);

//GetRecommendations - STEFA


module.exports = rutas;