var Order = (function() {
	// IMPORTS REQUIRED FILES
	var DB = require('./db');

	// DEFINES ORDER CONSTRUCTOR FUNCTION
	function Order(String_userID, Array_products) {
		var timestamp = new Date();
		this.userID = String_userID;
		this.orderID = 'order-' + String(DB.orderCount + 1);
		this.date = timestamp.toDateString();
		this.time = timestamp.toLocaleTimeString();
		this.products = Array_products;

		DB.orders[this.orderID] = {
			orderID: this.orderID,
			userID: this.userID,
			date: this.date,
			time: this.time,
			products: this.products,
		};

		DB.orderCount++;
	}

	// STATIC METHOD TO READ ALL ORDERS FROM THE DATABASE
	Order.readAllOrders = function() {
		return DB.orders;
	};

	// STATIC METHOD TO READ A SINGLE ORDER FROM THE DATABASE USING ITS ORDER ID
	Order.readOrder = function(String_orderID) {
		var errorMessage;

		// THROWS ERROR IF THE ARGUMENT PASSED IN IS NOT A STRING
		if (typeof String_orderID !== 'string') {
			errorMessage = 'Invalid parameters supplied. Parameter must be a strings only.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// THROWS ERROR IF THE NUMBER OF ARGUMENTS IS MORE OR LESS THAN IS REQUIRED
		if (arguments.length !== 1) {
			errorMessage = 'Invalid parameters supplied. Please supply just ONE string parameter.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// THROWS ERROR IF THAT ORDER ID DOES NOT EXIST IN THE DATABASE IN THE FIRST PLACE
		if (!DB.orders.hasOwnProperty(String_orderID)) {
			errorMessage = 'Order was not found in the database.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// FINDS THE ORDER IN THE DATABASE AND RETURNS IT
		var match = DB.orders[String_orderID];
		return match;
	};

	// STATIC METHOD TO FIND A SINGLE ORDER IN THE DATABASE USING ITS ORDER ID AND UPDATE THE ORDER DETAILS
	Order.updateDetails = function(orderID, Array_products) {
		var errorMessage;

		// THROWS ERROR IF INCORRECT NUMBER OF ARGUMENTS IS SUPPLIED TO THE FUNCTION
		if (arguments.length !== 2) {
			errorMessage = 'Invalid parameters supplied. Please supply only one string and one array as parameter.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// THROWS ERROR IF THE SECOND ARGUMENT SUPPLIED IS OF THE INCORRECT TYPE
		if (!Array.isArray(Array_products)) {
			errorMessage = 'Invalid parameters supplied. Please supply an array as the second parameter.';
			console.log(errorMessage);
			throw new Error(errorMessage);
		}

		// THROWS ERROR IF THE CONTENTS OF THE SECOND ARGUMENT (ARRAY) ARE NOT STRINGS
		for (var i = 0; i < Array_products.length; i++) {
			if (typeof Array_products[i] !== 'string') {
				errorMessage = 'Invalid parameters supplied. All elements of the array must be strings.';
				console.log(errorMessage);
				throw new Error(errorMessage);
			}
		}

		// UPDATES THE ORDER DETAILS IN THE DATABASE WITH THE NEW DETAILS AND RETURNS THE UPDATED ORDER
		DB.orders[orderID].products = Array_products;

		console.log(DB.orders[orderID]);
		return DB.orders[orderID];
	};

	// STATIC METHOD TO FIND A SINGLE ORDER IN THE DATABASE USING ITS ORDER ID AND DELETE IT
	Order.delete = function(String_orderID) {
		var deletedOrder = DB.orders[String_orderID];
		delete DB.orders[String_orderID];
		return deletedOrder;
	};

	// STATIC METHOD TO DELETE ALL ORDERS IN THE DATABASE
	Order.deleteAll = function() {
		DB.orders = {};
		return DB.orders;
	};

	return Order;
})();

module.exports = Order;
