

var makeMessage = function(from, text) {
    return {
        from: from,
        text: text,
        createdAt: new Date().getTime()
    };
};

var makeLocationMessage = function(from, latitude, longitude) {
    return {
        from: from, 
        url: 'https://www.google.com/maps?q=' + latitude + ',' + longitude,
        createdAt: new Date().getTime()
    };
};


module.exports = {makeMessage, makeLocationMessage};