/* eslint-disable no-undef */

var User = require('../user');

describe('User', function() {
	it('should instantiate a user object', function() {
		var name = 'Kingsley';
		var email = 'kingsley@mail.com';
		var password = '1961';
		expect(new User(name, email, password)).toBeDefined();
	});
});
