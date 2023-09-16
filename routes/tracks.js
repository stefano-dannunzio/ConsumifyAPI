const { Router } = require('express');
const { getTrack } = require('../controllers/tracks');

const rutas = Router();

rutas.get('/:id', getTrack);

module.exports = rutas;