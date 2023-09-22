const {Router} = require('express');
const { getPlaylist } = require('../controllers/playlist');

const rutas = Router();

rutas.get('/playlist/:playlistId', getPlaylist);

module.exports = rutas;