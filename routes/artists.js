const { Router } = require('express');
const { getMultipleArtists, getAnArtistsAlbums } = require('../controllers/artists');

const rutas = Router();
//GetMultipleArtists - MAXI


//GetAnArtist'sAlbums - FRANCO
rutas.get('/artistalbum/:id', getAnArtistsAlbums);


module.exports = rutas;