var Admin = (function() {
	var User = require('./user');
	function Admin() {
		return 'Admin exists';
	}
	Admin.prototype = Object.create(User.prototype, {constructor: {value: Admin}});
	return Admin;
})();

module.exports = Admin;
