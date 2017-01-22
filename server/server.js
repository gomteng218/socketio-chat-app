var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var {makeMessage, makeLocationMessage} = require('./utils/message');
var {isValidStr} = require('./utils/validation');
var {Users} = require('./utils/users');

var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', function(socket) {
    console.log('New user connected');
    
    socket.on('join', function(params, cb) {
        if (!isValidStr(params.name) || !isValidStr(params.room)) {
            return cb('Name and Room Name are required!')
        }
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        
        
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        
        // socket.emit from admin / welcome text
        socket.emit('newMessage', makeMessage('Admin', 'Welcome to the chat room!'));
    
        // socket.broadcast.emit from admin to new user
        socket.broadcast.to(params.room).emit('newMessage', makeMessage('Admin', params.name + ' has joined.'));
        cb();
    });
    
    socket.on('createMessage', function(newMessage, cb){
        var user = users.getUser(socket.id);
        
        if (user && isValidStr(newMessage.text)) {
            io.to(user.room).emit('newMessage', makeMessage(user.name, newMessage.text));
        }
        
        cb();
    });
    
    socket.on('createLocationMessage', function(coords) {
        var user = users.getUser(socket.id);
        
        if (user) {
            io.to(user.room).emit('newLocationMessage', makeLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });
    
    socket.on('disconnect', function() {
        var user = users.removeUser(socket.id);
        
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', makeMessage('Admin', user.name+ ' has left the room.'));
        }
    });
});

server.listen(port, function() {
    console.log('Server is running on port ' + port);
});