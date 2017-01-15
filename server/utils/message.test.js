var expect = require('expect');

var {makeMessage, makeLocationMessage} = require('./message');

describe('makeMessage', function() {
    it('should create correct message object', function() {
        var from = 'Ryan';
        var text = 'Hello';
        var message = makeMessage(from, text);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from: from,
            text: text
        });
    });
});


describe('makeLocationMessage', function() {
    it('should create correct location object', function() {
        var from = 'Betty';
        var latitude = 25.5;
        var longitude = 22.2;
        var url = 'https://www.google.com/maps?q=25.5,22.2';
        var message = makeLocationMessage(from, latitude, longitude);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from: from,
            url: url
        });
    });
});