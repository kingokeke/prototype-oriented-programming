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

	it('should not allow deleted admins to access readAllUsers method', function() {
		var alfonso = new Admin('Alfonso', 'alfonso@mail.com', '1961');
		DB.users[alfonso.userID].isActive = false;

		expect(function() {
			alfonso.deleteUser('user-2');
		}).toThrowError('Your account has been disabled. Please contact an admin for further assistance.');
	});

	it('should throw an error if the user to be deleted is not in the database at all', function() {
		var testID = 'user-20000';
		var augustine = new Admin('Augustine', 'augustine@mail.com', '1961');
		expect(function() {
			augustine.deleteUser(testID);
		}).toThrowError('The user with user ID: ' + testID + ' does not exist in the database.');
	});

	it('should throw an error if the user to be deleted has been set to isActive: false already', function() {
		var anselm = new Admin('Anselm', 'anselm@mail.com', '1961');
		var anthony = new Admin('Anthony', 'anthony@mail.com', '1961');
		DB.users[anselm.userID].isActive = false;

		expect(function() {
			anthony.deleteUser(anselm.userID);
		}).toThrowError('The user with user ID: ' + anselm.userID + ' has been deleted already.');
	});
});

describe('Admin.prototype.deleteAllUsers', function() {
	it('should set the isActive property of all users to false', function() {
		var arnold = new Admin('Arnold', 'arnold@mail.com', '1961');
		var attila = new Admin('Attila', 'attila@mail.com', '1961');
		var axel = new Admin('Axel', 'axel@mail.com', '1961');
		var deleteMessage = arnold.deleteAllUsers();
		expect(deleteMessage[arnold.userID]).toHaveProperty('isActive', false);
		expect(deleteMessage[attila.userID]).toHaveProperty('isActive', false);
		expect(deleteMessage[axel.userID]).toHaveProperty('isActive', false);
	});

	it('should not allow deleted admins to access deleteAllUsers method', function() {
		var aquinas = new Admin('Aquinas', 'aquinas@mail.com', '1961');
		var arthur = new Admin('Arthur', 'arthur@mail.com', '1961');
		aquinas.deleteAllUsers();

		expect(function() {
			arthur.deleteAllUsers();
		}).toThrowError('Your account has been disabled. Please contact an admin for further assistance.');
	});
});

describe('Admin.prototype.readAllOrders', function() {
	it('should exist', function() {
		var barney = new Admin('Barney', 'barney@mail.com', '1961');
		barney.createNewOrder('soap', 'sponge', 'cream');
		expect(barney).toHaveProperty('readAllOrders');
	});

	it('should return a value that is not undefined', function() {
		var baines = new Admin('Baines', 'baines@mail.com', '1961');
		baines.createNewOrder('soap', 'sponge', 'cream');
		expect(baines.readAllOrders()).toBeDefined();
	});

	it('should return an object containing all the orders', function() {
		var bernard = new Admin('Bernard', 'bernard@mail.com', '1961');
		bernard.createNewOrder('soap', 'sponge', 'cream');
		expect(typeof bernard.readAllOrders()).toBe('object');
	});

	it('should return an object that is the exact match of DB.orders', function() {
		var benjamin = new Admin('Benjamin', 'bernard@mail.com', '1961');
		benjamin.createNewOrder('soap', 'sponge', 'cream');
		expect(benjamin.readAllOrders()).toEqual(DB.orders);
	});

	it('should not allow deleted admins to access readAllOrders method', function() {
		var blake = new Admin('Blake', 'blake@mail.com', '1961');
		var billy = new Admin('Billy', 'billy@mail.com', '1961');
		billy.deleteUser(blake.userID);

		expect(function() {
			blake.readAllOrders();
		}).toThrowError('Your account has been disabled. Please contact an admin for further assistance.');
	});
});

describe('Admin.prototype.readOrder', function() {
	var brown = new Admin('Brown', 'brown@mail.com', '1961');

	it('should exist', function() {
		expect(brown).toHaveProperty('readOrder');
	});

	it('should return a response that is not undefined', function() {
		expect(brown.readOrder('order-1')).toBeDefined();
	});
});

describe('Admin.prototype.updateOrder', function() {
	var billy = new Admin('Brown', 'billy@mail.com', '1961');
	it('should exist', function() {
		expect(billy).toHaveProperty('updateOrder');
	});

	it('should return a result that is not undefined', function() {
		expect(billy.updateOrder('order-1', ['mat'])).toBeDefined();
	});
});
