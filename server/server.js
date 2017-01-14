var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
    console.log('New user connected');
    
    socket.on('createMessage', function(newMessage){
        console.log('createMessage', newMessage);
        io.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });
    });
    
    socket.on('disconnect', function() {
        console.log('User was disconnected');
    });
});

server.listen(port, function() {
    console.log('Server is running on port ' + port);
});