const { Router } = require('express');
const { getTrack, getRecommendations } = require('../controllers/tracks');

const rutas = Router();
//RUTA DE REFERENCIA
rutas.get('/:id', getTrack);

//GetRecommendations - STEFA
rutas.get('/recommendations/:limit', getRecommendations);

module.exports = rutas;