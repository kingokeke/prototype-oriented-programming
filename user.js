var User = (function() {
	var DB = require('./db');
	function User(name, email, password) {
		this.name = name;
		this.email = email;
		this.password = password;
	}

	return User;
})();

module.exports = User;
