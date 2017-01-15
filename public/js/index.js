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
    
    var messageTextbox = jQuery('[name=message]');
    
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});


var locationButton = jQuery('#location-button');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by browser.');
    }
    
    locationButton.attr('disabled', 'disabled').text('Sending Location.....');
    
    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to find your location.');
    });
});