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

	return User;
})();

module.exports = User;
