const { Router } = require('express');
const { getMultipleArtists, getAnArtistsAlbums, getAnArtistsAlbumBySongs, getAnArtistAlbumByDate } = require('../controllers/artists');


const rutas = Router();
//GetArtist's TopTracks - EMILIANO


//GetAnArtist'sAlbums - FRANCO
rutas.get('/artistaalbum/:id', getAnArtistsAlbums);
rutas.get('/artistaalbum/cantcanciones/:cantCanciones', getAnArtistsAlbumBySongs);
rutas.get('/artistaalbum/porfecha/:date', getAnArtistAlbumByDate);


module.exports = rutas;