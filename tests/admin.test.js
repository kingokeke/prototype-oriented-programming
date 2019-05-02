/* eslint-disable no-undef */

var DB = require('../db');
var User = require('../user');
var Admin = require('../admin');

describe('Admin constructor', function() {
	it('should be defined', function() {
		expect(new Admin('Adam', 'adam@mail.com', '1234')).toBeDefined();
	});

	it('should inherit its prototype from User', function() {
		expect(Admin.prototype).toBeInstanceOf(User);
	});

	it('should inherit properties from User', function() {
		var adrian = new Admin('Adrian', 'adrian@mail.com', '1234');
		expect(adrian).toHaveProperty('name');
		expect(adrian).toHaveProperty('email');
		expect(adrian).toHaveProperty('password');
	});

	it('should inherit methods from User', function() {
		var austin = new Admin('Austin', 'austin@mail.com', '1234');
		expect(austin).toHaveProperty('readUser');
		expect(austin).toHaveProperty('updateUserDetails');
		expect(austin).toHaveProperty('searchUsername');
	});

	it('should return an admin object that has its isAdmin property that is set to true', function() {
		var ans = new User('Ans', 'ans@mail.com', '1234');
		console.log(ans);
		var anselm = new Admin('Anselm', 'anselm@mail.com', '1234');
		console.log(anselm);
		expect(anselm.isAdmin).toBeTruthy();
		console.log(DB);
	});
});
