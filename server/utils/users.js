[{
    id: '34324dfea',
    name: 'Ryan',
    room: 'Cool Room'
}]

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        var user = this.users.filter(function(user) {
            return user.id === id;
        })[0];
        
        if (user) {
            this.users = this.users.filter(function(user) {
                return user.id !== id;
            });
        }
        
        return user;
    }
    getUser(id) {
        return this.users.filter(function(user) {
            return user.id === id;
        })[0];
    }
    getUserList(room) {
        var users = this.users.filter(function(user) {
            return user.room === room;
        });
        var namesArray = users.map(function(user) {
            return user.name;
        });
        
        return namesArray;
    }
}

module.exports = {Users};

//class Person {
//    constructor(name, age) {
//        this.name = name;
//        this.age = age;
//    }
//    getUserDescription() {
//        return this.name + ' is ' + this.age + ' year(s) old.'
//    }
//}
//
//var user = new Person('Ryan', 26);
//
//var description = user.getUserDescription();
//console.log(description);