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
	});
});
