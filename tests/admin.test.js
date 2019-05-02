/* eslint-disable no-undef */

var DB = require('../db');
var User = require('../user');
var Admin = require('../admin');

describe('Admin constructor', function() {
	it('should be defined', function() {
		// var adam = new Admin('Adam', 'adam@mail.com', '1234');
		expect(new Admin('Adam', 'adam@mail.com', '1234')).toBeDefined();
	});
});
