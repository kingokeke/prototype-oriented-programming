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
});
