var User = (function() {
	var DB = require('./db');
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

	User.prototype.readUser = function(userID) {
		if (DB.users[this.userID].isActive === false) {
			console.log('Your account has been disabled. Please contact an admin for further assistance.');
			throw new Error('Your account has been disabled. Please contact an admin for further assistance.');
		}

		console.log('Querying the database for user with userID: ' + userID);
		if (!DB.users.hasOwnProperty(userID) || DB.users[userID].isActive === false) {
			console.log('The user with userID ' + userID + ' was not found in the database.');
			throw new Error('The user with userID ' + userID + ' was not found in the database.');
		}

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

	User.prototype.updateUserDetails = function(Object_userDetails) {
		if (typeof Object_userDetails !== 'object' || Array.isArray(Object_userDetails) || arguments.length !== 1) {
			throw new Error('Invalid parameter supplied. Only one object is allowed as a parameter.');
		}
		return 'No contents yet';
	};

	User.prototype.searchUsername = function(username) {
		if (DB.users[this.userID].isActive === false) {
			console.log('Your account has been disabled. Please contact an admin for further assistance.');
			throw new Error('Your account has been disabled. Please contact an admin for further assistance.');
		}

		if (typeof username !== 'string') {
			throw new Error('Invalid parameter supplied. Only strings are allowed as parameters.');
		}

		var userIDs = Object.keys(DB.users);
		var matches = [];

		console.log('Querying the database for users with username: ' + username);
		for (var i = 0; i < userIDs.length; i++) {
			if (DB.users[userIDs[i]].name === username && DB.users[userIDs[i]].isActive === true) {
				var match = {
					userID: DB.users[userIDs[i]].userID,
					name: DB.users[userIDs[i]].name,
					email: DB.users[userIDs[i]].email,
					isAdmin: DB.users[userIDs[i]].isAdmin,
				};
				matches[matches.length] = match;
			}
		}

		if (matches.length === 0) {
			console.log('No user found with username: ' + username + '. Exiting...');
			throw new Error();
		}

		console.log(matches.length + ' user(s) found with username: ' + username + '. Retrieving details...');
		console.log(matches);
		return matches;
	};
	return User;
})();

module.exports = User;
