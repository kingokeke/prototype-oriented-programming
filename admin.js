var Admin = (function() {
	// IMPORTS REQUIRED FILES
	var DB = require('./db');
	var User = require('./user');
	var Order = require('./order');

	// DEFINES ADMIN CONSTRUCTOR AND INHERITS PROPERTIES FROM USER CONSTRUCTOR
	function Admin(String_name, String_email, String_password) {
		User.call(this, String_name, String_email, String_password);
		this.isAdmin = true;
		DB.users[this.userID].isAdmin = this.isAdmin;
	}

	// INHERITS METHODS FROM USER.PROTOTYPE
	Admin.prototype = Object.create(User.prototype, {constructor: {value: Admin}});

	Admin.prototype.readAllUsers = function() {
		var errorMessage;

		// THROWS ERROR IF THE CURRENT USER'S ACCOUNT HAS BEEN DISABLED (DELETED)
		if (DB.users[this.userID].isActive === false) {
			errorMessage = 'Your account has been disabled. Please contact an admin for further assistance.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// RETURNS ALL USERS FROM THE DB
		console.log('Retrieving all users from the database...');
		console.log(DB.users);
		return DB.users;
	};

	Admin.prototype.deleteUser = function(String_userID) {
		var errorMessage;

		// THROWS ERROR IF THE CURRENT USER'S ACCOUNT HAS BEEN DISABLED (DELETED)
		if (DB.users[this.userID].isActive === false) {
			errorMessage = 'Your account has been disabled. Please contact an admin for further assistance.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// THROWS ERROR IF THE USER WAS NEVER CREATED IN THE FIRST PLACE
		if (!DB.users.hasOwnProperty(String_userID)) {
			errorMessage = 'The user with user ID: ' + String_userID + ' does not exist in the database.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// THROWS ERROR IF THE USER WAS CREATED AND THEN LATER DISABLED (DELETED)
		if (DB.users[String_userID].isActive === false) {
			errorMessage = 'The user with user ID: ' + String_userID + ' has been deleted already.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// DELETES THE USER (BY SETTING THE ISACTIVE PROPERTY TO FALSE), THEN RETURNS THE DELETED USER DETAILS
		console.log('Deleting user with user ID: ' + String_userID);
		DB.users[String_userID].isActive = false;

		console.log('User with user ID: ' + String_userID + ' has been deleted. Retrieving user details...');
		console.log(DB.users[String_userID]);
		return DB.users[String_userID];
	};

	Admin.prototype.deleteAllUsers = function() {
		var errorMessage;

		// THROWS ERROR IF THE CURRENT USER'S ACCOUNT HAS BEEN DISABLED (DELETED)
		if (DB.users[this.userID].isActive === false) {
			errorMessage = 'Your account has been disabled. Please contact an admin for further assistance.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// DELETES ALL USERS (BY SETTING THEIR ISACTIVE PROPERTY TO FALSE), THEN RETURNS THE USERS DATABASE
		console.log('Deleting all users...');
		var userIDs = Object.keys(DB.users);
		for (var i = 0; i < userIDs.length; i++) {
			DB.users[userIDs[i]].isActive = false;
		}

		console.log('All users deleted. Retrieving user details for all users...');
		console.log(DB.users);
		return DB.users;
	};

	Admin.prototype.readAllOrders = function() {
		var errorMessage;

		// THROWS ERROR IF THE CURRENT USER'S ACCOUNT HAS BEEN DISABLED (DELETED)
		if (DB.users[this.userID].isActive === false) {
			errorMessage = 'Your account has been disabled. Please contact an admin for further assistance.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// FETCHES AND RETURNS ALL ORDERS IN THE DATABASE
		var allOrders = Order.readAllOrders();

		console.log(allOrders);
		return allOrders;
	};

	Admin.prototype.readOrder = function(String_orderID) {
		// FETCHES AN ORDER FROM THE DB USING THE ORDER ID
		var match = Order.readOrder(String_orderID);
		console.log(match);
		return match;
	};

	Admin.prototype.updateOrder = function(String_orderID, Array_products) {
		// UPDATES AN ORDER WITH NEW PRODUCT DETAILS SUPPLIED BY THE ARGUMENTS
		var updatedDetails = Order.updateDetails(String_orderID, Array_products);
		console.log(updatedDetails);
		return updatedDetails;
	};

	Admin.prototype.deleteOrder = function(String_orderID) {
		// DELETES AN ORDER FROM THE DATABASE AND RETURN THE DETAILS OF THE DELETED ORDER
		var deletedOrder = Order.delete(String_orderID);
		console.log(deletedOrder);
		return deletedOrder;
	};

	Admin.prototype.deleteAllOrders = function() {
		// DELETES ALL ORDERS FROM THE DATABASE AND RETURNS THE ORDER DATABASE
		Order.deleteAll();
		console.log(DB.orders);
		return DB.orders;
	};

	return Admin;
})();

module.exports = Admin;
