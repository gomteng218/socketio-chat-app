var moment = require('moment');

var makeMessage = function(from, text) {
    return {
        from: from,
        text: text,
        createdAt: moment().valueOf()
    };
};

var makeLocationMessage = function(from, latitude, longitude) {
    return {
        from: from, 
        url: 'https://www.google.com/maps?q=' + latitude + ',' + longitude,
        createdAt: moment().valueOf()
    };
};


module.exports = {makeMessage, makeLocationMessage};