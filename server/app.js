'use strict';
const http = require('http');

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const config = require('./config');
const Router = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

const server = new http.Server(app);
const port = config.APP_PORT;

app.use('/api', Router);

server.listen(port, () => {
    console.log('Server started on port %d', port);
});

exports.server = server;


