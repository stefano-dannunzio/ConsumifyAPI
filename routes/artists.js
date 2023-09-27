const { Router } = require('express');
const { getArtistsTopTracks, getAnArtistsAlbums } = require('../controllers/artists');
const { getArtistsTopTracksByCountry } = require('../controllers/artists');
const { getArtistsTopTracksByAlbum } = require('../controllers/artists');

const rutas = Router();
//GetArtist's TopTracks - EMILIANO
rutas.get('/artists/:artist_name/artistsTopTracks', getArtistsTopTracks);
rutas.get('/artists/:artist_name/topTracksByCountry', getArtistsTopTracksByCountry);
rutas.get('/artists/:artist_name/topTracksByAlbum/:album_name', getArtistsTopTracksByAlbum);

//GetAnArtist'sAlbums - FRANCO


module.exports = rutas;