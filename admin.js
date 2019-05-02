var Admin = (function() {
	var User = require('./user');
	function Admin(String_name, String_email, String_password) {
		User.call(this, String_name, String_email, String_password);
	}
	Admin.prototype = Object.create(User.prototype, {constructor: {value: Admin}});
	return Admin;
})();

module.exports = Admin;
