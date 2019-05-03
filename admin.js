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
		if (DB.users[this.userID].isActive === false) {
			console.log('Your account has been disabled. Please contact an admin for further assistance.');
			throw new Error('Your account has been disabled. Please contact an admin for further assistance.');
		}

		console.log(DB.users);
		return DB.users;
	};
	Admin.prototype.deleteUser = function(String_userID) {
		if (DB.users[this.userID].isActive === false) {
			console.log('Your account has been disabled. Please contact an admin for further assistance.');
			throw new Error('Your account has been disabled. Please contact an admin for further assistance.');
		}

		if (DB.users[String_userID].isActive === false) {
			console.log('The user with user ID: ' + String_userID + ' was not found in the database.');
			throw new Error('The user with user ID: ' + String_userID + ' was not found in the database.');
		}

		if (DB.users.hasOwnProperty(String_userID)) {
			DB.users[String_userID].isActive = false;
			console.log(DB.users[String_userID]);
			return DB.users[String_userID];
		}
	};
	Admin.prototype.deleteAllUsers = function() {};
	return Admin;
})();

module.exports = Admin;
