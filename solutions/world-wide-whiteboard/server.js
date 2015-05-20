var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

var socketio = require('socket.io');

server.on('request', app);

var io = socketio(server);

var draws = {};

io.on('connection', function (socket) {

    console.log(socket.id, 'connected');

    socket.on('join awesome room', function (roomName) {

        socket.join(roomName);

        if (!draws[roomName]) {
            draws[roomName] = [];
        } else {
            socket.emit('board', draws[roomName]);
        }

        socket.on('imDrawing', function (start, end, color) {
            draws[roomName].push({ start: start, end: end, color: color });
            socket.broadcast.to(roomName).emit('collaboratorDraw', start, end, color);
        });

    });

});

server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});