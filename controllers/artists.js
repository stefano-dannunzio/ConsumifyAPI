const axios = require('axios');
const { request, response} = require('express');
const getAuthFromClientCredentials = require('../services/client_credentials_auth');

const getArtistsTopTracks = async (req = request, res = response) => {

}

const getAnArtistsAlbums = async (req = request, res = response) => {

}

module.exports = {getArtistsTopTracks, getAnArtistsAlbums};