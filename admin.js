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
		console.log(DB.users);
		return DB.users;
	};
	Admin.prototype.deleteUser = function() {};
	Admin.prototype.deleteAllUsers = function() {};
	return Admin;
})();

module.exports = Admin;
