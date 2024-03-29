const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');


const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist/
app.use(express.static(path.join(__dirname, 'dist/dirlistng')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/dirlistng/index.html'));
});

/**
* Get port from environment and store in Express.
*/
const port = process.env.PORT || '4200';
const host = '192.168.0.16';

app.set('port', port);
/*app.set('127.0.0.1', host);*/

/**
* Create HTTP server.
*/
const server = http.createServer(app);

/**
* Listen on provided port, on all network interfaces.
*/
server.listen(port, host,() => console.log(`APP running on ${host}:${port}`));