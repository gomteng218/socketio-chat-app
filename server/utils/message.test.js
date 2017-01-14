var expect = require('expect');

var makeMessage = require('./message');

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