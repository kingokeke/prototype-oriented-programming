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

	it('should auto-increment the user count', function() {
		var kingsley = new User('Kingsley', 'kingsley@mail.com', '1961');
		expect(DB.userCount).toBe(1);
	});
});
