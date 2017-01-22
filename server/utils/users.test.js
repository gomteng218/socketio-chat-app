var expect = require('expect');

var {Users} = require('./users');

describe('Users', function() {
    var users;
    
    beforeEach(function() {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mitch',
            room: 'NYC'
        }, {
            id: '2',
            name: 'John',
            room: 'LA'
        }, {
            id: '2',
            name: 'Caleb',
            room: 'Chi'
        }]
    });
    
    it('should add new user', function() {
        var users = new Users();
        var user = {
            id: '12345',
            name: 'Ryan',
            room: 'New Yorkers'
        };
        var userResponse = users.addUser(user.id, user.name, user.room);
        
        expect(users.users).toEqual([user]);
    });
    
    it('should remove user', function() {
        var userId = '1';
        var user = users.removeUser(userId);
        
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });
    
    it('should find user', function() {
        var userId = '2';
        var user = users.getUser(userId);
        
        expect(user.id).toBe(userId);
    })
    
    it('should return names for cities', function() {
        var userList = users.getUserList('NYC');
        
        expect(userList).toEqual(['Mitch']);
    });
});