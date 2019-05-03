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
		var anselm = new Admin('Anselm', 'anselm@mail.com', '1234');
		expect(anselm.isAdmin).toBeTruthy();
	});

	it('should inherit methods from User', function() {
		var austin = new Admin('Austin', 'austin@mail.com', '1234');
		expect(austin).toHaveProperty('readAllUsers');
		expect(austin).toHaveProperty('deleteUser');
		expect(austin).toHaveProperty('deleteAllUsers');
	});
});

describe('Admin.prototype.readAllUsers', function() {
	it('should be defined', function() {
		var abel = new Admin('Abel', 'abel@mail.com', '1234');
		expect(abel.readAllUsers()).toBeDefined();
	});

	it('should not allow deleted admins to access readAllUsers method', function() {
		var alfred = new Admin('Alfred', 'alfred@mail.com', '1961');
		DB.users[alfred.userID].isActive = false;

		expect(function() {
			alfred.readAllUsers();
		}).toThrowError('Your account has been disabled. Please contact an admin for further assistance.');
	});
});

describe('Admin.prototype.deleteUser', function() {
	it('should set the isActive property of the user to false', function() {
		var alex = new Admin('Alex', 'alex@mail.com', '1961');
		expect(alex.deleteUser('user-1')).toHaveProperty('isActive', false);
	});
});
