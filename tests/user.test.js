/* eslint-disable no-undef */

var DB = require('../db');
var User = require('../user');

describe('User', function() {
	it('should instantiate a user object', function() {
		expect(new User('Kingsley', 'kingsley@mail.com', '1961')).toBeDefined();
	});

	it('should accept only strings as arguments', function() {
		expect(function() {
			new User('Kingsley', 'kingsley@mail.com', 1961);
		}).toThrow();
	});

	it('should return an object with name as a property', function() {
		expect(new User('Kingsley', 'kingsley@mail.com', '1961')).toHaveProperty('name', 'Kingsley');
	});

	it('should return an object with email as a property', function() {
		expect(new User('Kingsley', 'kingsley@mail.com', '1961')).toHaveProperty('email', 'kingsley@mail.com');
	});

	it('should return an object with password as a property', function() {
		expect(new User('Kingsley', 'kingsley@mail.com', '1961')).toHaveProperty('password', '1961');
	});

	it('should return an object with userID as a property', function() {
		expect(new User('Kingsley', 'kingsley@mail.com', '1961')).toHaveProperty('userID');
	});

	it('should return an object with isAdmin as a property', function() {
		expect(new User('Kingsley', 'kingsley@mail.com', '1961')).toHaveProperty('isAdmin', false);
	});

	it('should auto-increment the user count after instantiating a User', function() {
		var currentUserCount = DB.userCount;
		new User('Kingsley', 'kingsley@mail.com', '1961');
		expect(DB.userCount).toBe(currentUserCount + 1);
	});
});

describe('User.prototype.readUser', function() {
	it('should query the database for a user using the userID and return the user details if the user is found', function() {
		var kingsley = new User('Kingsley', 'kingsley@mail.com', '1961');
		expect(kingsley.readUser('user-2')).toBeDefined();
	});

	it('should query the database for a user using the userID and throw an error if the userID is NOT found', function() {
		var kingsley = new User('Kingsley', 'kingsley@mail.com', '1961');
		expect(function() {
			kingsley.readUser('user-20000');
		}).toThrowError();
	});

	it('should not allow deleted users to access readUser method', function() {
		var king = new User('Kingsley', 'kingsley@mail.com', '1961');
		DB.users[king.userID].isActive = false;

		expect(function() {
			king.readUser('user-3');
		}).toThrowError();
	});

	it('should query the database for a user using the userID and throw an error if the user with the userID has been set to isActive: false ', function() {
		var king1 = new User('Kingsley', 'kingsley@mail.com', '1961');
		var king2 = new User('Kingsley', 'kingsley@mail.com', '1961');
		DB.users[king1.userID].isActive = false;

		expect(function() {
			king2.readUser(king1.userID);
		}).toThrowError();
	});
});
