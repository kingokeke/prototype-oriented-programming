var Order = (function() {
	var DB = require('./db');
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

	Order.readAllOrders = function() {
		return DB.orders;
	};

	Order.readOrder = function(String_orderID) {
		if (typeof String_orderID !== 'string') {
			throw new Error('Invalid parameters supplied. Parameter must be a strings only.');
		}

		if (arguments.length !== 1) {
			throw new Error('Invalid parameters supplied. Please supply just ONE string parameter.');
		}

		if (!DB.orders.hasOwnProperty(String_orderID)) {
			throw new Error('Order was not found in the database');
		}

		var match = DB.orders[String_orderID];
		return match;
	};

	Order.updateDetails = function(Array_products) {
		if (arguments.length !== 1) {
			throw new Error('Invalid parameters supplied. Please supply only one array as a parameter.');
		}

		if (!Array.isArray(Array_products)) {
			throw new Error('Invalid parameters supplied. Please supply only one array as a parameter.');
		}

		for (var i = 0; i < Array_products.length; i++) {
			if (typeof Array_products[i] !== 'string') {
				throw new Error('Invalid parameters supplied. All elements of the array must be strings.');
			}
		}

		return {};
	};

	return Order;
})();

module.exports = Order;
