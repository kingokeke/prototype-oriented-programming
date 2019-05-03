var Admin = (function() {
	var DB = require('./db');
	var User = require('./user');

	function Admin(String_name, String_email, String_password) {
		User.call(this, String_name, String_email, String_password);
		this.isAdmin = true;
		DB.users[this.userID].isAdmin = this.isAdmin;
	}

	Admin.prototype = Object.create(User.prototype, {constructor: {value: Admin}});

	Admin.prototype.readAllUsers = function() {
		var errorMessage;

		if (DB.users[this.userID].isActive === false) {
			errorMessage = 'Your account has been disabled. Please contact an admin for further assistance.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		console.log(DB.users);
		return DB.users;
	};

	Admin.prototype.deleteUser = function(String_userID) {
		var errorMessage;

		if (DB.users[this.userID].isActive === false) {
			errorMessage = 'Your account has been disabled. Please contact an admin for further assistance.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		if (!DB.users.hasOwnProperty(String_userID)) {
			errorMessage = 'The user with user ID: ' + String_userID + ' does not exist in the database.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		if (DB.users[String_userID].isActive === false) {
			errorMessage = 'The user with user ID: ' + String_userID + ' has been deleted already.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		DB.users[String_userID].isActive = false;
		console.log(DB.users[String_userID]);
		return DB.users[String_userID];
	};

	Admin.prototype.deleteAllUsers = function() {};
	return Admin;
})();

module.exports = Admin;
