const {Router} = require('express');
const { getPlaylist } = require('../controllers/playlist');

const rutas = Router();

rutas.get('/:playlistId', getPlaylist);

module.exports = rutas;