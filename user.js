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
		if (!DB.users.hasOwnProperty(userID)) {
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

	return User;
})();

module.exports = User;
