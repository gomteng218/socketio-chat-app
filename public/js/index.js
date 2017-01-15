var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('New Message', message);
    var list = jQuery('<li></li>');
    list.text(message.from + ': ' + message.text);
    
    jQuery('#msg').append(list);
});

socket.on('newLocationMessage', function(message) {
    var list = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Location</a>');
    
    list.text(message.from + ': ');
    a.attr('href', message.url);
    list.append(a);
    jQuery('#msg').append(list);
});

jQuery('#msg-form').on('submit', function(e) {
    e.preventDefault();
    
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {
        
    });
});


var locationButton = jQuery('#location-button');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by browser.');
    }
    
    navigator.geolocation.getCurrentPosition(function (position){
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('Unable to find your location.');
    });
});