/* eslint-disable no-undef */

var DB = require('../db');
var User = require('../user');

//  TESTS FOR USER CONSTRUCTOR FUNCTION
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

//  TESTS FOR READ USER METHOD
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

//  TESTS FOR UPDATE USER DETAILS METHOD
describe('User.prototype.updateUserDetails', function() {
	it('should exist', function() {
		var kingsman1 = new User('Kingsley', 'kingsley@mail.com', '1961');
		expect(kingsman1.updateUserDetails({name: 'Kingsley'})).toBeDefined();
	});

	it('should accept only objects as an argument', function() {
		var kingsman2 = new User('Kingsley', 'kingsley@mail.com', '1961');
		expect(kingsman2.updateUserDetails({name: 'Kingsley'})).toBeDefined();

		expect(function() {
			kingsman2.updateUserDetails('name', 'David');
		}).toThrowError('Invalid parameter supplied. Only one object is allowed as a parameter.');

		expect(function() {
			kingsman2.updateUserDetails(['name', 'David']);
		}).toThrowError('Invalid parameter supplied. Only one object is allowed as a parameter.');
	});

	it('should have only one argument', function() {
		var kingsman3 = new User('Kingsley', 'kingsley@mail.com', '1961');
		expect(function() {
			kingsman3.updateUserDetails({name: 'Kingsman'}, {email: 'kingsman@mail.com'});
		}).toThrowError('Invalid parameter supplied. Only one object is allowed as a parameter.');
	});

	it('should return an object containing the updated user details', function() {
		var kingsman4 = new User('Kingsley', 'kingsley@mail.com', '1961');
		expect(kingsman4.updateUserDetails({name: 'Kingsman'})).toEqual({
			userID: kingsman4.userID,
			name: 'Kingsman',
			email: 'kingsley@mail.com',
			password: '1961',
			isAdmin: false,
		});
	});

	it('should not allow deleted users to access readUser method', function() {
		var kingsman5 = new User('Kingsley', 'kingsley@mail.com', '1961');
		DB.users[kingsman5.userID].isActive = false;
		expect(function() {
			kingsman5.updateUserDetails({name: 'Kingsman'});
		}).toThrowError('Your account has been disabled. Please contact an admin for further assistance.');
	});
});

//  TESTS FOR SEARCH USERNAME METHOD
describe('User.prototype.searchUsername', function() {
	it('should search the DB for users whose username match the search query and return all matches if the username is found', function() {
		var king3 = new User('Kingsley', 'kingsley@mail.com', '1961');
		expect(king3.searchUsername('Kingsley')).toBeDefined();
	});

	it('should search the DB for users whose username match the search query and throw an error if the username is not found', function() {
		var king4 = new User('Kingsley', 'kingsley@mail.com', '1961');
		expect(function() {
			king4.searchUsername('Paul');
		}).toThrowError();
	});

	it('should not allow deleted users to access readUser method', function() {
		var king5 = new User('Kingsley', 'kingsley@mail.com', '1961');
		DB.users[king5.userID].isActive = false;
		expect(function() {
			king5.searchUsername('Kingsley');
		}).toThrowError();
	});

	it('should throw an error if another data type other than strings is passed in as an argument', function() {
		var king6 = new User('Kingsley', 'kingsley@mail.com', '1961');
		expect(function() {
			king6.searchUsername({name: 'Kingsley'});
		}).toThrowError('Invalid parameter supplied. Only strings are allowed as parameters.');
	});
});

describe('User.prototype.createNewOrder', function() {
	it('should exist', function() {
		var king7 = new User('Kingsley', 'kingsley@mail.com', '1961');
		expect(king7).toHaveProperty('createNewOrder');
	});

	it('should return a result that is not undefined', function() {
		var king8 = new User('Kingsley', 'kingsley@mail.com', '1961');
		var order1 = king8.createNewOrder('soap', 'sponge', 'cream');
		expect(order1).toBeDefined();
	});

	it('should take ONLY strings as parameters', function() {
		var king9 = new User('Kingsley', 'kingsley@mail.com', '1961');
		expect(function() {
			king9.createNewOrder('tea', 'coffee', ['sugar']);
		}).toThrowError('Invalid parameters supplied. Parameters must be strings only.');

		expect(function() {
			king9.createNewOrder('tea', 'coffee', true);
		}).toThrowError('Invalid parameters supplied. Parameters must be strings only.');

		expect(function() {
			king9.createNewOrder('tea', 'coffee', 300);
		}).toThrowError('Invalid parameters supplied. Parameters must be strings only.');

		expect(function() {
			king9.createNewOrder('tea', 'coffee', null);
		}).toThrowError('Invalid parameters supplied. Parameters must be strings only.');

		expect(function() {
			king9.createNewOrder('tea', 'coffee', undefined);
		}).toThrowError('Invalid parameters supplied. Parameters must be strings only.');

		expect(function() {
			king9.createNewOrder('tea', 'coffee', {'1': 'sugar'});
		}).toThrowError('Invalid parameters supplied. Parameters must be strings only.');
	});

	it('should return an object with the order details', function() {
		var king10 = new User('Kingsley', 'kingsley@mail.com', '1961');
		var order2 = king10.createNewOrder('soap', 'sponge', 'cream');
		expect(order2).toHaveProperty('userID');
		expect(order2).toHaveProperty('orderID');
		expect(order2).toHaveProperty('time');
		expect(order2).toHaveProperty('date');
		expect(order2).toHaveProperty('products');
	});
});
