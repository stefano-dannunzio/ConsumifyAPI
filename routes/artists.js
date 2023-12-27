const { Router } = require('express');
const { getArtist, getAnArtistsAlbums, getAnArtistsAlbumBySongs, getAnArtistAlbumByDate } = require('../controllers/artists');


const rutas = Router();
//GetArtist's TopTracks - EMILIANO


//GetAnArtist'sAlbums - FRANCO
rutas.get('/:id', getArtist);
rutas.get('/artistaalbum/:id', getAnArtistsAlbums);
rutas.get('/artistaalbum/cantcanciones/:cantCanciones', getAnArtistsAlbumBySongs);
rutas.get('/artistaalbum/porfecha/:date', getAnArtistAlbumByDate);


module.exports = rutas;