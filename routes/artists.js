const { Router } = require('express');

const { getArtistsTopTracks} = require('../controllers/artists');

const rutas = Router();
//GetArtist's TopTracks - EMILIANO
rutas.get('/artistsTopTracks/:id', getArtistsTopTracks);


//GetAnArtist'sAlbums - FRANCO


module.exports = rutas;