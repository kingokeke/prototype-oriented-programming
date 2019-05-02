var Admin = (function() {
	var DB = require('./db');
	var User = require('./user');

	function Admin(String_name, String_email, String_password) {
		User.call(this, String_name, String_email, String_password);
		this.isAdmin = true;
		DB.users[this.userID].isAdmin = this.isAdmin;
	}

	Admin.prototype = Object.create(User.prototype, {constructor: {value: Admin}});
	return Admin;
})();

module.exports = Admin;
