var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var {makeMessage, makeLocationMessage} = require('./utils/message');
var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
    console.log('New user connected');
    
    // socket.emit from admin / welcome text
    socket.emit('newMessage', makeMessage('Admin', 'Welcome to the chat room!'));
    
    // socket.broadcast.emit from admin to new user
    socket.broadcast.emit('newMessage', makeMessage('Admin', 'New User Joined'));
    
    socket.on('createMessage', function(newMessage, cb){
        console.log('createMessage', newMessage);
        io.emit('newMessage', makeMessage(newMessage.from, newMessage.text));
        cb('This is from the server');
    });
    
    socket.on('createLocationMessage', function(coords) {
        io.emit('newLocationMessage', makeLocationMessage('Admin', coords.latitude, coords.longitude));
    });
    
    socket.on('disconnect', function() {
        console.log('User was disconnected');
    });
});

server.listen(port, function() {
    console.log('Server is running on port ' + port);
});