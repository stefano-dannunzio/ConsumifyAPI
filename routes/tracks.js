const { Router } = require('express');
const { getTrack } = require('../controllers/tracks');

const rutas = Router();
//RUTA DE REFERENCIA
rutas.get('/:id', getTrack);

//GetRecommendations - STEFA

// rutas.get('/recommendations/limit/:limit', getRecommendations);
// rutas.get('/recommendations/id/:id', getRecomById);
// rutas.get('/recommendations/artist/:artist', getRecomByArtistName);
// rutas.get('/recommendations/album/:album', getRecomByAlbumName);

module.exports = rutas;