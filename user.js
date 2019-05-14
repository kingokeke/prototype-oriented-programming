var User = (function() {
	var DB = require('./db');
	var Order = require('./order');

	// DEFINES USER CONSTRUCTOR FUNCTION
	function User(name, email, password) {
		if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
			throw new Error('Invalid arguments. Please enter only strings');
		}

		this.name = name;
		this.email = email;
		this.password = password;
		this.userID = 'user-' + (Number(DB.userCount) + 1);
		this.isAdmin = false;

		DB.users[this.userID] = {
			userID: this.userID,
			name: this.name,
			email: this.email,
			password: this.password,
			isAdmin: this.isAdmin,
			isActive: true,
		};

		DB.userCount++;
	}

	// METHOD TO READ A SINGLE USER FROM THE DATABASE USING THE USER ID
	User.prototype.readUser = function(userID) {
		var errorMessage;

		// THROWS ERROR IF THE CURRENT USER'S ACCOUNT HAS BEEN DISABLED (DELETED)
		if (DB.users[this.userID].isActive === false) {
			errorMessage = 'Your account has been disabled. Please contact an admin for further assistance.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// THROWS ERROR IF THE USER WAS NEVER CREATED IN THE FIRST PLACE
		console.log('Querying the database for user with userID: ' + userID);
		if (!DB.users.hasOwnProperty(userID) || DB.users[userID].isActive === false) {
			errorMessage = 'The user with userID ' + userID + ' was not found in the database.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// GETS THE USER DETAILS FROM THE DB AND RETURNS IT
		console.log('User with userID: ' + userID + ' found. Retrieving user details...');
		var result = {
			userID: DB.users[userID].userID,
			name: DB.users[userID].name,
			email: DB.users[userID].email,
			isAdmin: DB.users[userID].isAdmin,
		};

		console.log(result);
		return result;
	};

	// METHOD TO UPDATE THE CURRENT USER DETAILS IN THE DATABASE
	User.prototype.updateUserDetails = function(Object_userDetails) {
		var errorMessage;

		// THROWS ERROR IF THE CURRENT USER'S ACCOUNT HAS BEEN DISABLED (DELETED)
		if (DB.users[this.userID].isActive === false) {
			errorMessage = 'Your account has been disabled. Please contact an admin for further assistance.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// THROWS ERROR IF INCORRECT VALUES ARE PASSED AS ARGUMENTS TO THE FUNCTION
		if (typeof Object_userDetails !== 'object' || Array.isArray(Object_userDetails) || arguments.length !== 1) {
			errorMessage = 'Invalid parameter supplied. Only one object is allowed as a parameter.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// UPDATES THE USER DETAILS IN THE DATABASE WITH THE NEW DETAILS SUPPLIED IN THE ARGUMENTS
		var details = Object.keys(Object_userDetails);
		for (var index = 0; index < details.length; index++) {
			DB.users[this.userID][details[index]] = Object_userDetails[details[index]];
		}

		// FETCHES THE UPDATED DETAILS FROM THE DATABASE AND RETURNS IT
		var updatedUserDetails = {
			userID: DB.users[this.userID].userID,
			name: DB.users[this.userID].name,
			email: DB.users[this.userID].email,
			password: DB.users[this.userID].password,
			isAdmin: DB.users[this.userID].isAdmin,
		};

		console.log(updatedUserDetails);
		return updatedUserDetails;
	};

	// METHOD TO SEARCH THE DATABASE FOR ALL USERS BEARING A PARTICULAR NAME AND RETURN IT
	User.prototype.searchUsername = function(username) {
		var errorMessage;

		// THROWS ERROR IF THE CURRENT USER'S ACCOUNT HAS BEEN DISABLED (DELETED)
		if (DB.users[this.userID].isActive === false) {
			errorMessage = 'Your account has been disabled. Please contact an admin for further assistance.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// THROWS ERROR IF INCORRECT VALUES ARE PASSED AS ARGUMENTS TO THE FUNCTION
		if (typeof username !== 'string') {
			errorMessage = 'Invalid parameter supplied. Only strings are allowed as parameters.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// SEARCHES THE DATABASE FOR USERS WHOSE NAMES MATCH THE SEARCH TERM AND ADDS THEM TO THE MATCHES ARRAY
		var userIDs = Object.keys(DB.users);
		var matches = [];

		console.log('Querying the database for users with username: ' + username);
		for (var index = 0; index < userIDs.length; index++) {
			if (DB.users[userIDs[index]].name === username && DB.users[userIDs[index]].isActive === true) {
				var match = {
					userID: DB.users[userIDs[index]].userID,
					name: DB.users[userIDs[index]].name,
					email: DB.users[userIDs[index]].email,
					isAdmin: DB.users[userIDs[index]].isAdmin,
				};
				matches[matches.length] = match;
			}
		}

		// IF NO USER IN THE DATABASE WAS FOUND WITH THAT USERNAME, THROW AN ERROR MESSAGE
		if (matches.length === 0) {
			console.log('No user found with username: ' + username + '. Exiting...');
			throw new Error('No user found with username: ' + username + '. Exiting...');
		}

		// IF THERE ARE USERS IN THE DATABASE WITH THAT USERNAME, RETURN THE LIST OF ALL THE USERS THAT HAVE THAT NAME
		console.log(matches.length + ' user(s) found with username: ' + username + '. Retrieving details...');
		console.log(matches);
		return matches;
	};

	// METHOD ENABLING THE USER TO CREATE A NEW ORDER
	User.prototype.createNewOrder = function(Strings_products) {
		var errorMessage;

		// THROWS ERROR IF THE CURRENT USER'S ACCOUNT HAS BEEN DISABLED (DELETED)
		if (DB.users[this.userID].isActive === false) {
			errorMessage = 'Your account has been disabled. Please contact an admin for further assistance.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// CHECKS IF THE PROPER ARGUMENT TYPE IS PASSED INTO THE FUNCTION AND THEN ADDS ALL THE ARGUMENTS SUPPLIED TO AN ARRAY
		var orderedProducts = [];
		for (var index = 0; index < arguments.length; index++) {
			if (typeof arguments[index] !== 'string') {
				errorMessage = 'Invalid parameters supplied. Parameters must be strings only.';
				console.log(errorMessage);
				throw new Error(errorMessage);
			}
			orderedProducts.push(arguments[index]);
		}

		//  CREATES A NEW ORDER USING THE DETAILS SUPPLIED
		var newOrder = new Order(this.userID, orderedProducts);

		// RETURNS THE DETAILS OF THE NEW ORDER
		console.log(newOrder);
		return newOrder;
	};

	return User;
})();

module.exports = User;
