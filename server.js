'use strict';

var http = require('http');
var sockjs = require('sockjs');

var echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js' });

var connections = [];
echo.on('connection', function(conn) {
    connections.push(conn);
    conn.on('data', function(message) {
        connections.forEach(function(c) {
            c.write(message);
        });
    });
    conn.on('close', function() {});
});

var server = http.createServer();
echo.installHandlers(server, {prefix:'/echo'});
server.listen(9999, '0.0.0.0');
