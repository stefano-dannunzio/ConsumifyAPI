const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.port = process.env.PORT || 3000;
        this.app = express();
        this.app.use(cors());
        this.routers();
    }

    routers() {
        this.app.use('/tracks', require('../routes/tracks'));

        this.app.use('/artists', require('../routes/artists'));

        this.app.use('/album', require('../routes/albums'));

        this.app.use('/playlist', require('../routes/playlist'))

        //this.app.use('/authorized', require('../routes/authorized'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`El server esta corriendo en el puerto ${this.port}`);
        });
    }

}

module.exports = Server;